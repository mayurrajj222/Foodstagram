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
        // Optionally, set an error state to display a message to the user
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
    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    if (!lowerSearchTerm) {
      return foodItems;
    }
    
    return foodItems.filter(item => {
      const restaurant = restaurantMap.get(item.restaurantId);
      const restaurantNameMatch = restaurant?.name.toLowerCase().includes(lowerSearchTerm);
      const foodNameMatch = item.name.toLowerCase().includes(lowerSearchTerm);
      const categoryMatch = item.category.toLowerCase().includes(lowerSearchTerm);
      // const descriptionMatch = item.description.toLowerCase().includes(lowerSearchTerm); // Optional: search in description
      return restaurantNameMatch || foodNameMatch || categoryMatch;
    });
  }, [foodItems, searchTerm, restaurantMap]);

  return (
    <div className="space-y-8">
      <div className="text-center pt-4 pb-2">
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-2">Discover Delicious Food</h1>
        <p className="text-lg text-muted-foreground">Explore a world of flavors, one post at a time.</p>
      </div>
      
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        placeholder="Search food, category, or restaurants..." 
        className="max-w-xl mx-auto"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-card p-4 rounded-lg shadow space-y-3">
              <Skeleton className="h-[200px] w-full rounded-md" />
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
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-foreground mb-2">No Matches Found</p>
          <p className="text-muted-foreground">
            We couldn't find any food items matching "{searchTerm}". Try a different search term or explore all items.
          </p>
        </div>
      )}
    </div>
  );
}
