
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, Users, Zap, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <header className="bg-white border-b-2 border-brand-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/6c43b8d1-3f39-4f3e-acf7-8e3d2a1c5b74.png" 
                alt="Vibe Coding Logo" 
                className="w-10 h-10 object-contain"
              />
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
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-brand-gray">Welcome, {user.email}</span>
                <Button variant="outline" onClick={handleSignOut} className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" onClick={handleAuthClick} className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                  Sign In
                </Button>
                <Button onClick={handleAuthClick} className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90">
                  Start Coding
                </Button>
              </>
            )}
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
                {user ? (
                  <div className="space-y-2">
                    <p className="text-sm text-brand-gray">Welcome, {user.email}</p>
                    <Button variant="outline" onClick={handleSignOut} className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleAuthClick} className="w-full mb-2">Sign In</Button>
                    <Button onClick={handleAuthClick} className="w-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white">
                      Start Coding
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
