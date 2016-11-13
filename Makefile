# @Author: woolson
# @Date:   2016-08-07 22:08:00
# @Email:  woolson.lee@gmail.com
# @Last modified by:   woolson
# @Last modified time: 2016-11-13 22:11:88

SHELL := /bin/bash

deploy-production:
	$(call rsyncSever)
	$(call rsyncWeb)
	@echo -e "\033[1;32m Rsync Server and Web files Successful ! \033[m"

define rsyncSever
	echo -e "\033[1;32m Rsync server side \033[m"
	cd server && make build-compress && make deploy
endef

define rsyncWeb
	echo -e "\033[1;32m Rsync web side \033[m"
	cd static && make build-app-compress && make deploy-web
endef
