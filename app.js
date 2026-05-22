// menuItems is loaded from Firestore; falls back to DEFAULT_MENU (from menu-data.js)
let menuItems = DEFAULT_MENU.slice();

// ── Firestore menu loader (runs after initial render) ──
async function loadMenuFromFirestore() {
  try {
    const snap = await db.collection("menu").orderBy("sortOrder").get();
    if (snap.empty) return;
    const fsItems = snap.docs
      .map(doc => {
        const data = { id: doc.id, ...doc.data() };
        if (!data.photo) {
          const def = DEFAULT_MENU.find(d => d.id === doc.id);
          if (def?.photo) data.photo = def.photo;
        }
        return data;
      })
      .filter(item => item.available !== false);
    if (fsItems.length === 0) return;
    menuItems = fsItems;
    renderCategories();
    renderMenu();
  } catch (e) {
    // keep DEFAULT_MENU
  }
}


const state = {
  category: "全部",
  service: "內用",
  payment: "現金",
  cart: new Map(), // key: "itemId:variantLabel" 或 "itemId"，value: {quantity, variantLabel, price}
};

const currency = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0,
});

const categoryTabsEl  = document.querySelector(".category-tabs");
const menuListEl      = document.querySelector("#menuList");
const cartListEl      = document.querySelector("#cartList");
const grandTotalNode  = document.querySelector("#grandTotal");
const toastEl         = document.querySelector("#toast");
const cartBarEl       = document.querySelector("#cartBar");
const cartCountNode   = document.querySelector("#cartCount");
const cartBarTotalNode= document.querySelector("#cartBarTotal");
const cartDrawerEl    = document.querySelector("#cartDrawer");
const cartOverlayEl   = document.querySelector("#cartOverlay");
const variantPickerEl = document.querySelector("#variantPicker");
const variantOverlayEl= document.querySelector("#variantOverlay");
const variantOptionsEl   = document.querySelector("#variantOptions");
const variantItemNameEl  = document.querySelector("#variantItemName");
const variantItemPhotoEl = document.querySelector("#variantItemPhoto");
const variantItemPriceEl = document.querySelector("#variantItemPrice");
const variantConfirmEl   = document.querySelector("#variantConfirm");

let pendingItem       = null;
let pendingSelections = [];

function formatPrice(v) {
  return currency.format(v);
}

// 麵包 / 餅皮選項對應小圖（Pexels）
const WRAPPER_PHOTOS = {
  "吐司":    "https://images.pexels.com/photos/1448665/pexels-photo-1448665.jpeg?auto=compress&cs=tinysrgb&w=200",
  "漢堡":    "https://images.pexels.com/photos/1893557/pexels-photo-1893557.jpeg?auto=compress&cs=tinysrgb&w=200",
  "丹麥":    "https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=200",
  "年輪堡":  "https://images.pexels.com/photos/4115196/pexels-photo-4115196.jpeg?auto=compress&cs=tinysrgb&w=200",
  "貝果":    "https://images.pexels.com/photos/19745954/pexels-photo-19745954.jpeg?auto=compress&cs=tinysrgb&w=200",
  "蛋餅":    "https://images.pexels.com/photos/25539503/pexels-photo-25539503.jpeg?auto=compress&cs=tinysrgb&w=200",
  "抓餅":    "https://images.pexels.com/photos/24870672/pexels-photo-24870672.jpeg?auto=compress&cs=tinysrgb&w=200",
  "墨西哥餅":"https://images.pexels.com/photos/4955219/pexels-photo-4955219.jpeg?auto=compress&cs=tinysrgb&w=200",
  "厚片":    "https://images.pexels.com/photos/1070458/pexels-photo-1070458.jpeg?auto=compress&cs=tinysrgb&w=200",
};

// ── 選規格彈窗 ──

function showTopPhoto() {
  if (pendingItem.photo) {
    variantItemPhotoEl.innerHTML = `<img src="${pendingItem.photo}" alt="${pendingItem.name}" loading="lazy">`;
    variantItemPhotoEl.classList.remove("hidden");
  } else {
    variantItemPhotoEl.innerHTML = "";
    variantItemPhotoEl.classList.add("hidden");
  }
}

