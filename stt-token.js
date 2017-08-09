var express = require('express'),
  router = express.Router(),
  vcapServices = require('vcap_services'),
  extend = require('util')._extend,
  watson = require('watson-developer-cloud');

var sttConfig = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: process.env.STT_USERNAME || '490947d7-1d4b-4aa6-8240-8716374e0da8',
  password: process.env.STT_PASSWORD || '8i0VE8wbAcd4',
}, vcapServices.getCredentials('speech_to_text'));

var sttAuthService = watson.authorization(sttConfig);

router.get('/token', function(req, res) {
  sttAuthService.getToken({url: sttConfig.url}, function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      res.status(500).send('Error retrieving token');
      return;
    }
    res.send(token);
  });
});

module.exports = router;
