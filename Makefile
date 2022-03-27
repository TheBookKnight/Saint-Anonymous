.PHONY: build
build:
	@docker build --tag saint-anonymous .
	@docker tag saint-anonymous cadav001/saint-anonymous:saint-anonymous

.PHONY: start
start:
	@docker-compose up --detach

.PHONY: stop
stop:
	@docker-compose down