function renderVariantPicker() {
  variantItemNameEl.textContent = pendingItem.name;

  if (pendingItem.steps) {
    showTopPhoto();
    variantItemPriceEl.textContent = "";
    variantOptionsEl.innerHTML = pendingItem.steps.map((step, stepIdx) => `
      <div class="variant-group">
        <p class="variant-group-label">${step.hint}</p>
        <div class="variant-group-options">
          ${step.options.map((opt) => {
            const hasPrice = opt.price !== undefined;
            return `<button class="variant-btn" data-step="${stepIdx}" data-label="${opt.label}" ${hasPrice ? `data-price="${opt.price}"` : ""} type="button">
              <span class="variant-btn-label">${opt.label}</span>
              ${hasPrice ? `<span class="variant-btn-price">${formatPrice(opt.price)}</span>` : ""}
            </button>`;
          }).join("")}
        </div>
      </div>`).join("");
    pendingSelections = new Array(pendingItem.steps.length).fill(null);
    variantConfirmEl.textContent = "確認加入";
    variantConfirmEl.classList.remove("hidden");
    variantConfirmEl.disabled = true;
  } else if (pendingItem.variants && pendingItem.variants.length > 0) {
    variantItemPriceEl.textContent = "";
    const usePhotoStyle = pendingItem.variants.some((v) => WRAPPER_PHOTOS[v.label]);
    if (usePhotoStyle) {
      variantItemPhotoEl.innerHTML = "";
      variantItemPhotoEl.classList.add("hidden");
      variantOptionsEl.innerHTML = pendingItem.variants.map((v) => {
        const photo = WRAPPER_PHOTOS[v.label];
        return `
          <button class="variant-btn" data-label="${v.label}" data-price="${v.price}" type="button">
            ${photo ? `<img class="variant-btn-photo" src="${photo}" alt="${v.label}" loading="lazy">` : ""}
            <span class="variant-btn-text">
              <span class="variant-btn-label">${v.label}</span>
              <span class="variant-btn-price">${formatPrice(v.price)}</span>
            </span>
          </button>`;
      }).join("");
    } else {
      showTopPhoto();
      variantOptionsEl.innerHTML = `<div class="variant-group-options">${
        pendingItem.variants.map((v) => `
          <button class="variant-btn" data-label="${v.label}" data-price="${v.price}" type="button">
            <span class="variant-btn-label">${v.label}</span>
            <span class="variant-btn-price">${formatPrice(v.price)}</span>
          </button>`).join("")
      }</div>`;
    }
    variantConfirmEl.classList.add("hidden");
  } else {
    showTopPhoto();
    variantItemPriceEl.textContent = formatPrice(pendingItem.price);
    variantOptionsEl.innerHTML = "";
    variantConfirmEl.textContent = "確認加入";
    variantConfirmEl.classList.remove("hidden");
    variantConfirmEl.disabled = false;
  }
}

function showVariantPicker(item) {
  pendingItem       = item;
  pendingSelections = [];
  renderVariantPicker();
  variantPickerEl.classList.add("open");
  variantOverlayEl.classList.add("visible");
}

function hideVariantPicker() {
  pendingItem       = null;
  pendingSelections = [];
  variantPickerEl.classList.remove("open");
  variantOverlayEl.classList.remove("visible");
  variantConfirmEl.classList.add("hidden");
  variantConfirmEl.disabled = true;
}

// ── 菜單分類 ──

function getCategories() {
  return [...new Set(menuItems.map((item) => item.category))];
}

function renderCategories() {
  categoryTabsEl.innerHTML = getCategories()
    .map((cat) =>
      `<button class="category-tab" data-category="${cat}" type="button">${cat}</button>`)
    .join("");
}

function setActiveTab(cat) {
  categoryTabsEl.querySelectorAll(".category-tab").forEach((btn) => {
    const active = btn.dataset.category === cat;
    btn.classList.toggle("active", active);
    if (active) btn.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  });
}

let sectionObserver = null;
function setupSectionObserver() {
  if (sectionObserver) sectionObserver.disconnect();
  const headerH = document.querySelector(".sticky-header")?.offsetHeight || 100;
  sectionObserver = new IntersectionObserver((entries) => {
    // 取最靠近頂部的 intersecting section
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActiveTab(visible[0].target.dataset.section);
  }, { rootMargin: `-${headerH + 4}px 0px -40% 0px`, threshold: 0 });
  menuListEl.querySelectorAll(".category-section[data-section]")
    .forEach(s => sectionObserver.observe(s));
}

