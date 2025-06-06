'use client';

import { useState, useEffect, useMemo } from 'react';
import type { FoodItem, Restaurant as RestaurantType, Category } from '@/lib/data';
import { getRestaurantById, getFoodItemsByRestaurant, getCategories as fetchCategories } from '@/lib/data';
import FoodPostCard from '@/components/FoodPostCard';
import CategoryTabs from '@/components/CategoryTabs';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Utensils } from 'lucide-react';

interface RestaurantPageParams {
  params: { id: string };
}

export default function RestaurantPage({ params }: RestaurantPageParams) {
  const { id: restaurantId } = params;
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [resData, itemsData, catsData] = await Promise.all([
          getRestaurantById(restaurantId),
          getFoodItemsByRestaurant(restaurantId),
          fetchCategories(),
        ]);
        
        if (resData) {
          setRestaurant(resData);
          setFoodItems(itemsData);
          
          // Filter categories to only those present in this restaurant's items
          const restaurantCategories = new Set(itemsData.map(item => item.category));
          const relevantCategories = catsData.filter(cat => restaurantCategories.has(cat.name));
          setCategories(relevantCategories);

        } else {
          // Handle restaurant not found
          console.error("Restaurant not found");
        }
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (restaurantId) {
      fetchData();
    }
  }, [restaurantId]);

  const filteredFoodItems = useMemo(() => {
    if (!selectedCategory) {
      return foodItems;
    }
    const categoryObject = categories.find(c => c.id === selectedCategory);
    if (!categoryObject) return foodItems; // Should not happen if selectedCategory is from categories
    
    return foodItems.filter(item => item.category === categoryObject.name);
  }, [foodItems, selectedCategory, categories]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-1/2 mx-auto" /> {/* Restaurant Name */}
        <Skeleton className="h-10 w-full" /> {/* Category Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-1/4 mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return <p className="text-center text-destructive text-xl">Restaurant not found.</p>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8 p-6 bg-card rounded-lg shadow-lg">
        {restaurant.profileImage ? (
            <Image 
                src={restaurant.profileImage} 
                alt={`${restaurant.name} logo`} 
                width={120} 
                height={120}
                className="rounded-full mx-auto mb-4 border-4 border-primary"
                data-ai-hint="restaurant logo"
            />
        ) : (
            <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-primary">
                <Utensils size={60} className="text-primary" />
            </div>
        )}
        <h1 className="text-5xl font-headline text-primary">{restaurant.name}</h1>
        <p className="text-muted-foreground mt-2">Explore our delicious menu items.</p>
      </div>
      
      {categories.length > 0 && (
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {filteredFoodItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoodItems.map(item => (
            <FoodPostCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg col-span-full">
          No items found for this category.
        </p>
      )}
    </div>
  );
}
