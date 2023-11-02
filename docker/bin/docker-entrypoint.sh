# docker-entrypoint.sh for node.js

echo "wait postgres db server"
dockerize -wait tcp://totem-postgres:5432 -timeout 30s

echo "running migrations"
./node_modules/.bin/prisma migrate dev --name init

echo "creating initial data"
node dist/prisma/seed.js

echo "start node server"
echo "node dist/adapters/driver/api/program.js"
node dist/adapters/driver/api/program.js