function menuItemHTML(item) {
  const hasVariants = item.variants && item.variants.length > 0;
  const hasSteps    = item.steps    && item.steps.length    > 0;
  const displayPrice = hasVariants
    ? formatPrice(item.variants[0].price) + " 起"
    : hasSteps
    ? formatPrice(item.steps[0].options[0].price) + " 起"
    : formatPrice(item.price);

  return `
    <div class="menu-item">
      <div class="item-row">
        <div class="item-name">
          ${item.name}
          ${item.tag ? '<span class="item-tag">招牌</span>' : ""}
        </div>
        <span class="item-dots" aria-hidden="true"></span>
        <div class="item-price-action">
          <span class="item-price">${displayPrice}</span>
          <button class="add-button" type="button" aria-label="加入 ${item.name}" onclick="handleMenuAdd('${item.id}')">＋</button>
        </div>
      </div>
      ${item.description ? `<div class="item-desc">${item.description}</div>` : ""}
    </div>
  `;
}

const CATEGORY_HINTS = {
  "棉花糖": "厚片",
  "初好茶": "中・大　冰・溫・涼",
};

function sectionHeadingHTML(cat, items) {
  const variants = items[0]?.variants;
  const hint = CATEGORY_HINTS[cat] || (variants
    ? variants.map((v) => v.label).join("・")
    : null);
  return `
    <div class="section-header">
      <h3 class="section-heading">${cat}</h3>
      ${hint ? `<p class="section-variant-hint">可選：${hint}</p>` : ""}
    </div>
  `;
}

function renderMenu() {
  const categories = [...new Set(menuItems.map((item) => item.category))];
  menuListEl.innerHTML = categories.map((cat) => {
    const items = menuItems.filter((item) => item.category === cat);
    return `
      <div class="category-section" data-section="${cat}">
        ${sectionHeadingHTML(cat, items)}
        ${items.map(menuItemHTML).join("")}
      </div>
    `;
  }).join("");
  setupSectionObserver();
}

// ── 購物車 ──

function cartKey(id, variantLabel) {
  return variantLabel ? `${id}:${variantLabel}` : id;
}

function addToCart(id, variantLabel, price) {
  const key = cartKey(id, variantLabel);
  const existing = state.cart.get(key);
  if (existing) {
    state.cart.set(key, { ...existing, quantity: existing.quantity + 1 });
  } else {
    state.cart.set(key, { quantity: 1, variantLabel, price });
  }
  renderCart();
}

function incrementCartItem(key) {
  const data = state.cart.get(key);
  if (!data) return;
  state.cart.set(key, { ...data, quantity: data.quantity + 1 });
  renderCart();
}

function decrementCartItem(key) {
  const data = state.cart.get(key);
  if (!data) return;
  if (data.quantity <= 1) {
    state.cart.delete(key);
  } else {
    state.cart.set(key, { ...data, quantity: data.quantity - 1 });
  }
  renderCart();
}

function getCartRows() {
  return [...state.cart.entries()].map(([key, data]) => {
    const id = key.split(":")[0];
    const item = menuItems.find((c) => c.id === id);
    const displayName = data.variantLabel
      ? `${item.name}（${data.variantLabel}）`
      : item.name;
    return {
      key,
      displayName,
      category: item.category,
      price: data.price,
      quantity: data.quantity,
      lineTotal: data.price * data.quantity,
    };
  });
}

function calculateTotals() {
  const total = getCartRows().reduce((sum, r) => sum + r.lineTotal, 0);
  return { total };
}

function updateCartBar() {
  const rows = getCartRows();
  const count = rows.reduce((sum, r) => sum + r.quantity, 0);
  const { total } = calculateTotals();
  cartBarEl.classList.toggle("visible", count > 0);
  cartCountNode.textContent = count;
  cartBarTotalNode.textContent = formatPrice(total);
}

