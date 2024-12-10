import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from '@/components/shared/NavigationBar';

const MerchantLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar userType="merchant" />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MerchantLayout;