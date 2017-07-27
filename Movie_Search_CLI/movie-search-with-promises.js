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
  transform: (body) => cheerio.load(body)
};

rp(imdbMoviesPage)
  .then(($) => {
    let titles = $('.result_text').map((i, elm) => $(elm).text()).toArray().join('\n');
    console.log(titles);
    console.log(titles.length + ' results');
  })
  .catch((err) => {
    console.log('Problem loading imdb!');
    throw err
  });
