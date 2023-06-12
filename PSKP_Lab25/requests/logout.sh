#!/bin/bash
curl -X POST http://localhost:3000/api/auth/logout \
    -b ./cookies \
    -c ./cookies \
    | jq .
