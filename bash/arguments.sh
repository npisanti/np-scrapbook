#!/bin/bash

MULTIARGS=""

for var in "$@"
do
    FILEPATH=$(realpath "$var")
    echo "$FILEPATH"
    
    MULTIARGS="$MULTIARGS$FILEPATH "
done

echo "$MULTIARGS"

exit
