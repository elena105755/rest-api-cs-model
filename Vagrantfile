# -*- mode: ruby -*-
# vi: set ft=ruby :

#
# SCC.311 REST19 Coursework
# =========================
#
# @author Alexander Jung <a.jung@lancs.ac.uk>
#
# This file describes how VirtualBox (or other Hypervisors for that matter) how
# to install our Ubuntu 18.04 image.  You can find more information about
# vagrant online, however, for details on how to use Vagrant and VirtualBox
# in labs at Lancaster University, please visit:
#
#   * http://scc-vagrant.lancaster.ac.uk/help.html
#
# We use this Vagrantfile to quickly setup our OS-level virtualization
# environment, namely Docker, and to help in the quickstart of the coursework.
# If you want to use Docker natively on your own machine, you can visit the
# documentation website which has information of how to install Docker:
#
#  * https://docs.docker.com/install/
#  * https://docs.docker.com/compose/install/
#
# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # Hostname of the Virtual Machine
  config.vm.hostname = "rest19"

  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/bionic64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
   config.vm.network "forwarded_port", guest: 8080, host: 8080
   config.vm.network "forwarded_port", guest: 9090, host: 9090

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  config.vm.network "forwarded_port", guest: 8080, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder ".", "/home/vagrant/rest19"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  
  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = true
  
    # Customize the amount of memory on the VM:
    vb.memory = "1024"
  end
  
  # Enable provisioning with a shell script that installs docker and
  # docker-compose.
  config.vm.provision "shell", inline: <<-SHELL
    apt-get remove docker docker-engine docker.io containerd runc
    apt-get update
    apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg-agent \
      make \
      openjdk-8-jdk \
      openjdk-8-jre \
      nodejs \
      npm \
      python3 \
      software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    apt-key fingerprint 0EBFCD88 | grep '9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88' && echo 'Signature OK'
    add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) \
      stable"
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io
    usermod -aG docker vagrant
    curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    mkdir -p /etc/docker/certs.d/harbor.scc.lancs.ac.uk
    curl -L pki.x311.scc.lancs.ac.uk/ca.pem > /etc/docker/certs.d/harbor.scc.lancs.ac.uk/ca.crt
  SHELL
end
