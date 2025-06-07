
export interface Restaurant {
  id: string;
  name: string;
  profileImage?: string;
  address?: string; // Added for restaurant page
}

export interface Category {
  id:string;
  name: string;
  icon?: string; // Lucide icon name string
}

export interface FoodItem {
  id: string;
  restaurantId: string;
  name: string;
  imageUrl: string;
  imageHint: string; 
  category: string; 
  likes: number;
  description: string;
  price?: number; // Added for menu item card
  rating?: number; // Added for menu item card (1-5)
}

export const categoriesData: Category[] = [
  { id: 'cat6', name: 'Appetizers', icon: 'Sandwich' },
  { id: 'cat5', name: 'Main Course', icon: 'UtensilsCrossed' },
  { id: 'cat4', name: 'Salads', icon: 'Salad' },
  { id: 'cat8', name: 'Sandwiches', icon: 'Sandwich' },
  { id: 'cat1', name: 'Desserts', icon: 'IceCream2' },
  { id: 'cat2', name: 'Cakes', icon: 'CakeSlice' },
  { id: 'cat7', name: 'Pastries', icon: 'Cookie' },
  { id: 'cat3', name: 'Drinks', icon: 'Martini' },
];

export const restaurantsData: Restaurant[] = [
  { id: 'res1', name: 'The Sweet Spot', profileImage: 'https://placehold.co/60x60.png', address: '123 Dessert Lane, Sweetville, USA 12345' },
  { id: 'res2', name: 'Savory Bites Kitchen', profileImage: 'https://placehold.co/60x60.png', address: '456 Main Street, Flavor Town, USA 67890' },
  { id: 'res3', name: 'Green Leaf Cafe', profileImage: 'https://placehold.co/60x60.png', address: '789 Organic Ave, Healthy City, USA 13579' },
  { id: 'res4', name: 'Urban Pasta House', profileImage: 'https://placehold.co/60x60.png', address: '101 Pasta Place, Carb Central, USA 24680'},
];

