import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import MerchantLayout from './layouts/MerchantLayout';
import DeliveryLayout from './layouts/DeliveryLayout';
import CustomerDashboard from './pages/customer/Dashboard';
import MerchantDashboard from './pages/merchant/Dashboard';
import DeliveryDashboard from './pages/delivery/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          {/* <Route path="search" element={<CustomerSearch />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="profile" element={<CustomerProfile />} /> */}
        </Route>

        {/* Merchant Routes */}
        <Route path="/merchant" element={<MerchantLayout />}>
          <Route index element={<MerchantDashboard />} />
          {/* <Route path="inventory" element={<MerchantInventory />} />
          <Route path="orders" element={<MerchantOrders />} />
          <Route path="settings" element={<MerchantSettings />} /> */}
        </Route>

        {/* Delivery Routes */}
         <Route path="/delivery" element={<DeliveryLayout />}>
          <Route index element={<DeliveryDashboard />} />
          {/* <Route path="tasks" element={<DeliveryTasks />} />
          <Route path="history" element={<DeliveryHistory />} />
          <Route path="profile" element={<DeliveryProfile />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;