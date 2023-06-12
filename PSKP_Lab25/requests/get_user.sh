#!/bin/bash
curl -X GET http://localhost:3000/api/users/$1 \
    -b ./cookies \
    | jq .
