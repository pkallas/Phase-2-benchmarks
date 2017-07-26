
// path = 'find/?ref_=nv_sr_fn&q=userquery&s=all'
// ?ref_=nv_sr_fn&q=process.argv[2] &s=all --> us qs.stringify to turn these into an input, so user can search using special characters
/* {ref_ : 'nv_sr_fn',
    q: input,
    s: 'all'}
*/
const http = require('http');
const cheerio = require('cheerio');
const qs = require('querystring');
const input = process.argv[2];
const imdbPath = qs.stringify(
    {ref_ : 'nv_sr_fn',
    q: input,
    s: 'all'});
// Use port 80 for http
const req = http.request({
  hostname: 'www.imdb.com',
  path:'/find?' + imdbPath,
  port: 80
}, (res) => {
  let str = ''
  res.on('data', function(chunk) {
    str += chunk
  })
  res.on('end', function () {
    const $ = cheerio.load(str);
    //<div class ='findSection'>, <table class='findList'>, <td class='result_text'>
    // class we want is 'result_text'
    let titles = $('.result_text').text();
    //Return result in console display --> result
    console.log(titles);
  })
})

req.end()
