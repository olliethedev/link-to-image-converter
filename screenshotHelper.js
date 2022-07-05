const puppeteer = require('puppeteer');

module.exports.getScreenshot = async (url) => {
    const chromeOptions = {
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ],
    };
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.goto(
        url,
        {
            waitUntil: 'networkidle0',
        }
    );
    await page.waitForTimeout(1000); // wait for the page to load
    const imageBuffer = await page.screenshot({
        type: 'jpeg',
        quality: 100,
        captureBeyondViewport: true
    });
    await browser.close();
    return imageBuffer;
}