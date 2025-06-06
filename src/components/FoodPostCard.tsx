'use client';

import type { FoodItem, Restaurant } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
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

  // Avoid hydration mismatch for initial like state if it were dynamic
  useEffect(() => {
    // Here you would typically fetch the like status for the current user
    // For this mock, we'll just use a random initial state or a fixed one.
    // setIsLiked(Math.random() > 0.5); 
  }, [item.id]);


  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 300); // Duration of animation

    // In a real app, update Firestore here
    // console.log(`Item ${item.id} ${!isLiked ? 'liked' : 'unliked'}`);
  };

  const restaurantToDisplay = restaurant || { name: 'Unknown Restaurant', id: '#' };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <Link href={`/restaurants/${item.restaurantId}#${item.id}`}>
          <div className="aspect-[3/2] relative w-full">
            <Image
              src={item.imageUrl}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={item.imageHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {showRestaurantName && restaurantToDisplay && (
          <Link href={`/restaurants/${restaurantToDisplay.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors block mb-1 font-headline">
            {restaurantToDisplay.name}
          </Link>
        )}
        <Link href={`/restaurants/${item.restaurantId}#${item.id}`}>
         <CardTitle className="text-xl font-headline mb-1 hover:text-primary transition-colors">{item.name}</CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground h-12 overflow-hidden">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike post" : "Like post"}
            className={cn(
              "rounded-full hover:bg-accent/20",
              isLiked ? "text-accent" : "text-muted-foreground",
              animateLike && "animate-like"
            )}
          >
            <Heart fill={isLiked ? 'currentColor' : 'none'} className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium">{likeCount}</span>
        </div>
        <Link href={`/restaurants/${item.restaurantId}`}>
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
             View Restaurant
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FoodPostCard;
