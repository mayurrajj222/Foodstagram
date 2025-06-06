'use client';

import { useState, useEffect, useMemo } from 'react';
import type { FoodItem, Restaurant } from '@/lib/data';
import { getAllFoodItems, getRestaurants } from '@/lib/data';
import FoodPostCard from '@/components/FoodPostCard';
import SearchBar from '@/components/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [items, allRestaurants] = await Promise.all([
          getAllFoodItems(),
          getRestaurants(),
        ]);
        setFoodItems(items);
        setRestaurants(allRestaurants);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error state if necessary
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const restaurantMap = useMemo(() => {
    return new Map(restaurants.map(r => [r.id, r]));
  }, [restaurants]);

  const filteredFoodItems = useMemo(() => {
    if (!searchTerm) {
      return foodItems;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return foodItems.filter(item => {
      const restaurant = restaurantMap.get(item.restaurantId);
      return restaurant?.name.toLowerCase().includes(lowerSearchTerm) || item.name.toLowerCase().includes(lowerSearchTerm);
    });
  }, [foodItems, searchTerm, restaurantMap]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline text-center text-primary">Discover Delicious Food</h1>
      
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search food or restaurants..." />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-1/4 mt-2" />
            </div>
          ))}
        </div>
      ) : filteredFoodItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoodItems.map(item => (
            <FoodPostCard 
              key={item.id} 
              item={item} 
              restaurant={restaurantMap.get(item.restaurantId)}
              showRestaurantName={true}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg col-span-full">
          No food items match your search. Try a different term!
        </p>
      )}
    </div>
  );
}
