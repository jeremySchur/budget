#!/bin/sh

cd /app/backend
npm run start &

cd /app/frontend
npm run start
