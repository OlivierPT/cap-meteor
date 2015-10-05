# cap-meteor

This application is the demo support for Meteor presentation.

## Meteor installation

On Linux or Mac OSX :

> curl https://install.meteor.com/ | sh

On Windows : The is an installation package.

Then, create the first application :

> meteor create firstapp

And then start the app :

> cd firstapp
> meteor

That's it!

## The application

Cap-meteor is a tchat application (inspired from slack) that allow to show the main capacity of Meteor platform.
It is based on AngularJS and Material-Design for the UI.

### Data reactivity

Adding data from javascript console

> Meteor.call('addChannel', {"label": "Console Channel"});

Adding data directly from Mongo

> db.channels.insert({label: "Mongo channel", timestamp: Date.now(), user: "Y8CFRrMgqpbXpGHny"})

### Structure

Meteor uses directory structure convention to organise the code :
* "client" directory : Code that is only executed on the client. It contains views and associatied JS.
* "server" directory : Code that is only published and executed on the server. Usually, it contains :
  ** Data publication
  ** Security checks,
  ** Server only functions,
  ** Some configuration,
* "both" directory : Code that is published and executed on both client and server. Usually, it contains :
  ** Collection declaration,
  ** Methods implementation
* "public" directory : Client static content,
* "private" directory : Server and private static content.

Loading order :
* Directories in the alphanumeric order
* In one directory...???

### UI Layer

Angular Integration packages :
* urigo:angular
* angularui:angular-ui-router

Angular-Material integration packages :
* angular:angular-material
* planettraining:material-design-icons

Angular usage :
* configuration at /client.

### Security integration

Removing standart packages :
* autopublish
* unsecure

Authentication packages :
* accounts-password
* accounts-github

Github service configuration package :
* service-configuration

* Authentication implemented at /client/views/users/sign.js.
* Login with Github configured at /server/loginService.js
* The autorisation checks are done inside the methods

### Bootstrap

Data initialization from server.

> /server/bootstrap.js

### Data publication

Data publication managed by server.

> /server/publish.js

### Latency compensation

When possible, a method is executed on the client and on the server.

> /both/methods.js:sendMessage

### Development tools

Some usefull package for Development stage :
* constellation:autopublish             
* constellation:console                 
* constellation:session
* constellation:subscriptions

### Monitoring


### Deploying on Meteor.com

### Deploying on Mobile platform

If Android sdk is not installed yet
> meteor install-sdk android

Adding the platform to the project
> meteor add-platform android

Run the project on the Mobile
> meteor run android-device

### Deploying with Docker
