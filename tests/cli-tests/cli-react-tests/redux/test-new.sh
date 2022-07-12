#!/bin/sh

. ../../../utils.sh

# Crear app

print_test "Test new-react Redux"

PROJECT_NAME=test-estructura

clear "${PROJECT_NAME}"
goten new-react "${PROJECT_NAME}" -r -a 'http://localhost:3800/'

new_exit_code=$?
mensaje_new="Ejecutar new-react"
validate_exit_code "${new_exit_code}" "${mensaje_new}"

# Directorios

PROJECT_DIR=./"${PROJECT_NAME}"

SRC_DIR="${PROJECT_DIR}"/src
UTILS_DIR="${SRC_DIR}"/utils
API_DIR="${UTILS_DIR}"/api
REDUX_DIR="${SRC_DIR}"/redux
REDUCERS_DIR="${REDUX_DIR}"/reducers
MODULES_DIR="${SRC_DIR}"/modules
LAYOUT_DIR="${SRC_DIR}"/layout
DUCK_DIR="${SRC_DIR}"/duck
CONFIG_DIR="${SRC_DIR}"/config
PUBLIC_DIR="${PROJECT_DIR}"/public

directory_exists "${PROJECT_DIR}"
directory_exists "${SRC_DIR}"
directory_exists "${UTILS_DIR}"
directory_exists "${API_DIR}"
directory_exists "${REDUX_DIR}"
directory_exists "${REDUCERS_DIR}"
directory_exists "${MODULES_DIR}"
directory_exists "${LAYOUT_DIR}"
directory_exists "${DUCK_DIR}"
directory_exists "${CONFIG_DIR}"
directory_exists "${PUBLIC_DIR}"

# Files

YARN_LOCK="${PROJECT_DIR}"/yarn.lock
PACKAGE_JSON="${PROJECT_DIR}"/package.json
PACKAGE_LOCK_JSON="${PROJECT_DIR}"/package-lock.json
GOTEN_DOT="${PROJECT_DIR}"/.goten
README="${PROJECT_DIR}"/README.md
GIT_IGNORE="${PROJECT_DIR}"/.gitignore
SNACKBAR="${SRC_DIR}"/Snackbar.jsx
INDEX_JS="${SRC_DIR}"/index.js
INDEX_CSS="${SRC_DIR}"/index.css
HISTORY="${SRC_DIR}"/history.js
APP_JSX="${SRC_DIR}"/App.jsx
APP_CSS="${SRC_DIR}"/App.css
CONSTS="${UTILS_DIR}"/consts.js
STORE="${REDUX_DIR}"/store.js
APP_REDUCER="${REDUCERS_DIR}"/appReducer.js
SEARCHER="${LAYOUT_DIR}"/Searcher.jsx
NAVBAR="${LAYOUT_DIR}"/Navbar.jsx
MODAL="${LAYOUT_DIR}"/Modal.jsx
HOME="${LAYOUT_DIR}"/Home.jsx
BUTTON_WITH_ALERT="${LAYOUT_DIR}"/ButtonWithAlert.jsx
ALERT_MODAL="${LAYOUT_DIR}"/AlertModal.jsx
TYPES="${DUCK_DIR}"/types.js
OPERATIONS="${DUCK_DIR}"/operations.js
DUCK_INDEX="${DUCK_DIR}"/index.js
ACTIONS="${DUCK_DIR}"/actions.js
CONFIG="${CONFIG_DIR}"/config.js
MANIFEST_JSON="${PUBLIC_DIR}"/manifest.json
INDEX_HTML="${PUBLIC_DIR}"/index.html
FAVICON="${PUBLIC_DIR}"/favicon.ico
ROBOTS="${PUBLIC_DIR}"/robots.txt

file_exists "${YARN_LOCK}"
file_exists "${PACKAGE_JSON}"
file_exists "${PACKAGE_LOCK_JSON}"
file_exists "${GOTEN_DOT}"
file_exists "${README}"
file_exists "${GIT_IGNORE}"
file_exists "${SNACKBAR}"
file_exists "${INDEX_JS}"
file_exists "${INDEX_CSS}"
file_exists "${HISTORY}"
file_exists "${APP_JSX}"
file_exists "${APP_CSS}"
file_exists "${CONSTS}"
file_exists "${STORE}"
file_exists "${APP_REDUCER}"
file_exists "${SEARCHER}"
file_exists "${NAVBAR}"
file_exists "${MODAL}"
file_exists "${HOME}"
file_exists "${BUTTON_WITH_ALERT}"
file_exists "${ALERT_MODAL}"
file_exists "${TYPES}"
file_exists "${OPERATIONS}"
file_exists "${DUCK_INDEX}"
file_exists "${ACTIONS}"
file_exists "${CONFIG}"
file_exists "${MANIFEST_JSON}"
file_exists "${INDEX_HTML}"
file_exists "${FAVICON}"
file_exists "${ROBOTS}"

# Levantar app

cd "${PROJECT_DIR}"
echo 'Probando build...'
npm run build > /dev/null
build_exit_code=$?
cd ../

mensaje_build="Build de la app"
validate_exit_code "${build_exit_code}" "${mensaje_build}"

clear "${PROJECT_NAME}"
