#!/usr/bin/env bash

if [ $1 != "trae" ] && [ $1 != "unfetch" ] && [ $1 != "raw" ]; then
  $1="trae";
fi

ENTRY=$1 npm run rollup:watch 
