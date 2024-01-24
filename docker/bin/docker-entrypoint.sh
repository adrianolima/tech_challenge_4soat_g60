# docker-entrypoint.sh for node.js

echo "wait postgres db server"
dockerize -wait tcp://totem-postgres:5432 -timeout 30s

RUN source /root/.bashrc

echo "running migrations"
cd /var/www && ./node_modules/.bin/prisma migrate dev --name init

echo "start node server"
echo "node /var/www/dist/adapters/driver/api/program.js"
node /var/www/dist/adapters/driver/api/program.js