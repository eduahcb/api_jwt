#!/bin/bash

echo "RUNNING MIGRATIONS"
node ./node_modules/typeorm/cli.js migration:run

echo "RUNNING SEEDS"
node ./build/seeding.js

echo "STARTING APPLICATION"
node build/server.js
