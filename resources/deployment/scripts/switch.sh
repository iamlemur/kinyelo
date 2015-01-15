#!/usr/bin/env bash

rm -Rf ${basedir}/www
ln -fs ${basedir}/releases/${lib.branch} ${basedir}/www

#for some reason the 'meta' subdirectory does not carry over its permissions
chmod -R 0777 ${basedir}/releases/${lib.branch}/app/storage

echo '${lib.branch}' > ${basedir}/releases/active-release.txt