# app/models/product.py
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

class Price(BaseModel):
    amount: float
    currency: str = "INR"
    unit: str

class Product(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    businessId: str
    name: str
    description: str
    category: str
    price: Price
    attributes: Dict[str, Any]
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True