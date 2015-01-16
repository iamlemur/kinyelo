#!/usr/bin/env bash

rm -Rf ${basedir}/public
rm -Rf ${basedir}/app
rm -Rf ${basedir}/bootstrap
rm -Rf ${basedir}/vendor
ln -fs ${basedir}/releases/${lib.branch}/public ${basedir}/public
ln -fs ${basedir}/releases/${lib.branch}/app ${basedir}/app
ln -fs ${basedir}/releases/${lib.branch}/bootstrap ${basedir}/bootstrap
ln -fs ${basedir}/releases/${lib.branch}/vendor ${basedir}/vendor

#for some reason the 'meta' subdirectory does not carry over its permissions
chmod -R 0777 ${basedir}/releases/${lib.branch}/app/storage
chmod -R 0777 ${basedir}/releases/${lib.branch}/public/assets/cache

echo '${lib.branch}' > ${basedir}/releases/active-release.txt