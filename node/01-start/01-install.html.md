```
title: "Install Node.js"
```

This is Bevry's supported guide for installing [Node.js](http://nodejs.org/) on your computer as well as any other required dependencies for your particular system. This guide is Bevry's supported guide, as we've found other guides will leave you with an incorrectly configured environment causing permission errors and missing executables that are hard to track down.


## On Linux (Mac OSX, Ubuntu, Fedora, etc)

### Preparation

#### Mac Preparation

1. Install Command Line Tools:

	``` bash
	xcode-select --install
	```

	Xcode may or may not be necessary for the above command, if it fails, [Download & Install Xcode](http://developer.apple.com/xcode/), and try again.

1. [Download & Install Git](http://git-scm.com/download)

	If you use [homebrew](http://brew.sh), you can run `brew install git` instead of manually installing and downloading git.

1. Ensure correct permissions are set for `/usr/local`:

	``` bash
	sudo chown -R $USER /usr/local
	```


#### APT Linux Preparation (Ubuntu)

``` bash
sudo apt-get update
sudo apt-get install curl build-essential openssl libssl-dev git python
```


#### YUM Linux Preparation (Fedora)

``` bash
sudo yum -y install tcsh scons gcc-c++ glibc-devel openssl-devel git python
```


### Installation

[Node Version Manager aka NVM](https://github.com/creationix/nvm) lets you install multiple versions of Node.js to your local user directory, enabling easy upgrades and version switching, without the permission troubles that are common with non-NVM setups.

1. Uninstall any previous Node.js versions you may already have

1. Install NVM by running the following in Terminal:

	``` bash
	git clone git://github.com/creationix/nvm.git ~/.nvm
	printf "\n\n# NVM\nif [ -s ~/.nvm/nvm.sh ]; then\n\tNVM_DIR=~/.nvm\n\tsource ~/.nvm/nvm.sh\nfi" >> ~/.bashrc
	NVM_DIR=~/.nvm
	source ~/.nvm/nvm.sh
	```

1. Install Node.js by running the following in Terminal:

	``` bash
	nvm install node
	nvm alias default node
	nvm use node
	```

## On Windows

1. [Download & Install Git](http://git-scm.com/download)

	IMPORTANT. When installing, make sure you install with the option of making git available to the windows command line.

2. [Download & Install Node.js](http://nodejs.org/#download)

