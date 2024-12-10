import React from 'react';
import { Card } from '@/components/ui/card';

const MerchantDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold">Today's Orders</h3>
          <p className="text-2xl font-bold">0</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold">Revenue</h3>
          <p className="text-2xl font-bold">₹0</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold">Pending Deliveries</h3>
          <p className="text-2xl font-bold">0</p>
        </Card>
      </div>
      
      <Card className="p-4">
        <h3 className="font-semibold">Recent Orders</h3>
        {/* Orders table will go here */}
      </Card>
    </div>
  );
};

export default MerchantDashboard;