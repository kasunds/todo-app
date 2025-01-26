# TODO APP


## Installation
This todo application is built with a Laravel API backend and a Vue.js frontend. It allows users to create, update, and delete todo items, with data stored in a MySQL database. The app supports various endpoints (GET, POST, PATCH, DELETE) for CRUD operations. It also uses unit and integration testing for the backend, and Cypress for e2e testing of the frontend.

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

4. Run backend Unit test and Integration test(Optional)
   ```bash  
   docker-compose exec backend php artisan test

5. Run frontend e2e(Optional) - run inside the frontend folder
   ```bash  
   npx cypress open

