# docker-entrypoint.sh for node.js

echo "install dependencies"
npm install

echo "wait postgres db server"
dockerize -wait tcp://totem-postgres:5432 -timeout 20s

echo "running migrations"
npm run prisma migrate dev --name init

echo "start node server"
echo "node dist/adapters/driver/api/program.js"
nodemon nodemon index.js && npm start