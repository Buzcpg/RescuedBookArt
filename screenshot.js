const puppeteer = require('puppeteer');
const path = require('path');

async function takeScreenshot() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport to match our design
    await page.setViewport({
        width: 1200,
        height: 1200,
        deviceScaleFactor: 1
    });

    // Get version from command line args or default to 'v2'
    const version = process.argv[2] || 'v2';
    const htmlFile = `valentines-post-${version}.html`;

    // Load the HTML file
    const htmlPath = path.join(__dirname, htmlFile);
    await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Extra wait for fonts
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get the post container element
    const element = await page.$('.post-container');

    // Output path in the proper folder
    const outputPath = path.join(
        __dirname,
        'Images',
        'social media',
        'Social Media Images',
        'How much I love you',
        `Valentines Post ${version}.png`
    );

    if (element) {
        await element.screenshot({
            path: outputPath,
            type: 'png'
        });
        console.log(`Screenshot saved as: ${outputPath}`);
    }

    await browser.close();
}

takeScreenshot().catch(console.error);
