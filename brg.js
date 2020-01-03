const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.businessregiongoteborg.se/en';
const NEWS_URL = 'https://www.businessregiongoteborg.se/en/context';

let browser = null;
let page = null;

const brg = {

    initialize: async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: {
                width: 1920,
                height: 1080
        }
    });
        page = await browser.newPage();
        await page.goto(BASE_URL);
    },        
    
    scrapeNews: async () => {
        await page.goto(NEWS_URL);
        await page.waitFor('div[class="p-article-package__list"]')
        let brgNews = await page.evaluate(() => {
            return {
                image:
                headline:
                article: 

                
            }
        })

            
    }
};