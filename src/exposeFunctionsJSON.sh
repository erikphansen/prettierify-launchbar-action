#!/bin/bash

echo "

function run(arg) {
  return prettierify.run(arg);
}" >> ./build/Prettierify-JSON.lbaction/Contents/Scripts/main.js
