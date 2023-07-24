const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const dotenv=require('dotenv').config()

const QUERY_SEARCH = "estoicismo"

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

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

  for (const product of products) {
    const newProduct = new Product({
      title: product.title,
      price: product.price,
      image: product.image,
    });

    try {
      await newProduct.save();
      console.log(`🤘 Product "${product.title}" saved to DB. `);
    } catch (err) {
      console.error(`❌ Error saving product "${product.title}" to DB:`, err);
    }
  }

  await browser.close();
};

scrapeProducts(QUERY_SEARCH);
