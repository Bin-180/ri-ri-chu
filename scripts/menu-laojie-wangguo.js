"use strict";

// 老街碗粿菜單
// storeId: laojie_wangguo
// 品項總數：40

const MENU_LAOJIE = [

  // ── 碗粿（1）──
  { id: "wangguo",          category: "碗粿",       name: "碗粿",         price: 30,  available: true, sortOrder: 10  },

  // ── 飯類（3）──
  { id: "dan-fan-s",        category: "飯類",       name: "蛋飯（小）",   price: 40,  available: true, sortOrder: 20  },
  { id: "dan-fan-l",        category: "飯類",       name: "蛋飯（大）",   price: 55,  available: true, sortOrder: 30  },
  { id: "lu-rou-fan",       category: "飯類",       name: "魯肉飯",       price: 25,  available: true, sortOrder: 40  },

  // ── 麵類（11）──
  { id: "huang-mian-t",     category: "麵類",       name: "黃麵（湯）",   price: 40,  available: true, sortOrder: 50  },
  { id: "huang-mian-d",     category: "麵類",       name: "黃麵（乾）",   price: 40,  available: true, sortOrder: 60  },
  { id: "yang-chun-t",      category: "麵類",       name: "陽春麵（湯）", price: 40,  available: true, sortOrder: 70  },
  { id: "yang-chun-d",      category: "麵類",       name: "陽春麵（乾）", price: 40,  available: true, sortOrder: 80  },
  { id: "o-a-mian-s",       category: "麵類",       name: "蚵仔麵（小）", price: 45,  available: true, sortOrder: 90  },
  { id: "o-a-mian-l",       category: "麵類",       name: "蚵仔麵（大）", price: 65,  available: true, sortOrder: 100 },
  { id: "ji-si-t",          category: "麵類",       name: "雞絲麵（湯）", price: 40,  available: true, sortOrder: 110 },
  { id: "ji-si-d",          category: "麵類",       name: "雞絲麵（乾）", price: 40,  available: true, sortOrder: 120 },
  { id: "gue-a-t",          category: "麵類",       name: "粿仔條（湯）", price: 40,  available: true, sortOrder: 130 },
  { id: "gue-a-d",          category: "麵類",       name: "粿仔條（乾）", price: 40,  available: true, sortOrder: 140 },
  { id: "wonton-mian",      category: "麵類",       name: "餛飩麵",       price: 60,  available: true, sortOrder: 150 },

  // ── 湯品／青菜（6）──
  { id: "o-a-tang",         category: "湯品／青菜", name: "蚵仔湯",       price: 50,  available: true, sortOrder: 160 },
  { id: "fen-chang-tang",   category: "湯品／青菜", name: "粉腸湯",       price: 40,  available: true, sortOrder: 170 },
  { id: "wonton-tang",      category: "湯品／青菜", name: "餛飩湯",       price: 35,  available: true, sortOrder: 180 },
  { id: "gong-wan-tang",    category: "湯品／青菜", name: "貢丸湯",       price: 20,  available: true, sortOrder: 190 },
  { id: "zi-cai-tang",      category: "湯品／青菜", name: "紫菜湯",       price: 20,  available: true, sortOrder: 200 },
  { id: "tang-qing-cai",    category: "湯品／青菜", name: "燙青菜",       price: 25,  available: true, sortOrder: 210 },

  // ── 關東煮（19）──
  { id: "tako-wan",         category: "關東煮",     name: "章魚丸",       price: 15,  available: true, sortOrder: 220 },
  { id: "bao-xian-gong",    category: "關東煮",     name: "包餡貢丸",     price: 15,  available: true, sortOrder: 230 },
  { id: "lan-hua-gan",      category: "關東煮",     name: "蘭花干",       price: 25,  available: true, sortOrder: 240 },
  { id: "cabbage-roll",     category: "關東煮",     name: "高麗菜捲",     price: 25,  available: true, sortOrder: 250 },
  { id: "wa-wa-cai",        category: "關東煮",     name: "娃娃菜",       price: 20,  available: true, sortOrder: 260 },
  { id: "corn-sun",         category: "關東煮",     name: "玉米筍",       price:  5,  available: true, sortOrder: 270 },
  { id: "mushroom-bao",     category: "關東煮",     name: "香菇堡",       price: 25,  available: true, sortOrder: 280 },
  { id: "wheat-strip",      category: "關東煮",     name: "小麥條",       price:  5,  available: true, sortOrder: 290 },
  { id: "hei-lun",          category: "關東煮",     name: "黑輪",         price: 10,  available: true, sortOrder: 300 },
  { id: "bitter-gourd-wan", category: "關東煮",     name: "苦瓜丸",       price: 40,  available: true, sortOrder: 310 },
  { id: "xiang-gu",         category: "關東煮",     name: "香菇",         price: 20,  available: true, sortOrder: 320 },
  { id: "xing-bao-gu",      category: "關東煮",     name: "杏鮑菇",       price: 10,  available: true, sortOrder: 330 },
  { id: "gong-wan",         category: "關東煮",     name: "貢丸",         price: 10,  available: true, sortOrder: 340 },
  { id: "dou-pi",           category: "關東煮",     name: "豆皮",         price: 15,  available: true, sortOrder: 350 },
  { id: "mi-xue",           category: "關東煮",     name: "米血",         price: 10,  available: true, sortOrder: 360 },
  { id: "peng-pi",          category: "關東煮",     name: "膨皮",         price: 10,  available: true, sortOrder: 370 },
  { id: "cai-tou",          category: "關東煮",     name: "菜頭",         price: 10,  available: true, sortOrder: 380 },
  { id: "dong-dou-fu",      category: "關東煮",     name: "凍豆腐",       price: 15,  available: true, sortOrder: 390 },
  { id: "you-dou-fu",       category: "關東煮",     name: "油豆腐（3個）",price: 10,  available: true, sortOrder: 400 },
];

module.exports = MENU_LAOJIE;
