.PHONY: all

all: stop
	@docker-compose up -d --build

build:
	@docker-compose build

start: build
	@docker-compose up

stop:
	@docker-compose down --remove-orphans

logs:
	@docker-compose logs -f

restart: stop start;

