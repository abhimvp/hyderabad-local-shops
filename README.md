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

```
# Initial setup
npm init -y

# Install necessary dependencies
npm install react react-dom react-router-dom @heroicons/react @headlessui/react
npm install @types/react @types/react-dom typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install tailwindcss postcss autoprefixer
npm install @shadcn/ui
npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-react @babel/preset-typescript css-loader style-loader html-webpack-plugin
npm install --save-dev postcss-loader postcss css-loader style-loader
npm install lucide-react

# Create project structure
mkdir -p src/{components,pages}/{customer,merchant,delivery} src/shared src/assets src/layouts src/hooks src/utils src/types src/contexts
touch src/index.html src/index.tsx webpack.config.js tsconfig.json

<!-- Create a .babelrc file , Create a postcss.config.js file , Create a tailwind.config.js file  -->

<!-- To run the application: -->
# Install all dependencies
npm install

# Start the development server
npm start
```

- This setup provides:
  - Complete webpack configuration for development and production
  - TypeScript support with proper configuration
  - React Router setup with layouts for all three user types
  - Tailwind CSS integration
  - Hot module replacement for development
  - Proper project structure with all necessary components

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

# Local setup things

```
you can control the MongoDB server service on Windows in several ways. Here's how to manage it efficiently:
Through Services:

Open Services (services.msc) by pressing Windows + R and typing "services.msc"
Find "MongoDB Server" in the list
Right-click and select "Stop" to halt the service
To prevent automatic startup, double-click the service, change "Startup type" to "Manual"

Through Command Prompt (as Administrator):

To stop: net stop MongoDB
To start: net start MongoDB
To verify status: sc query MongoDB

Regarding performance impact, running MongoDB as a service does consume system resources, primarily RAM and some CPU. While the impact is generally minimal on modern systems, stopping the service when not in development makes sense for several reasons:

Resource Conservation: MongoDB typically uses about 200MB of RAM at idle. Stopping it frees these resources for other applications.
Security: Running services only when needed reduces potential attack surfaces.
System Startup: Having fewer automatic services improves your system's boot time.

For development purposes, I recommend setting the service to "Manual" startup. This way, you can start it only when working on your project and stop it when you're done, maintaining optimal system performance while retaining easy access to the database when needed.
```

```
$ python test_data.py
Inserted business: Spice Paradise with id: 6756c55f0fd2a3a01a497a7e
Inserted business: Fresh Daily Market with id: 6756c55f0fd2a3a01a497a7f
Inserted business: Pearl Paradise with id: 6756c55f0fd2a3a01a497a80
Inserted business: Ayur Wellness with id: 6756c55f0fd2a3a01a497a81
Inserted business: Silk Symphony with id: 6756c55f0fd2a3a01a497a82
Inserted product: Special Hyderabadi Biryani with id: 6756c55f0fd2a3a01a497a83
Inserted product: Haleem with id: 6756c55f0fd2a3a01a497a84
Inserted product: Zafrani Chai with id: 6756c55f0fd2a3a01a497a85
Inserted product: Mutton Paya with id: 6756c55f0fd2a3a01a497a86
Inserted product: Double Ka Meetha with id: 6756c55f0fd2a3a01a497a87
Inserted product: Organic Tomatoes with id: 6756c55f0fd2a3a01a497a88
Inserted product: Green Apples with id: 6756c55f0fd2a3a01a497a89
Inserted product: Organic Brown Rice with id: 6756c55f0fd2a3a01a497a8a
Inserted product: Farm Fresh Eggs with id: 6756c55f0fd2a3a01a497a8b
Inserted product: Organic Honey with id: 6756c55f0fd2a3a01a497a8c
Inserted product: South Sea Pearl Necklace with id: 6756c55f0fd2a3a01a497a8d
Inserted product: Pearl Stud Earrings with id: 6756c55f0fd2a3a01a497a8e
Inserted product: Pearl Bracelet with id: 6756c55f0fd2a3a01a497a8f
Inserted product: Tahitian Pearl Ring with id: 6756c55f0fd2a3a01a497a90
Inserted product: Pearl Pendant with id: 6756c55f0fd2a3a01a497a91
Inserted product: Abhyanga Massage with id: 6756c55f0fd2a3a01a497a92
Inserted product: Immunity Booster Package with id: 6756c55f0fd2a3a01a497a93
Inserted product: Shirodhara Treatment with id: 6756c55f0fd2a3a01a497a94
Inserted product: Herbal Hair Oil with id: 6756c55f0fd2a3a01a497a95
Inserted product: Panchakarma Package with id: 6756c55f0fd2a3a01a497a96
Inserted product: Kanjeevaram Silk Saree with id: 6756c55f0fd2a3a01a497a97
Inserted product: Designer Blouse with id: 6756c55f0fd2a3a01a497a98
Inserted product: Banarasi Lehenga with id: 6756c55f0fd2a3a01a497a99
Inserted product: Pochampally Ikat Saree with id: 6756c55f0fd2a3a01a497a9a
Inserted product: Silk Dupatta with id: 6756c55f0fd2a3a01a497a9b
```
