const rp = require('request-promise');
const cheerio = require('cheerio');
const qs = require('querystring');
const input = process.argv[2];
const imdbPath = qs.stringify(
    {ref_ : 'nv_sr_fn',
    q: input,
    s: 'tt'});
const imdbMoviesPage = {
  uri: 'http://www.imdb.com/find?' + imdbPath,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(imdbMoviesPage)
  .then(function($) {
    let titles = $('.result_text').map((i, elm) => $(elm).text()).toArray().join('\n');
    console.log(titles);
    console.log(titles.length + ' results');
  })
  .catch(function(err) {
    console.log('Problem loading imdb!');
    throw err
  });
