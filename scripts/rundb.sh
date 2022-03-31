#!/bin/bash

docker-compose -f docker-mariadb.yml up -d
docker logs -f todo-db
