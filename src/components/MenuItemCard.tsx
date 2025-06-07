'use client';

import type { FoodItem } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { toggleLike, toggleUnlike, subscribeToLikes } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';
=======
>>>>>>> 7cbc18989a191aa23153d0457fa0aaad00885e8b

interface MenuItemCardProps {
  item: FoodItem;
  onAdd?: (item: FoodItem) => void;
}

const MenuItemCard = ({ item, onAdd }: MenuItemCardProps) => {
<<<<<<< HEAD
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);
  const { toast } = useToast();
  const rating = item.rating || Math.floor(item.likes / 50) % 5 + 1;
  const price = item.price || (item.likes % 20) + 5;

  useEffect(() => {
    // Subscribe to real-time likes updates
    const unsubscribe = subscribeToLikes(item.id, (newLikes) => {
      setLikeCount(newLikes);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [item.id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isLiked) {
        const success = await toggleUnlike(item.id, likeCount);
        if (success) {
          setIsLiked(false);
        } else {
          toast({
            title: "Error",
            description: "Failed to unlike the item. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        const success = await toggleLike(item.id, likeCount);
        if (success) {
          setIsLiked(true);
        } else {
          toast({
            title: "Error",
            description: "Failed to like the item. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Error handling like:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };
=======
  const rating = item.rating || Math.floor(item.likes / 50) % 5 + 1; // Mock rating
  const price = item.price || (item.likes % 20) + 5; // Mock price
>>>>>>> 7cbc18989a191aa23153d0457fa0aaad00885e8b

  return (
    <Card className="overflow-hidden shadow-lg bg-card border-border rounded-xl flex flex-col h-full">
      <div className="aspect-[3/4] relative w-full">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          data-ai-hint={item.imageHint || 'menu item'}
        />
<<<<<<< HEAD
        <button
          onClick={handleLike}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          aria-label={isLiked ? "Unlike item" : "Like item"}
        >
          <Heart
            className={cn(
              "w-5 h-5",
              isLiked ? "text-primary fill-primary" : "text-white"
            )}
          />
        </button>
=======
>>>>>>> 7cbc18989a191aa23153d0457fa0aaad00885e8b
      </div>
      <CardContent className="p-3 flex flex-col flex-grow">
        <h3 className="text-md font-headline text-foreground mb-1 line-clamp-2">{item.name}</h3>
        
        <div className="flex items-center my-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className={cn("w-3.5 h-3.5", i < rating ? "text-primary fill-primary" : "text-muted-foreground/50")}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-auto pt-2">
          <p className="text-lg font-semibold text-foreground">
            ${price.toFixed(2)}
          </p>
          <Button 
            size="sm" 
            variant="default" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-3 py-1.5 h-auto"
            onClick={() => onAdd?.(item)}
          >
            ADD
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
