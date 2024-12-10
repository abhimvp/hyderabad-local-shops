import React from 'react';
import { Card } from '@/components/ui/card';

const DeliveryDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-semibold">Available Tasks</h3>
        {/* Task list will go here */}
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold">Today's Earnings</h3>
          <p className="text-2xl font-bold">₹0</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold">Completed Deliveries</h3>
          <p className="text-2xl font-bold">0</p>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryDashboard;