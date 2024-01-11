# docker-entrypoint.sh for node.js

echo "wait postgres db server"
dockerize -wait tcp://127.0.0.1:5432 -timeout 30s

RUN source /root/.bashrc

echo "running migrations"
./node_modules/.bin/prisma migrate dev --name init

echo "start node server"
echo "node dist/adapters/driver/api/program.js"
node dist/adapters/driver/api/program.js