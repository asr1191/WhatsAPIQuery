const request = require('request');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let doc;
wsurl = "http://web.whatsapp.com";

request({url:wsurl,
         headers:{'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'}
        }, (err,res,html)=>{
    if(!err){

        console.log(html);
            doc = new JSDOM(html, {
            url:"https://web.whatsapp.com",
            runScripts:"dangerously",
            resources:"usable"
        });
        setTimeout(jsDomInit,10000);
    }
});

function jsDomInit(){
    console.log(doc.window.document.body.innerHTML);
}