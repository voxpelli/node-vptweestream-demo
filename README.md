# VoxPelli Tweet Streamer Demo

A demo for the vptweetstream node module and also generally a kind of simple node demo that people can play around with.

**OAuth**-credentials: To get them register a Twitter app on https://dev.twitter.com/apps and when you've done so you can get a token for yourself from the configuration page.

## How to configure

### Simple configuration:

In lib/config.js change:

```javascript
consumerKey    : process.env.TWEETSTREAM_CONSUMER_KEY,
consumerSecret : process.env.TWEETSTREAM_CONSUMER_SECRET,
token          : process.env.TWEETSTREAM_TOKEN,
tokenSecret    : process.env.TWEETSTREAM_TOKEN_SECRET,
```

To:

```javascript
consumerKey    : 'your-key',
consumerSecret : 'your-secret',
token          : 'your-token,
tokenSecret    : 'your-token-secret',
```

And change:

```javascript
stream : {
  locations : [
    ['-122.75,36.8', '-121.75,37.8'], // San Fransisco
    ['-74,40', '-73,41']              // OR New York
  ],
}
```

To whatever you like according to the vptweetstream documentation

### Sophisticated configuration:

Copy "example.env" and name the it ".env". Specify all configurations in there and then run it the sophisticated way as well. By doing this foreman will apply the specified variables as environment variables for the app. Instead of foreman and .env-files another way of defining the configuration through environment variables could be used as well – like Heroku's "heroku config" command.

### Additional configuration options

* **authentication** - if you want to lock down the site behind a simple authentication screen to avoid unwanted eyes on it - then specify a username and if you like a password and those will be required to access the site.

## How to run

### Simple way

```
node .
```

### Sophisticated way:

```
foreman start
```

## Changelog

### 0.1.0

* The very first version, simple script, simple documentation, nothing fully completed - as it should be, right?
