SHELL := /bin/bash

assets = "assets/vendor/"
dist = "dist/"

build-vendors:
	./scripts/build_vendors

build-app:
	webpack-dev-server --hot --inline --progress
