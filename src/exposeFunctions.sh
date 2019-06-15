#!/bin/bash

echo "

function run(arg) {
  return prettierify.run(arg);
}

function format(parser) {
  return prettierify.format(parser);
}" >> ./build/Prettierify.lbaction/Contents/Scripts/main.js
