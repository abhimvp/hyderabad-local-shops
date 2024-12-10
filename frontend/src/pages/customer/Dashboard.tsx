// src/pages/customer/Dashboard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Search } from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text"
          placeholder="Search for shops or products..."
          className="w-full p-2 border rounded-lg"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Nearby Shops</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Shop list will go here */}
            <p>No shops found nearby</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Orders list will go here */}
            <p>No recent orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Featured Items</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Featured items will go here */}
            <p>No featured items</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;