const expect = require('chai').expect;
const queryIMDB = require('../Movie_Search_CLI/alt-movie-search');


describe('The easy way', function() {
  it('Can find Star Wars', function(done) {
    queryIMDB('Star Wars', (err, result) => {
      expect(err).is.null
      expect(result).to.have.length(5)
      done()
    })
  })
})
