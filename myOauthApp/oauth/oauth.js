

var OAuth2Server = require('oauth2-server');
var Request = OAuth2Server.Request;
var Response = OAuth2Server.Response;
var model= require('../outhmodels/model');



//var request = new Request();
// var response = new Response();
var oauth = new OAuth2Server({
  model: model, // See below for specification 
	grants: ['password', 'client_credentials'],
  debug: true
});

module.exports=function isAuthenticated(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);
    const option ={};
console.log("request",request);
console.log("requesturl",request.url);
   oauth.authenticate(request, response)
  .then((token) => {
    res.locals.oauth = {token: token};
    console.log("The request was successfully authenticated",token);
    return next();
  })
  .catch((err) => {
      console.log("outhentication fail");
    // The request failed authentication.
  });
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    
}