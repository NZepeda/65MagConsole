'use strict'

var express = require('express');
var app = express();

//port is either 3000 on localhost or whatever the environment port is 
var port = process.env.PORT || 3000;

//routes for url requests 
app.use('/assets', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + "/client/controllers"));
app.use('/pages', express.static(__dirname + "/client/views/"));
app.use('/root', express.static(__dirname + '/client/'));
//main login
//to do: check if user is logged in, if so direct to main screen, if not redirect to login
app.get('/', function(req, res){
	res.sendFile(__dirname + "/client/views/index.html");
});

app.listen(port, function(req, res){
	console.log("Im listening..");
});
