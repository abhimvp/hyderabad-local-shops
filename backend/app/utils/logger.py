"""Consistent log format across your application"""
# utils/logger.py
import logging
from app.config.settings import settings


def setup_logger():
    """Configure the basic settings for logging"""
    logging.basicConfig(
        level=settings.LOG_LEVEL,
        # Define the format of log messages using these components:
        # %(asctime)s: Timestamp of the log
        # %(name)s: Name of the logger (usually the module name)
        # %(levelname)s: Level of the log (INFO, ERROR, etc.)
        # %(message)s: The actual log message
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )
    # Create and return a logger instance for this module
    return logging.getLogger(__name__)


# Create a logger instance that can be imported and used throughout the application
logger = setup_logger()
