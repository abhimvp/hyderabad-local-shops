// src/pages/merchant/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

const MerchantDashboard: React.FC = () => {
  // This should be replaced with actual auth check
  const isRegistered = false; // You'll need to implement this check

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Merchant Dashboard</h1>

      {!isRegistered ? (
        // Show this section for new merchants
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome to Our Platform!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">To start selling your products, you need to register your business first.</p>
            <Link 
              to="/merchant/register"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Register Your Business
            </Link>
          </CardContent>
        </Card>
      ) : (
        // Show this section for registered merchants
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Add, edit, or remove products from your inventory.</p>
              <Link 
                to="/merchant/products"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Manage Products
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">View and update your business details.</p>
              <Link 
                to="/merchant/profile"
                className="inline-block bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                View Profile
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MerchantDashboard;