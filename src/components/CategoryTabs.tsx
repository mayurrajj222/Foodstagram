'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Category } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryTabs = ({ categories, selectedCategory, onSelectCategory }: CategoryTabsProps) => {
  if (!categories || categories.length === 0) {
    return null;
  }
  
  return (
    <Tabs 
      value={selectedCategory || "all"} 
      onValueChange={(value) => onSelectCategory(value === "all" ? null : value)}
      className="mb-8 w-full"
    >
      <TabsList className="bg-card border border-border rounded-lg p-1 inline-flex flex-wrap justify-start">
        <TabsTrigger 
          value="all"
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out m-1",
            (selectedCategory === null || selectedCategory === "all")
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-foreground hover:bg-accent/10 hover:text-accent"
          )}
          aria-selected={selectedCategory === null || selectedCategory === "all"}
        >
          All Items
        </TabsTrigger>
        {categories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out m-1",
              selectedCategory === category.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-foreground hover:bg-accent/10 hover:text-accent"
            )}
            aria-selected={selectedCategory === category.id}
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
