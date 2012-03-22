#!/bin/bash

ROOT_DIR=`dirname $0`
EXTENSION_NAME="auto-login-extension"
SRC_DIR="${ROOT_DIR}/src"
BUILD_DIR="${ROOT_DIR}/build"
EXTENSION_DIR="${BUILD_DIR}/${EXTENSION_NAME}"
COMMON_DIR="${ROOT_DIR}/../common"
SCRIPTS_DIR="${COMMON_DIR}/scripts"

# Oui je sais que c'est sale, mais là je ne vois pas comment faire
CHROME="/opt/google/chrome/chrome"
# CHROME="/usr/bin/chromium-browser"

# Clean
rm -Rf "${BUILD_DIR}"
mkdir "${BUILD_DIR}"
mkdir "${EXTENSION_DIR}"


# Copy base files
cp -Rf ${SRC_DIR}/* ${EXTENSION_DIR}

# Copy config file
cp -Rf ${COMMON_DIR}/* ${EXTENSION_DIR}

# Create or update the extension
if [ -a ${EXTENSION_NAME}.pem ]; then
  # Update the extension, using existing key
  "${CHROME}" --pack-extension="$EXTENSION_DIR" --pack-extension-key="${EXTENSION_NAME}.pem"
else
  # Create the extension
  "${CHROME}" --pack-extension="$EXTENSION_DIR"
  # Newly created key will be saved
  mv ${BUILD_DIR}/${EXTENSION_NAME}.pem ${ROOT_DIR}
fi


