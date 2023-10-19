FROM node:18.18.0-alpine

ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.7.0/dockerize-alpine-linux-amd64-v0.7.0.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.7.0.tar.gz
WORKDIR /var/www

ENV TZ=America/Sao_Paulo
RUN echo $TZ > /etc/timezone

ARG DEBIAN_FRONTEND=noninteractive

ENV PATH /var/www/node_modules/.bin:$PATH

ADD application /var/www

RUN npm run prisma generate
RUN tsc

ADD docker/bin /var/bin

RUN chown -R 1000:1000 /var/www

RUN chmod 777 /var/bin/docker-entrypoint.sh
ENTRYPOINT /var/bin/docker-entrypoint.sh

EXPOSE 80
