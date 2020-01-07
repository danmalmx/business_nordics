const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.businessregiongoteborg.se/en';
const NEWS_URL = 'https://www.businessregiongoteborg.se/en/context';

let browser = null;
let page = null;

const brgNews = {

    initialize: async () => {
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.goto(NEWS_URL);
        // await page.screenshot({path: 'example.png'});
        // debugger;

        browser = await puppeteer.launch({ headless: false, defaultViewport: {height: 1080, width: 1920} });
        page = await browser.newPage();

        await page.goto(BASE_URL);
        await page.waitFor(100);


    },

    scrapeNews: async () => {
        await page.goto(NEWS_URL);
        await page.waitFor(200);
        let brgNewsFeed = await page.waitFor('div[class="p-article-package__list-items]');
        // let brgNewsFeed = await page.evaluate(() => {
        //     return {
        //         image: document.querySelector('div[class="p-article-package__list"]')
        //         headline:
        //         article:
        //     }
        // })
        
        debugger;
        
        return brgNewsFeed
    },
    
    
    end: async () => {
        await browser.close();
    }
}

module.exports = brgNews;