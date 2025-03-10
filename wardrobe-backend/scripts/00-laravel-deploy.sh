#!/usr/bin/env bash
echo "Running composer"
composer global require hirak/prestissimo
composer install --no-dev --working-dir=/var/www/html

echo "generating application key..."
#php artisan key:generate --show

php artisan cache:clear
php artisan config:clear
php artisan config:cache
php artisan route:clear

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running composer install..."
composer install --no-dev

#composer dump-autoload
echo "Running composer dump-autoload..."
composer dump-autoload

#refresh database
echo "Refreshing database..."
#php artisan migrate:fresh --force

echo "Running migrations..."
#php artisan migrate --force

#run seeders
echo "Running seeders..."
#php artisan db:seed --force

systemctl restart nginx
