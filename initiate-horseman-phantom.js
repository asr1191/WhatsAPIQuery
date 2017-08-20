const Horseman = require('node-horseman');
const horseman = new Horseman({
    diskCache:true,
    diskCachePath:'./diskcache',
    cookiesFile:'./cookies'
});

var imgcode = '';

horseman
    .userAgent('Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0')
    .headers({
        'Host': 'web.whatsapp.com',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Upgrade-Insecure-Requests': '1',
        'Connection': 'close'
    })
    .viewport(1920,1080)
    .open('http://web.whatsapp.com')
    .wait(9000)
    .screenshot('test.png')
    // .waitForSelector('.qrcode')
    // .evaluate((selector)=>{
    //     return $(selector).attr('src')
    // })
    // .then((src)=>{
    //     console.log(src);
    // })
    .close();