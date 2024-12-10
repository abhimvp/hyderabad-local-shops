# backend/app/config/settings.py
"""BaseSettings is specifically designed to handle configuration with environment variables"""

from functools import lru_cache
from pydantic_settings import BaseSettings

# from typing import Optional


class Settings(BaseSettings):
    """Each class variable defines a configuration setting"""

    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "local_shops"
    COLLECTION_NAME: str = "businesses"
    LOG_LEVEL: str = "INFO"

    class Config:
        """Inner Config class tells Pydantic to look for a .env file"""

        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

    def validate_database_settings(self) -> bool:
        """Validate database settings and provide meaningful error messages."""
        missing_fields = []

        if not self.DATABASE_NAME:
            missing_fields.append("DATABASE_NAME")
        if not self.COLLECTION_NAME:
            missing_fields.append("COLLECTION_NAME")

        if missing_fields:
            raise ValueError(
                f"Missing required settings in .env file: {', '.join(missing_fields)}"
            )
        return True


@lru_cache()
def get_settings() -> Settings:
    """Create and validate settings instance with caching."""
    settings = Settings()
    settings.validate_database_settings()
    return settings


# Create an instance of Settings
# This will:
# 1. Look for a .env file
# 2. Look for environment variables
# 3. Use default values if neither are found
settings = get_settings()
