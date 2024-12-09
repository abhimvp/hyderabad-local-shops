# app/models/business.py
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field

class Location(BaseModel):
    type: str = "Point"
    coordinates: List[float]

class Address(BaseModel):
    street: str
    area: str
    city: str
    pincode: str

class Contact(BaseModel):
    phone: str
    whatsapp: Optional[str] = None
    email: Optional[str] = None

class Business(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    businessName: str
    shortName: str
    category: str
    subCategory: str
    location: Location
    address: Address
    contact: Contact
    tags: List[str]
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True