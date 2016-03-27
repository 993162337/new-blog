SHELL := /bin/bash

assets = "assets/vendor/"
dist = "dist/"

build_vendors:
	./scripts/build_vendors

app:
	webpack-dev-server --hot --inline --progress