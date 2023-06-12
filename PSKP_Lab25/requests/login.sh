#!/bin/bash
curl -X POST http://localhost:3000/api/auth/login \
    -d "username=$1" \
    -d "password=$2" \
    -c ./cookies \
    | jq .
