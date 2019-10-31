# README #

Authorization System for Unity

### Requirements ###
* NodeJS
* MongoDB

### How do I get set up? ###

* Clone repo
* run MongoDB
* run 'npm install'
* start by 'npm start'
* check config/config.json file

### Basic API's urls ###
```
#!
(GET) /api/register?username=***&password=*** - register new user
(GET) /api/getData?username=***&password=*** - get data for user
(GET) /api/setData?username=***&password=***&data=jsonString - save data for user

(POST) /api/register , formData: username=***&password=***
(POST) /api/getData , formData: username=***&password=***
(POST) /api/setData , formData: username=***&password=***&data=jsonString
```
All results in JSON. Field 'data' has type 'any'(json,string...).
Request works with GET and POST.

You can test it now in live Heroku+Mlab: https://rocky-gorge-84073.herokuapp.com/api/getData?username=test&password=pass