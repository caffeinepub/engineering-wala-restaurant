export interface MenuItemData {
  name: string;
  description: string;
  category: string;
  price: number;
  image?: string;
  rating: number;
  isVeg: boolean;
}

export const MENU_ITEMS: MenuItemData[] = [
  // Starters
  {
    name: "Samosa",
    description:
      "Crispy fried pastry filled with spiced potatoes and peas, served with chutneys | 2 pieces per serving",
    category: "Starters",
    price: 25,
    image: "/assets/generated/samosa.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Paneer Tikka",
    description:
      "Marinated cottage cheese cubes grilled to perfection in tandoor oven | 6 pieces per plate",
    category: "Starters",
    price: 130,
    image: "/assets/generated/paneer-tikka.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Veg Cutlet",
    description:
      "Golden-fried mixed vegetable patties with herbs and spices | 2 pieces per plate",
    category: "Starters",
    price: 50,
    image: "/assets/generated/veg-cutlet.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
  },
  {
    name: "Chicken Tikka",
    description:
      "Tender chicken pieces marinated in yogurt and spices, grilled in tandoor | 6 pieces per plate",
    category: "Starters",
    price: 160,
    image: "/assets/generated/chicken-tikka.dim_400x300.jpg",
    rating: 4.8,
    isVeg: false,
  },
  {
    name: "Dahi Puri",
    description:
      "Crispy puris filled with potato, chickpeas, sweet yogurt and chutneys | 6 puris per plate",
    category: "Starters",
    price: 60,
    image: "/assets/generated/dahi-puri.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Steamed Momos",
    category: "Starters",
    price: 70,
    image: "/assets/generated/momos-steamed.dim_400x300.jpg",
    rating: 4.8,
    isVeg: true,
    description:
      "Soft steamed dumplings filled with spiced vegetables, served with fiery red chilli sauce | 8 pieces per plate",
  },
  {
    name: "Fried Momos",
    category: "Starters",
    price: 80,
    image: "/assets/generated/momos-fried.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
    description:
      "Crispy golden-fried dumplings with crunchy exterior, served with tangy chilli dip | 8 pieces per plate",
  },
  {
    name: "Veg Spring Roll",
    category: "Starters",
    price: 80,
    image: "/assets/generated/spring-roll.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
    description:
      "Crispy fried rolls filled with seasoned vegetables and noodles, served with sweet chilli sauce | 4 pieces per plate",
  },
  {
    name: "Veg Manchurian",
    category: "Starters",
    price: 90,
    image: "/assets/generated/manchurian.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
    description:
      "Spicy vegetable balls in tangy Indo-Chinese Manchurian sauce with spring onions | 8 pieces per plate",
  },
  {
    name: "Tandoori Chicken",
    description:
      "Half chicken marinated in yogurt and spices, roasted in clay oven | Half chicken | 5-6 pieces",
    category: "Starters",
    price: 220,
    image: "/assets/generated/tandoori-chicken.dim_400x300.jpg",
    rating: 4.9,
    isVeg: false,
  },
  {
    name: "Paneer Chilli",
    description:
      "Crispy fried paneer cubes tossed in spicy Indo-Chinese chilli sauce | 8 pieces",
    category: "Starters",
    price: 130,
    image: "/assets/generated/paneer-chilli.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },

  // Main Course
  {
    name: "Butter Chicken",
    description:
      "Tender chicken in rich, creamy tomato-based sauce with aromatic spices | Serves 1-2 | with gravy",
    category: "Main Course",
    price: 190,
    image: "/assets/generated/butter-chicken.dim_400x300.jpg",
    rating: 4.9,
    isVeg: false,
  },
  {
    name: "Dal Makhani",
    description:
      "Slow-cooked black lentils in creamy buttery tomato gravy | 1 bowl | Serves 1",
    category: "Main Course",
    price: 120,
    image: "/assets/generated/dal-makhani.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },
  {
    name: "Paneer Butter Masala",
    description:
      "Soft cottage cheese cubes in rich, velvety tomato-cashew gravy | 1 bowl | Serves 1",
    category: "Main Course",
    price: 150,
    image: "/assets/generated/paneer-butter-masala.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Chicken Curry",
    description:
      "Traditional home-style chicken curry with freshly ground masala | 1 bowl | 4-5 pieces",
    category: "Main Course",
    price: 180,
    image: "/assets/generated/chicken-curry.dim_400x300.jpg",
    rating: 4.5,
    isVeg: false,
  },
  {
    name: "Rajma",
    description:
      "Red kidney beans cooked in thick, flavorful North Indian gravy | 1 bowl | Serves 1",
    category: "Main Course",
    price: 100,
    image: "/assets/generated/rajma.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Kadai Paneer",
    description:
      "Paneer and bell peppers cooked in spicy kadai masala | 1 bowl | Serves 1",
    category: "Main Course",
    price: 140,
    image: "/assets/generated/kadai-paneer.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },
  {
    name: "Mutton Curry",
    category: "Main Course",
    price: 250,
    image: "/assets/generated/mutton-curry.dim_400x300.jpg",
    rating: 4.8,
    isVeg: false,
    description:
      "Slow-cooked tender mutton in rich aromatic masala gravy | 1 bowl | 4-5 pieces",
  },
  {
    name: "Egg Curry",
    category: "Main Course",
    price: 120,
    image: "/assets/generated/egg-curry.dim_400x300.jpg",
    rating: 4.5,
    isVeg: false,
    description:
      "Boiled eggs in spiced tomato-onion gravy with aromatic spices | 1 bowl | 2 eggs",
  },
  {
    name: "Mix Veg",
    category: "Main Course",
    price: 110,
    image: "/assets/generated/mix-veg.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
    description:
      "Seasonal mixed vegetables cooked in flavorful North Indian masala gravy | 1 bowl | Serves 1",
  },
  {
    name: "Palak Paneer",
    category: "Main Course",
    price: 150,
    image: "/assets/generated/palak-paneer.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
    description:
      "Fresh cottage cheese cubes in creamy smooth spinach gravy with subtle spices | 1 bowl | Serves 1",
  },
  {
    name: "Dal Tadka",
    description:
      "Smoky yellow lentils tempered with ghee, cumin, and garlic | 1 bowl | Serves 1",
    category: "Main Course",
    price: 90,
    image: "/assets/generated/dal-tadka.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },
  {
    name: "Aloo Gobi",
    description:
      "Dry sabzi of potatoes and cauliflower cooked with turmeric and spices | 1 bowl | Serves 1",
    category: "Main Course",
    price: 90,
    image: "/assets/generated/aloo-gobi.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Shahi Paneer",
    description:
      "Paneer in luxurious saffron-infused cashew cream gravy | 1 bowl | Serves 1",
    category: "Main Course",
    price: 160,
    image: "/assets/generated/shahi-paneer.dim_400x300.jpg",
    rating: 4.8,
    isVeg: true,
  },
  {
    name: "Chana Masala",
    description:
      "Spiced chickpeas in tangy tomato-onion masala gravy | 1 bowl | Serves 1",
    category: "Main Course",
    price: 100,
    image: "/assets/generated/chana-masala.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Kadhi Pakora",
    description:
      "Crispy fried pakoras in creamy spiced yogurt kadhi gravy | 1 bowl | Serves 1",
    category: "Main Course",
    price: 100,
    image: "/assets/generated/kadhi-pakora.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Egg Bhurji",
    description:
      "Scrambled eggs cooked with onions, tomatoes, and spices | 1 serving",
    category: "Main Course",
    price: 80,
    image: "/assets/generated/egg-bhurji.dim_400x300.jpg",
    rating: 4.4,
    isVeg: false,
  },

  // Rice & Biryani
  {
    name: "Chicken Biryani",
    description:
      "Fragrant basmati rice layered with spiced chicken, saffron and fried onions | Full plate | Serves 1-2",
    category: "Rice & Biryani",
    price: 180,
    image: "/assets/generated/biryani.dim_400x300.jpg",
    rating: 4.9,
    isVeg: false,
  },
  {
    name: "Veg Biryani",
    description:
      "Aromatic basmati rice with mixed vegetables, whole spices and herbs | Full plate | Serves 1",
    category: "Rice & Biryani",
    price: 120,
    image: "/assets/generated/veg-biryani.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Egg Fried Rice",
    description:
      "Stir-fried basmati rice with eggs, vegetables and soy sauce | Full plate | Serves 1",
    category: "Rice & Biryani",
    price: 90,
    image: "/assets/generated/egg-fried-rice.dim_400x300.jpg",
    rating: 4.2,
    isVeg: false,
  },
  {
    name: "Jeera Rice",
    description:
      "Fragrant basmati rice tempered with cumin seeds and ghee | 1 bowl | Serves 1",
    category: "Rice & Biryani",
    price: 60,
    image: "/assets/generated/jeera-rice.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
  },
  {
    name: "Mutton Biryani",
    category: "Rice & Biryani",
    price: 240,
    image: "/assets/generated/mutton-biryani.dim_400x300.jpg",
    rating: 4.9,
    isVeg: false,
    description:
      "Royal dum biryani with succulent mutton, saffron basmati rice and fried onions | Full plate | Serves 1-2",
  },
  {
    name: "Veg Pulao",
    category: "Rice & Biryani",
    price: 90,
    image: "/assets/generated/pulao.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
    description:
      "Fragrant basmati rice cooked with mixed vegetables and whole spices | 1 bowl | Serves 1",
  },
  {
    name: "Chicken Fried Rice",
    description:
      "Wok-tossed basmati with chicken, eggs and soy sauce | Full plate | Serves 1",
    category: "Rice & Biryani",
    price: 130,
    image: "/assets/generated/chicken-fried-rice.dim_400x300.jpg",
    rating: 4.6,
    isVeg: false,
  },

  // Breads
  {
    name: "Garlic Naan",
    description:
      "Soft tandoor-baked flatbread topped with garlic, butter and coriander | 1 piece",
    category: "Breads",
    price: 35,
    image: "/assets/generated/naan.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Tandoori Roti",
    description: "Whole wheat bread baked fresh in clay tandoor oven | 1 piece",
    category: "Breads",
    price: 15,
    image: "/assets/generated/tandoori-roti.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Paratha",
    description:
      "Flaky layered whole wheat flatbread, pan-fried with ghee | 1 piece",
    category: "Breads",
    price: 30,
    image: "/assets/generated/paratha.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Puri",
    description:
      "Deep-fried fluffy whole wheat bread, served hot | 4 pieces per plate",
    category: "Breads",
    price: 25,
    image: "/assets/generated/puri.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
  },
  {
    name: "Aloo Paratha",
    description:
      "Flaky wheat flatbread stuffed with spiced mashed potato | 2 pieces with dahi",
    category: "Breads",
    price: 50,
    image: "/assets/generated/aloo-paratha.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },

  // Snacks
  {
    name: "Chole Bhature",
    description:
      "Fluffy fried bread with spiced chickpea curry, a Punjabi classic | 2 bhaturas + 1 bowl chole",
    category: "Snacks",
    price: 80,
    image: "/assets/generated/chole-bhature.dim_400x300.jpg",
    rating: 4.8,
    isVeg: true,
  },
  {
    name: "Veg Burger",
    description:
      "Crispy veggie patty with fresh veggies, cheese and special sauce in a bun | 1 burger",
    category: "Snacks",
    price: 70,
    image: "/assets/generated/veg-burger.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
  },
  {
    name: "Aloo Tikki",
    description:
      "Crispy spiced potato patties served with tangy chutneys | 2 pieces per plate",
    category: "Snacks",
    price: 40,
    image: "/assets/generated/aloo-tikki.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Pav Bhaji",
    description:
      "Spiced mashed vegetable curry served with buttered bread rolls | 2 pavs + 1 bowl bhaji",
    category: "Snacks",
    price: 70,
    image: "/assets/generated/pav-bhaji.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },
  {
    name: "Veg Chowmein",
    category: "Snacks",
    price: 70,
    image: "/assets/generated/chowmein.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
    description:
      "Stir-fried noodles with fresh vegetables and soy sauce, Indo-Chinese style | 1 full plate",
  },
  {
    name: "Maggi Special",
    category: "Snacks",
    price: 50,
    image: "/assets/generated/maggi.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
    description:
      "Classic Maggi noodles cooked with vegetables and special masala | 1 bowl",
  },
  {
    name: "Veg Pizza",
    category: "Snacks",
    price: 110,
    image: "/assets/generated/pizza-veg.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
    description:
      "Loaded vegetable pizza with mozzarella cheese, colorful toppings and herbed base | 6-inch personal pizza",
  },
  {
    name: "Grilled Sandwich",
    category: "Snacks",
    price: 60,
    image: "/assets/generated/grilled-sandwich.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
    description:
      "Toasted sandwich with fresh vegetables, cheese and green chutney | 1 sandwich (2 slices)",
  },
  {
    name: "Masala Dosa",
    category: "Snacks",
    price: 80,
    image: "/assets/generated/masala-dosa.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
    description:
      "Crispy golden crepe filled with spiced potato masala, served with sambar and coconut chutney | 1 full dosa",
  },
  {
    name: "Idli Sambhar",
    category: "Snacks",
    price: 60,
    image: "/assets/generated/idli-sambhar.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
    description:
      "Soft steamed rice cakes served with piping hot sambar and coconut chutney | 4 idlis + 1 bowl sambar",
  },
  {
    name: "Bhel Puri",
    description:
      "Crunchy puffed rice with peanuts, tamarind chutney and coriander | 1 bowl",
    category: "Snacks",
    price: 40,
    image: "/assets/generated/bhel-puri.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
  },
  {
    name: "Sev Puri",
    description:
      "Crispy puris topped with potato, sev, chutneys | 8 pieces per plate",
    category: "Snacks",
    price: 50,
    image: "/assets/generated/sev-puri.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Veg Noodles",
    description:
      "Hakka noodles stir-fried with colorful vegetables and soy sauce | 1 full plate",
    category: "Snacks",
    price: 70,
    image: "/assets/generated/veg-noodles.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Paneer Sandwich",
    description:
      "Grilled sandwich with paneer filling, fresh veggies and green chutney | 1 sandwich",
    category: "Snacks",
    price: 70,
    image: "/assets/generated/paneer-sandwich.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
  },

  // Beverages
  {
    name: "Mango Lassi",
    description:
      "Thick creamy yogurt drink blended with fresh Alphonso mangoes | 300 ml glass",
    category: "Beverages",
    price: 60,
    image: "/assets/generated/mango-lassi.dim_400x300.jpg",
    rating: 4.8,
    isVeg: true,
  },
  {
    name: "Masala Chai",
    description:
      "Aromatic spiced Indian tea with ginger, cardamom, cinnamon and cloves | 1 cup (150 ml)",
    category: "Beverages",
    price: 20,
    image: "/assets/generated/masala-chai.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Cold Coffee",
    description:
      "Chilled blended coffee with milk and ice cream, topped with chocolate | 300 ml glass",
    category: "Beverages",
    price: 60,
    image: "/assets/generated/cold-coffee.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Fresh Lime Soda",
    description:
      "Refreshing sparkling lime drink with mint and a hint of salt or sugar | 300 ml glass",
    category: "Beverages",
    price: 30,
    image: "/assets/generated/fresh-lime-soda.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Sweet Lassi",
    category: "Beverages",
    price: 50,
    image: "/assets/generated/sweet-lassi.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
    description:
      "Thick chilled yogurt drink sweetened with sugar and flavored with rose water | 300 ml glass",
  },
  {
    name: "Nimbu Pani",
    category: "Beverages",
    price: 20,
    image: "/assets/generated/nimbu-pani.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
    description:
      "Refreshing chilled lemonade with mint and black salt | 300 ml glass",
  },

  // Desserts
  {
    name: "Gulab Jamun",
    description:
      "Soft milk-solid dumplings soaked in rose-flavored sugar syrup | 2 pieces per plate",
    category: "Desserts",
    price: 50,
    image: "/assets/generated/gulab-jamun.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Kheer",
    description:
      "Creamy rice pudding with saffron, cardamom and garnished with pistachios | 1 bowl (200 ml)",
    category: "Desserts",
    price: 50,
    image: "/assets/generated/kheer.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Ice Cream",
    description:
      "Two scoops of premium Indian flavors: Kesar Pista or Mango | 2 scoops",
    category: "Desserts",
    price: 60,
    image: "/assets/generated/ice-cream.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },
  {
    name: "Jalebi",
    description:
      "Crispy spiral-shaped sweets soaked in saffron sugar syrup, served warm | 200g per plate",
    category: "Desserts",
    price: 40,
    image: "/assets/generated/jalebi.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 80,
    image: "/assets/generated/chocolate-brownie.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
    description:
      "Warm rich chocolate brownie served with vanilla ice cream and chocolate sauce | 1 piece + 1 scoop",
  },
  {
    name: "Rasgulla",
    category: "Desserts",
    price: 60,
    image: "/assets/generated/rasgulla.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
    description:
      "Soft spongy cottage cheese balls soaked in light sugar syrup | 4 pieces per plate",
  },

  // Thalis
  {
    name: "Veg Thali",
    description:
      "Complete balanced meal with 2 sabzis, dal, rice, 2 rotis, papad, pickle, sweet | Serves 1",
    category: "Thalis",
    price: 99,
    image: "/assets/generated/veg-thali.dim_400x300.jpg",
    rating: 4.8,
    isVeg: true,
  },
  {
    name: "Chicken Thali",
    description:
      "Full non-veg meal with chicken curry, rice, 2 rotis, dal, salad | Serves 1",
    category: "Thalis",
    price: 149,
    image: "/assets/generated/chicken-thali.dim_400x300.jpg",
    rating: 4.9,
    isVeg: false,
  },

  // Wraps
  {
    name: "Chicken Kathi Roll",
    description:
      "Spicy grilled chicken, onions, and chutneys rolled in crispy paratha | 1 roll",
    category: "Wraps",
    price: 90,
    image: "/assets/generated/chicken-wrap.dim_400x300.jpg",
    rating: 4.7,
    isVeg: false,
  },
  {
    name: "Paneer Tikka Roll",
    description:
      "Marinated grilled paneer with peppers and mint chutney in flaky paratha | 1 roll",
    category: "Wraps",
    price: 80,
    image: "/assets/generated/paneer-wrap.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },

  // Shakes
  {
    name: "Oreo Milkshake",
    description:
      "Thick creamy shake blended with Oreo cookies, vanilla ice cream | 350ml glass",
    category: "Shakes",
    price: 80,
    image: "/assets/generated/oreo-shake.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Strawberry Shake",
    description:
      "Fresh strawberry milkshake with ice cream and whipped cream | 350ml glass",
    category: "Shakes",
    price: 70,
    image: "/assets/generated/strawberry-shake.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },
];

export const CATEGORIES = [
  "All",
  "Starters",
  "Main Course",
  "Rice & Biryani",
  "Breads",
  "Snacks",
  "Beverages",
  "Desserts",
  "Thalis",
  "Wraps",
  "Shakes",
];
