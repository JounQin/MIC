#!/usr/bin/env bash

set -e
git pull origin master
yarn
pm2 delete mic
cross-env PORT=6000 yarn build
yarn pm2
