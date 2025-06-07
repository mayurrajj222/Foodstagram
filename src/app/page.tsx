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
      return restaurantNameMatch || foodNameMatch || categoryMatch;
    });
  }, [foodItems, searchTerm, restaurantMap]);

  return (
    <div className="space-y-8 py-4 md:py-8">
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        placeholder="Search food, restaurants..." 
        className="max-w-2xl mx-auto"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg shadow space-y-0 overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              {/* Skeleton for overlaid content could be added if desired, but keeping it simple */}
            </div>
          ))}
        </div>
      ) : filteredFoodItems.length > 0 ? (
        // For the feed style, 2 columns on larger screens might look better
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredFoodItems.map(item => (
            <FoodPostCard 
              key={item.id} 
              item={item} 
              restaurant={restaurantMap.get(item.restaurantId)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-foreground mb-2">No Matches Found</p>
          <p className="text-muted-foreground">
            We couldn't find any food items matching "{searchTerm}".
          </p>
        </div>
      )}
    </div>
  );
}
