.PHONY: start
start:
	@docker-compose up --detach

.PHONY: stop
stop:
	@docker-compose down