const mongoose = require("mongoose");
const Location = require('../models/Location');
let chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Locations', () => {
  let accessToken = '';
  beforeEach((done) => { //Before each test we empty the database
    Location.deleteMany({}, (err) => {
      done();
    });
  });
  /*
    * Test the /GET route
    */
  describe('/POST Login', () => {
    it('it should login a user', (done) => {
      chai.request(server)
        .post('/api/login')
        .send(
          {"phoneNumber":"0723255128",
            "password":"Amondi95!"})
        .end((err, res) => {
          res.should.have.status(200);
          accessToken = res.body.accessToken;
          done();
        });
    });
  });

  describe('/GET locations', () => {
    it('it should GET all the locations without creating', (done) => {
      chai.request(server)
        .get('/api/location').set("authorization", `Bearer ${accessToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

});
