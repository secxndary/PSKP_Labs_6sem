#!/bin/bash
curl -X POST http://localhost:3000/api/repos/ \
    -d "name=$1" \
    -b ./cookies \
    | jq .
