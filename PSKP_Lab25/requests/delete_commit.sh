#!/bin/bash
curl -X DELETE http://localhost:3000/api/repos/$1/commits/$2 \
    -b ./cookies \
    | jq .
