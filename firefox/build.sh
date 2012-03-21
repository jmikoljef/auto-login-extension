#!/bin/bash

function _version() {
    echo `grep "version" package.json | sed s/[^0-9.]*//g`
}

function _clean() {
	# Clean
	rm -Rf "$TARGET"
	mkdir "$TARGET"
}

function _copy() {
	# Copy base files
	cp -Rf "$SRC"/* $TARGET

	# Conpy config file
	cp "$COMMON/scripts_config.js" "$TARGET/lib"

	# Copy scripts
	cp -Rf $SCRIPTS "$TARGET/data"
}

function _run() {
    cd $TARGET
    cfx $@
}

function _rename() {
    VERSION=`_version`
    mv "auto-login-extension.xpi" "auto-login-extension-$VERSION.xpi"
}

function _goal() {
    case "$GOAL" in
        run | test)
            _clean
            _copy
            _run "$GOAL" $CFX_TEST_OPTIONS $@
        ;;
        
        xpi)
            _clean
            _copy
            _run "xpi" $CFX_XPI_OPTIONS $@
            _rename
        ;;
        
        install)
            _goal "run" $@
        ;;
        
        package)
            _goal "xpi" $@
        ;;
        
        release)
            echo "Not yet implemented"
        ;;
        
        *)
            echo "Unknown goal"
        ;;
    esac
}

DEFAULT_FIREFOX_INSTANCE=`which firefox`
DEFAULT_FIREFOX_PROFILE_DIR="/tmp/dev"
SRC="./src"
TARGET="./target"
COMMON="../common"
SCRIPTS="$COMMON/scripts"
UPDATE_XPI="https://auto-login-extension.googlecode.com/files/auto-login-extension-latest.xpi"
UPDATE_RDF="https://auto-login-extension.googlecode.com/files/auto-login-extension.update.rdf"

if [ -z "$FIREFOX_INSTANCE" ]; then
    FIREFOX_INSTANCE=$DEFAULT_FIREFOX_INSTANCE
fi

if [ -z "$FIREFOX_PROFILE_DIR" ]; then
    FIREFOX_PROFILE_DIR=$DEFAULT_FIREFOX_PROFILE_DIR
fi
CFX_TEST_OPTIONS="-b $FIREFOX_INSTANCE -p $FIREFOX_PROFILE_DIR"
CFX_XPI_OPTIONS="--update-link $UPDATE_XPI --update-url $UPDATE_RDF"


if [ $# -eq 0 ]; then
	GOAL="run"
else
	GOAL="$1"
	shift
fi

_goal $GOAL $@
