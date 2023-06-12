#!/bin/bash
curl -X POST http://localhost:3000/api/auth/reg \
    -d "username=$1" \
    -d "password=$2" \
    -d "email=$3" \
    -c ./cookes \
    | jq .
