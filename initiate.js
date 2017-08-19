const request = require('request');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let doc;
url = "http://web.whatsapp.com";

request(url, (err,res,html)=>{
    if(!err){

        console.log(html);
            doc = new JSDOM(html, {
            runScripts:"dangerously",
            resources:"usable"
        });
        setTimeout(jsDomInit,10000);
    }
});

function jsDomInit(){
    console.log(doc.window.document.body.innerHTML);
}