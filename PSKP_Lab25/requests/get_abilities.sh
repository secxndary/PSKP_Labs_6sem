#!/bin/bash
curl -X GET http://localhost:3000/api/auth/abilities \
    -b ./cookies \
    | jq .
