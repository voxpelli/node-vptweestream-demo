// The Configuration
// ----------------

// process.env.SOMETHING refers to an environment variable in the system
// Any process.env.SOMETHING can be replaced with a hardcoded configuration instead
// but it's a good practise to keep configuration out of the code – especially
// when it comes to passwords.
//
// For example, this:
//   username : process.env.WEB_USER,
// Can be replaced by something like:
//   username : 'a-cool-username',
//
// Using environemt variables on Heroku is very easy using their "heroku config" command
// Locally it is very easy if using the "foreman" tool and specifying the variables in a ".env" file 

module.exports = {
  authentication : {
    username : process.env.WEB_USER || null,
    password : process.env.WEB_PASS || null,
  },
  theme : process.env.TWEETSTREAM_THEME || null,
  twitter : {
    consumerKey    : process.env.TWEETSTREAM_CONSUMER_KEY,
    consumerSecret : process.env.TWEETSTREAM_CONSUMER_SECRET,
    token          : process.env.TWEETSTREAM_TOKEN,
    tokenSecret    : process.env.TWEETSTREAM_TOKEN_SECRET,
  },
  stream : {
    locations : [
      ['-122.75,36.8', '-121.75,37.8'], // San Fransisco
      ['-74,40', '-73,41']              // OR New York
    ],
  }
};
