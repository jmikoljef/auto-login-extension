#!/bin/bash

SRC="./src"
TARGET="./target"
COMMON="../common"
SCRIPTS="$COMMON/scripts"

# Oui je sais que c'est sale, mais là je ne vois pas comment faire
CFX_OPTIONS="-b ~/.usr/firefox/firefox"

# Clean
rm -Rf "$TARGET"
mkdir "$TARGET"

# Copy base files
cp -Rf "$SRC"/* $TARGET

# Conpy config file
cp "$COMMON/scripts_config.js" "$TARGET/lib"

# Copy scripts
cp -Rf $SCRIPTS "$TARGET/data"

cd $TARGET

if [ $# -eq 0 ]; then
	cfx ${CFX_OPTIONS} run
else
	cfx ${CFX_OPTIONS} $@
fi
