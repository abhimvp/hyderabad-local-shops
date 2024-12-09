# database/connection.py
from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings
from app.utils.logger import logger

class DatabaseClient:
    client: AsyncIOMotorClient = None # type: ignore
    db = None
    collection = None

    @classmethod
    async def connect_db(cls):
        try:
            cls.client = AsyncIOMotorClient(settings.MONGODB_URL)
            cls.db = cls.client[settings.DATABASE_NAME]
            cls.collection = cls.db[settings.COLLECTION_NAME]
            logger.info("Connected to MongoDB")
        except Exception as e:
            logger.error(f"Could not connect to MongoDB: {e}")
            raise

    @classmethod
    async def close_db(cls):
        if cls.client:
            cls.client.close()
            logger.info("MongoDB connection closed")

    @classmethod
    async def get_collection(cls):
        return cls.collection