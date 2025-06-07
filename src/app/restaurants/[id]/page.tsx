
'use client';

import { useState, useEffect, useMemo, use as ReactUse } from 'react';
import type { FoodItem, Restaurant as RestaurantType, Category } from '@/lib/data';
import { getRestaurantById, getFoodItemsByRestaurant, getCategories as fetchAllCategories } from '@/lib/data';
import FoodPostCard from '@/components/FoodPostCard';
import CategoryTabs from '@/components/CategoryTabs';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Utensils, MapPin } from 'lucide-react';

interface RestaurantPageParams {
  params: { id: string };
}

export default function RestaurantPage({ params: paramsProp }: RestaurantPageParams) {
  const resolvedParams = ReactUse(paramsProp as any as Promise<{ id: string }>);
  const { id: restaurantId } = resolvedParams;

  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!restaurantId) return;
      setIsLoading(true);
      try {
        const [resData, itemsData, allCategories] = await Promise.all([
          getRestaurantById(restaurantId as string),
          getFoodItemsByRestaurant(restaurantId as string),
          fetchAllCategories(),
        ]);
        
        if (resData) {
          setRestaurant(resData);
          setFoodItems(itemsData);
          
          const restaurantItemCategoryNames = new Set(itemsData.map(item => item.category));
          const relevantCategories = allCategories.filter(cat => restaurantItemCategoryNames.has(cat.name));
          setAvailableCategories(relevantCategories);

        } else {
          console.error("Restaurant not found");
          setRestaurant(null); // Explicitly set to null if not found
        }
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);

  const filteredFoodItems = useMemo(() => {
    if (!selectedCategoryId) {
      return foodItems;
    }
    const categoryObject = availableCategories.find(c => c.id === selectedCategoryId);
    if (!categoryObject) return foodItems; // Should not happen if selectedCategoryId is from categories
    
    return foodItems.filter(item => item.category === categoryObject.name);
  }, [foodItems, selectedCategoryId, availableCategories]);

  if (isLoading) {
    return (
      <div className="space-y-8 mt-4">
        <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg">
          <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
          <Skeleton className="h-10 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-5 w-1/2 mx-auto" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg mb-4" /> {/* Category Tabs Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
             <div key={index} className="bg-card p-4 rounded-lg shadow space-y-3">
              <Skeleton className="h-[180px] w-full rounded-md" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-28" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="text-center py-12">
             <h1 className="text-3xl font-headline text-destructive">Restaurant Not Found</h1>
             <p className="text-muted-foreground mt-2">Sorry, we couldn't find the restaurant you're looking for.</p>
           </div>;
  }

  return (
    <div className="space-y-8 mt-4">
      <header className="text-center p-6 md:p-10 bg-card rounded-lg shadow-xl border border-border">
        {restaurant.profileImage ? (
            <Image 
                src={restaurant.profileImage} 
                alt={`${restaurant.name} logo`} 
                width={120} 
                height={120}
                className="rounded-full mx-auto mb-4 border-4 border-primary shadow-md"
                data-ai-hint="restaurant logo"
            />
        ) : (
            <div className="w-28 h-28 md:w-32 md:h-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-primary shadow-md">
                <Utensils size={60} className="text-primary" />
            </div>
        )}
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-1">{restaurant.name}</h1>
        <p className="text-md text-muted-foreground flex items-center justify-center gap-1">
          <MapPin size={16} className="inline-block"/> Fictional Foodie Lane, Culinary City
        </p>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
          Explore our delicious menu items below, thoughtfully categorized for your browsing pleasure.
        </p>
      </header>
      
      {availableCategories.length > 0 && (
        <CategoryTabs
          categories={availableCategories}
          selectedCategory={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
      )}

      {filteredFoodItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoodItems.map(item => (
            <FoodPostCard key={item.id} item={item} showRestaurantName={false} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
           <p className="text-xl font-semibold text-foreground mb-2">No Items Found</p>
           <p className="text-muted-foreground">
            There are currently no items in this category{selectedCategoryId ? ` for ${restaurant.name}` : ''}.
          </p>
        </div>
      )}
    </div>
  );
}
