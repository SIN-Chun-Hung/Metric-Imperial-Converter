const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  after(function() {
    chai.request(server).get('/api')
  });

  suite('Routing Tests', function() {

    suite('GET /api/convert => conversion object', function() {

      test('Convert valid number and valid unit', function(done) {
        chai.request(server).get('/api/convert')
          .query({ input: '1mi' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'mi');
            assert.approximately(res.body.returnNum, 1.60934, 0.1);
            assert.equal(res.body.returnUnit, 'km');
            done();
          });
      });

      test('Convert valid unit with no number', function(done) {
        chai.request(server).get('/api/convert')
          .query({ input: 'mi' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'mi');
            assert.approximately(res.body.returnNum, 1.60934, 0.1);
            assert.equal(res.body.returnUnit, 'km');
            done();
          });
      });

      test('Convert invalid unit', function(done) {
        chai.request(server).get('/api/convert')
          .query({ input: '1gikk' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initUnit, undefined);
            done();
          });
      });

      test('Convert invalid number', function(done) {
        chai.request(server).get('/api/convert')
          .query({ input: '1/2.2/2kg' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, undefined);
            done();
          });
      });

      test('Convert invalid number with invalid unit', function(done) {
        chai.request(server).get('/api/convert')
          .query({ input: '1/2/3gi' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, undefined);
            assert.equal(res.body.initUnit, undefined);
            done();
          });
      });

    });

  });

});
