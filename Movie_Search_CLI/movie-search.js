
// path = 'find/?ref_=nv_sr_fn&q=userquery&s=all'
// ?ref_=nv_sr_fn&q=process.argv[2]&s=all --> use qs.stringify to turn these into an input, so user can search using special characters
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
    s: 'tt'});
// Use port 80 for http, that's the default; not necessary to declare the port unless it is different than 80
const req = http.request({
  hostname: 'www.imdb.com',
  path:'/find?' + imdbPath
}, (res) => {
  let str = ''
  res.on('data', function(chunk) {
    str += chunk
  })
  res.on('end', function () {
    const $ = cheerio.load(str);
    //<div class ='findSection'>, <table class='findList'>, <td class='result_text'>
    // class we want is 'result_text'
    let titles = $('.result_text').map((i, elm) => $(elm).text()).toArray().join('\n');
    //Return result in console display --> result
    console.log(titles);
  })
})

req.end()

/* let titles = $('.result_text').text(); --> alternative way of using cheerio to
get the text you want; this method does not allow the text to be mapped to an Array,
however, so while simpler, it's not as useful. The map method above requires passing
in the i argument even though it is never used; refer to cheerio docs for more info;
toArray() is called to display the relevant info in an array, and join('\n') is
called to display the movie titles each on a new line, in a more human readable
format */
