# Use the official PHP image
FROM php:8.2-cli

# Install necessary extensions and dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy Laravel application files
COPY . .

# Install dependencies
RUN composer install

# Expose port 8000 for the PHP built-in server
EXPOSE 8000

# Command to run the Laravel development server
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
# CMD php artisan migrate --force && php -S 0.0.0.0:8000 -t public
# CMD ["sh", "-c", "php artisan migrate --force && php -S 0.0.0.0:8000 -t public"]


