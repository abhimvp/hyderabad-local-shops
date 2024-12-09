from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class DataModel(BaseModel):
    name: str
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Example Item",
                "description": "This is an example item"
            }
        }