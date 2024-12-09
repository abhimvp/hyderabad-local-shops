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

- For the requirements, created a `requirements.txt` file with dependencies needed and installed them `pip install -r requirements.txt`
- Created a `.env` file to manage the configuration

```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=your_database_name
COLLECTION_NAME=your_collection_name
LOG_LEVEL=INFO
```

- create an empty file named `__init__.py` within the app directory.This file is `important` in Python because it signals to the Python interpreter that the app directory should be treated as a Python package. This `allows you to import modules` from within the app directory in other parts of your project.
