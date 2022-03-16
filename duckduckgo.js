const puppeteer = require('puppeteer')

const loginEmail = process.env.MATTERMOST_EMAIL;
const loginPassword = process.env.MATTERMOST_PWD;
const ddgUrl = 'https://duckduckgo.com' 

async function login(browser, url) {
  const page = await browser.newPage();

  await page.goto(url, {waitUntil: 'networkidle0'});

  // Login
  await page.type('input[id=loginId]', loginEmail);
  await page.type('input[id=loginPassword]', loginPassword);
  await page.click('button[id=loginButton]');

  // Wait for redirect
  await page.waitForNavigation();
  return page;
}

async function postMessage(page, msg)
{
  // Waiting for page to load
  await page.waitForSelector('#post_textbox');

  // Focus on post textbox and press enter.
  await page.focus('#post_textbox')
  await page.keyboard.type( msg );
  //await page.keyboard.press('Enter');
}

(async () => {

  const browser = await puppeteer.launch({headless: false, args: ["--no-sandbox", "--disable-web-security"]});
  const page = await browser.newPage()

  // Pretend you are a iPhone X
  // await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
  // await page.setViewport({ width: 375, height: 812 });
  await page.goto(ddgUrl, { waitUntil: 'networkidle2' })
  await page.type('#search_form_input_homepage', 'Puppeteer')
  await page.keyboard.press('Enter');
  
  await page.waitForSelector('h2 a');
        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('h2 a'));
        });
        console.log(links.length)

  // browser.close();

  
})()


