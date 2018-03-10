const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {restraunt} = require('./../models/restraunt');

beforeEach((done) => {
  restraunt.remove({}).then(() => done());
});

describe('POST /restraunt', () => {
  it('should create a new restraunt', (done) => {
    var name = 'Test restraunt name';

    request(app)
      .post('/restraunt')
      .send({name})
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        restraunt.find().then((restraunt) => {
          expect(restraunt.length).toBe(1);
          expect(restraunt[0].name).toBe(name);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create restraunt with invalid body data', (done) => {
    request(app)
      .post('/restraunt')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        restraunt.find().then((restraunt) => {
          expect(restraunt.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
