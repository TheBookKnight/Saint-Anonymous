# build
.PHONY: build/full build/lite

## build/full: builds Saint Anonymous with music player
build/full:
	@docker build --tag cadav001/saint-anonymous:full --file ./deployments/full/Dockerfile .

## build/lite: builds Saint Anonymous without music player
build/lite:
	@docker build --tag cadav001/saint-anonymous:lite --file ./deployments/lite/Dockerfile .

# deploy
.PHONY: deploy/full deploy/lite

## deploy/full: deploys Discord commands to server including music player's
deploy/full:
	@VERSION=FULL npm run setup

## deploy/lite: deploys Discord commands to server
deploy/lite:
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

## stop/full: Stops Saint Anonymous full setup
stop/full:
	@docker-compose --file docker-compose.full.yml down --volumes

## stop/lite: Stops Saint Anonymous lite setup
stop/lite:
	@docker-compose --file docker-compose.lite.yml down --volumes

.PHONY: config 
config:
	@docker cp config.json saint-anonymous:/usr/src/bot/

.PHONY: help
help: Makefile
	@sed -n 's/^##//p' $< | column -t -s ':' | sed -e 's/^/ /'