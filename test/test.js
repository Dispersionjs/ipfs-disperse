var assert = require('assert');
var disperse = require('../index.js');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;

describe('makeHashObj', function () {
  describe('when passed output from IPFS add', function () {
    let sampleString = "added QmdjC7zjKi7pYoo3YatWL6pNvJqDxAZJhXBBeXzXhzhEwp pedal.png";
    let hash = 'QmdjC7zjKi7pYoo3YatWL6pNvJqDxAZJhXBBeXzXhzhEwp';
    let result = disperse.makeHashObj(sampleString);
    let expectedUrl = 'https://ipfs.io/ipfs/QmdjC7zjKi7pYoo3YatWL6pNvJqDxAZJhXBBeXzXhzhEwp'
    it('should return valid file name', function () {
      assert.equal(result[hash].file, 'pedal.png');
    });
    it('should return timestamp', function () {
      assert.equal(result[hash].time.length, 29);
    });
    it('should return valid url', function () {
      assert.equal(result[hash].url, expectedUrl);
    });
  });
});

describe('ipfsAddPromise', function () {
  this.timeout(15000);
  let petalHash = 'QmdjC7zjKi7pYoo3YatWL6pNvJqDxAZJhXBBeXzXhzhEwp';
  it('should return a correct file name', function (done) {
    disperse.ipfsAddPromise("/Users/JasonRay/Desktop/pedal.png").then(function (data) {
      expect(data[petalHash].file).to.equal('pedal.png');
      done();
    }).catch(function (error) {
      done(error);
    });
  });
});

describe('makeTinyUrlPromise', function () {
  this.timeout(15000);
  let sampleUrl = 'https://ipfs.io/ipfs/QmaC8Mu1ycE2NhfHSarDoW7CXCrdcKnDiDLsiumk79XLrz';
  it('should return a tiny url', function (done) {
    disperse.makeTinyUrlPromise(sampleUrl).then(function (data) {
      expect(data.substring(0, 18)).to.equal('http://tinyurl.com');
      done();
    }).catch(function (error) {
      done(error);
    });
  });
});


