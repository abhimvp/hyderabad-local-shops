# main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from bson import ObjectId
from typing import List, Dict, Any

from app.database.models.business import Business
from app.database.models.product import Product
from app.database.connection import connect_to_mongodb, close_mongodb_connection, get_database
from app.config.settings import settings


# Startup and shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for handling startup and shutdown events.
    This replaces the deprecated @app.on_event decorators.
    """
    # Startup: Initialize database connection
    await connect_to_mongodb()
    yield
    # Shutdown: Close database connection
    await close_mongodb_connection()

# Initialize FastAPI with lifespan
app = FastAPI(
    title="Local Shops API",
    description="API for managing local shops and their products",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],)

@app.get("/")
async def root() -> Dict[str, Any]:
    """
    Root endpoint providing API information and health status
    """
    return {
        "app_name": "Local Shops API",
        "version": "1.0.0",
        "status": "healthy",
        "endpoints": {
            "documentation": "/docs",
            "openapi_spec": "/openapi.json",
            "merchants": {
                "register": "/api/merchants/register",
                "get_business": "/api/merchants/{business_id}",
                "check_status": "/api/merchants/{business_id}/status",
                "get_products": "/api/merchants/{business_id}/products"
            },
            "products": {
                "create": "/api/products"
            }
        }
    }

@app.get("/health")
async def health_check() -> Dict[str, str]:
    """
    Health check endpoint for monitoring
    """
    return {"status": "healthy"}

# Utility functions
def format_business(business: dict) -> dict:
    """Format MongoDB document for response"""
    business["_id"] = str(business["_id"])
    business["createdAt"] = business["createdAt"].isoformat()
    business["updatedAt"] = business["updatedAt"].isoformat()
    return business

# Add this route to test the connection
@app.get("/api/test")
async def test_connection():
    return {"message": "Connection successful"}

# Business Routes
@app.post("/api/merchants/register", response_model=Business)
async def register_business(
    business: Business,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Register a new business"""
    business_dict = business.model_dump(exclude={"id"})
    business_dict["createdAt"] = datetime.utcnow()
    business_dict["updatedAt"] = business_dict["createdAt"]
    
    # Insert into MongoDB
    result = await db.businesses.insert_one(business_dict)
    
    # Retrieve and return the created business
    created_business = await db.businesses.find_one({"_id": result.inserted_id})
    return format_business(created_business)

@app.get("/api/merchants/{business_id}", response_model=Business)
async def get_business(
    business_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get business details by ID"""
    try:
        business = await db.businesses.find_one({"_id": ObjectId(business_id)})
        if not business:
            raise HTTPException(status_code=404, detail="Business not found")
        return format_business(business)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/merchants/{business_id}/status")
async def check_business_status(
    business_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Check if a business is registered"""
    try:
        business = await db.businesses.find_one(
            {"_id": ObjectId(business_id)},
            projection={"_id": 1}
        )
        return {"isRegistered": business is not None}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Product Routes
@app.post("/api/products", response_model=Product)
async def create_product(
    product: Product,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new product"""
    try:
        # Verify business exists
        business = await db.businesses.find_one({"_id": ObjectId(product.businessId)})
        if not business:
            raise HTTPException(status_code=404, detail="Business not found")
        
        product_dict = product.model_dump(exclude={"id"})
        product_dict["createdAt"] = datetime.utcnow()
        product_dict["updatedAt"] = product_dict["createdAt"]
        
        result = await db.products.insert_one(product_dict)
        created_product = await db.products.find_one({"_id": result.inserted_id})
        created_product["_id"] = str(created_product["_id"])
        return created_product
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/merchants/{business_id}/products", response_model=List[Product])
async def get_business_products(
    business_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all products for a business"""
    try:
        cursor = db.products.find({"businessId": business_id})
        products = await cursor.to_list(length=None)
        return [format_business(product) for product in products]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

