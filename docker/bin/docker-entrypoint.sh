# docker-entrypoint.sh for node.js

echo "install dependencies"
npm install

echo "wait postgres db server"
dockerize -wait tcp://totem-postgres:5432 -timeout 20s

echo "start node server"
nodemon nodemon index.js && npm start