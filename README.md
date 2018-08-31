# Photo sharing application

## Overview
A simple application to share photos with geolocation. User can register an account, upload a photo with a location and view everyone's photos.

## How to deploy
This application is built using NodeJs with Express framework and SQLite3 database (using file to store the data).
To deploy locally:
* Clone the repository `git clone https://github.com/HoneyB4dger/PhotoSharing.git`
* `cd PhotoSharing`
* `npm install`
* `node app`
* Application is now running. To use it, in your browser go to `http://localhost:3000`

## Clearing the database
* `rm database/photosharing.db`
* `rm public/images/*`
