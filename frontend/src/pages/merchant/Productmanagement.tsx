// src/pages/merchant/ProductManagement.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

interface Price {
  amount: number;
  currency: string;
  unit: string;
}

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: Price;
  attributes: Record<string, any>;
  businessId: string;
}

interface AttributeField {
  key: string;
  value: string;
}

const ProductManagement: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    price: {
      amount: 0,
      currency: 'INR',
      unit: ''
    },
    attributes: {},
    businessId: 'placeholder-business-id' // This should be dynamically set
  });

  const [attributes, setAttributes] = useState<AttributeField[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert attributes array to object format
    const attributesObject = attributes.reduce((acc, curr) => {
      if (curr.key.trim()) {
        acc[curr.key] = curr.value;
      }
      return acc;
    }, {} as Record<string, any>);

    const productData = {
      ...formData,
      attributes: attributesObject
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product added successfully!');
        // Reset form
        setFormData({
          name: '',
          description: '',
          category: '',
          price: {
            amount: 0,
            currency: 'INR',
            unit: ''
          },
          attributes: {},
          businessId: formData.businessId
        });
        setAttributes([]);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    setFormData(prev => {
      if (keys.length === 1) {
        return { ...prev, [name]: value };
      }
      
      if (keys.length === 2 && keys[0] === 'price') {
        return {
          ...prev,
          price: {
            ...prev.price,
            [keys[1]]: keys[1] === 'amount' ? parseFloat(value) : value
          }
        };
      }
      
      return prev;
    });
  };

  const addAttribute = () => {
    setAttributes(prev => [...prev, { key: '', value: '' }]);
  };

  const removeAttribute = (index: number) => {
    setAttributes(prev => prev.filter((_, i) => i !== index));
  };

  const updateAttribute = (index: number, field: keyof AttributeField, value: string) => {
    setAttributes(prev => 
      prev.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    );
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={3}
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

            {/* Price Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Price Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    name="price.amount"
                    value={formData.price.amount}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Currency</label>
                  <input
                    type="text"
                    name="price.currency"
                    value={formData.price.currency}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <input
                    type="text"
                    name="price.unit"
                    value={formData.price.unit}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="kg/piece/etc"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Attributes Section */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Product Attributes</h3>
                <button
                  type="button"
                  onClick={addAttribute}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                >
                  Add Attribute
                </button>
              </div>
              
              {attributes.map((attr, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 mb-4">
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={attr.key}
                      onChange={(e) => updateAttribute(index, 'key', e.target.value)}
                      placeholder="Attribute name"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={attr.value}
                      onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                      placeholder="Attribute value"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div className="col-span-2">
                    <button
                      type="button"
                      onClick={() => removeAttribute(index)}
                      className="px-3 py-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductManagement;