#!/bin/bash
curl -X GET http://localhost:3000/api/repos/$1/commits \
    -b ./cookies \
    | jq .
