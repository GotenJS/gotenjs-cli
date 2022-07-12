#!/bin/sh

. ../../utils.sh
# Directories

PROJECT_NAME=test-estructura

PROJECT_DIR=./${PROJECT_NAME}
SRC_DIR="${PROJECT_DIR}"/src
APP_DIR="${SRC_DIR}"/app
COMPONENTS_DIR="${APP_DIR}"/components
HOME_COMPONENT_DIR="${COMPONENTS_DIR}"/home.component
MENU_COMPONENT_DIR="${COMPONENTS_DIR}"/menu.component
GENERICS_DIR="${COMPONENTS_DIR}"/generics
GOTEN_CONFIRM_BUTTON_DIR="${GENERICS_DIR}"/goten.confirm.button.component
GOTEN_DATEPICKER_DIR="${GENERICS_DIR}"/goten.datepicker.component
GOTEN_LIST_DIR="${GENERICS_DIR}"/goten.list.component
GOTEN_PAGINATION_DIR="${GENERICS_DIR}"/goten.pagination.component
GOTEN_RADIO_DIR="${GENERICS_DIR}"/goten.radio.component
DTOS_DIR="${APP_DIR}"/dtos
FILTERS_DIR="${DTOS_DIR}"/filters
RESPONSES_DIR="${DTOS_DIR}"/responses
SERVICES_DIR="${APP_DIR}"/services
ASSETS_DIR="${SRC_DIR}"/assets
ENVIRONMENTS_DIR="${SRC_DIR}"/environments

print_test "Test new-angular"

clear "${PROJECT_NAME}"
goten new-angular "${PROJECT_NAME}" -a 'http://127.0.0.1:3800/'
new_exit_code=$?

mensaje_new="Ejecutar new-angular"
validate_exit_code "${new_exit_code}" "${mensaje_new}"

directory_exists ${PROJECT_DIR}
directory_exists ${SRC_DIR}
directory_exists ${APP_DIR}

# Verificar components

directory_exists ${COMPONENTS_DIR}
directory_exists ${HOME_COMPONENT_DIR}
directory_exists ${MENU_COMPONENT_DIR}
directory_exists ${GENERICS_DIR}

# Verificar generics

directory_exists ${GOTEN_CONFIRM_BUTTON_DIR}
directory_exists ${GOTEN_DATEPICKER_DIR}
directory_exists ${GOTEN_LIST_DIR}
directory_exists ${GOTEN_PAGINATION_DIR}
directory_exists ${GOTEN_RADIO_DIR}

# Verificar dtos

directory_exists ${DTOS_DIR}
directory_exists ${FILTERS_DIR}
directory_exists ${RESPONSES_DIR}

# Verificar services 

directory_exists ${SERVICES_DIR}

# Verificar assets

directory_exists ${ASSETS_DIR}

# Verificar environments

directory_exists ${ENVIRONMENTS_DIR}

# Files

