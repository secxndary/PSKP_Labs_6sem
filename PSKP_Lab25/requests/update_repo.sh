#!/bin/bash
curl -X PUT http://localhost:3000/api/repos/$1 \
    -d "name=$2" \
    -b ./cookies \
    | jq .
