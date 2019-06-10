#!/bin/bash

echo "

function run(arg) {
  return prettierify.run(arg);
}

function format(parser) {
  return prettierify.format(parser);
}" >> ./Contents/Scripts/main.js
