#!/bin/bash

echo "RUNNING MIGRATIONS"
yarn typeorm migration:run

echo "RUNNING SEEDS"
yarn seed

echo "STARTING APPLICATION"
yarn start
