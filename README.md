
# Setup Instructions

Make sure Java 1.7+ is installed and available from the command line (check by running 'java -version')

- Make sure you have a hosts entry on the host machine that matches your choice for the hostname in the Vagrantfile for the guest machine
10.8.8.8 is the IP. To do this on a Mac, open Terminal and navigate to the /private/etc/hosts file.
- Install VirtualBox
- Install Vagrant
- Open the terminal and navigate to the deployed directory, then run: vagrant plugin install vagrant-vbguest
```
cd ./plovr
curl -O https://plovr.googlecode.com/files/plovr-81ed862.jar
mv plovr-81ed862.jar plovr.jar
cd ../

cd /var/tmp
curl -LO https://github.com/google/closure-library/archive/master.zip
unzip master.zip
mv closure-library-master/closure/goog/ <<project directory>>/public/js/goog/

curl -LO https://closure-templates.googlecode.com/files/closure-templates-for-javascript-latest.zip
unzip closure-templates-for-javascript-latest.zip
mkdir <<project directory>>/public/js/soy/
cp soyutils.js <<project directory>>/public/js/soy/
cp soyutils_usegoog.js <<project directory>>/public/js/soy/
```

Will investigate later to move this into a build script or dependency management system like composer.

# Starting up the server

From here down, run these commands every time in the deployed directory when starting up.

In one terminal window, navigate to the deployed directory then the subdirectory 'plovr' and run the command:

> java -jar plovr.jar serve kinyelo-config.js

This will start the server that serves the compiled Google Closure JavaScript.

In another terminal window, navigate to the deployed directory and run the command:

> vagrant up (this will take a while the first time)

This will start up the virtual machine and then return to the bash prompt


# Migrations

When starting with a new environment, you will want to run the migrations to set up the database and the seeds to
populate the database.  

From the deployed directory, run:

> vagrant ssh

To sudo into root: run

> sudo su - root

To create the database, run:

> php /var/www/artisan migrate

To populate the database, run:

> php /var/www/artisan db:seed

You can run the migration command at any time and will need to for some updates. I will investigate if seeding is
smart enough to not seed identical data more than once.

For more information, see: http://laravel.com/docs/4.2/migrations#database-seeding

# Notes

http://stackoverflow.com/questions/26482474/vagrant-error-failed-to-mount-folders-in-linux-guest

http://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces -- regarding the chosen IP

Comment out this.book_ or this.post_ in /public/js/kinyelo/app.js depending on what you're viewing
