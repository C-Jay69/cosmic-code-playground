
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Shield, Users, Percent, Plus, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  subscription_tier: string;
  subscribed: boolean;
  subscription_end: string | null;
  updated_at: string;
}

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

interface Coupon {
  id: string;
  code: string;
  discount_percentage: number;
  active: boolean;
  expires_at: string | null;
  created_at: string;
}

const Admin = () => {
  const { user, subscription } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!subscription?.is_admin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    loadData();
  }, [user, subscription, navigate]);

  const loadData = async () => {
    try {
      const [usersResponse, adminUsersResponse, couponsResponse] = await Promise.all([
        supabase.from('subscribers').select('*').order('created_at', { ascending: false }),
        supabase.from('admin_users').select('*').order('created_at', { ascending: false }),
        supabase.from('coupons').select('*').order('created_at', { ascending: false })
      ]);

      if (usersResponse.data) setUsers(usersResponse.data);
      if (adminUsersResponse.data) setAdminUsers(adminUsersResponse.data);
      if (couponsResponse.data) setCoupons(couponsResponse.data);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAdminUser = async () => {
    if (!newAdminEmail.trim()) return;

    try {
      const { error } = await supabase
        .from('admin_users')
        .insert({ email: newAdminEmail.toLowerCase() });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin user added successfully",
      });
      setNewAdminEmail('');
      loadData();
    } catch (error) {
      console.error('Error adding admin user:', error);
      toast({
        title: "Error",
        description: "Failed to add admin user",
        variant: "destructive",
      });
    }
  };

  const removeAdminUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin user removed successfully",
      });
      loadData();
    } catch (error) {
      console.error('Error removing admin user:', error);
      toast({
        title: "Error",
        description: "Failed to remove admin user",
        variant: "destructive",
      });
    }
  };

  const createCoupon = async () => {
    if (!newCouponCode.trim() || !newCouponDiscount.trim()) return;

    const discount = parseInt(newCouponDiscount);
    if (discount < 1 || discount > 100) {
      toast({
        title: "Invalid Discount",
        description: "Discount must be between 1 and 100 percent",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('coupons')
        .insert({
          code: newCouponCode.toUpperCase(),
          discount_percentage: discount,
          active: true,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Coupon created successfully",
      });
      setNewCouponCode('');
      setNewCouponDiscount('');
      loadData();
    } catch (error) {
      console.error('Error creating coupon:', error);
      toast({
        title: "Error",
        description: "Failed to create coupon",
        variant: "destructive",
      });
    }
  };

  const toggleCoupon = async (id: string, active: boolean) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .update({ active: !active })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Coupon ${!active ? 'activated' : 'deactivated'} successfully`,
      });
      loadData();
    } catch (error) {
      console.error('Error toggling coupon:', error);
      toast({
        title: "Error",
        description: "Failed to update coupon",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading admin panel...</div>
        </div>
      </div>
    );
  }

  if (!subscription?.is_admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-gray mb-4">
            <Shield className="inline-block mr-3 h-10 w-10" />
            Admin Panel
          </h1>
          <p className="text-xl text-brand-gray">Manage users, subscriptions, and coupons</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.length}</div>
              <p className="text-sm text-gray-500">
                {users.filter(u => u.subscribed).length} paid subscribers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Admin Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{adminUsers.length}</div>
              <p className="text-sm text-gray-500">Users with admin access</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Percent className="mr-2 h-5 w-5" />
                Active Coupons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{coupons.filter(c => c.active).length}</div>
              <p className="text-sm text-gray-500">Total: {coupons.length} coupons</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Admin Users Management */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage users with admin privileges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Enter email address"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                />
                <Button onClick={addAdminUser}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {adminUsers.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-2 border rounded">
                    <span>{admin.email}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeAdminUser(admin.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Coupon Management */}
          <Card>
            <CardHeader>
              <CardTitle>Coupon Management</CardTitle>
              <CardDescription>Create and manage discount coupons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Input
                  placeholder="Coupon code"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                />
                <div className="flex gap-1">
                  <Input
                    type="number"
                    placeholder="Discount %"
                    min="1"
                    max="100"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                  />
                  <Button onClick={createCoupon}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <span className="font-semibold">{coupon.code}</span>
                      <span className="ml-2 text-sm text-gray-500">{coupon.discount_percentage}% off</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={coupon.active ? "default" : "secondary"}>
                        {coupon.active ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleCoupon(coupon.id, coupon.active)}
                      >
                        {coupon.active ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>View all registered users and their subscription status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription End</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {user.subscription_tier?.charAt(0).toUpperCase() + user.subscription_tier?.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.subscribed ? "default" : "secondary"}>
                        {user.subscribed ? "Active" : "Free"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.subscription_end ? new Date(user.subscription_end).toLocaleDateString() : "N/A"}
                    </TableCell>
                    <TableCell>
                      {new Date(user.updated_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
