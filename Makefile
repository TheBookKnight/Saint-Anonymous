.PHONY: build
build:
	@docker build --tag saint-anonymous .
	@docker tag saint-anonymous cadav001/saint-anonymous:saint-anonymous

.PHONY: deploy-commands
deploy-commands:
	@npm run setup

.PHONY: start
start:
	@docker-compose build
	@docker-compose up --detach

.PHONY: stop
stop:
	@docker-compose down

.PHONY: config 
config:
	@docker cp config.json saint-anonymous:/usr/src/bot/