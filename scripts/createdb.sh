#!/bin/bash

cat ./testdb.sql ./todo.sql | docker exec -i todo-db mysql -uroot -pajdajdsiasia
cat ./devdb.sql ./todo.sql | docker exec -i todo-db mysql -uroot -pajdajdsiasia