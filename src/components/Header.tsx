
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, Code, Users, Zap } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b-2 border-brand-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-brand-gray">Vibe Coding</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#explore" className="text-brand-gray hover:text-brand-blue transition-colors">Explore</a>
            <a href="#templates" className="text-brand-gray hover:text-brand-purple transition-colors">Templates</a>
            <a href="#community" className="text-brand-gray hover:text-brand-cyan transition-colors">Community</a>
            <a href="#pricing" className="text-brand-gray hover:text-brand-orange transition-colors">Pricing</a>
          </nav>

          {/* Search and Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
            <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90">
              Start Coding
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-brand-light">
            <div className="flex flex-col space-y-4">
              <a href="#explore" className="text-brand-gray hover:text-brand-blue">Explore</a>
              <a href="#templates" className="text-brand-gray hover:text-brand-purple">Templates</a>
              <a href="#community" className="text-brand-gray hover:text-brand-cyan">Community</a>
              <a href="#pricing" className="text-brand-gray hover:text-brand-orange">Pricing</a>
              <div className="pt-4 border-t border-brand-light">
                <Button variant="outline" className="w-full mb-2">Sign In</Button>
                <Button className="w-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white">
                  Start Coding
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
