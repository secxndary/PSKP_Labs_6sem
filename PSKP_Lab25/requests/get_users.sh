#!/bin/bash
curl -X GET http://localhost:3000/api/users \
    -b ./cookies \
    | jq .
