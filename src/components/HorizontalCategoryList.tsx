'use client';

import type { Category } from '@/lib/data';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { Button } from './ui/button';

interface HorizontalCategoryListProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  viewAllHref?: string;
}

const IconComponent = ({ name }: { name?: string }) => {
  if (!name) return <LucideIcons.ListFilter className="w-6 h-6" />; // Default icon
  const Icon = LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
  return Icon ? <Icon className="w-6 h-6" /> : <LucideIcons.ListFilter className="w-6 h-6" />;
};


const HorizontalCategoryList = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  viewAllHref
}: HorizontalCategoryListProps) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
        <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-xl font-headline text-foreground">Categories</h2>
            {viewAllHref && (
                <Button variant="link" className="text-primary p-0 h-auto" asChild>
                    <a href={viewAllHref}>View All</a>
                </Button>
            )}
        </div>
      <div className="flex overflow-x-auto space-x-3 pb-2 horizontal-scroll-container">
        {/* "All" category item could be added here if needed */}
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id === selectedCategoryId ? null : category.id)}
            className={cn(
              "flex flex-col items-center justify-center space-y-2 p-3 rounded-xl transition-all duration-200 ease-in-out min-w-[80px] h-[100px]",
              selectedCategoryId === category.id
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card hover:bg-card/80 text-foreground"
            )}
            aria-pressed={selectedCategoryId === category.id}
          >
            <IconComponent name={category.icon} />
            <span className="text-xs font-medium truncate">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCategoryList;
