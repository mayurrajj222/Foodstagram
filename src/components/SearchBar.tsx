'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import type React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search restaurants...", className }: SearchBarProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="pl-10 pr-4 py-3 w-full rounded-lg shadow-sm border-border focus:ring-primary focus:border-primary text-base"
        aria-label="Search bar"
      />
    </div>
  );
};

export default SearchBar;
