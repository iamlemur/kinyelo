
# Requirements
Java 1.7+ (check by running 'java -version')
VirtualBox 4.3.20+
Vagrant 1.6.5+
PhpStorm 8.0.2+

# Setup Instructions

Create a new project in PhpStorm with the Quickstart option 'Check out from Version Control'.

Create a hosts entry on the host machine that matches your choice for the hostname in the Vagrantfile at the root of
this project. 10.8.8.8 is the default IP chosen and you should be fine using that. To do this on a Mac, open Terminal
and type `sudo vi /private/etc/hosts` and add the entry (using vim:
http://www.linux.com/learn/tutorials/228600-vim-101-a-beginners-guide-to-vim) `10.8.8.8 kinyelo.com`

Open the terminal on your host machine, navigate to your project's directory, and run `vagrant plugin install
vagrant-vbguest`. This will install the plugin to mount the host machine's project directory to a folder on the the
guest machine (by default, /vagrant which is later linked to /var/www in the guest machine during provisioning).

NOTE: On a Windows machine, you will need to run Vagrant from a command prompt running as Administrator

From your project's directory, then run `vagrant up`. This will start your guest machine and begin to provision it.
Provisioning will likely fail as the host machine's folder will fail to mount in the guiest machine. If this happens,
SSH into the machine (either with `vagrant ssh` or using the insecure key from Vagrant for the terminal client of your
choice (http://stackoverflow.com/questions/9885108/ssh-to-vagrant-box-in-windows)), and run:
```
sudo su - root
yum -y update
yum -y install kernel-devel
exit
exit
```
This will run the required updates to compile the plugin for mounting a shared folder. You should now be back to your
host machine's terminal in the project directory. From here you will run `vagrant reload` which will reload the vagrant
environment where it should successfully mount the shared folder and provision on boot.

# Starting up the server

Once the above has been done, it will not need to be repeated. To view the site in your browser, you will need to run
these commands every time in the project directory to start up the guest machine to serve the website.

To do this, in a terminal window on the host machine, navigate to the project directory then the subdirectory
'resources/plovr' and run the command `java -jar plovr.jar serve kinyelo-config.js`. This will start a separate server
that compiles and serves the compiled Google Closure JavaScript. You will need to leave this running or alternately can
Google how to push terminal running processes to the background for your OS.

Now in another terminal window, navigate to the project's directory and run the command `vagrant up`. This will start
up the guest virtual machine and then return to the host's terminal prompt.

# Improvements

- Dependencies are now managed on the front-end
	- Bower manages frontend dependencies
	- Grunt runs tasks to compile these dependencies and our own assets (styles/scripts/images)
- There are no more file watchers
	- The development environment is configured with file watchers which trigger grunt tasks for compilation when
	any source changes are detected
	- The same tasks called by the watcher are called as part of the build script when deploying to a remote host
- There are no more local deployment (PhpStorm configuration or Phing build)
	- The guest machine runs from the project directory
	- Git will ignore all related files to Vagrant or any dependencies from bower and grunt

# Production Environment

phpMyAdmin
http://kinyelo.com/dh_phpmyadmin/mysql.kinyelo.com/
Username: your own
Password: your own

# Notes

phpMyAdmin URL: http://kinyelo.com/phpmyadmin

Always keep in mind whether your hosts file is pointing to the live domain or your local environment.

php /var/www/artisan migrate
php /var/www/artisan db:seed

# Notes to Michael

Comment this out:
curl -LO https://closure-templates.googlecode.com/files/closure-templates-for-javascript-latest.zip
unzip closure-templates-for-javascript-latest.zip
mkdir <<project directory>>/public/js/soy/
cp soyutils.js <<project directory>>/public/js/soy/
cp soyutils_usegoog.js <<project directory>>/public/js/soy/

