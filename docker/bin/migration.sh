echo "running migrations"
cd /var/www && ./node_modules/.bin/prisma migrate dev --name init