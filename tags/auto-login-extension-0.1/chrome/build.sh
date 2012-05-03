#!/bin/sh

ROOT_DIR=`dirname $0`
EXTENSION_NAME="auto-login-extension"
SRC_DIR="${ROOT_DIR}/src"
BUILD_DIR="${ROOT_DIR}/build"
EXTENSION_DIR="${BUILD_DIR}/${EXTENSION_NAME}"
COMMON_DIR="${ROOT_DIR}/../common"
SCRIPTS_DIR="${COMMON_DIR}/scripts"

if [ -z "$CHROME" ]; then
	CHROME="/opt/google/chrome/chrome"
#	CHROME="/usr/bin/chromium-browser"
fi

clean() {
	# Clean
	rm -Rf "${BUILD_DIR}"
}

init() {
	clean

	mkdir "${BUILD_DIR}"
	mkdir "${EXTENSION_DIR}"
}

build() {
	init

	# Copy base files
	cp -Rf ${SRC_DIR}/* ${EXTENSION_DIR}

	# Copy config file
	cp -Rf ${COMMON_DIR}/* ${EXTENSION_DIR}

	echo "Extension created in ${EXTENSION_DIR}"
}

package() {
	build

	# Create or update the extension
	if [ -e ${EXTENSION_NAME}.pem ]; then
	  # Update the extension, using existing key
	  "${CHROME}" --pack-extension="$EXTENSION_DIR" --pack-extension-key="${EXTENSION_NAME}.pem"
	else
	  # Create the extension
	  "${CHROME}" --pack-extension="$EXTENSION_DIR"
	  # Newly created key will be saved
	  mv ${BUILD_DIR}/${EXTENSION_NAME}.pem ${ROOT_DIR}
	fi
}

if [ -z "$1" ]; then
	TARGET="build"
else
	TARGET=$1
fi

eval $TARGET

