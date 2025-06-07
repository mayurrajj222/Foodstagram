import Link from 'next/link';
import { Utensils } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-background text-foreground shadow-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <Utensils size={28} className="text-primary" />
          <h1 className="text-2xl font-headline text-primary-foreground">Foodstagram</h1>
        </Link>
        {/* Future navigation links can be added here */}
      </div>
    </header>
  );
};

export default Header;
