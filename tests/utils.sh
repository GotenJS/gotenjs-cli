#!/bin/sh

# Colors
	
RED='\033[1;31m'
GREEN='\033[1;32m'
LIGHT_CYAN='\033[1;36m'
NC='\033[0m' # No Color
	
# Auxs
	
print_success () {
    echo "${GREEN}[SUCCESS]${NC} $1"
}
	
print_error () {
    echo "${RED}[ERROR]${NC} $1" >&2
}
	
directory_exists () {
    mensaje_directory_exists="directory exists: $1"
    if [ ! -d "$1" ] ; then
        print_error "${mensaje_directory_exists}"
        exit 1
    else
        print_success "${mensaje_directory_exists}"
    fi
}
	
file_exists () {
    mensaje_file_exists="file exists: $1"
    if [ ! -e "$1" ] ; then
        print_error "${mensaje_file_exists}"
        exit 1
    else
        print_success "${mensaje_file_exists}"
    fi
}

print_test () {
    echo "\n${LIGHT_CYAN}--- $1 ---${NC}\n"
} 

validate_exit_code () {
    if [ "$1" -ne 0 ] ; then
        print_error "$2"
        exit 1
    else
        print_success "$2"
    fi
}

clear () {
    if [ -d "$1" ] ; then
        rm -rf "$1"
    fi
}
