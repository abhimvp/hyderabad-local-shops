import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CustomerLayout from "./layouts/CustomerLayout";
import DeliveryLayout from "./layouts/DeliveryLayout";

import MerchantLayout from "./layouts/MerchantLayout";
import MerchantDashboard from "./pages/merchant/Dashboard";

import BusinessRegistration from "./pages/merchant/BusinessRegistration";
import ProductManagement from "./pages/merchant/Productmanagement";

import CustomerDashboard from "./pages/customer/Dashboard";
import DeliveryDashboard from "./pages/delivery/Dashboard";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Customer Routes */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            {/* <Route path="search" element={<CustomerSearch />} />
            <Route path="orders" element={<CustomerOrders />} />
            <Route path="profile" element={<CustomerProfile />} /> */}
          </Route>

          {/* Merchant Routes */}
          <Route
            path="/merchant"
            element={
              <ProtectedRoute>
                <MerchantLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MerchantDashboard />} />
            <Route path="register" element={<BusinessRegistration />} />
            <Route
              path="products"
              element={
                <ProtectedRoute requiresRegistration>
                  <ProductManagement />
                </ProtectedRoute>
              }
            />
            {/* <Route path="inventory" element={<MerchantInventory />} /> */}
            {/* <Route path="orders" element={<MerchantOrders />} />
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
    </AuthProvider>
  );
};

export default App;
