
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, LogOut, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { subscription } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => authSubscription.unsubscribe();
  }, []);

  const toggleMenu = () => {
    console.log('Menu toggle clicked, current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    console.log('Sign out button clicked');
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAuthClick = () => {
    console.log('Auth button clicked, navigating to /auth');
    navigate('/auth');
  };

  const handlePricingClick = () => {
    console.log('Pricing button clicked, navigating to /pricing');
    navigate('/pricing');
  };

  const handleAdminClick = () => {
    console.log('Admin button clicked, navigating to /admin');
    navigate('/admin');
  };

  const handleLogoClick = () => {
    console.log('Logo clicked, navigating to /');
    navigate('/');
  };

  const handleExploreClick = () => {
    console.log('Explore link clicked');
    // Add scroll to explore section or navigation logic here
  };

  const handleTemplatesClick = () => {
    console.log('Templates link clicked');
    // Add scroll to templates section or navigation logic here
  };

  const handleCommunityClick = () => {
    console.log('Community link clicked');
    // Add scroll to community section or navigation logic here
  };

  const isOnPricingPage = location.pathname === '/pricing';

  return (
    <header className="bg-white border-b-2 border-brand-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=40&h=40&fit=crop&crop=center" 
                alt="Vibe Coding Logo" 
                className="w-10 h-10 object-contain rounded"
                onError={(e) => {
                  console.log('Logo failed to load:', e);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="text-2xl font-bold text-brand-gray">Vibe Coding</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={handleExploreClick}
              className="text-brand-gray hover:text-brand-blue transition-colors"
            >
              Explore
            </button>
            <button 
              onClick={handleTemplatesClick}
              className="text-brand-gray hover:text-brand-purple transition-colors"
            >
              Templates
            </button>
            <button 
              onClick={handleCommunityClick}
              className="text-brand-gray hover:text-brand-cyan transition-colors"
            >
              Community
            </button>
            <button 
              onClick={handlePricingClick}
              className="text-brand-gray hover:text-brand-orange transition-colors"
            >
              Pricing
            </button>
          </nav>

          {/* Search and Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                onFocus={() => console.log('Search input focused')}
                onChange={(e) => console.log('Search query:', e.target.value)}
              />
            </div>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Subscription Status */}
                {subscription && (
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={subscription.subscription_tier === 'starter' ? 'secondary' : 'default'}
                      className={
                        subscription.subscription_tier === 'pro' ? 'bg-purple-500' :
                        subscription.subscription_tier === 'boss-teams' ? 'bg-orange-500' :
                        'bg-gray-500'
                      }
                    >
                      {subscription.subscription_tier.charAt(0).toUpperCase() + subscription.subscription_tier.slice(1)}
                      {subscription.is_admin && ' (Admin)'}
                    </Badge>
                    {!isOnPricingPage && (
                      <Button size="sm" variant="outline" onClick={handlePricingClick}>
                        {subscription.subscription_tier === 'starter' ? 'Upgrade' : 'Manage'}
                      </Button>
                    )}
                  </div>
                )}

                {/* Admin Button */}
                {subscription?.is_admin && (
                  <Button size="sm" variant="outline" onClick={handleAdminClick}>
                    <Settings className="h-4 w-4 mr-1" />
                    Admin
                  </Button>
                )}

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-brand-gray">Welcome, {user.email}</span>
                  <Button variant="outline" onClick={handleSignOut} className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
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
              <button 
                onClick={handleExploreClick} 
                className="text-brand-gray hover:text-brand-blue text-left"
              >
                Explore
              </button>
              <button 
                onClick={handleTemplatesClick} 
                className="text-brand-gray hover:text-brand-purple text-left"
              >
                Templates
              </button>
              <button 
                onClick={handleCommunityClick} 
                className="text-brand-gray hover:text-brand-cyan text-left"
              >
                Community
              </button>
              <button 
                onClick={handlePricingClick} 
                className="text-brand-gray hover:text-brand-orange text-left"
              >
                Pricing
              </button>
              
              <div className="pt-4 border-t border-brand-light">
                {user ? (
                  <div className="space-y-3">
                    {subscription && (
                      <div>
                        <Badge 
                          variant={subscription.subscription_tier === 'starter' ? 'secondary' : 'default'}
                          className={
                            subscription.subscription_tier === 'pro' ? 'bg-purple-500' :
                            subscription.subscription_tier === 'boss-teams' ? 'bg-orange-500' :
                            'bg-gray-500'
                          }
                        >
                          {subscription.subscription_tier.charAt(0).toUpperCase() + subscription.subscription_tier.slice(1)}
                          {subscription.is_admin && ' (Admin)'}
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm text-brand-gray">Welcome, {user.email}</p>
                    {subscription?.is_admin && (
                      <Button onClick={handleAdminClick} className="w-full" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Button>
                    )}
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
