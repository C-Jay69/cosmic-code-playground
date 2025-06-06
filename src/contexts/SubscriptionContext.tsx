
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: 'starter' | 'pro' | 'boss-teams';
  subscription_end: string | null;
  is_admin: boolean;
}

interface SubscriptionContextType {
  user: User | null;
  subscription: SubscriptionData | null;
  loading: boolean;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSubscription = async () => {
    if (!user) {
      setSubscription({
        subscribed: false,
        subscription_tier: 'starter',
        subscription_end: null,
        is_admin: false
      });
      return;
    }
    
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        setSubscription({
          subscribed: false,
          subscription_tier: 'starter',
          subscription_end: null,
          is_admin: false
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Error checking subscription:', error);
        setSubscription({
          subscribed: false,
          subscription_tier: 'starter',
          subscription_end: null,
          is_admin: false
        });
      } else {
        // Check if user is admin
        const { data: adminCheck } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', user.email)
          .single();

        setSubscription({
          ...data,
          is_admin: !!adminCheck
        });
      }
    } catch (error) {
      console.error('Error refreshing subscription:', error);
      setSubscription({
        subscribed: false,
        subscription_tier: 'starter',
        subscription_end: null,
        is_admin: false
      });
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        refreshSubscription();
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await refreshSubscription();
        } else {
          setSubscription(null);
        }
        setLoading(false);
      }
    );

    return () => authSubscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      refreshSubscription();
    }
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{ user, subscription, loading, refreshSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
