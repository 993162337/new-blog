SHELL := /bin/bash

build-dev:
	@echo -e "\033[1;32m Build files for develop\033[m"
	babel -w app/ -d _dev/ -s

build-pro:
	@echo -e "\033[1;32m Build files for production\033[m"
	babel app/ -d _dev/ -s
	gulp compress

run:
	@echo -e "\033[1;32m Run server at http://localhost:3000\033[m"
	node _dev/app.js

deploy:
	@echo -e "\033[1;32m Build files for production\033[m"
	rm _production/package.json
	cp package.json _production/package.json
	rsync -r -l --progress --exclude="node_modules" --delete _production/ root@115.159.226.253:/home/woolson/blog
