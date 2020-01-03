const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.businessregiongoteborg.se/en';
const NEWS_URL = 'https://www.businessregiongoteborg.se/en/context';

let browser = null;
let page = null;

const brg = {

    initialize: async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(NEWS_URL);
        await page.screenshot({path: 'example.png'});
        debugger;
        await browser.close();

    //     browser = await puppeteer.launch({
    //         headless: false,
    //         defaultViewport: {
    //             width: 1920,
    //             height: 1080
    //     }
    // });
    //     page = await browser.newPage();
    //     await page.goto(BASE_URL);
    //     await page.screenshot({path: 'exmp.png'});
    },        
    
    scrapeNews: async () => {
        await page.goto(NEWS_URL);
        await page.waitFor(200);
        await page.waitFor('div[class="p-article-package__list"]')
        let brgNews = await page.evaluate(() => {
            return {
                image: document.querySelector('div[class="p-article-package__list"]'),
                // headline:
                // article:     
            }
        })
        
        return brgNews
    },

 
    end: async () => {
        await browser.close();
    }
}

module.exports = brg;