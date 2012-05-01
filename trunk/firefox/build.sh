#!/bin/bash

function _clean() {
	# Clean
	rm -Rf "$TARGET"
	mkdir "$TARGET"
}

function _copy() {
	# Copy base files
	cp -Rf "$SRC"/* $TARGET

	# Copy common files
	cp -Rf $COMMON/* "$TARGET/data"
}

function _cfx() {
    cd $TARGET
    $CFX $@
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

RELEASES="../../releases"
SRC="./src"
TARGET="./target"
COMMON="../common"
UPDATE_TESTING_RDF="https://auto-login-extension.googlecode.com/svn/releases/update-testing.rdf"
UPDATE_STABLE_RDF="https://auto-login-extension.googlecode.com/svn/releases/update-stable.rdf"

if [ -z "$CFX" ]; then
	CFX=cfx
	if [ -e $CFX ]; then
		echo "Please define CFX"
		exit 1
	fi
fi

if [ -z "$CFX_FIREFOX_INSTANCE" ]; then
    echo "Please define CFX_FIREFOX_INSTANCE"
    exit 1
fi

if [ -z "$CFX_FIREFOX_PROFILE_DIR" ]; then
    echo "Please define CFX_FIREFOX_PROFILE_DIR"
    exit 1
fi

CFX_TEST_OPTIONS="-b $CFX_FIREFOX_INSTANCE -p $CFX_FIREFOX_PROFILE_DIR"
CFX_INSTALL_OPTIONS="--update-url $UPDATE_TESTING_RDF"
CFX_RELEASE_OPTIONS="--update-url $UPDATE_STABLE_RDF"

if [ $# -eq 0 ]; then
	GOAL="run"
else
	GOAL="$1"
	shift
fi

_goal $GOAL $@
