#!/bin/bash

POSTGRES_CONTAINER=budgets-dev-postgres
DATABASE_URL=postgresql://budgets:budgets@localhost:5432/budgets?schema=api_dev

if [ "$( docker container inspect -f '{{.State.Status}}' $POSTGRES_CONTAINER )" != "running" ]; then 
  echo "Start Postgres server..."
	docker container run --rm --name $POSTGRES_CONTAINER -e POSTGRES_PASSWORD=budgets -e POSTGRES_DB=budgets -e POSTGRES_USER=budgets -d -p 5432:5432 postgres
fi

until docker container exec -i $POSTGRES_CONTAINER pg_isready -q -h 127.0.0.1; do
	sleep 1
 	echo -ne "."
done

npm run prisma:deploy
npm run seeding
node $1 $2 $3