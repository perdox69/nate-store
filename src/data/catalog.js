export const categories = [
  'สินค้าขายดี',
  'สินค้าใหม่',
  'Set จับคู่',
  'Set ตามงบ',
  'ถุงเท้า Ari',
  'เชือกรองเท้า',
  'กระเป๋า',
  'เสื้อ Ari',
  'กางเกง Ari',
  'สินค้าอื่นๆ'
];

export const brands = ['Ari', 'Nate Store', 'Ari Football', 'Lifestyle'];

export const priceRanges = ['All', 'Sale', 'Under 500', '500-1000', '1000+'];

export const popularSearches = ['รองเท้าแตะ', 'gymsack', 'เสื้อบอล', 'ถุงเท้า ari', 'กระเป๋า', 'set จับคู่'];

export const guides = [
  {
    title: 'สั่งซื้อผ่าน LINE ง่ายที่สุด',
    category: 'How to order',
    excerpt: 'กดปุ่มสั่งซื้อผ่าน LINE แล้วแจ้งชื่อสินค้า สี ไซซ์ และจำนวน ร้านจะสรุปยอดพร้อมค่าส่งให้ทันที'
  },
  {
    title: 'บริการสกรีนฟรีในหลายรายการ',
    category: 'Free screen',
    excerpt: 'สินค้าหลายชิ้นมีบริการสกรีนชื่อฟรีหรือเพิ่มชื่อ+เบอร์ในราคาพิเศษ เหมาะกับของขวัญและเสื้อทีม'
  },
  {
    title: 'ค่าส่งเหมา 50 บาท',
    category: 'Delivery',
    excerpt: 'สินค้าส่วนใหญ่ส่งเหมา 50 บาท และหลายรายการมีถุงฟรีหรือรวมส่งตามโปรโมชันของร้าน'
  }
];

