
# Setup Instructions

Create a new project in PhpStorm with the Quickstart option 'Check out from Version Control'.

Make sure Java 1.7+ is installed and available from the command line (check by running 'java -version')

Configure PhpStorm

- Make sure you have a hosts entry on the host machine that matches your choice for the hostname in the Vagrantfile for the guest machine
10.8.8.8 is the IP. To do this on a Mac, open Terminal and navigate to the /private/etc/hosts file.
- Install VirtualBox
- Install Vagrant
- Open the terminal and navigate to your project's directory, then run:
```
vagrant plugin install vagrant-vbguest
```
This will install the plugin to mount the host machine's project directory to a folder on the the guest machine.

NOTE: On a Windows machine, you will need to run Vagrant from a command prompt running as Administrator

Then run:
```
vagrant up
```
This will start your guest machine and begin to provision it. Provisioning will likely fail as the remote folder on
the host machine will fail to mount. If this happens, SSH into the machine (either with `vagrant ssh` or using the
insecure key from Vagrant for your the terminal client of your choice
(http://stackoverflow.com/questions/9885108/ssh-to-vagrant-box-in-windows)), and run:
```
sudo su - root
yum -y update
yum -y install kernel-devel
exit
exit
```
This will run the required updates to compile the plugin for mounting a shared folder. You should now be back to your
host machine's terminal. From here you will run:
```
vagrant reload
```
This will reload the vagrant environment where it should successfully mount the shared folder and provision on boot.

Comment this out:
curl -LO https://closure-templates.googlecode.com/files/closure-templates-for-javascript-latest.zip
unzip closure-templates-for-javascript-latest.zip
mkdir <<project directory>>/public/js/soy/
cp soyutils.js <<project directory>>/public/js/soy/
cp soyutils_usegoog.js <<project directory>>/public/js/soy/


# Starting up the server

From here down, run these commands every time in the project directory when starting up.

In one terminal window on the host machine, navigate to the project directory then the subdirectory 'resources/plovr' and run the command:

> java -jar plovr.jar serve kinyelo-config.js

This will start the server that serves the compiled Google Closure JavaScript.

In another terminal window, navigate to the deployed directory and run the command:

> vagrant up

This will start up the guest virtual machine and then return to the host bash prompt


-Dependencies are now managed on the front-end
	-Bower manages frontend dependencies
	-Grunt runs tasks to compile these dependencies and our own assets (styles/scripts/images)
-There are no more file watchers
	-The development environment is configured with file watchers which trigger grunt tasks for compilation when
	any source changes are detected
	-The same tasks called by the watcher are called as part of the build script when deploying to a remote host
-There are no more local deployment (PhpStorm configuration or Phing build)
	-The guest machine runs from the project directory
	-Git will ignore all related files to Vagrant or any dependencies from bower and grunt


# Notes

http://stackoverflow.com/questions/26482474/vagrant-error-failed-to-mount-folders-in-linux-guest

http://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces -- regarding the chosen IP

Comment out this.book_ or this.post_ in /public/js/kinyelo/app.js depending on what you're viewing


http://kinyelo.com/phpmyadmin

Always keep in mind whether your hosts file is pointing to the live domain or your local environment.