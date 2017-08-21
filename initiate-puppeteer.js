const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');

if (process.argv.length != 3){
  console.log("Usage: node initiate-puppeteer.js <number>\n\nCountry code affixed to phone number is mandatory");
  process.exit();
}


(async () => {
  const browser = await puppeteer.launch({
    args:['--no-sandbox'],
    headless: true
  });
  const page = await browser.newPage();
  let pagePP = await browser.newPage();

  await page.emulate({ 
    viewport:{
      width:1920,
      height: 1080,
      isLandscape: true
    },
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
  });

  
  await page.goto('https://web.whatsapp.com',{
    timeout:45000
  });
  await page.waitFor('.icon-logo');
  //await page.waitFor(10000);

  await page.screenshot({path: './images/qrcode.png'});
  console.log('SCREENSHOT','shot saved to qrcode.png, use phone to authenticate.');

  await page.waitFor('.intro-image');
  await page.waitFor(4000);

  console.log('SCREENSHOT','taking another shot, saved to deck.png');
  await page.screenshot({path: './images/deck.png'})

  imgSRC = '';

  page.on('console',(...args)=>{
    console.log("[Inner Console]",args[0],args[1]); 
    if(args[0]=='QUERY'){
      imgSRC = args[1];
      var p = await browser.newPage();
    }
  });

  await page.evaluate((nr)=>{
    console.log("DEBUG","Inside evaluate()");
    Store.ProfilePicThumb.find(nr + '@c.us').then((d)=>{console.log('QUERY',d.img);});
  },process.argv[2]);

  console.log("PROGRESS","waiting for 10 seconds")
  await page.waitFor(10000);
  
  console.log("DEBUG", "imgSRC: " + imgSRC );
  //request(imgSRC).pipe(fs.createWriteStream( './images/query/' + process.argv[2] + '.jpg'));

  page.waitFor("5000")

  browser.close();
})();