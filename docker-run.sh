#!/bin/sh

docker run -v $PWD:/app -w /app -it node:12.13.0-alpine sh
