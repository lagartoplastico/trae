#!/usr/bin/env bash

MODE=$1

SCRIPT="npm run rollup"

if [ "$MODE" = "prod" ]; then
  SCRIPT="npm run rollup:prod";
fi

ENTRY="trae" $SCRIPT

ENTRY="unfetch" $SCRIPT

ENTRY="raw" $SCRIPT
