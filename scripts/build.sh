#!/usr/bin/env bash

MODE=$1

SCRIPT="npm run build:dev"

if [ $MODE = "prod" ]; then
  SCRIPT="npm run build";
fi

echo $SCRIPT

ENTRY="index.js" DEST="trae" $SCRIPT

ENTRY="unfetch.js" DEST="unfetch" $SCRIPT

ENTRY="raw.js" DEST="raw" $SCRIPT
