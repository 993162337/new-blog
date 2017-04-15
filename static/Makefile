# @Author: woolson
# @Date:   2016-11-10 10:11:00
# @Email:  woolson.lee@gmail.com
# @Last modified by:   woolson
# @Last modified time: 2017-03-10 11:03:38

SHELL := /bin/bash

assets = "assets/vendor/"
dist = "dist/"

build-vendors:
	rm _dev/vendors* _production/vendors*
	./shell/build_vendors
	node shell/hash-vendors.js
	@echo -e "\033[1;32m Complete build vendors ... !\033[m"

build-app:
	webpack-dev-server --config webpack.config.js --host 0.0.0.0 --hot --inline --progress --history-api-fallback

build-app-compress:
	@echo -e "\033[1;32m Building production ... !\033[m"
	rm -rf `ls _production/*.*.css _production/*.*.js|egrep -v 'vendors*'`
	touch app.styl
	NODE_ENV=production webpack --config webpack.production.config.js --colors --progress
	@echo -e "\033[1;32m Build production successful !\033[m"

deploy-web:
	@echo -e "\033[1;32m Syncing files to static resource of server\033[m"
	rsync -r -l --progress --delete _production/ root@115.159.203.146:/home/woolson/static

deploy-art:
	@echo -e "\033[1;32m Syncing article to static resource of server\033[m"
	rsync -r -l --progress --delete _production/articles/ root@115.159.203.146:/home/woolson/static/articles
