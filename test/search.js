const puppeteer = require('puppeteer');
const { expect }  = require('chai');

describe('Duck Duck Go search using basic Puppeteer', function () {

    let browser;
    let page;

    this.timeout(5000000);

    beforeEach(async () => {
        browser = await puppeteer.launch({headless:true});
        page = await browser.newPage();

        await page.goto('https://duckduckgo.com', {waitUntil: 'networkidle0'});
    });

    afterEach(async () => {
        await browser.close();
    });

    it('should be the correct url', async () => {
        expect(await page.url()).to.eql('https://duckduckgo.com/');
    });

    it('should have the correct page title', async () => {
        expect(await page.title()).to.eql('DuckDuckGo — Privacy, simplified.');
    });

    it('should have the page open', async () => {
        expect(await page.isClosed()).to.eql(false);
    });
});