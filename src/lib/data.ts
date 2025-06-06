
export interface Restaurant {
  id: string;
  name: string;
  profileImage?: string; // Optional: for restaurant logos
}

export interface Category {
  id: string;
  name: string;
}

export interface FoodItem {
  id: string;
  restaurantId: string;
  name: string;
  imageUrl: string;
  imageHint: string; // For placeholder image search keywords
  category: string; // Category name
  likes: number;
  description: string;
}

export const categoriesData: Category[] = [
  { id: 'cat1', name: 'Desserts' },
  { id: 'cat2', name: 'Cakes' },
  { id: 'cat3', name: 'Drinks' },
  { id: 'cat4', name: 'Salads' },
  { id: 'cat5', name: 'Main Course' },
  { id: 'cat6', name: 'Appetizers' },
  { id: 'cat7', name: 'Pastries' },
  { id: 'cat8', name: 'Sandwiches' },
];

export const restaurantsData: Restaurant[] = [
  { id: 'res1', name: 'The Sweet Spot', profileImage: 'https://placehold.co/100x100.png' },
  { id: 'res2', name: 'Savory Bites Kitchen', profileImage: 'https://placehold.co/100x100.png' },
  { id: 'res3', name: 'Green Leaf Cafe & Eatery', profileImage: 'https://placehold.co/100x100.png' },
  { id: 'res4', name: 'Urban Pasta House', profileImage: 'https://placehold.co/100x100.png' },
];

export const foodItemsData: FoodItem[] = [
  // Restaurant 1: The Sweet Spot (Desserts, Cakes, Drinks, Pastries)
  { 
    id: 'food1', 
    restaurantId: 'res1', 
    name: 'Molten Chocolate Lava Cake', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'chocolate cake',
    category: 'Desserts', 
    likes: 152, 
    description: 'Decadent dark chocolate cake with a gooey molten center, served with a scoop of vanilla bean ice cream and raspberry coulis.' 
  },
  { 
    id: 'food2', 
    restaurantId: 'res1', 
    name: 'Classic Strawberry Cheesecake', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'strawberry cheesecake',
    category: 'Cakes', 
    likes: 225, 
    description: 'Rich and creamy New York style cheesecake on a graham cracker crust, topped with fresh strawberries and a light strawberry glaze.' 
  },
  { 
    id: 'food3', 
    restaurantId: 'res1', 
    name: 'Iced Caramel Macchiato', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'iced coffee',
    category: 'Drinks', 
    likes: 98, 
    description: 'Chilled espresso layered with vanilla-flavored syrup, milk, and caramel sauce, served over ice.' 
  },
  { 
    id: 'food10', 
    restaurantId: 'res1', 
    name: 'Almond Croissant', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'almond croissant',
    category: 'Pastries', 
    likes: 180, 
    description: 'Flaky, buttery croissant filled with rich almond cream and topped with toasted almonds and powdered sugar.' 
  },

  // Restaurant 2: Savory Bites Kitchen (Main Course, Salads, Appetizers, Sandwiches)
  { 
    id: 'food4', 
    restaurantId: 'res2', 
    name: 'Pan-Seared Salmon with Asparagus', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'grilled salmon',
    category: 'Main Course', 
    likes: 185, 
    description: 'Crispy-skin salmon fillet pan-seared to perfection, served with tender asparagus spears and a lemon-dill sauce.' 
  },
  { 
    id: 'food5', 
    restaurantId: 'res2', 
    name: 'Mediterranean Quinoa Salad', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'quinoa salad',
    category: 'Salads', 
    likes: 123, 
    description: 'A vibrant salad with quinoa, cucumbers, tomatoes, olives, feta cheese, and a lemon-herb vinaigrette.' 
  },
  { 
    id: 'food6', 
    restaurantId: 'res2', 
    name: 'Spicy Tuna Crispy Rice', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'crispy rice',
    category: 'Appetizers', 
    likes: 92, 
    description: 'Crispy fried rice cakes topped with spicy tuna tartare, avocado, and a touch of sriracha aioli.' 
  },
  { 
    id: 'food11', 
    restaurantId: 'res2', 
    name: 'Gourmet Chicken Club Sandwich', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'club sandwich',
    category: 'Sandwiches', 
    likes: 75, 
    description: 'Grilled chicken breast, crispy bacon, lettuce, tomato, and avocado with a herbed mayonnaise on toasted sourdough.' 
  },

  // Restaurant 3: Green Leaf Cafe & Eatery (Salads, Appetizers, Drinks, Desserts)
  { 
    id: 'food7', 
    restaurantId: 'res3', 
    name: 'Superfood Kale Salad', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'kale salad',
    category: 'Salads', 
    likes: 162, 
    description: 'Nutrient-packed kale salad with roasted sweet potatoes, chickpeas, cranberries, pumpkin seeds, and a tahini dressing.' 
  },
  { 
    id: 'food8', 
    restaurantId: 'res3', 
    name: 'Artisan Avocado Toast Deluxe', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'avocado toast',
    category: 'Appetizers', 
    likes: 255, 
    description: 'Thick-cut multigrain toast topped with creamy avocado, a poached egg, feta cheese, and chili flakes.' 
  },
  { 
    id: 'food9', 
    restaurantId: 'res3', 
    name: 'Mango Pineapple Power Smoothie', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'fruit smoothie',
    category: 'Drinks', 
    likes: 112, 
    description: 'A refreshing and energizing smoothie blended with mango, pineapple, banana, spinach, and coconut water.' 
  },
  { 
    id: 'food12', 
    restaurantId: 'res3', 
    name: 'Vegan Berry Parfait', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'vegan parfait',
    category: 'Desserts', 
    likes: 133, 
    description: 'Layers of coconut yogurt, mixed berry compote, and homemade granola, served in a glass.' 
  },
  
  // Restaurant 4: Urban Pasta House (Main Course, Appetizers, Drinks)
  {
    id: 'food13',
    restaurantId: 'res4',
    name: 'Spaghetti Carbonara Classic',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'pasta carbonara',
    category: 'Main Course',
    likes: 210,
    description: 'Authentic Italian spaghetti carbonara with pancetta, pecorino romano, egg yolk, and black pepper.'
  },
  {
    id: 'food14',
    restaurantId: 'res4',
    name: 'Garlic Bread with Mozzarella',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'garlic bread',
    category: 'Appetizers',
    likes: 140,
    description: 'Toasted Italian bread brushed with garlic butter and topped with melted mozzarella cheese.'
  },
  {
    id: 'food15',
    restaurantId: 'res4',
    name: 'Italian Spritz',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'spritz cocktail',
    category: 'Drinks',
    likes: 85,
    description: 'A classic Italian aperitif with prosecco, bitter liqueur, and a splash of soda water.'
  },
  {
    id: 'food16',
    restaurantId: 'res4',
    name: 'Pesto Penne Primavera',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'pesto pasta',
    category: 'Main Course',
    likes: 175,
    description: 'Penne pasta tossed in a vibrant basil pesto sauce with seasonal spring vegetables.'
  }
];

// Helper functions to simulate API calls (data fetching)
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
