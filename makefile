
# kill all server-runing processes \
https://stackoverflow.com/questions/11871921/suppress-and-ignore-output-for-makefile \
https://www.howtogeek.com/562941/how-to-use-the-awk-command-on-linux/ \
https://www.linuxcommands.site/tech-topic/internet/how-to-run-a-script-in-the-background-in-linux/

DATABASE_URL=postgresql://budgets:budgets@localhost:5432/budgets?schema=api_test

stop-postgres:
	docker container rm -f budgets-api
start-postgres: stop-postgres
	docker container run --name budgets-api -e POSTGRES_PASSWORD=budgets -e POSTGRES_DB=budgets -e POSTGRES_USER=budgets -d postgres
stop-server:
	@-kill $$(ps aux | grep -i 'node\spackages\/server\/out/server\.js' | awk '{ print $$2 }')
build-server: start-postgres
	export DATABASE_URL=$(DATABASE_URL) && npm run build:server
start-server: stop-server build-server
	export DATABASE_URL=$(DATABASE_URL) && node packages/server/out/server.js > /dev/null 2>&1 & echo $$!
test-server: start-server
	export DATABASE_URL=$(DATABASE_URL) && npm run test:server

build-server-ci:
	export DATABASE_URL=$(DATABASE_URL) && npm run build:server
start-server-ci: build-server-ci
	export DATABASE_URL=$(DATABASE_URL) && node packages/server/out/server.js > /dev/null 2>&1 & echo $$!
test-server-ci: start-server-ci
	export DATABASE_URL=$(DATABASE_URL) && npm run test:server
