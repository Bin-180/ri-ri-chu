const menuItems = [
  // ── 初麵包（含蛋）── variants: 吐司 / 漢堡
  { id: "v-egg",               category: "初麵包（含蛋）", name: "菜多多（蛋奶素）",    variants: [{label:"吐司",price:35},{label:"漢堡",price:40}], price:35, color:"#4c8b55" },
  { id: "pork-floss-egg",      category: "初麵包（含蛋）", name: "肉鬆蛋",             variants: [{label:"吐司",price:40},{label:"漢堡",price:45}], price:40, color:"#b87c4a" },
  { id: "corn-egg",            category: "初麵包（含蛋）", name: "玉米蛋",             variants: [{label:"吐司",price:35},{label:"漢堡",price:40}], price:35, color:"#c8a020" },
  { id: "ham-egg",             category: "初麵包（含蛋）", name: "火腿蛋",             variants: [{label:"吐司",price:35},{label:"漢堡",price:40}], price:35, color:"#c0392b" },
  { id: "tuna-egg",            category: "初麵包（含蛋）", name: "鮪魚蛋",             variants: [{label:"吐司",price:40},{label:"漢堡",price:45}], price:40, color:"#315d8d" },
  { id: "hotdog-egg",          category: "初麵包（含蛋）", name: "熱狗蛋",             variants: [{label:"吐司",price:40},{label:"漢堡",price:45}], price:40, color:"#a05030" },
  { id: "chicken-egg",         category: "初麵包（含蛋）", name: "香雞蛋",             variants: [{label:"吐司",price:45},{label:"漢堡",price:50}], price:45, color:"#c8861a" },
  { id: "bacon-egg",           category: "初麵包（含蛋）", name: "培根蛋",             variants: [{label:"吐司",price:40},{label:"漢堡",price:45}], price:40, color:"#8b3a2a" },
  { id: "tender-ham-egg",      category: "初麵包（含蛋）", name: "嫩火腿蛋",           variants: [{label:"吐司",price:45},{label:"漢堡",price:50}], price:45, color:"#c0392b" },
  { id: "smoked-chicken-egg",  category: "初麵包（含蛋）", name: "燻雞蛋",             variants: [{label:"吐司",price:45},{label:"漢堡",price:50}], price:45, color:"#7a4e2e" },
  { id: "hash-cheese-egg",     category: "初麵包（含蛋）", name: "薯餅起司蛋",         variants: [{label:"吐司",price:55},{label:"漢堡",price:60}], price:55, color:"#c8861a" },
  { id: "sausage-de",          category: "初麵包（含蛋）", name: "德式熱狗",           variants: [{label:"吐司",price:55},{label:"漢堡",price:60}], price:55, color:"#a05030" },
  { id: "beef-toast",          category: "初麵包（含蛋）", name: "牛肉",               variants: [{label:"吐司",price:55},{label:"漢堡",price:60}], price:55, color:"#5b4636" },
  { id: "pork-chop",           category: "初麵包（含蛋）", name: "手工豬排",           variants: [{label:"吐司",price:60},{label:"漢堡",price:65}], price:60, color:"#7a4e2e" },
  { id: "korean-chicken",      category: "初麵包（含蛋）", name: "韓式炸雞",           variants: [{label:"吐司",price:70},{label:"漢堡",price:75}], price:70, color:"#c0392b", tag:true },
  { id: "fried-pork",          category: "初麵包（含蛋）", name: "炸豬排",             variants: [{label:"吐司",price:70},{label:"漢堡",price:75}], price:70, color:"#8b3a2a" },
  { id: "fried-chicken",       category: "初麵包（含蛋）", name: "炸雞排",             variants: [{label:"吐司",price:70},{label:"漢堡",price:75}], price:70, color:"#a05030" },
  { id: "karaage",             category: "初麵包（含蛋）", name: "卡拉雞（原味/辣味）", variants: [{label:"吐司",price:75},{label:"漢堡",price:80}], price:75, color:"#c0392b" },
  { id: "thick-beef",          category: "初麵包（含蛋）", name: "厚切牛肉",           variants: [{label:"吐司",price:85},{label:"漢堡",price:90}], price:85, color:"#3d2814", tag:true },

  // ── 初餅 ── variants: 蛋餅 / 墨西哥餅
  { id: "db-plain",            category: "初餅", name: "原味",               variants: [{label:"蛋餅",price:30},{label:"墨西哥餅",price:50}], price:30, color:"#c8861a" },
  { id: "db-corn",             category: "初餅", name: "玉米",               variants: [{label:"蛋餅",price:35},{label:"墨西哥餅",price:55}], price:35, color:"#c8a020" },
  { id: "db-pork-floss",       category: "初餅", name: "肉鬆",               variants: [{label:"蛋餅",price:40},{label:"墨西哥餅",price:60}], price:40, color:"#b87c4a" },
  { id: "db-ham",              category: "初餅", name: "火腿",               variants: [{label:"蛋餅",price:35},{label:"墨西哥餅",price:55}], price:35, color:"#c0392b" },
  { id: "db-veggie",           category: "初餅", name: "蔬菜",               variants: [{label:"蛋餅",price:40},{label:"墨西哥餅",price:60}], price:40, color:"#4c8b55" },
  { id: "db-chicken",          category: "初餅", name: "香雞",               variants: [{label:"蛋餅",price:45},{label:"墨西哥餅",price:60}], price:45, color:"#c8861a" },
  { id: "db-bacon",            category: "初餅", name: "培根",               variants: [{label:"蛋餅",price:40},{label:"墨西哥餅",price:60}], price:40, color:"#8b3a2a" },
  { id: "db-hotdog",           category: "初餅", name: "熱狗",               variants: [{label:"蛋餅",price:40},{label:"墨西哥餅",price:60}], price:40, color:"#a05030" },
  { id: "db-tuna-cheese",      category: "初餅", name: "鮪魚起司",           variants: [{label:"蛋餅",price:45},{label:"墨西哥餅",price:65}], price:45, color:"#315d8d" },
  { id: "db-smoked-chicken",   category: "初餅", name: "燻雞",               variants: [{label:"蛋餅",price:45},{label:"墨西哥餅",price:65}], price:45, color:"#7a4e2e" },
  { id: "db-bacon-cheese",     category: "初餅", name: "培根起司",           variants: [{label:"蛋餅",price:45},{label:"墨西哥餅",price:65}], price:45, color:"#8b3a2a" },
  { id: "db-tender-ham",       category: "初餅", name: "嫩火腿",             variants: [{label:"蛋餅",price:45},{label:"墨西哥餅",price:65}], price:45, color:"#c0392b" },
  { id: "db-hash-cheese",      category: "初餅", name: "薯餅起司",           variants: [{label:"蛋餅",price:55},{label:"墨西哥餅",price:70}], price:55, color:"#c8861a" },
  { id: "db-beef",             category: "初餅", name: "牛肉",               variants: [{label:"蛋餅",price:55},{label:"墨西哥餅",price:70}], price:55, color:"#5b4636" },
  { id: "db-pork-chop",        category: "初餅", name: "手工豬排",           variants: [{label:"蛋餅",price:60},{label:"墨西哥餅",price:80}], price:60, color:"#7a4e2e" },
  { id: "db-sausage",          category: "初餅", name: "德式熱狗",           variants: [{label:"蛋餅",price:55},{label:"墨西哥餅",price:75}], price:55, color:"#a05030" },
  { id: "db-karaage",          category: "初餅", name: "卡拉雞（原味/辣味）", variants: [{label:"蛋餅",price:75},{label:"墨西哥餅",price:95}], price:75, color:"#c0392b" },
  { id: "db-korean-chicken",   category: "初餅", name: "韓式炸雞",           variants: [{label:"蛋餅",price:70},{label:"墨西哥餅",price:90}], price:70, color:"#c0392b", tag:true },
  { id: "db-fried-pork",       category: "初餅", name: "炸豬排",             variants: [{label:"蛋餅",price:70},{label:"墨西哥餅",price:90}], price:70, color:"#8b3a2a" },
  { id: "db-fried-chicken",    category: "初餅", name: "炸雞排",             variants: [{label:"蛋餅",price:70},{label:"墨西哥餅",price:90}], price:70, color:"#a05030" },
  { id: "db-thick-beef",       category: "初餅", name: "厚切牛肉",           variants: [{label:"蛋餅",price:85},{label:"墨西哥餅",price:100}], price:85, color:"#3d2814", tag:true },

  // ── 手工花生（含蛋）── variants: 吐司 / 漢堡
  { id: "pb-egg-salad",        category: "手工花生（含蛋）", name: "花生蛋沙拉",         variants: [{label:"吐司",price:55},{label:"漢堡",price:60}],  price:55,  color:"#c8861a" },
  { id: "pb-ham-cheese",       category: "手工花生（含蛋）", name: "花生火腿起司",       variants: [{label:"吐司",price:55},{label:"漢堡",price:60}],  price:55,  color:"#c0392b" },
  { id: "pb-bacon-cheese",     category: "手工花生（含蛋）", name: "花生培根起司",       variants: [{label:"吐司",price:60},{label:"漢堡",price:65}],  price:60,  color:"#8b3a2a" },
  { id: "pb-smoked-cheese",    category: "手工花生（含蛋）", name: "花生燻雞起司",       variants: [{label:"吐司",price:65},{label:"漢堡",price:70}],  price:65,  color:"#7a4e2e" },
  { id: "pb-pork-chop-cheese", category: "手工花生（含蛋）", name: "花生手工豬排起司",   variants: [{label:"吐司",price:80},{label:"漢堡",price:85}],  price:80,  color:"#5b4636", tag:true },
  { id: "pb-beef-bacon-cheese",category: "手工花生（含蛋）", name: "花生牛肉培根起司",   variants: [{label:"吐司",price:90},{label:"漢堡",price:95}],  price:90,  color:"#3d2814" },
  { id: "pb-thick-beef-cheese",category: "手工花生（含蛋）", name: "花生厚切牛肉起司",   variants: [{label:"吐司",price:110},{label:"漢堡",price:115}], price:110, color:"#2c1a0e" },
  { id: "pb-karaage-hash",     category: "手工花生（含蛋）", name: "花生卡拉雞薯餅起司", variants: [{label:"吐司",price:115},{label:"漢堡",price:120}], price:115, color:"#c0392b", tag:true },

  // ── 初點甜（吐司）── 無選項
  { id: "sw-condensed-milk", category: "初點甜", name: "煉乳",     price: 25, color: "#e8d080" },
  { id: "sw-strawberry",     category: "初點甜", name: "草莓",     price: 25, color: "#d44060" },
  { id: "sw-milk-crisp",     category: "初點甜", name: "奶酥",     price: 30, color: "#e8c060" },
  { id: "sw-blueberry",      category: "初點甜", name: "藍莓",     price: 30, color: "#6040a0" },
  { id: "sw-peanut",         category: "初點甜", name: "手工花生", price: 35, color: "#c8861a", tag: true },
  { id: "sw-mentaiko",       category: "初點甜", name: "明太子",   price: 30, color: "#e06040" },

  // ── 初點心 ── 無選項
  { id: "sn-hashbrown",       category: "初點心", name: "薯餅",             price: 25,  color: "#c8861a" },
  { id: "sn-corn-egg",        category: "初點心", name: "玉米蛋",           price: 25,  color: "#c8a020" },
  { id: "sn-sausage",         category: "初點心", name: "德式熱狗（一支）", price: 30,  color: "#a05030" },
  { id: "sn-hemp-stick",      category: "初點心", name: "香麻棒",           price: 40,  color: "#b87c4a" },
  { id: "sn-potato-chunks",   category: "初點心", name: "薯塊（4個）",      price: 40,  color: "#c8861a" },
  { id: "sn-onion-rings",     category: "初點心", name: "洋蔥圈",           price: 40,  color: "#e8c060" },
  { id: "sn-crispy-fries",    category: "初點心", name: "脆薯",             price: 42,  color: "#c8861a" },
  { id: "sn-chicken-nuggets", category: "初點心", name: "雞塊",             price: 40,  color: "#c8861a" },
  { id: "sn-chicken-balls",   category: "初點心", name: "雞球",             price: 40,  color: "#c8a020" },
  { id: "sn-mini-hotdog",     category: "初點心", name: "小熱狗",           price: 25,  color: "#a05030" },
  { id: "sn-hotdog-egg",      category: "初點心", name: "熱狗蛋",           price: 45,  color: "#a05030" },
  { id: "sn-waffle-fries",    category: "初點心", name: "薯格格",           price: 50,  color: "#c8861a" },
  { id: "sn-scallion-plain",  category: "初點心", name: "三星蔥餅（無蛋）", price: 45,  color: "#4c8b55" },
  { id: "sn-scallion-egg",    category: "初點心", name: "三星蔥餅（加蛋）", price: 55,  color: "#4c8b55" },
  { id: "sn-chicken-trio",    category: "初點心", name: "雞肉三兄弟",       description: "含雞球＋雞塊＋香麻棒",       price: 65,  color: "#c0392b", tag: true },
  { id: "sn-potato-trio",     category: "初點心", name: "馬鈴薯三兄弟",     description: "含薯塊＋薯格格＋脆薯",       price: 65,  color: "#c8861a", tag: true },
  { id: "sn-happy-platter",   category: "初點心", name: "歡樂大拼盤",       description: "含薯條＋雞塊＋雞球＋洋蔥圈", price: 100, color: "#c0392b", tag: true },

  // ── 初好茶 ── variants: 中 / 大
  { id: "tea-assam",      category: "初好茶", name: "阿薩姆紅茶",   description: "冰・溫",     variants: [{label:"中",price:15},{label:"大",price:20}], price:15, color:"#9d3f2d" },
  { id: "tea-green",      category: "初好茶", name: "綠茶（無糖）", description: "冰・溫",     variants: [{label:"中",price:20},{label:"大",price:25}], price:20, color:"#4c8b55" },
  { id: "tea-milk",       category: "初好茶", name: "奶茶",         description: "冰・溫",     variants: [{label:"中",price:25},{label:"大",price:30}], price:25, color:"#b87c4a" },
  { id: "tea-green-milk", category: "初好茶", name: "奶綠",         description: "冰・溫",     variants: [{label:"中",price:25},{label:"大",price:30}], price:25, color:"#6a9a4c" },
  { id: "tea-coffee",     category: "初好茶", name: "咖啡",         description: "冰・溫",     variants: [{label:"中",price:25},{label:"大",price:30}], price:25, color:"#5b4636" },
  { id: "tea-thick-milk", category: "初好茶", name: "厚奶茶",       description: "冰・溫",     variants: [{label:"中",price:30},{label:"大",price:35}], price:30, color:"#8b6040" },
  { id: "tea-yuanyang",   category: "初好茶", name: "鴛鴦",         description: "冰・溫",     variants: [{label:"中",price:30},{label:"大",price:35}], price:30, color:"#6b4030" },
  { id: "tea-fresh-green",category: "初好茶", name: "鮮奶綠",       description: "冰・溫",     variants: [{label:"中",price:35},{label:"大",price:40}], price:35, color:"#5a8a40" },
  { id: "tea-fresh-milk", category: "初好茶", name: "鮮奶茶",       description: "冰・溫",     variants: [{label:"中",price:30},{label:"大",price:40}], price:30, color:"#c8a070" },
  { id: "tea-cranberry",  category: "初好茶", name: "蔓越莓醋",     description: "冰・涼",     variants: [{label:"中",price:35},{label:"大",price:45}], price:35, color:"#c0304a" },
  { id: "tea-calpis",     category: "初好茶", name: "可爾必思",     description: "冰・溫",     variants: [{label:"中",price:35},{label:"大",price:40}], price:35, color:"#6080c0" },
  { id: "tea-yuzu",       category: "初好茶", name: "柚子茶",       description: "冰・涼・溫", variants: [{label:"中",price:40},{label:"大",price:50}], price:40, color:"#c8a020" },
];

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
const variantOptionsEl= document.querySelector("#variantOptions");
const variantItemNameEl= document.querySelector("#variantItemName");

