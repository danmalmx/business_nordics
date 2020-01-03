const puppeteer = require('puppeteer');

const BASE_URL = 'https://twitter.com';
const LOGIN_URL = 'https://twitter.com/login'
const USERNAME_URL = (username) => `https://twitter.com/${username}`;

let browser = null;
let page = null;

const twitter = {

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

    login: async (username, password) => {
        await page.goto(LOGIN_URL);
        await page.waitFor('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]');
        await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]', username, {delay: 25});
        await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[password]"]', password, {delay: 25});
        await page.click('button[type="submit"]');
        await page.waitFor('div[class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"]');
        await page.waitFor(1000);
    },

    postTweet: async (message) => {
        let url = await page.url();
        if(url != BASE_URL) {
            await page.goto(BASE_URL);
        }

        await page.waitFor('div[class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"]');
        await page.click('div[class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"]');
        await page.waitFor(500);
        await page.keyboard.type(message, {delay: 50});
        await page.click('div[class="css-18t94o4 css-1dbjc4n r-urgr8i r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1n0xq6e r-1vuscfd r-1dhvaqw r-1fneopy r-o7ynqc r-6416eg r-lrvibr"]');
    },

    getUser: async (username) => {
        let url = await page.url();
        if(url != (USERNAME_URL(username))) {
            await page.goto((USERNAME_URL(username)));
        }

        await page.waitFor('div[class="css-901oao r-hkyrab r-1qd0xha r-1b6yd1w r-1vr29t4 r-ad9z0x r-bcqeeo r-qvutc0"]');
        let details = await page.evaluate(() => {
            return {
                fullName: document.querySelector('div[class="css-901oao r-hkyrab r-1qd0xha r-1b6yd1w r-1vr29t4 r-ad9z0x r-bcqeeo r-qvutc0"]').innerText,
                description: document.querySelector('div[class="css-1dbjc4n r-1adg3ll r-15d164r"]').innerText,
                followers: document.querySelector('div[class="css-1dbjc4n r-1joea0r"] > a').getAttribute('title'),
                following: document.querySelector('div[class="css-1dbjc4n r-18u37iz"] > div > a').getAttribute('title'),
                location: document.querySelector('div[data-testid="UserProfileHeader_Items"] > span').innerText,
                link: document.querySelector('div[data-testid="UserProfileHeader_Items"] > a').innerText,
                joinDate: document.querySelector('div[data-testid="UserProfileHeader_Items"] > span:nth-last-child(1)').innerText,
                tweets: document.querySelector('div[class="css-901oao css-bfa6kz r-1re7ezh r-1qd0xha r-n6v787 r-16dba41 r-1sf4r6n r-bcqeeo r-qvutc0"]').innerText,
                verified: document.querySelector('svg[aria-label="Verified account"]') ? true : false
            }
        })

        return details;

    },

    end: async () => {
        await browser.close();
    }
}

module.exports = twitter;