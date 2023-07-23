const puppeteer = require("puppeteer");

const QUERY_SEARCH = "estoicismo"

const scrapeProducts = async (query) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.amazon.com/");
  await page.type("#twotabsearchtextbox", query);
  await page.click("#nav-search-submit-text");
  await page.waitForNavigation();
  const products = await page.evaluate(() => {
    const results = [];
    const items = document.querySelectorAll(".s-result-item .s-card-border");

    items.forEach((item) => {
      const title = item.querySelector("h2 > a > span");
      const price = item.querySelector(".a-price-whole");
      const cents = item.querySelector(".a-price-fraction");
      const image = item.querySelector("img");

      if (!title || !price || !image) return;

      results.push({
        title: title.innerText,
        price: parseFloat(
          `${parseInt(price.innerText)}.${parseInt(cents.innerText)}`
        ),
        image: image.getAttribute("src"),
      });
    });
    return results;
  });
  console.log(products);
  await browser.close();
};

scrapeProducts(QUERY_SEARCH);
