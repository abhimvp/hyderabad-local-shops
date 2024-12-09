# Project - Hyderabad local shops

- Created a `.gitignore` file in the project root directory

```
This separation is a standard practice in full-stack development as it allows you to:

Manage frontend and backend dependencies independently
Deploy frontend and backend separately if needed
Keep the codebases cleanly separated
Use different package managers (npm/yarn for frontend, pip for backend) without conflicts
```

# frontend

- `npm init -y` -> created a package.json file

# Backend

- First, open your terminal and navigate to your backend directory. Then follow these commands:

```
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
source venv/scripts/activate
# should be seeing (venv) in the terminal
<!-- (venv)
abhis@Tinku MINGW64 ~/Desktop/-----/hyderabad-local-shops/backend -->
# On macOS/Linux:
source venv/bin/activate

```

- After activating the virtual environment, install the requirements as follows:
  - For the requirements, created a `requirements.txt` file with dependencies needed and installed them `pip install -r requirements.txt` & do `pip freeze > requirements.txt`
- Created a `.env` file to manage the configuration

```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=your_database_name
COLLECTION_NAME=your_collection_name
LOG_LEVEL=INFO
```

- create an empty file named `__init__.py` within the app directory.This file is `important` in Python because it signals to the Python interpreter that the app directory should be treated as a Python package. This `allows you to import modules` from within the app directory in other parts of your project.

- properly set up and use your .env file with the `settings.py` configuration.
- Run this test script from your terminal: `python test_settings.py`
  - If everything is set up correctly, you should see your environment variable values printed to the console. If you encounter any errors, they will indicate what needs to be fixed in your configuration.
  - The settings can now be imported and used throughout your application.
- Consistent log format across your application - `logger.py`
  - Module name included in logs to easily trace where messages come from
  - Exception traceback information when needed
  - Configuration through environment variables
  - Different logging levels for different environments (DEBUG in development, INFO/WARNING in production)
  - Timestamp information for each log entry
- add database models and connections and test the connection

```
$ python test_db.py
2024-12-09 02:07:39,047 - app.utils.logger - INFO - Connected to MongoDB
2024-12-09 02:07:39,047 - app.utils.logger - INFO - Successfully connected to database
2024-12-09 02:07:39,073 - app.utils.logger - INFO - Successfully inserted test document with ID: 6756a54b055308af17ea66b5
2024-12-09 02:07:39,074 - app.utils.logger - INFO - Retrieved document: {'_id': ObjectId('6756a54b055308af17ea66b5'), 'name': 'Test Item', 'description': 'This is a test item to verify database connection', 'created_at': datetime.datetime(2024, 12, 9, 8, 7, 39, 47000)}
2024-12-09 02:07:39,074 - app.utils.logger - INFO - MongoDB connection closed
```
