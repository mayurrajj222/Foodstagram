'use client';

import type { FoodItem, Restaurant } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toggleLike, toggleUnlike, subscribeToLikes } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';

interface FoodPostCardProps {
  item: FoodItem;
  restaurant?: Restaurant;
  // showRestaurantName is implicitly true for this new design
}

const FoodPostCard = ({ item, restaurant }: FoodPostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);
  const [animateLike, setAnimateLike] = useState(false);
  const [currentTimeAgo, setCurrentTimeAgo] = useState<string>("1 hour ago");
  const { toast } = useToast();

  useEffect(() => {
    // Subscribe to real-time likes updates
    const unsubscribe = subscribeToLikes(item.id, (newLikes) => {
      setLikeCount(newLikes);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [item.id]);

  useEffect(() => {
    // Simulate dynamic time
    const hoursAgo = Math.floor(Math.random() * 5) + 1;
    setCurrentTimeAgo(`${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`);
  }, []);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when liking
    e.stopPropagation();
    
    try {
      if (isLiked) {
        const success = await toggleUnlike(item.id, likeCount);
        if (success) {
          setIsLiked(false);
          setAnimateLike(true);
          setTimeout(() => setAnimateLike(false), 300);
        } else {
          toast({
            title: "Error",
            description: "Failed to unlike the post. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        const success = await toggleLike(item.id, likeCount);
        if (success) {
          setIsLiked(true);
          setAnimateLike(true);
          setTimeout(() => setAnimateLike(false), 300);
        } else {
          toast({
            title: "Error",
            description: "Failed to like the post. Please try again.",
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

  const restaurantName = restaurant?.name || 'Food Place';
  const restaurantProfileImage = restaurant?.profileImage;

  return (
    <Link href={`/restaurants/${item.restaurantId}?item=${item.id}`} className="block group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <div className="relative aspect-video w-full">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={item.imageHint || 'food item'}
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-between">
          {/* Top Overlay: Restaurant Info */}
          {restaurant && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarImage src={restaurantProfileImage} alt={restaurantName} data-ai-hint="restaurant logo small" />
                <AvatarFallback className="text-xs bg-muted-foreground text-background">{restaurantName.substring(0,1)}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-semibold text-primary-foreground drop-shadow-sm">{restaurantName}</span>
            </div>
          )}

          {/* Bottom Overlay: Likes, Description, Time */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={handleLike}
                aria-label={isLiked ? "Unlike post" : "Like post"}
                className={cn(
                  "flex items-center gap-1 text-primary-foreground hover:opacity-80 transition-opacity",
                  animateLike && "animate-like"
                )}
                aria-pressed={isLiked}
              >
                <Heart fill={isLiked ? 'hsl(var(--primary))' : 'none'} stroke={isLiked ? 'hsl(var(--primary))' : 'currentColor'} className="w-5 h-5" />
                <span className="text-sm font-medium tabular-nums">{likeCount}</span>
              </button>
            </div>
            <p className="text-sm text-primary-foreground font-semibold line-clamp-2 drop-shadow-sm mb-1">
              {item.name}
            </p>
            <p className="text-xs text-gray-300 line-clamp-2 drop-shadow-sm">
              {item.description}
            </p>
            <p className="text-xs text-gray-400 mt-1 drop-shadow-sm">{currentTimeAgo}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodPostCard;
