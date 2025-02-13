# Use PHP 8.2 with Apache
FROM php:8.2-apache

# Install dependencies for SQLite support
RUN apt-get update && apt-get install -y libsqlite3-dev

# for debian/ubuntu-based images
RUN apt-get update -y && apt-get install -y ca-certificates fuse3 sqlite3

COPY --from=flyio/litefs:0.5 /usr/local/bin/litefs /usr/local/bin/litefs

ENTRYPOINT litefs mount

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite

# Copy project files to Apache's web directory
COPY . /var/www/html

# Set the working directory
WORKDIR /var/www/html

# Expose port 80 (Apache default)
EXPOSE 80

# Start Apache when the container runs
CMD ["apache2-foreground"]





