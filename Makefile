# build
.PHONY: build/full build/lite

## build/full: builds Saint Anonymous with music player
build/full:
	@docker build --tag cadav001/saint-anonymous:full --file ./deployments/full/Dockerfile .

## build/lite: builds Saint Anonymous without music player
build/lite:
	@docker build --tag cadav001/saint-anonymous:lite --file ./deployments/lite/Dockerfile .

## deploy-commands: deploys Discord commands tos erver
.PHONY: deploy-commands
deploy-commands:
	@npm run setup

# start
.PHONY: start/full start/lite

## start/full: starts up Saint Anonymous docker image with music player
start/full:
	@docker-compose --file docker-compose.full.yml build
	@docker-compose --file docker-compose.full.yml up --detach

## start/lite: starts up Saint Anonymous docker image with music player
start/lite:
	@docker-compose --file docker-compose.lite.yml build
	@docker-compose --file docker-compose.lite.yml up --detach

# stop
.PHONY: stop/full stop/lite

## stop/full: 
stop/full:
	@docker-compose --file docker-compose.full.yml down --volumes

## stop/lite:
stop/lite:
	@docker-compose --file docker-compose.lite.yml down --volumes

.PHONY: config 
config:
	@docker cp config.json saint-anonymous:/usr/src/bot/

.PHONY: help
help: Makefile
	@sed -n 's/^##//p' $< | column -t -s ':' | sed -e 's/^/ /'