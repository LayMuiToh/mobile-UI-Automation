#!/bin/sh
NVM_PATH=~/.nvm/versions/node/v.10.15.1/bin
PATH=$NVM_PATH:/usr/local/bin:$PATH
export PATH

lsof -i -n -P | grep TCP | grep 4723 && echo "Appium is already running on port 4723" || appium & > /dev/null &

