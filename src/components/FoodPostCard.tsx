'use client';

import type { FoodItem, Restaurant } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Utensils } from 'lucide-react'; // Assuming Utensils might be used if restaurant logo is missing, but not directly here.
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FoodPostCardProps {
  item: FoodItem;
  restaurant?: Restaurant; // Optional, for main feed display
  showRestaurantName?: boolean;
}

const FoodPostCard = ({ item, restaurant, showRestaurantName = false }: FoodPostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);
  const [animateLike, setAnimateLike] = useState(false);

  useEffect(() => {
    // In a real app with user authentication, you'd fetch initial like status from Firestore.
    // For this demo, we're keeping it client-side.
    // To make it slightly more dynamic for demo:
    // setIsLiked(Math.random() < 0.3); // Randomly like some posts initially
  }, [item.id]);


  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 300); // Duration of like animation

    // Placeholder for Firestore update logic
    // e.g., updateLikeCountInFirestore(item.id, !isLiked);
  };

  const restaurantToDisplay = restaurant || { name: 'Explore Restaurant', id: item.restaurantId };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-card rounded-lg border border-border">
      <CardHeader className="p-0 relative group">
        <Link href={`/restaurants/${item.restaurantId}?item=${item.id}`} aria-label={`View details for ${item.name}`}>
          <div className="aspect-[4/3] relative w-full overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={item.imageHint}
              priority={false} // Set to true for above-the-fold images if needed
            />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {showRestaurantName && restaurantToDisplay && (
          <Link href={`/restaurants/${restaurantToDisplay.id}`} className="text-xs text-muted-foreground hover:text-primary transition-colors block mb-1 font-headline uppercase tracking-wider">
            {restaurantToDisplay.name}
          </Link>
        )}
         <Link href={`/restaurants/${item.restaurantId}?item=${item.id}`} aria-label={`View details for ${item.name}`}>
          <CardTitle className="text-lg lg:text-xl font-headline mb-1 hover:text-primary transition-colors leading-tight">
            {item.name}
          </CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike post" : "Like post"}
            className={cn(
              "rounded-full hover:bg-accent/10 active:scale-95",
              isLiked ? "text-accent" : "text-muted-foreground hover:text-accent",
              animateLike && "animate-like"
            )}
            aria-pressed={isLiked}
          >
            <Heart fill={isLiked ? 'hsl(var(--accent))' : 'none'} className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium tabular-nums" aria-live="polite">{likeCount} likes</span>
        </div>
        <Link href={`/restaurants/${item.restaurantId}`}>
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
             View Menu
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FoodPostCard;
