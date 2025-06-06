const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t mt-auto">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Foodstagram. All rights reserved.
        </p>
        <p className="text-xs mt-1 text-muted-foreground">
          Discover and share amazing food moments. Made with <span className="text-primary font-bold">&hearts;</span> by food lovers, for food lovers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
