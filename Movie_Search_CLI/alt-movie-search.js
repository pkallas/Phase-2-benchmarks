const http = require('http');
const cheerio = require('cheerio');
const qs = require('querystring');
const input = process.argv[2];
const imdbPath = qs.stringify(
    {ref_ : 'nv_sr_fn',
    q: input,
    s: 'tt'});

function queryIMDB(search, cb) {
  const request = http.get({
    host: 'www.imdb.com',
    path: '/find?' + imdbPath
  }, (res) => {
    var html = ''
    res.on('data', (chunk) => { html += chunk })
    res.on('end', () => {
      const movieNames = getMovieNames(html);
      cb(null, movieNames)
    })
  })
  request.on('error', cb)
}

function getMovieNames(html) {
  const $ = cheerio.load(html);
  const movieNames = $('.findSection')
        .first()
        .find('.result_text')
        .map((i, elm) => $(elm).text())
        .toArray()
      return movieNames;
}

queryIMDB("nemo", (err, movieNames) => {
  if (err) {
    throw err
  }
  console.log(movieNames.join('\n'))
})

/* This is an alternative method to solving the movie_search_cli benchmark. This
method uses callbacks and error handling. Rather than using cheerio.load() within
the http GET request, cheerio.load() is used within an external function, and then
that function is called within the request; a callback is called at the end to deal
with any potential errors. */
