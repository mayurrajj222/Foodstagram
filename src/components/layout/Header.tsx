import Link from 'next/link';
import { Utensils } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <Utensils size={32} className="group-hover:animate-pulse" />
          <h1 className="text-3xl font-headline">Foodstagram</h1>
        </Link>
        {/* Future navigation links can be added here */}
        {/* Example: User profile, settings */}
      </div>
    </header>
  );
};

export default Header;
