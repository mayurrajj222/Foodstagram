
export interface Restaurant {
  id: string;
  name: string;
  profileImage?: string; // Optional: if we want to display restaurant logos
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
  imageHint: string;
  category: string; // Category name for simplicity, could be categoryId
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
];

export const restaurantsData: Restaurant[] = [
  { id: 'res1', name: 'The Sweet Spot', profileImage: 'https://placehold.co/100x100.png' },
  { id: 'res2', name: 'Savory Bites', profileImage: 'https://placehold.co/100x100.png' },
  { id: 'res3', name: 'Green Leaf Cafe', profileImage: 'https://placehold.co/100x100.png' },
];

export const foodItemsData: FoodItem[] = [
  // Restaurant 1: The Sweet Spot
  { 
    id: 'food1', 
    restaurantId: 'res1', 
    name: 'Chocolate Lava Cake', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'chocolate cake',
    category: 'Desserts', 
    likes: 150, 
    description: 'Decadent chocolate cake with a molten center, served with vanilla ice cream.' 
  },
  { 
    id: 'food2', 
    restaurantId: 'res1', 
    name: 'Strawberry Cheesecake', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'strawberry cheesecake',
    category: 'Cakes', 
    likes: 220, 
    description: 'Creamy cheesecake topped with fresh strawberries and a graham cracker crust.' 
  },
  { 
    id: 'food3', 
    restaurantId: 'res1', 
    name: 'Iced Caramel Latte', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'iced latte',
    category: 'Drinks', 
    likes: 95, 
    description: 'Chilled espresso with milk and caramel syrup, topped with whipped cream.' 
  },
  { 
    id: 'food10', 
    restaurantId: 'res1', 
    name: 'Red Velvet Cake', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'red velvet',
    category: 'Cakes', 
    likes: 180, 
    description: 'Classic red velvet cake with cream cheese frosting.' 
  },

  // Restaurant 2: Savory Bites
  { 
    id: 'food4', 
    restaurantId: 'res2', 
    name: 'Grilled Salmon', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'grilled salmon',
    category: 'Main Course', 
    likes: 180, 
    description: 'Perfectly grilled salmon fillet served with roasted vegetables and lemon butter sauce.' 
  },
  { 
    id: 'food5', 
    restaurantId: 'res2', 
    name: 'Caprese Salad', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'caprese salad',
    category: 'Salads', 
    likes: 120, 
    description: 'Fresh mozzarella, ripe tomatoes, and basil, drizzled with balsamic glaze.' 
  },
  { 
    id: 'food6', 
    restaurantId: 'res2', 
    name: 'Bruschetta', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'bruschetta appetizer',
    category: 'Appetizers', 
    likes: 90, 
    description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil.' 
  },
  { 
    id: 'food11', 
    restaurantId: 'res2', 
    name: 'Lemonade', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'fresh lemonade',
    category: 'Drinks', 
    likes: 70, 
    description: 'Refreshing homemade lemonade.' 
  },


  // Restaurant 3: Green Leaf Cafe
  { 
    id: 'food7', 
    restaurantId: 'res3', 
    name: 'Quinoa Salad', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'quinoa salad',
    category: 'Salads', 
    likes: 160, 
    description: 'Healthy quinoa salad with mixed greens, avocado, cherry tomatoes, and a lemon vinaigrette.' 
  },
  { 
    id: 'food8', 
    restaurantId: 'res3', 
    name: 'Avocado Toast', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'avocado toast',
    category: 'Appetizers', 
    likes: 250, 
    description: 'Sourdough toast topped with mashed avocado, feta cheese, and a sprinkle of chili flakes.' 
  },
  { 
    id: 'food9', 
    restaurantId: 'res3', 
    name: 'Green Smoothie', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'green smoothie',
    category: 'Drinks', 
    likes: 110, 
    description: 'Nutritious green smoothie with spinach, kale, banana, and almond milk.' 
  },
  { 
    id: 'food12', 
    restaurantId: 'res3', 
    name: 'Vegan Chocolate Mousse', 
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'vegan mousse',
    category: 'Desserts', 
    likes: 130, 
    description: 'Rich and creamy vegan chocolate mousse made with avocado and cocoa powder.' 
  },
];

// Helper functions to simulate API calls
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
