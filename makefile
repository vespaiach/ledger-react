build:
	docker-compose up -d --build
start:
	docker-compose up -d
stop:
	docker-compose down
seed:
	docker-compose exec budgets-server yarn run seeding
