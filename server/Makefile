SHELL := /bin/bash

build-dev:
	@echo -e "\033[1;32m Build files for develop\033[m"
	babel -w app/ -d _dev/ -s

build-app:
	@echo -e "\033[1;32m Run server at http://localhost:8081\033[m"
	babel app/ -d _dev/ -s
	node _dev/app.js

deploy:
	@echo -e "\033[1;32m Build files for production\033[m"
	babel app/ -d _production/ -s
	rm _production/package.json
	cp package.json _production/package.json
	rsync -r -l --progress --exclude="node_modules" --delete _production/ root@115.159.203.146:/home/woolson/blog
	@echo -e "\033[1;32m Release production success\033[m"
