/*jslint node: true, white: true, indent: 2 */
"use strict";

var connect = require('express'),
  vptweetstream = require('vptweetstream'),
  lpb = require('longpollingbuffer'),
  config = require('./config'),
  pollbuffer = new lpb.LongPollingBuffer(100),
  jsonResponse, updates, stream, app;

updates = function (req, res) {
  var since = req.query.since ? parseInt(req.query.since, 10) : false;

  if ((!since && since !== 0) || since > pollbuffer.offset) {
    // The server might have been restarted and therefore the id:s can have been reset
    since = -1;
  }

  pollbuffer.addListenerForUpdateSince(since, function (data) {
    res.json(data);
  });
};

stream = vptweetstream.stream({
  consumer_key    : config.twitter.consumerKey,
  consumer_secret : config.twitter.consumerSecret,
  token           : config.twitter.token,
  token_secret    : config.twitter.tokenSecret,
}, false);
stream.events.on('tweet', function (tweet) {
  pollbuffer.push(tweet);
});
stream.changeStream(config.stream);

app = connect();

// Connect config
if (config.authentication.username) {
  app.use(connect.basicAuth(function (user, pass) {
    return config.authentication.username === user && (config.authentication.password || '') === pass;
  }));
}
app.use(connect.static(__dirname + '/../public'));
app.use(connect.query());
app.use(connect.urlencoded());
app.use(connect.cookieParser());

// Routes
app.get('/updates', updates);

app.listen(process.env.PORT || 5000);
