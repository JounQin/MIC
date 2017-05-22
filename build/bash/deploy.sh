#!/usr/bin/env bash

set -e
git pull origin master
yarn
pm2 delete mic
yarn build
yarn pm2
