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
    price: 49,
    image: "/assets/generated/samosa.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Paneer Tikka",
    description:
      "Marinated cottage cheese cubes grilled to perfection in tandoor oven | 6 pieces per plate",
    category: "Starters",
    price: 199,
    image: "/assets/generated/paneer-tikka.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Veg Cutlet",
    description:
      "Golden-fried mixed vegetable patties with herbs and spices | 2 pieces per plate",
    category: "Starters",
    price: 79,
    image: "/assets/generated/veg-cutlet.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
  },
  {
    name: "Chicken Tikka",
    description:
      "Tender chicken pieces marinated in yogurt and spices, grilled in tandoor | 6 pieces per plate",
    category: "Starters",
    price: 229,
    image: "/assets/generated/chicken-tikka.dim_400x300.jpg",
    rating: 4.8,
    isVeg: false,
  },
  {
    name: "Dahi Puri",
    description:
      "Crispy puris filled with potato, chickpeas, sweet yogurt and chutneys | 6 puris per plate",
    category: "Starters",
    price: 89,
    image: "/assets/generated/dahi-puri.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },

  // Main Course
  {
    name: "Butter Chicken",
    description:
      "Tender chicken in rich, creamy tomato-based sauce with aromatic spices | Serves 1-2 | with gravy",
    category: "Main Course",
    price: 299,
    image: "/assets/generated/butter-chicken.dim_400x300.jpg",
    rating: 4.9,
    isVeg: false,
  },
  {
    name: "Dal Makhani",
    description:
      "Slow-cooked black lentils in creamy buttery tomato gravy | 1 bowl | Serves 1",
    category: "Main Course",
    price: 189,
    image: "/assets/generated/dal-makhani.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },
  {
    name: "Paneer Butter Masala",
    description:
      "Soft cottage cheese cubes in rich, velvety tomato-cashew gravy | 1 bowl | Serves 1",
    category: "Main Course",
    price: 229,
    image: "/assets/generated/paneer-butter-masala.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Chicken Curry",
    description:
      "Traditional home-style chicken curry with freshly ground masala | 1 bowl | 4-5 pieces",
    category: "Main Course",
    price: 279,
    image: "/assets/generated/chicken-curry.dim_400x300.jpg",
    rating: 4.5,
    isVeg: false,
  },
  {
    name: "Rajma",
    description:
      "Red kidney beans cooked in thick, flavorful North Indian gravy | 1 bowl | Serves 1",
    category: "Main Course",
    price: 169,
    image: "/assets/generated/rajma.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Kadai Paneer",
    description:
      "Paneer and bell peppers cooked in spicy kadai masala | 1 bowl | Serves 1",
    category: "Main Course",
    price: 219,
    image: "/assets/generated/kadai-paneer.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },

  // Rice & Biryani
  {
    name: "Chicken Biryani",
    description:
      "Fragrant basmati rice layered with spiced chicken, saffron and fried onions | Full plate | Serves 1-2",
    category: "Rice & Biryani",
    price: 299,
    image: "/assets/generated/biryani.dim_400x300.jpg",
    rating: 4.9,
    isVeg: false,
  },
  {
    name: "Veg Biryani",
    description:
      "Aromatic basmati rice with mixed vegetables, whole spices and herbs | Full plate | Serves 1",
    category: "Rice & Biryani",
    price: 199,
    image: "/assets/generated/veg-biryani.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Egg Fried Rice",
    description:
      "Stir-fried basmati rice with eggs, vegetables and soy sauce | Full plate | Serves 1",
    category: "Rice & Biryani",
    price: 149,
    image: "/assets/generated/egg-fried-rice.dim_400x300.jpg",
    rating: 4.2,
    isVeg: false,
  },
  {
    name: "Jeera Rice",
    description:
      "Fragrant basmati rice tempered with cumin seeds and ghee | 1 bowl | Serves 1",
    category: "Rice & Biryani",
    price: 99,
    image: "/assets/generated/jeera-rice.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
  },

  // Breads
  {
    name: "Garlic Naan",
    description:
      "Soft tandoor-baked flatbread topped with garlic, butter and coriander | 1 piece",
    category: "Breads",
    price: 49,
    image: "/assets/generated/naan.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Tandoori Roti",
    description: "Whole wheat bread baked fresh in clay tandoor oven | 1 piece",
    category: "Breads",
    price: 29,
    image: "/assets/generated/tandoori-roti.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Paratha",
    description:
      "Flaky layered whole wheat flatbread, pan-fried with ghee | 1 piece",
    category: "Breads",
    price: 49,
    image: "/assets/generated/paratha.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Puri",
    description:
      "Deep-fried fluffy whole wheat bread, served hot | 4 pieces per plate",
    category: "Breads",
    price: 39,
    image: "/assets/generated/puri.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
  },

  // Snacks
  {
    name: "Chole Bhature",
    description:
      "Fluffy fried bread with spiced chickpea curry, a Punjabi classic | 2 bhaturas + 1 bowl chole",
    category: "Snacks",
    price: 129,
    image: "/assets/generated/chole-bhature.dim_400x300.jpg",
    rating: 4.8,
    isVeg: true,
  },
  {
    name: "Veg Burger",
    description:
      "Crispy veggie patty with fresh veggies, cheese and special sauce in a bun | 1 burger",
    category: "Snacks",
    price: 119,
    image: "/assets/generated/veg-burger.dim_400x300.jpg",
    rating: 4.3,
    isVeg: true,
  },
  {
    name: "Aloo Tikki",
    description:
      "Crispy spiced potato patties served with tangy chutneys | 2 pieces per plate",
    category: "Snacks",
    price: 69,
    image: "/assets/generated/aloo-tikki.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },
  {
    name: "Pav Bhaji",
    description:
      "Spiced mashed vegetable curry served with buttered bread rolls | 2 pavs + 1 bowl bhaji",
    category: "Snacks",
    price: 99,
    image: "/assets/generated/pav-bhaji.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },

  // Beverages
  {
    name: "Mango Lassi",
    description:
      "Thick creamy yogurt drink blended with fresh Alphonso mangoes | 300 ml glass",
    category: "Beverages",
    price: 99,
    image: "/assets/generated/mango-lassi.dim_400x300.jpg",
    rating: 4.8,
    isVeg: true,
  },
  {
    name: "Masala Chai",
    description:
      "Aromatic spiced Indian tea with ginger, cardamom, cinnamon and cloves | 1 cup (150 ml)",
    category: "Beverages",
    price: 39,
    image: "/assets/generated/masala-chai.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Cold Coffee",
    description:
      "Chilled blended coffee with milk and ice cream, topped with chocolate | 300 ml glass",
    category: "Beverages",
    price: 89,
    image: "/assets/generated/cold-coffee.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Fresh Lime Soda",
    description:
      "Refreshing sparkling lime drink with mint and a hint of salt or sugar | 300 ml glass",
    category: "Beverages",
    price: 59,
    image: "/assets/generated/fresh-lime-soda.dim_400x300.jpg",
    rating: 4.4,
    isVeg: true,
  },

  // Desserts
  {
    name: "Gulab Jamun",
    description:
      "Soft milk-solid dumplings soaked in rose-flavored sugar syrup | 2 pieces per plate",
    category: "Desserts",
    price: 89,
    image: "/assets/generated/gulab-jamun.dim_400x300.jpg",
    rating: 4.7,
    isVeg: true,
  },
  {
    name: "Kheer",
    description:
      "Creamy rice pudding with saffron, cardamom and garnished with pistachios | 1 bowl (200 ml)",
    category: "Desserts",
    price: 79,
    image: "/assets/generated/kheer.dim_400x300.jpg",
    rating: 4.5,
    isVeg: true,
  },
  {
    name: "Ice Cream",
    description:
      "Two scoops of premium Indian flavors: Kesar Pista or Mango | 2 scoops",
    category: "Desserts",
    price: 99,
    image: "/assets/generated/ice-cream.dim_400x300.jpg",
    rating: 4.6,
    isVeg: true,
  },
  {
    name: "Jalebi",
    description:
      "Crispy spiral-shaped sweets soaked in saffron sugar syrup, served warm | 200g per plate",
    category: "Desserts",
    price: 69,
    image: "/assets/generated/jalebi.dim_400x300.jpg",
    rating: 4.4,
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
];
