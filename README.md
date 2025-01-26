# TODO APP


## Installation

Follow the steps below to get your environment set up for development.

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