let pendingItem = null;

function formatPrice(v) {
  return currency.format(v);
}

// ── 選規格彈窗 ──

function showVariantPicker(item) {
  pendingItem = item;
  variantItemNameEl.textContent = item.name;
  variantOptionsEl.innerHTML = item.variants
    .map(
      (v) => `
      <button class="variant-btn" data-label="${v.label}" data-price="${v.price}" type="button">
        <span class="variant-btn-label">${v.label}</span>
        <span class="variant-btn-price">${formatPrice(v.price)}</span>
      </button>
    `,
    )
    .join("");
  variantPickerEl.classList.add("open");
  variantOverlayEl.classList.add("visible");
}

function hideVariantPicker() {
  pendingItem = null;
  variantPickerEl.classList.remove("open");
  variantOverlayEl.classList.remove("visible");
}

// ── 菜單分類 ──

function getCategories() {
  return ["全部", ...new Set(menuItems.map((item) => item.category))];
}

function renderCategories() {
  categoryTabsEl.innerHTML = getCategories()
    .map(
      (cat) =>
        `<button class="category-tab ${cat === state.category ? "active" : ""}" data-category="${cat}" type="button">${cat}</button>`,
    )
    .join("");
}

function menuItemHTML(item) {
  const hasVariants = item.variants && item.variants.length > 0;
  const displayPrice = hasVariants
    ? formatPrice(item.variants[0].price) + " 起"
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
          <button class="add-button" data-add="${item.id}" type="button" aria-label="加入 ${item.name}">＋</button>
        </div>
      </div>
      ${item.description ? `<div class="item-desc">${item.description}</div>` : ""}
    </div>
  `;
}

function sectionHeadingHTML(cat, items) {
  const variants = items[0]?.variants;
  const hint = variants ? variants.map((v) => v.label).join("・") : null;
  return `
    <div class="section-header">
      <h3 class="section-heading">${cat}</h3>
      ${hint ? `<p class="section-variant-hint">可選：${hint}</p>` : ""}
    </div>
  `;
}

function renderMenu() {
  if (state.category === "全部") {
    const categories = [...new Set(menuItems.map((item) => item.category))];
    menuListEl.innerHTML = categories
      .map((cat) => {
        const items = menuItems.filter((item) => item.category === cat);
        return `
          <div class="category-section">
            ${sectionHeadingHTML(cat, items)}
            ${items.map(menuItemHTML).join("")}
          </div>
        `;
      })
      .join("");
  } else {
    const items = menuItems.filter((item) => item.category === state.category);
    menuListEl.innerHTML = `
      <div class="category-section">
        ${sectionHeadingHTML(state.category, items)}
        ${items.map(menuItemHTML).join("")}
      </div>
    `;
  }
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
    cartListEl.innerHTML = rows
      .map(
        (r) => `
          <div class="cart-item">
            <div class="cart-title">
              <strong>${r.displayName}</strong>
              <span>${formatPrice(r.price)} × ${r.quantity}　小計 ${formatPrice(r.lineTotal)}</span>
            </div>
            <div class="qty-controls" aria-label="${r.displayName} 數量">
              <button class="qty-button" data-dec="${r.key}" type="button">－</button>
              <span class="qty">${r.quantity}</span>
              <button class="qty-button" data-inc="${r.key}" type="button">＋</button>
            </div>
          </div>
        `,
      )
      .join("");
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
    select.innerHTML = slots.map((t) => `<option value="${t}">${t}</option>`).join("");
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

  const note      = document.querySelector("#orderNote").value.trim() || "無";
  const scheduled = document.querySelector("#scheduledTime")?.value || "";
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

categoryTabsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-category]");
  if (!btn) return;
  state.category = btn.dataset.category;
  renderCategories();
  renderMenu();
});

menuListEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const item = menuItems.find((m) => m.id === btn.dataset.add);
  if (item.variants && item.variants.length > 0) {
    showVariantPicker(item);
  } else {
    addToCart(item.id, null, item.price);
  }
});

variantOptionsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-label]");
  if (!btn || !pendingItem) return;
  addToCart(pendingItem.id, btn.dataset.label, Number(btn.dataset.price));
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

// ── Init ──
renderCategories();
renderMenu();
renderCart();
