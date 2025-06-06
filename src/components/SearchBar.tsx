'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import type React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search restaurants..." }: SearchBarProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="pl-10 pr-4 py-2 w-full rounded-lg shadow-sm focus:ring-primary focus:border-primary"
        aria-label="Search bar"
      />
    </div>
  );
};

export default SearchBar;
