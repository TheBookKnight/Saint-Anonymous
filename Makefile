# build
.PHONY: build

## build: builds Saint Anonymous
build:
	@docker build --tag cadav001/saint-anonymous:latest --platform linux/amd64 --file ./deployments/Dockerfile .

# deploy
.PHONY: deploy

## deploy: deploys Discord commands to server
deploy:
	@npm run setup

# start
.PHONY: start

## start: starts up Saint Anonymous docker image
start:
	@docker compose --file docker-compose.yml build
	@docker compose --file docker-compose.yml up --detach

# stop
.PHONY: stop

## stop: Stops Saint Anonymous
stop:
	@docker compose --file docker-compose.yml down --volumes

.PHONY: config 
config:
	@docker cp config.json saint-anonymous:/usr/src/bot/

.PHONY: help
help: Makefile
	@sed -n 's/^##//p' $< | column -t -s ':' | sed -e 's/^/ /'