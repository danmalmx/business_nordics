const puppeteer = require('puppeteer');
const twitter = require('./twitter');
const brg = require('./brg');

(async () => {

  await brg.initialize();
  await brg.scrapeNews();

  // const USERNAME = 'danmalmx@gmail.com'
  // const PASSWORD = 'Danmalm7?1'

  // await twitter.initialize();
  // await twitter.login(USERNAME, PASSWORD);

  // let details = await twitter.getUser('harvard')
  // await twitter.postTweet('Testing automated messages');

  debugger;

  // await twitter.end();

})();