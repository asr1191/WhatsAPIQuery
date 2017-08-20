const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args:['--no-sandbox']});
  const page = await browser.newPage();
  
  await page.emulate({ viewport:{ 
                                    width:1920,
                                    height: 1080,
                                    isLandscape: true
                                },
                        userAgent: 'Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
                    });
  await page.goto('https://web.whatsapp.com');
  await page.waitFor('.qrcode');
  await page.waitFor(7000);

  await page.screenshot({path: 'qrcode.png'});
  console.log('SCREENSHOT','shot saved to qrcode.png, use phone to authenticate.');
  await page.waitFor(60000);
  console.log('SCREENSHOT','waited 20 seconds, taking another shot, saved to deck.png');
  await page.screenshot({path: 'deck.png'})
  browser.close();
})();