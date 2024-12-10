export interface Location {
    type: "Point";
    coordinates: [number, number];
  }
  
  export interface Address {
    street: string;
    area: string;
    city: string;
    pincode: string;
  }
  
  export interface Contact {
    phone: string;
    whatsapp?: string;
    email?: string;
  }
  
  export interface Business {
    businessName: string;
    shortName: string;
    category: string;
    subCategory: string;
    location: Location;
    address: Address;
    contact: Contact;
    tags: string[];
  }