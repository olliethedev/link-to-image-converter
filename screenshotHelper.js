const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

module.exports.getScreenshot = async (url) => {
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(
        `${ url }`,
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
    return imageBuffer;
}