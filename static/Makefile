SHELL := /bin/bash

assets = "assets/vendor/"
dist = "dist/"

build-vendors:
	./shell/build_vendors

build-app:
	webpack-dev-server --config webpack.config.js --hot --inline --progress

build-compress:
	webpack --config webpack.production.config.js --colors --progress

deploy-web:
	# cp -rf dev/ ../sever/templates
	@echo -e "\033[1;32m Syncing files to static resource of server\033[m"
	rsync -r -l --progress --delete dev/ root@115.159.226.253:/home/woolson/static
