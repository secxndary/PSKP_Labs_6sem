#!/bin/bash
curl -X POST http://localhost:3000/api/repos/$1/commits/ \
    -d "message=$2" \
    -b ./cookies \
    | jq .
