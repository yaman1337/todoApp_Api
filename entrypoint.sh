#!/bin/sh

while ! nc -z mongodb 27017; do sleep 0.1; done;

npx nodemon app.js

