# @Author: woolson
# @Date:   2016-11-10 10:11:00
# @Email:  woolson.lee@gmail.com
# @Last modified by:   woolson
# @Last modified time: 2016-11-29 09:11:80

SHELL := /bin/bash

assets = "assets/vendor/"
dist = "dist/"

# 构建mobile
build-mobile:
	rm -rf _mobile/*
	rsync -r --exclude="index.html" --exclude="public" _production/ _mobile/
	cp html/m.index.html _mobile/index.html
	node shell/build-mobile.js

build-vendors:
	rm _dev/vendors* _production/vendors*
	./shell/build_vendors
	node shell/hash-vendors.js
	@echo -e "\033[1;32m Complete build vendors ... !\033[m"

build-app:
	webpack-dev-server --config webpack.config.js --hot --inline --progress

build-app-compress:
	@echo -e "\033[1;32m Building production ... !\033[m"
	rm -rf `ls _production/*.*.css _production/*.*.js|egrep -v 'vendors*'`
	touch app.styl
	touch mobile.styl
	NODE_ENV=production webpack --config webpack.production.config.js --colors --progress
	@echo -e "\033[1;32m Build production successful !\033[m"

deploy-web:
	# cp -rf dev/ ../sever/templates
	@echo -e "\033[1;32m Syncing files to static resource of server\033[m"
	rsync -r -l --progress --delete _production/ root@123.206.220.242:/home/woolson/static
	rsync -r -l --progress --delete _mobile/ root@123.206.220.242:/home/woolson/mobile
