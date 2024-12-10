// src/layouts/MerchantLayout.tsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MerchantLayout: React.FC = () => {
  const location = useLocation();
  const isRegistered = false; // Replace with actual auth check

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/merchant" className="text-xl font-bold text-gray-800">
                Merchant Portal
              </Link>
            </div>
            
            {isRegistered && (
              <div className="flex space-x-4">
                <Link
                  to="/merchant"
                  className={`px-3 py-2 rounded-md ${
                    location.pathname === '/merchant'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/merchant/products"
                  className={`px-3 py-2 rounded-md ${
                    location.pathname === '/merchant/products'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/merchant/profile"
                  className={`px-3 py-2 rounded-md ${
                    location.pathname === '/merchant/profile'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MerchantLayout;