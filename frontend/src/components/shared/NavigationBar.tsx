import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationBarProps {
  userType: 'customer' | 'merchant' | 'delivery';
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ userType }) => {
  const navLinks = {
    customer: [
      { to: '/', label: 'Home' },
      { to: '/search', label: 'Search' },
      { to: '/orders', label: 'Orders' },
      { to: '/profile', label: 'Profile' },
    ],
    merchant: [
      { to: '/merchant', label: 'Dashboard' },
      { to: '/merchant/inventory', label: 'Inventory' },
      { to: '/merchant/orders', label: 'Orders' },
      { to: '/merchant/settings', label: 'Settings' },
      { to: '/merchant/profile', label: 'Profile' },
      { to: '/merchant/register', label: 'Register' }
    ],
    delivery: [
      { to: '/delivery', label: 'Dashboard' },
      { to: '/delivery/tasks', label: 'Tasks' },
      { to: '/delivery/history', label: 'History' },
      { to: '/delivery/profile', label: 'Profile' },
    ],
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-8">
            {navLinks[userType].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};