GOTEN_DOT="${PROJECT_DIR}"/.goten
PACKAGE_JSON="${PROJECT_DIR}"/package.json
PACKAGE_LOCK_JSON="${PROJECT_DIR}"/package-lock.json
ANGULAR_JSON="${PROJECT_DIR}"/angular.json
README="${PROJECT_DIR}"/README.md
TSCONFIG_JSON="${PROJECT_DIR}"/tsconfig.json
TSLINT_JSON="${PROJECT_DIR}"/tslint.json
GIT_IGNORE="${PROJECT_DIR}"/.gitignore
VARIABLES_CUSTOM="${SRC_DIR}"/_variables_custom.scss
FAVICON="${SRC_DIR}"/favicon.ico
INDEX_HTML="${SRC_DIR}"/index.html
MAIN_TS="${SRC_DIR}"/main.ts
STYLES_SCSS="${SRC_DIR}"/styles.scss
BROWSERS_LIST="${SRC_DIR}"/browserslist
POLYFILLS="${SRC_DIR}"/polyfills.ts
STYLES_CSS="${SRC_DIR}"/styles.css
TEST="${SRC_DIR}"/test.ts
TSCONFIG_APP="${SRC_DIR}"/tsconfig.app.json
TSCONFIG_SPEC="${SRC_DIR}"/tsconfig.spec.json
TSLINT_JSON="${SRC_DIR}"/tslint.json
ENVIRONMENT_PROD_TS="${ENVIRONMENTS_DIR}"/environment.prod.ts
ENVIRONMENT_TS="${ENVIRONMENTS_DIR}"/environment.ts
GOTEN_ICON="${ASSETS_DIR}"/Goten.png
APP_COMPONENT_HTML="${APP_DIR}"/app.component.html
APP_COMPONENT_SCSS="${APP_DIR}"/app.component.scss
APP_COMPONENT_SPEC="${APP_DIR}"/app.component.spec.ts
APP_COMPONENT_TS="${APP_DIR}"/app.component.ts
APP_MODULE="${APP_DIR}"/app.module.ts
APP_ROUTES="${APP_DIR}"/app.routes.ts
GENERIC_RESPONSE="${RESPONSES_DIR}"/generic.response.ts
GENERIC_FILTER="${FILTERS_DIR}"/generic.filter.ts
MENU_COMPONENT_TS="${MENU_COMPONENT_DIR}"/menu.component.ts
MENU_COMPONENT_HTML="${MENU_COMPONENT_DIR}"/menu.component.html
HOME_COMPONENT_TS="${HOME_COMPONENT_DIR}"/home.component.ts
HOME_COMPONENT_HTML="${HOME_COMPONENT_DIR}"/home.component.html
GOTEN_RADIO_TS="${GOTEN_RADIO_DIR}"/goten.radio.component.ts
GOTEN_RADIO_HTML="${GOTEN_RADIO_DIR}"/goten.radio.component.html
GOTEN_PAGINATION_TS="${GOTEN_PAGINATION_DIR}"/goten.pagination.component.ts
GOTEN_PAGINATION_HTML="${GOTEN_PAGINATION_DIR}"/goten.pagination.component.html
GOTEN_LIST_TS="${GOTEN_LIST_DIR}"/goten.list.component.ts
GOTEN_LIST_HTML="${GOTEN_LIST_DIR}"/goten.list.component.html
GOTEN_DATEPICKER_TS="${GOTEN_DATEPICKER_DIR}"/goten.datepicker.component.ts
GOTEN_DATEPICKER_HTML="${GOTEN_DATEPICKER_DIR}"/goten.datepicker.component.html
GOTEN_CONFIRM_BUTTON="${GOTEN_CONFIRM_BUTTON_DIR}"/goten.confirm.button.component.ts

file_exists ${GOTEN_DOT}
file_exists ${PACKAGE_JSON}
file_exists ${PACKAGE_LOCK_JSON}
file_exists ${ANGULAR_JSON}
file_exists ${GIT_IGNORE}
file_exists ${TSLINT_JSON}
file_exists ${TSCONFIG_JSON}
file_exists ${README}
file_exists ${VARIABLES_CUSTOM}
file_exists ${FAVICON}
file_exists ${INDEX_HTML}
file_exists ${MAIN_TS}
file_exists ${STYLES_SCSS}
file_exists ${BROWSERS_LIST}
file_exists ${POLYFILLS}
file_exists ${STYLES_CSS}
file_exists ${TEST}
file_exists ${TSCONFIG_APP}
file_exists ${TSCONFIG_SPEC}
file_exists ${TSLINT_JSON}
file_exists ${ENVIRONMENT_PROD_TS}
file_exists ${ENVIRONMENT_TS}
file_exists ${GOTEN_ICON}
file_exists ${APP_COMPONENT_HTML}
file_exists ${APP_COMPONENT_SCSS}
file_exists ${APP_COMPONENT_SPEC}
file_exists ${APP_COMPONENT_TS}
file_exists ${APP_MODULE}
file_exists ${APP_ROUTES}
file_exists ${GENERIC_RESPONSE}
file_exists ${GENERIC_FILTER}
file_exists ${MENU_COMPONENT_TS}
file_exists ${MENU_COMPONENT_HTML}
file_exists ${HOME_COMPONENT_TS}
file_exists ${HOME_COMPONENT_HTML}
file_exists ${GOTEN_RADIO_TS}
file_exists ${GOTEN_RADIO_HTML}
file_exists ${GOTEN_PAGINATION_TS}
file_exists ${GOTEN_PAGINATION_HTML}
file_exists ${GOTEN_LIST_TS}
file_exists ${GOTEN_LIST_HTML}
file_exists ${GOTEN_DATEPICKER_TS}
file_exists ${GOTEN_DATEPICKER_HTML}
file_exists ${GOTEN_CONFIRM_BUTTON}

cd "${PROJECT_NAME}"
echo 'Probando build...'
npm run build > /dev/null
build_exit_code=$?
cd ../

mensaje_build="Buildear la app: npm run build"
validate_exit_code "${build_exit_code}" "${mensaje_build}"

FILES=./files
APP_MODULE_CORRECT="${FILES}"/app.module.ts

diff -s -E -Z -b -a "${APP_MODULE_CORRECT}" "${APP_MODULE}"
comparar_module_exit_code=$?

mensaje_comparar_module="Comparar app.module.ts"
validate_exit_code "${comparar_module_exit_code}" "${mensaje_comparar_module}"

clear "${PROJECT_NAME}"
