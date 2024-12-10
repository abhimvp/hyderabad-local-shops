export interface Price {
    amount: number;
    currency: string;
    unit: string;
  }
  
  export interface Product {
    businessId: string;
    name: string;
    description: string;
    category: string;
    price: Price;
    attributes: Record<string, any>;
  }