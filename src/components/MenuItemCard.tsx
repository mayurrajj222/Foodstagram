'use client';

import type { FoodItem } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItemCardProps {
  item: FoodItem;
  onAdd?: (item: FoodItem) => void;
}

const MenuItemCard = ({ item, onAdd }: MenuItemCardProps) => {
  const rating = item.rating || Math.floor(item.likes / 50) % 5 + 1; // Mock rating
  const price = item.price || (item.likes % 20) + 5; // Mock price

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
