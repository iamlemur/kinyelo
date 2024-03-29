#!/usr/bin/env bash

yum -y update
wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
wget http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
rpm -Uvh remi-release-6*.rpm epel-release-6*.rpm
yum -y install httpd.x86_64 gcc make git gettext mod_authz_ldap mod_ssl unzip libssh2 libssh2-devel --disablerepo=epel
yum -y install php mysql-server php-pear php-devel httpd-devel pcre-devel php-gd php-ldap php-mbstring php-mysql php-pdo php-soap --enablerepo=remi --disablerepo=epel
yum -y install libmcrypt nodejs npm --enablerepo=epel
yum -y install phpmyadmin --enablerepo=remi --disablerepo=epel

sed -i 's/^;date\.timezone =.*$/date.timezone = Asia\/Dubai/' /etc/php.ini
sed -i 's/^short_open_tag = .*$/short_open_tag = On/' /etc/php.ini

curl -sS https://getcomposer.org/installer | php -- --install-dir=/bin
mv /bin/composer.phar /bin/composer


printf "\n" | pecl install apc
cp -fr /vagrant/resources/apc.ini /etc/php.d/apc.ini

pear channel-discover pear.phing.info
pear install VersionControl_Git-0.4.4
pecl install pecl.php.net/ssh2-0.12
wget http://www.phing.info/get/phing-latest.phar
mv phing-latest.phar /vagrant/resources/deployment

wget https://plovr.googlecode.com/files/plovr-81ed862.jar
mv ./plovr-81ed862.jar /vagrant/resources/plovr/plovr.jar

rm -rf /var/www
ln -fs /vagrant /var/www

npm install -g bower
npm install -g grunt-cli
pushd .
cd /var/www
npm install --no-bin-links
sudo -u vagrant bower install
popd


openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=New York/L=New York/O=Kinyelo Publishing LLC/CN=*.${HOSTNAME}" -keyout kinyelo.key -out kinyelo.crt
cp kinyelo.key /etc/pki/tls/private/kinyelo.key
cp kinyelo.crt /etc/pki/tls/certs/kinyelo.crt

envsubst < /vagrant/resources/httpd.conf > /etc/httpd/conf/httpd.conf
envsubst < /vagrant/resources/boilerplate.conf > /etc/httpd/conf.d/boilerplate.conf
envsubst < /vagrant/resources/kinyelo.conf > /etc/httpd/conf.d/kinyelo.conf
envsubst < /vagrant/resources/phpMyAdmin.conf > /etc/httpd/conf.d/phpMyAdmin.conf

/sbin/service mysqld start
/etc/init.d/httpd start

/sbin/chkconfig --add mysqld
/sbin/chkconfig --add httpd

/usr/bin/mysqladmin -u root password 'k!ny3l0'

yes | cp /vagrant/resources/phpmyadmin-config.inc.php /etc/phpMyAdmin/config.inc.php
mysql -u root -pk\!ny3l0 -h localhost test < /vagrant/resources/pma_db.sql
mysql -u root -pk\!ny3l0 -h localhost test <<< "CREATE DATABASE kinyelo;"
mysql -u root -pk\!ny3l0 -h localhost test < /vagrant/resources/create_users.sql

composer -d=/var/www/ install

php /var/www/artisan migrate
php /var/www/artisan db:seed

echo "1" > /proc/sys/net/ipv4/ip_forward
iptables -t nat -A PREROUTING -p tcp --dport 9810 -j DNAT --to-destination 10.0.2.2:9810
iptables -t nat -A POSTROUTING -j MASQUERADE