export const foodItemsData: FoodItem[] = [
  { 
    id: 'food1', 
    restaurantId: 'res1', 
    name: 'Molten Chocolate Lava Cake', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'chocolate lava cake',
    category: 'Desserts', 
    likes: 152, 
    description: 'Decadent dark chocolate cake with a gooey molten center, served with vanilla ice cream.',
    price: 12.99,
    rating: 5
  },
  { 
    id: 'food2', 
    restaurantId: 'res1', 
    name: 'Strawberry Cheesecake', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'strawberry cheesecake',
    category: 'Cakes', 
    likes: 225, 
    description: 'Rich New York style cheesecake with fresh strawberries.',
    price: 10.50,
    rating: 4
  },
  { 
    id: 'food3', 
    restaurantId: 'res1', 
    name: 'Iced Caramel Macchiato', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'iced coffee drink',
    category: 'Drinks', 
    likes: 98, 
    description: 'Chilled espresso with milk, vanilla syrup, and caramel drizzle.',
    price: 5.75,
    rating: 4
  },
  { 
    id: 'food10', 
    restaurantId: 'res1', 
    name: 'Almond Croissant', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'almond croissant pastry',
    category: 'Pastries', 
    likes: 180, 
    description: 'Flaky croissant with almond cream and toasted almonds.',
    price: 6.00,
    rating: 5
  },
  { 
    id: 'food4', 
    restaurantId: 'res2', 
    name: 'Pan-Seared Salmon', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'seared salmon dish',
    category: 'Main Course', 
    likes: 185, 
    description: 'Crispy-skin salmon with asparagus and lemon-dill sauce.',
    price: 22.00,
    rating: 5
  },
  { 
    id: 'food5', 
    restaurantId: 'res2', 
    name: 'Quinoa Salad', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'quinoa salad bowl',
    category: 'Salads', 
    likes: 123, 
    description: 'Quinoa, cucumbers, tomatoes, olives, feta, and lemon-herb vinaigrette.',
    price: 14.50,
    rating: 4
  },
  { 
    id: 'food6', 
    restaurantId: 'res2', 
    name: 'Spicy Tuna Crispy Rice', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'tuna crispy rice',
    category: 'Appetizers', 
    likes: 92, 
    description: 'Crispy rice cakes with spicy tuna tartare and avocado.',
    price: 16.00,
    rating: 4
  },
  { 
    id: 'food11', 
    restaurantId: 'res2', 
    name: 'Chicken Club Sandwich', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'club sandwich meal',
    category: 'Sandwiches', 
    likes: 75, 
    description: 'Grilled chicken, bacon, lettuce, tomato, avocado on sourdough.',
    price: 15.00,
    rating: 4
  },
  { 
    id: 'food7', 
    restaurantId: 'res3', 
    name: 'Superfood Kale Salad', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'kale salad healthy',
    category: 'Salads', 
    likes: 162, 
    description: 'Kale, sweet potatoes, chickpeas, cranberries, seeds, tahini dressing.',
    price: 15.50,
    rating: 5
  },
  { 
    id: 'food8', 
    restaurantId: 'res3', 
    name: 'Avocado Toast Deluxe', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'avocado toast egg',
    category: 'Appetizers', 
    likes: 255, 
    description: 'Multigrain toast, avocado, poached egg, feta, chili flakes.',
    price: 13.00,
    rating: 5
  },
  { 
    id: 'food9', 
    restaurantId: 'res3', 
    name: 'Mango Pineapple Smoothie', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'mango smoothie drink',
    category: 'Drinks', 
    likes: 112, 
    description: 'Mango, pineapple, banana, spinach, coconut water.',
    price: 8.00,
    rating: 4
  },
  { 
    id: 'food12', 
    restaurantId: 'res3', 
    name: 'Vegan Berry Parfait', 
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'vegan parfait dessert',
    category: 'Desserts', 
    likes: 133, 
    description: 'Coconut yogurt, berry compote, and homemade granola.',
    price: 9.50,
    rating: 4
  },
  {
    id: 'food13',
    restaurantId: 'res4',
    name: 'Spaghetti Carbonara',
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'spaghetti carbonara pasta',
    category: 'Main Course',
    likes: 210,
    description: 'Italian carbonara with pancetta, pecorino, egg, black pepper.',
    price: 18.50,
    rating: 5
  },
  {
    id: 'food14',
    restaurantId: 'res4',
    name: 'Garlic Bread Mozzarella',
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'garlic bread cheese',
    category: 'Appetizers',
    likes: 140,
    description: 'Toasted bread, garlic butter, melted mozzarella.',
    price: 9.00,
    rating: 4
  },
  {
    id: 'food15',
    restaurantId: 'res4',
    name: 'Italian Spritz',
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'spritz cocktail drink',
    category: 'Drinks',
    likes: 85,
    description: 'Prosecco, bitter liqueur, soda water.',
    price: 11.00,
    rating: 4
  },
  {
    id: 'food16',
    restaurantId: 'res4',
    name: 'Pesto Penne Primavera',
    imageUrl: 'https://placehold.co/600x800.png',
    imageHint: 'pesto pasta vegetables',
    category: 'Main Course',
    likes: 175,
    description: 'Penne pasta, basil pesto, seasonal spring vegetables.',
    price: 17.00,
    rating: 4
  }
];

export const getRestaurants = async (): Promise<Restaurant[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(restaurantsData), 50));
};

export const getRestaurantById = async (id: string): Promise<Restaurant | undefined> => {
  return new Promise((resolve) => setTimeout(() => resolve(restaurantsData.find(r => r.id === id)), 50));
};

export const getAllFoodItems = async (): Promise<FoodItem[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(foodItemsData), 50));
};

export const getFoodItemsByRestaurant = async (restaurantId: string): Promise<FoodItem[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(foodItemsData.filter(item => item.restaurantId === restaurantId)), 50));
};

export const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(categoriesData), 50));
};
