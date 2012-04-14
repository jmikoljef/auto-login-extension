#!/bin/bash

function _clean() {
	# Clean
	rm -Rf "$TARGET"
	mkdir "$TARGET"
}

function _copy() {
	# Copy base files
	cp -Rf "$SRC"/* $TARGET

	# Conpy config file
	cp "$COMMON/manifest.js" "$TARGET/lib"

	# Copy scripts
	cp -Rf $SCRIPTS "$TARGET/data"

	# Copy options UI
	cp -Rf $OPTIONS/* "$TARGET/data/options"

	# Copy notifications system
	cp -Rf $NOTIFICATIONS "$TARGET/data"
}

function _cfx() {
    cd $TARGET
    cfx $@
    cd -
}

function _version() {
    echo `grep "version" $TARGET/package.json | sed s/[^0-9.]*//g`
}

function _rename() {
    VERSION=`_version`
    OLD_FILE_NAME="auto-login-extension.xpi"
    NEW_FILE_NAME="auto-login-extension-$VERSION.xpi"
    mv $TARGET/$OLD_FILE_NAME $TARGET/$NEW_FILE_NAME
}

function _move() {
    VERSION=`_version`
    FILE_NAME="auto-login-extension-$VERSION.xpi"
    mv $TARGET/$FILE_NAME $RELEASES
}

function _warningRDF() {
    echo "################################################################################"
    echo "##########                                                            ##########"
    echo "##########          WARNING : Update RDF file !                       ##########"
    echo "##########                                                            ##########"
    echo "################################################################################"
}

#
# ###
#

function _test() {
    _clean
    _copy
    _cfx "test" $CFX_TEST_OPTIONS $@
}

function _run() {
    _clean
    _copy
    _cfx "run" $CFX_TEST_OPTIONS $@
}

function _install() {
    _clean
    _copy
    _cfx "xpi" $CFX_INSTALL_OPTIONS $@
    _rename
}

function _release() {
    _clean
    _copy
    _cfx "xpi" $CFX_RELEASE_OPTIONS $@
    _rename
    _move
    _warningRDF
}

#
# ###
#

function _goal() {
    case "$GOAL" in
        test)
            _test $@
        ;;

        run)
            _run $@
        ;;

        install)
            _install $@
        ;;

        release)
            _release  $@
        ;;

        *)
            echo "Unknown goal"
        ;;
    esac
}

DEFAULT_FIREFOX_INSTANCE=`which firefox`
DEFAULT_FIREFOX_PROFILE_DIR="/tmp/dev"
RELEASES="../../releases"
SRC="./src"
TARGET="./target"
COMMON="../common"
SCRIPTS="$COMMON/scripts"
OPTIONS="$COMMON/options"
NOTIFICATIONS="$COMMON/notifications"
UPDATE_DEV_RDF="https://auto-login-extension.googlecode.com/svn/releases/update-dev.rdf"
UPDATE_STABLE_RDF="https://auto-login-extension.googlecode.com/svn/releases/update-stable.rdf"

if [ -z "$FIREFOX_INSTANCE" ]; then
    FIREFOX_INSTANCE=$DEFAULT_FIREFOX_INSTANCE
fi

if [ -z "$FIREFOX_PROFILE_DIR" ]; then
    FIREFOX_PROFILE_DIR=$DEFAULT_FIREFOX_PROFILE_DIR
fi
CFX_TEST_OPTIONS="-b $FIREFOX_INSTANCE -p $FIREFOX_PROFILE_DIR"
CFX_INSTALL_OPTIONS="--update-url $UPDATE_DEV_RDF"
CFX_RELEASE_OPTIONS="--update-url $UPDATE_STABLE_RDF"

if [ $# -eq 0 ]; then
	GOAL="run"
else
	GOAL="$1"
	shift
fi

_goal $GOAL $@
