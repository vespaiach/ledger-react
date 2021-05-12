#!/bin/sh
echo -ne "Waiting for postgres to be ready "

until docker container exec -i budgets-postgres pg_isready -q -h 127.0.0.1; do
	sleep 1
 	echo -ne "."
done

echo ready