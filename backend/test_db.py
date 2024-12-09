import asyncio
from app.database.connection import DatabaseClient
from app.database.models import DataModel
from app.utils.logger import logger

async def test_connection():
    try:
        # Connect to database
        await DatabaseClient.connect_db()
        logger.info("Successfully connected to database")

        # Get collection
        collection = await DatabaseClient.get_collection()

        # Insert a test document
        test_data = DataModel(
            name="Test Item",
            description="This is a test item to verify database connection"
        )
        
        result = await collection.insert_one(test_data.model_dump())
        logger.info(f"Successfully inserted test document with ID: {result.inserted_id}")

        # Retrieve the document
        document = await collection.find_one({"_id": result.inserted_id})
        logger.info(f"Retrieved document: {document}")

    except Exception as e:
        logger.error(f"Error during database test: {e}")
    
    finally:
        # Close the connection
        await DatabaseClient.close_db()

if __name__ == "__main__":
    asyncio.run(test_connection())