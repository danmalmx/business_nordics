const puppeteer = require('puppeteer');
const brgNews = require('./brg');

(async () => {

  await brgNews.initialize();

  await brgNews.scrapeNews();

  // const USERNAME = 'danmalmx@gmail.com'
  // const PASSWORD = 'Danmalm7?1'

  // await twitter.initialize();
  // await twitter.login(USERNAME, PASSWORD);

  // let details = await twitter.getUser('harvard')
  // await twitter.postTweet('Testing automated messages');

  // await twitter.end();

})();