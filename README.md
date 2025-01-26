# TODO APP


## Installation
This todo application is built with a Laravel API backend and a Vue.js frontend. It allows users to create, update, and delete todo items, with data stored in a MySQL database. The app supports various endpoints (GET, POST, PATCH, DELETE) for CRUD operations. Test cases related to unit and integration testing for the backend also included.

Follow the steps below to get your environment set up for run this application.

1. Clone the repository:
   ```bash
   git clone https://github.com/kasunds/assessment.git

2. Build project
   ```bash  
   docker-compose up --build

3. Migrate database with sample data
   ```bash  
   docker-compose exec backend php artisan migrate

4. Backend can access using
   ```bash
   http://localhost:8000

5. If there is any issue in backend please run this command(Optional)
   ```bash
   docker-compose exec backend composer install

6. Frontend can access using
   ```bash
   http://localhost:8080

7. Run backend Unit test and Integration test(Optional)
   ```bash  
   docker-compose exec backend php artisan test

8. Run frontend e2e(Optional) - run inside the frontend folder and to run this need to install cypress manually
   ```bash  
   npm install --save-dev cypress
   npx cypress open

