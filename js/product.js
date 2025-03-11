const products = [
  // Cakes
  {
    name: "Brownies",
    price: "99.000",
    description:
      "Our brownies are rich, fudgy, and irresistibly chocolatey, made with premium ingredients for the perfect balance of sweetness and indulgence.",
    image: "image/product/thumb/brownies.jpg",
    fullImage: "image/product/brownies.jpg",
    link: "detail.html?product=brownies",
    category: "Cakes",
  },
  {
    name: "Cheese Cake",
    price: "99.000",
    description:
      "A rich and creamy cheesecake with a smooth texture and a buttery crust, offering the perfect balance of sweetness and tanginess.",
    image: "image/product/thumb/cheese-cake.jpg",
    fullImage: "image/product/cheese-cake.jpg",
    link: "detail.html?product=cheese-cake",
    category: "Cakes",
  },
  {
    name: "Cheese Chiffon",
    price: "99.000",
    description:
      "A light and fluffy chiffon cake infused with cheese, delivering a delicate and savory-sweet flavor.",
    image: "image/product/thumb/cheese-chiffon.jpg",
    fullImage: "image/product/cheese-chiffon.jpg",
    link: "detail.html?product=cheese-chiffon",
    category: "Cakes",
  },
  {
    name: "Chocolate Mousse",
    price: "99.000",
    description:
      "A silky, airy chocolate mousse with a deep, velvety chocolate taste, perfect for any chocolate lover.",
    image: "image/product/thumb/chocolate-mousse.jpg",
    fullImage: "image/product/chocolate-mousse.jpg",
    link: "detail.html?product=chocolate-mousse",
    category: "Cakes",
  },
  {
    name: "Chocolate Roll",
    price: "99.000",
    description:
      "A soft and moist chocolate sponge roll filled with luscious chocolate cream for a delightful treat.",
    image: "image/product/thumb/chocolate-roll.jpg",
    fullImage: "image/product/chocolate-roll.jpg",
    link: "detail.html?product=chocolate-roll",
    category: "Cakes",
  },
  {
    name: "Pandan Chiffon",
    price: "99.000",
    description:
      "A fragrant, fluffy pandan chiffon cake with a hint of coconut, bringing a touch of tropical sweetness.",
    image: "image/product/thumb/pandan-chiffon.jpg",
    fullImage: "image/product/pandan-chiffon.jpg",
    link: "detail.html?product=pandan-chiffon",
    category: "Cakes",
  },
  {
    name: "Vanilla Chiffon",
    price: "99.000",
    description:
      "A light and airy vanilla chiffon cake with a delicate sweetness and a soft, cloud-like texture.",
    image: "image/product/thumb/vanilla-chiffon.jpg",
    fullImage: "image/product/vanilla-chiffon.jpg",
    link: "detail.html?product=vanilla-chiffon",
    category: "Cakes",
  },

  // Cookies
  {
    name: "Fudge",
    price: "99.000",
    description:
      "A rich and decadent chocolate fudge with a smooth, melt-in-your-mouth texture, perfect for indulgence.",
    image: "image/product/thumb/fudge.jpg",
    fullImage: "image/product/fudge.jpg",
    link: "detail.html?product=fudge",
    category: "Cookies",
  },

  // Breads
  {
    name: "Milk Bread",
    price: "99.000",
    description:
      "A soft, fluffy milk bread with a hint of sweetness, ideal for breakfast or a light snack.",
    image: "image/product/thumb/milk-bread.jpg",
    fullImage: "image/product/milk-bread.jpg",
    link: "detail.html?product=milk-bread",
    category: "Breads",
  },

  // Pastries
  {
    name: "Blueberry Muffin",
    price: "99.000",
    description:
      "A moist and fluffy muffin bursting with juicy blueberries, offering a perfect balance of sweetness and tartness.",
    image: "image/product/thumb/blueberry-muffin.jpg",
    fullImage: "image/product/blueberry-muffin.jpg",
    link: "detail.html?product=blueberry-muffin",
    category: "Pastries",
  },
  {
    name: "Chocolate Muffin",
    price: "99.000",
    description:
      "A rich, moist chocolate muffin loaded with chocolate chips for an extra indulgent experience.",
    image: "image/product/thumb/chocolate-muffin.jpg",
    fullImage: "image/product/chocolate-muffin.jpg",
    link: "detail.html?product=chocolate-muffin",
    category: "Pastries",
  },
  {
    name: "Donut",
    price: "99.000",
    description:
      "A soft and fluffy donut, fried to perfection and coated with sugar or glaze for a sweet delight.",
    image: "image/product/thumb/donut.jpg",
    fullImage: "image/product/donut.jpg",
    link: "detail.html?product=donut",
    category: "Pastries",
  },
  {
    name: "Honey Pancake",
    price: "99.000",
    description:
      "A stack of soft and fluffy pancakes infused with honey, offering a naturally sweet and comforting taste.",
    image: "image/product/thumb/honey-pancake.jpg",
    fullImage: "image/product/honey-pancake.jpg",
    link: "detail.html?product=honey-pancake",
    category: "Pastries",
  },
  {
    name: "Muffin",
    price: "99.000",
    description:
      "A classic, moist muffin with a soft crumb, perfect for a quick and delicious treat.",
    image: "image/product/thumb/muffin.jpg",
    fullImage: "image/product/muffin.jpg",
    link: "detail.html?product=muffin",
    category: "Pastries",
  },

  // Seasonal Specials
  {
    name: "Gingerbread",
    price: "99.000",
    description:
      "A warmly spiced gingerbread with hints of cinnamon and nutmeg, bringing a cozy and festive flavor.",
    image: "image/product/thumb/gingerbread.jpg",
    fullImage: "image/product/gingerbread.jpg",
    link: "detail.html?product=gingerbread",
    category: "Seasonal Specials",
  },
  {
    name: "Blueberry Roll",
    price: "99.000",
    description:
      "A tender and sweet pastry roll filled with juicy blueberry jam, perfect for a fruity delight.",
    image: "image/product/thumb/blueberry-roll.jpg",
    fullImage: "image/product/blueberry-roll.jpg",
    link: "detail.html?product=blueberry-roll",
    category: "Seasonal Specials",
  },
  {
    name: "Orange Roll",
    price: "99.000",
    description:
      "A soft, citrusy roll infused with zesty orange flavor and a sweet glaze for a refreshing treat.",
    image: "image/product/thumb/orange-roll.jpg",
    fullImage: "image/product/orange-roll.jpg",
    link: "detail.html?product=orange-roll",
    category: "Seasonal Specials",
  },
  {
    name: "Strawberry Roll",
    price: "99.000",
    description:
      "A light and fluffy roll filled with fresh strawberry jam and cream, offering a burst of fruity goodness.",
    image: "image/product/thumb/strawberry-roll.jpg",
    fullImage: "image/product/strawberry-roll.jpg",
    link: "detail.html?product=strawberry-roll",
    category: "Seasonal Specials",
  },
];

export default products;