function renderCart() {
  const rows = getCartRows();

  if (rows.length === 0) {
    cartListEl.innerHTML = `
      <div class="empty-cart">
        <strong>尚未選擇餐點</strong>
        <span>從菜單加入品項。</span>
      </div>
    `;
  } else {
    const groups = new Map();
    rows.forEach((r) => {
      if (!groups.has(r.category)) groups.set(r.category, []);
      groups.get(r.category).push(r);
    });

    cartListEl.innerHTML = [...groups.entries()]
      .map(([cat, catRows]) => `
        <div class="cart-category-group">
          <p class="cart-category-label">${cat}</p>
          <div class="cart-category-items">
            ${catRows.map((r) => `
              <div class="cart-item">
                <div class="cart-title">
                  <strong>${r.displayName}</strong>
                  <span>${formatPrice(r.price)} × ${r.quantity}</span>
                </div>
                <div class="qty-controls" aria-label="${r.displayName} 數量">
                  <button class="qty-button" data-dec="${r.key}" type="button">－</button>
                  <span class="qty">${r.quantity}</span>
                  <button class="qty-button" data-inc="${r.key}" type="button">＋</button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("");
  }

  const totals = calculateTotals();
  grandTotalNode.textContent = formatPrice(totals.total);
  updateCartBar();
}

function generateTimeSlots() {
  const now     = new Date();
  const minTime = new Date(now.getTime() + 15 * 60 * 1000);
  const y = now.getFullYear(), mo = now.getMonth(), d = now.getDate();
  let   t   = new Date(y, mo, d, 6, 0);
  const end = new Date(y, mo, d, 13, 30);
  const slots = [];
  while (t <= end) {
    if (t >= minTime) {
      const hh = String(t.getHours()).padStart(2, "0");
      const mm = String(t.getMinutes()).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
    t = new Date(t.getTime() + 15 * 60 * 1000);
  }
  return slots;
}

function populateTimeSlots() {
  const select = document.getElementById("scheduledTime");
  if (!select) return;
  const slots = generateTimeSlots();
  if (slots.length === 0) {
    select.innerHTML = '<option value="">今日已無可預約時段</option>';
  } else {
    select.innerHTML =
      '<option value="" disabled selected>請選擇取餐時間</option>' +
      slots.map((t) => `<option value="${t}">${t}</option>`).join("");
  }
}

function openDrawer() {
  populateTimeSlots();
  cartDrawerEl.classList.add("open");
  cartOverlayEl.classList.add("visible");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  cartDrawerEl.classList.remove("open");
  cartOverlayEl.classList.remove("visible");
  document.body.style.overflow = "";
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  window.setTimeout(() => toastEl.classList.remove("show"), 2400);
}

function setActiveButton(selector, attribute, value) {
  document.querySelectorAll(selector).forEach((btn) => {
    btn.classList.toggle("active", btn.dataset[attribute] === value);
  });
}

async function checkout() {
  const rows = getCartRows();
  if (rows.length === 0) {
    showToast("請先加入餐點");
    return;
  }

  let customer, phone = null;
  const scheduled = document.querySelector("#scheduledTime")?.value || "";

  if (state.service === "內用") {
    const table = document.querySelector("#tableNumber").value.trim();
    if (!table) { showToast("請填寫桌號"); return; }
    customer = table;
  } else {
    const name = document.querySelector("#customerName").value.trim();
    const ph   = document.querySelector("#customerPhone").value.trim();
    if (!name) { showToast("請填寫姓名"); return; }
    if (!ph)   { showToast("請填寫電話"); return; }
    if (!scheduled) { showToast("請選擇取餐時間"); return; }
    customer = name;
    phone    = ph;
  }

  const note = document.querySelector("#orderNote").value.trim() || "無";
  const totals = calculateTotals();
  const orderNumber = String(Date.now()).slice(-6);

  const btn = document.querySelector("#checkout");
  btn.disabled = true;
  btn.textContent = "送出中…";

  try {
    const orderData = {
      orderNumber,
      customer,
      note,
      service: state.service,
      payment: state.payment,
      items: rows.map((r) => ({
        name: r.displayName,
        category: r.category,
        price: r.price,
        quantity: r.quantity,
        lineTotal: r.lineTotal,
      })),
      total: totals.total,
      status: "pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (phone)     orderData.phone          = phone;
    if (scheduled) orderData.scheduledTime  = scheduled;

    await db.collection("orders").add(orderData);

    showToast(`訂單 #${orderNumber} 已送出，應收 ${formatPrice(totals.total)}`);
    state.cart.clear();
    document.querySelector("#tableNumber").value    = "";
    document.querySelector("#customerName").value  = "";
    document.querySelector("#customerPhone").value = "";
    document.querySelector("#orderNote").value     = "";
    const st = document.querySelector("#scheduledTime");
    if (st) st.value = "";
    renderCart();
    closeDrawer();
  } catch (err) {
    console.error(err);
    showToast("送出失敗，請重試");
  } finally {
    btn.disabled = false;
    btn.textContent = "送出訂單";
  }
}

// ── Event listeners ──

function handleMenuAdd(id) {
  const item = menuItems.find((m) => m.id === id) || DEFAULT_MENU.find((m) => m.id === id);
  if (!item) return;
  showVariantPicker(item);
}

categoryTabsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-category]");
  if (!btn) return;
  const cat = btn.dataset.category;
  const section = menuListEl.querySelector(`[data-section="${cat}"]`);
  if (!section) return;
  const headerH = document.querySelector(".sticky-header")?.offsetHeight || 100;
  const top = section.getBoundingClientRect().top + window.scrollY - headerH - 6;
  window.scrollTo({ top, behavior: "smooth" });
  setActiveTab(cat);
});

menuListEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  handleMenuAdd(btn.dataset.add);
});

variantOptionsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-label]");
  if (!btn || !pendingItem) return;

  if (pendingItem.steps) {
    const stepIdx = Number(btn.dataset.step);
    // 同組內取消其他選取
    btn.closest(".variant-group-options").querySelectorAll(".variant-btn").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    pendingSelections[stepIdx] = {
      label: btn.dataset.label,
      price: btn.dataset.price !== undefined ? Number(btn.dataset.price) : null,
    };
    variantConfirmEl.disabled = pendingSelections.some((s) => s === null);
  } else {
    addToCart(pendingItem.id, btn.dataset.label, Number(btn.dataset.price));
    hideVariantPicker();
  }
});

variantConfirmEl.addEventListener("click", () => {
  if (!pendingItem) return;
  if (pendingItem.steps) {
    if (pendingSelections.some((s) => s === null)) return;
    const combinedLabel = pendingSelections.map((s) => s.label).join("・");
    const finalPrice    = pendingSelections.find((s) => s.price !== null)?.price ?? pendingItem.price;
    addToCart(pendingItem.id, combinedLabel, finalPrice);
  } else {
    addToCart(pendingItem.id, null, pendingItem.price);
  }
  hideVariantPicker();
});

document.querySelector("#variantCancel").addEventListener("click", hideVariantPicker);
variantOverlayEl.addEventListener("click", hideVariantPicker);

cartListEl.addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  if (inc) incrementCartItem(inc.dataset.inc);
  if (dec) decrementCartItem(dec.dataset.dec);
});

function updateCustomerFields() {
  const isDineIn = state.service === "內用";
  document.getElementById("dineInFields").classList.toggle("hidden", !isDineIn);
  document.getElementById("takeoutFields").classList.toggle("hidden", isDineIn);
}



document.querySelectorAll(".drawer-service-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.service = btn.dataset.service;
    setActiveButton(".drawer-service-btn", "service", state.service);
    updateCustomerFields();
  });
});


document.querySelector("#cartToggle").addEventListener("click", openDrawer);
document.querySelector("#drawerClose").addEventListener("click", closeDrawer);
cartOverlayEl.addEventListener("click", closeDrawer);
document.querySelector("#checkout").addEventListener("click", checkout);

// ── Store config ──

function applyStoreConfig() {
  const c = STORE_CONFIG;
  document.title = `${c.storeName} 點餐`;
  const logo = document.getElementById("brandLogo");
  if (logo) { logo.src = c.logo; logo.alt = c.storeName; }
  const name = document.getElementById("brandName");
  if (name) name.textContent = c.storeName;
  const sub = document.getElementById("brandSubtitle");
  if (sub) sub.textContent = c.subtitle;
  const addr = document.getElementById("brandAddress");
  if (addr) addr.textContent = c.address;
  const info = document.getElementById("brandInfo");
  if (info) info.textContent = `${c.phone}　｜　${c.hours}　｜　${c.closedDay}`;
}

// ── Init ──
applyStoreConfig();
renderCategories();
renderMenu();
renderCart();
loadMenuFromFirestore();
