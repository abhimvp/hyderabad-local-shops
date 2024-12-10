// src/pages/merchant/BusinessRegistration.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

interface FormData {
  businessName: string;
  shortName: string;
  category: string;
  subCategory: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  address: {
    street: string;
    area: string;
    city: string;
    pincode: string;
  };
  contact: {
    phone: string;
    whatsapp?: string;
    email?: string;
  };
  tags: string[];
}

const BusinessRegistration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    shortName: '',
    category: '',
    subCategory: '',
    location: {
      type: 'Point',
      coordinates: [0, 0]
    },
    address: {
      street: '',
      area: '',
      city: '',
      pincode: ''
    },
    contact: {
      phone: '',
      whatsapp: '',
      email: ''
    },
    tags: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // This will be replaced with your actual API endpoint
      const response = await fetch('/api/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Business registered successfully!');
      }
    } catch (error) {
      console.error('Error registering business:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    setFormData(prev => {
      if (keys.length === 1) {
        return { ...prev, [name]: value };
      }
      
      if (keys.length === 2) {
        const [parent, child] = keys;
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof FormData],
            [child]: value
          }
        };
      }
      
      return prev;
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register Your Business</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Short Name</label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sub Category</label>
              <input
                type="text"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {/* Address Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Address</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Area</label>
                  <input
                    type="text"
                    name="address.area"
                    value={formData.address.area}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                    <input
                      type="text"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp (Optional)</label>
                  <input
                    type="tel"
                    name="contact.whatsapp"
                    value={formData.contact.whatsapp}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                  <input
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Register Business
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessRegistration;