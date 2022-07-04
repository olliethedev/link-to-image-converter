const Chromium = require("chrome-aws-lambda")

module.exports.getScreenshot = async (url) => {
    const browser = await Chromium.puppeteer.launch({
        executablePath: await Chromium.executablePath,
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