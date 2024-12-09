# To verify your settings are working correctly, create a test script:
from app.config.settings import settings

def print_settings():
    print(f"MongoDB URL: {settings.MONGODB_URL}")
    print(f"Database Name: {settings.DATABASE_NAME}")
    print(f"Collection Name: {settings.COLLECTION_NAME}")
    print(f"Log Level: {settings.LOG_LEVEL}")

if __name__ == "__main__":
    print_settings()