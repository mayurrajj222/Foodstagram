'use client';

import { useState, useEffect, useMemo, use as ReactUse } from 'react';
import type { FoodItem, Restaurant as RestaurantType, Category } from '@/lib/data';
import { getRestaurantById, getFoodItemsByRestaurant, getCategories as fetchAllCategories } from '@/lib/data';
import MenuItemCard from '@/components/MenuItemCard';
import HorizontalCategoryList from '@/components/HorizontalCategoryList';
import SearchBar from '@/components/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, MapPin } from 'lucide-react'; // Added ShoppingCart
import Link from 'next/link';
import { Button } from '@/components/ui/button';


interface RestaurantPageParams {
  params: { id: string };
}

export default function RestaurantPage({ params: paramsProp }: RestaurantPageParams) {
  const resolvedParams = ReactUse(paramsProp as any as Promise<{ id: string }>);
  const { id: restaurantId } = resolvedParams;

  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pickup");


  useEffect(() => {
    const fetchData = async () => {
      if (!restaurantId) return;
      setIsLoading(true);
      try {
        const [resData, itemsData, categoriesData] = await Promise.all([
          getRestaurantById(restaurantId as string),
          getFoodItemsByRestaurant(restaurantId as string),
          fetchAllCategories(),
        ]);
        
        if (resData) {
          setRestaurant(resData);
          setFoodItems(itemsData);
          setAllCategories(categoriesData);
        } else {
          console.error("Restaurant not found");
          setRestaurant(null);
        }
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);
  
  const relevantCategories = useMemo(() => {
    if (!foodItems || foodItems.length === 0 || !allCategories || allCategories.length === 0) return [];
    const restaurantItemCategoryNames = new Set(foodItems.map(item => item.category));
    return allCategories.filter(cat => restaurantItemCategoryNames.has(cat.name));
  }, [foodItems, allCategories]);

  const filteredAndSearchedFoodItems = useMemo(() => {
    let itemsToDisplay = foodItems;

    if (selectedCategoryId) {
      const categoryObject = allCategories.find(c => c.id === selectedCategoryId);
      if (categoryObject) {
        itemsToDisplay = itemsToDisplay.filter(item => item.category === categoryObject.name);
      }
    }

    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    if (lowerSearchTerm) {
      itemsToDisplay = itemsToDisplay.filter(item => 
        item.name.toLowerCase().includes(lowerSearchTerm) ||
        item.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    return itemsToDisplay;
  }, [foodItems, selectedCategoryId, allCategories, searchTerm]);

  const handleAddToCart = (item: FoodItem) => {
    console.log("Added to cart:", item.name);
    // Actual cart logic would go here
  };


  if (isLoading) {
    return (
      <div className="space-y-6 p-4">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <Skeleton className="h-8 w-3/4 mb-1" />
        <Skeleton className="h-5 w-1/2 mb-1" />
        <Skeleton className="h-4 w-full mb-4" />
        {/* Tabs Skeleton */}
        <div className="flex space-x-2 mb-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
        </div>
        {/* Search Bar Skeleton */}
        <Skeleton className="h-12 w-full rounded-lg mb-6" />
        {/* Categories Skeleton */}
        <div className="flex justify-between items-center mb-3">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-5 w-16 rounded-md" />
        </div>
        <div className="flex space-x-3 mb-6">
          {Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="h-[100px] w-[80px] rounded-xl" />)}
        </div>
        {/* Menu Items Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
             <div key={index} className="bg-card p-3 rounded-xl shadow space-y-2">
              <Skeleton className="aspect-[3/4] w-full rounded-md" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between items-center pt-1">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-16 rounded-md" />
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
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center text-foreground">
        <Button variant="ghost" size="icon" asChild className="text-foreground">
          <Link href="/">
            <LucideIcons.ChevronLeft size={24} />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-headline">Menu</h1>
        <Button variant="ghost" size="icon" className="text-foreground">
          <ShoppingCart size={22} />
          <span className="sr-only">Cart</span>
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-headline text-primary-foreground">Hello Juliet 👋</h2>
        <p className="text-lg text-muted-foreground">Welcome to <span className="font-semibold text-primary">{restaurant.name}</span>.</p>
        {restaurant.address && (
            <p className="text-xs text-muted-foreground/80 flex items-center gap-1 mt-1">
                <MapPin size={12} /> {restaurant.address}
            </p>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-input p-1 rounded-lg">
          <TabsTrigger 
            value="pickup" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground rounded-md py-2 text-sm font-medium"
          >
            Pickup
          </TabsTrigger>
          <TabsTrigger 
            value="delivery" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground rounded-md py-2 text-sm font-medium"
          >
            Delivery
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search Menu..."
      />
      
      {relevantCategories.length > 0 && (
        <HorizontalCategoryList
          categories={relevantCategories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          viewAllHref="#" // Placeholder for actual link
        />
      )}

      {filteredAndSearchedFoodItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5">
          {filteredAndSearchedFoodItems.map(item => (
            <MenuItemCard key={item.id} item={item} onAdd={handleAddToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
           <p className="text-lg font-semibold text-foreground mb-1">No Items Found</p>
           <p className="text-sm text-muted-foreground">
            {searchTerm ? `No items match "${searchTerm}"` : `There are no items in this category for ${restaurant.name}`}.
          </p>
        </div>
      )}
    </div>
  );
}
