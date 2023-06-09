const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function downloadWebsite(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  // Capture the page's HTML content
  const content = await page.content();

  // Set the file path to the desktop
  const filePath = path.join(
    process.env.HOME || process.env.USERPROFILE,
    "Desktop",
    "website.html"
  );

  // Save the content to the file
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("Error saving file:", err);
    } else {
      console.log("Website downloaded successfully!");
    }
  });

  await browser.close();
}
downloadWebsite("https://km.iqoption.com/en");
