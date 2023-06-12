#!/bin/bash
curl -X POST http://localhost:3000/api/auth/refresh \
    -b ./cookies \
    -c ./cookies \
    | jq .
