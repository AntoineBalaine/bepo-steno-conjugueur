#!/bin/bash

readarray -t myArray < "$2"

for item in "${myArray[@]}"; do
if grep -Fq "$item" "$1"/*; then
:
else
echo "$item" >> motsManquants.txt
fi;

done
