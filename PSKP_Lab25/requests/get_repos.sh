#!/bin/bash
curl -X GET http://localhost:3000/api/repos \
    | jq .