export const products = [
  {
    id: 'ari-slides-best-seller',
    name: 'รองเท้าแตะ Ari รวมส่ง',
    category: 'สินค้าขายดี',
    brand: 'Ari',
    badge: 'ขายดี',
    price: 690,
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=80',
    colors: ['Black', 'White'],
    stockBySize: { '39': 6, '40': 8, '41': 7, '42': 6, '43': 4 },
    tags: ['รองเท้าแตะ', 'ari', 'รวมส่ง', 'ถุงฟรี'],
    perks: ['รวมส่ง', 'สกรีนฟรี', 'ถุงฟรี'],
    description: 'รองเท้าแตะ Ari รุ่นขายดี ราคาในภาพรวมส่ง เหมาะใส่ลำลองหลังซ้อมหรือใช้ประจำวัน'
  },
  {
    id: 'ari-gymsack-490',
    name: 'gymsack 490 บาท',
    category: 'สินค้าขายดี',
    brand: 'Ari',
    badge: 'ส่งเหมา 50',
    price: 490,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    colors: ['Black', 'Navy'],
    stockBySize: { OS: 18 },
    tags: ['gymsack', 'กระเป๋าเชือกรูด', 'กระเป๋า', 'ฟรีถุง'],
    perks: ['ส่งเหมา 50 บาท', 'ฟรีถุง'],
    description: 'กระเป๋าใส่รองเท้าเชือกรูด น้ำหนักเบา พกไปสนามหรือโรงเรียนได้สะดวก'
  },
  {
    id: 'ari-crossbody-bag',
    name: 'กระเป๋าสะพาย Ari',
    category: 'กระเป๋า',
    brand: 'Ari',
    badge: 'สกรีนฟรี',
    price: 690,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80',
    colors: ['Black', 'Cream'],
    stockBySize: { OS: 10 },
    tags: ['กระเป๋าสะพาย', 'ari', 'สกรีนฟรี', 'ถุงฟรี'],
    perks: ['สกรีนฟรี', 'ถุงฟรี', 'รวมส่งบางโปร'],
    description: 'กระเป๋าสะพาย Ari สำหรับใส่ของประจำวัน มีบริการสกรีนฟรีตามโปรโมชันร้าน'
  },
  {
    id: 'ari-backpack-large-small',
    name: 'กระเป๋าสะพายหลัง Ari',
    category: 'กระเป๋า',
    brand: 'Ari',
    badge: 'มี 2 ไซซ์',
    price: 590,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80',
    colors: ['Black'],
    stockBySize: { 'ใบเล็ก': 7, 'ใบใหญ่': 5 },
    tags: ['กระเป๋าสะพายหลัง', 'ใบใหญ่ 790', 'ใบเล็ก 590', 'ส่งเหมา 50'],
    perks: ['ใบใหญ่ 790', 'ใบเล็ก 590', 'ฟรีถุงใบใหญ่', 'สกรีนฟรี'],
    description: 'กระเป๋าสะพายหลัง Ari ใบเล็ก 590 บาท ใบใหญ่ 790 บาท ส่งเหมา 50 บาท'
  },
  {
    id: 'ari-football-shirt',
    name: 'เสื้อบอล Ari',
    category: 'เสื้อ Ari',
    brand: 'Ari Football',
    badge: 'เพิ่มสกรีนได้',
    price: 350,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80',
    colors: ['Red', 'Blue', 'Black'],
    stockBySize: { S: 10, M: 14, L: 10, XL: 7 },
    tags: ['เสื้อบอล', 'ari', 'ชื่อเบอร์', 'เสื้อเปล่า 350'],
    perks: ['เสื้อเปล่า 350', 'ชื่อ+เบอร์เพิ่ม 150'],
    description: 'เสื้อบอล Ari ราคาเสื้อเปล่า 350 บาท ต้องการสกรีนชื่อ+เบอร์เพิ่ม 150 บาท'
  },
  {
    id: 'ari-laces-normal-gradient',
    name: 'เชือก Ari แบบธรรมดา และ gradient',
    category: 'เชือกรองเท้า',
    brand: 'Ari',
    price: 190,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80',
    colors: ['White', 'Black', 'Gradient'],
    stockBySize: { OS: 30 },
    tags: ['เชือกรองเท้า', 'gradient', 'ส่งเหมา 50', 'ถุงกระดาษ'],
    perks: ['ส่งเหมา 50 บาท', 'ถุงกระดาษ'],
    description: 'เชือกรองเท้า Ari มีทั้งแบบธรรมดาและ gradient เหมาะกับรองเท้ากีฬาและรองเท้าลำลอง'
  },
  {
    id: 'ari-long-sleeve-free-screen',
    name: 'เสื้อแขนยาว Ari สกรีนชื่อฟรี',
    category: 'สินค้าใหม่',
    brand: 'Ari',
    badge: 'สินค้าใหม่',
    price: 890,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
    colors: ['Black', 'Grey'],
    stockBySize: { S: 6, M: 9, L: 8, XL: 4 },
    tags: ['เสื้อแขนยาว', 'สกรีนชื่อฟรี', 'ถุงผ้าฟรี'],
    perks: ['สกรีนชื่อฟรี', 'ถุงผ้าฟรี'],
    description: 'เสื้อแขนยาว Ari รายการใหม่ สกรีนชื่อฟรีและแถมถุงผ้าฟรีตามโปรร้าน'
  },
  {
    id: 'ari-cap-free-screen',
    name: 'หมวกแก๊ป Ari สกรีนฟรี',
    category: 'สินค้าใหม่',
    brand: 'Ari',
    price: 450,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80',
    colors: ['Black', 'White'],
    stockBySize: { OS: 12 },
    tags: ['หมวกแก๊ป', 'สกรีนฟรี', 'ส่งเหมา 50', 'ฟรีถุงผ้า'],
    perks: ['สกรีนฟรี', 'ส่งเหมา 50 บาท', 'ฟรีถุงผ้า'],
    description: 'หมวกแก๊ป Ari พร้อมบริการสกรีนฟรี ส่งเหมา 50 บาทและฟรีถุงผ้า'
  },
  {
    id: 'ari-windbreaker-1590',
    name: 'ผ้าร่ม Ari 1590',
    category: 'เสื้อ Ari',
    brand: 'Ari',
    price: 1590,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    colors: ['Black', 'Navy'],
    stockBySize: { M: 5, L: 5, XL: 3 },
    tags: ['ผ้าร่ม ari', '1590', 'ฟรีถุง', 'สกรีนฟรี'],
    perks: ['ราคา 1590', 'ส่งเหมา 50 บาท', 'ฟรีถุง', 'สกรีนฟรี'],
    description: 'เสื้อผ้าร่ม Ari ราคา 1590 บาท ส่งเหมา 50 บาท ฟรีถุงและสกรีนฟรี'
  },
  {
    id: 'set-shoes-shirt-1250',
    name: 'Set รองเท้า+เสื้อ',
    category: 'Set จับคู่',
    brand: 'Nate Store',
    badge: 'Set 1250',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80',
    colors: ['ตามภาพ'],
    stockBySize: { Set: 8 },
    tags: ['set จับคู่', 'รองเท้า+เสื้อ', '1250', 'รวมส่ง'],
    perks: ['รวมส่ง', 'สกรีนฟรี', 'ถุงฟรี'],
    description: 'Set รองเท้า+เสื้อ 1250 บาท ราคาในภาพ รวมส่ง สกรีนฟรี และถุงฟรี'
  },
  {
    id: 'set-two-shoes-1450',
    name: 'Set รองเท้า 2 คู่',
    category: 'Set จับคู่',
    brand: 'Nate Store',
    badge: 'Set 1450',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80',
    colors: ['ตามภาพ'],
    stockBySize: { Set: 5 },
    tags: ['รองเท้า 2 คู่', 'set จับคู่', '1450', 'รวมส่ง'],
    perks: ['รวมส่ง', 'สกรีนฟรี', 'ถุงฟรี'],
    description: 'Set รองเท้า 2 คู่ 1450 บาท รวมส่ง สกรีนฟรี และถุงฟรี'
  },
  {
    id: 'set-budget-590',
    name: 'Set ตามงบ 590 บาท',
    category: 'Set ตามงบ',
    brand: 'Nate Store',
    badge: 'ตามงบ',
    price: 590,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
    colors: ['ตามภาพ'],
    stockBySize: { Set: 10 },
    tags: ['set ตามงบ', '590', 'รวมส่ง'],
    perks: ['รวมส่ง'],
    description: 'Set ตามงบ 590 บาท เหมาะสำหรับของขวัญหรือเริ่มต้นจัดเซ็ต Ari ราคาเบา'
  },
  {
    id: 'ari-socks-short-long',
    name: 'ถุงเท้า Ari ข้อสั้น/ข้อยาว',
    category: 'ถุงเท้า Ari',
    brand: 'Ari',
    price: 250,
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=900&q=80',
    colors: ['White', 'Black'],
    stockBySize: { 'ข้อสั้น': 16, 'ข้อยาว': 12, 'เต็มแข้ง': 8 },
    tags: ['ถุงเท้า ari', 'ข้อสั้น', 'ข้อยาว', 'ส่งเหมา 50'],
    perks: ['ส่งเหมา 50 บาท', 'ฟรีถุง'],
    description: 'รวมถุงเท้า Ari ทั้งข้อสั้น ข้อยาว และเต็มแข้ง ส่งเหมา 50 บาท ฟรีถุง'
  },
  {
    id: 'ari-essential-shorts',
    name: 'กางเกงบอลขาสั้น Ari',
    category: 'กางเกง Ari',
    brand: 'Ari',
    price: 590,
    image: 'https://images.unsplash.com/photo-1506629905607-d9c297d4d98d?auto=format&fit=crop&w=900&q=80',
    colors: ['Black', 'Navy'],
    stockBySize: { S: 8, M: 10, L: 8, XL: 4 },
    tags: ['กางเกงบอล', 'กางเกงขาสั้น ari', 'ฟรีถุง'],
    perks: ['ส่งเหมา 50 บาท', 'ฟรีถุง'],
    description: 'กางเกงบอลขาสั้น Ari ใส่ซ้อม ใส่เล่นกีฬา หรือใส่ลำลองได้'
  },
  {
    id: 'ari-wristband-headband',
    name: 'ที่คาดผม / ผ้ารัดข้อมือ Ari',
    category: 'สินค้าอื่นๆ',
    brand: 'Ari',
    price: 150,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=80',
    colors: ['Black', 'White'],
    stockBySize: { OS: 20 },
    tags: ['ที่คาดผม', 'ซับเหงื่อ', 'ผ้ารัดข้อมือ', 'สินค้าอื่นๆ'],
    perks: ['ที่คาดผม 190', 'ผ้ารัดข้อมือ 150', 'ส่งเหมา 50 บาท'],
    description: 'อุปกรณ์เสริม Ari ทั้งที่คาดผมซับเหงื่อและผ้ารัดข้อมือ ส่งเหมา 50 บาท'
  },
  {
    id: 'ari-shin-guard-350',
    name: 'สนับแข้ง Ari 350',
    category: 'สินค้าอื่นๆ',
    brand: 'Ari',
    price: 350,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80',
    colors: ['Black', 'White'],
    stockBySize: { S: 8, M: 10, L: 8 },
    tags: ['สนับแข้ง', '350', 'ฟรีถุง'],
    perks: ['ราคา 350', 'ส่งเหมา 50 บาท', 'ฟรีถุง'],
    description: 'สนับแข้ง Ari ราคา 350 บาท เหมาะกับซ้อมบอลและแข่งขันทั่วไป'
  }
];
