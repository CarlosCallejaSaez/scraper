const puppeteer = require("puppeteer");
const jsdom = require("jsdom");

const scraper= async () => {
  try {
    
    const browser = await puppeteer.launch({
      devtools: true,
      defaultViewport: {
        width: 1280,
        height: 1024,
      },
      headless: false,
    });
    const page = await browser.newPage();
     await page.goto("https://www.zalando.es/", {
      waitUntil: "domcontentloaded",
    });
     
    
    await page.type('#header-search-input', 'nike')
    await page.keyboard.press('Enter');


      
  } catch (error) {
    console.error(error);
  }
};

scraper()
