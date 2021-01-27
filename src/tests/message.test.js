process.env.NODE_ENV = 'test';

import mongoose from "mongoose";
import Message from '../models/index';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


chai.use(chaiHttp);

describe('Check test', () => {
    it('Return number', () => {
        expect(1 + 1).to.equal(2)
    });

})


describe('Messages', () => {

    beforeEach((done) => {
        Message.deleteMany({}, (err) => {
            done();
        });
    });

    it('should return welcome', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.have.property('message')
                done();
            });
    });

    it('should return url not found', (done) => {
        chai.request(server)
            .get('/secrete')
            .end((err, res) => {
                expect(res.statusCode).to.equal(404)
                expect(res.body).to.have.property('message')
                done();
            });
    });


    it('should GET all the messages', (done) => {
        chai.request(server)
            .get('/api/secret')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('data')
                done();
            });
    });

    it('should NOT POST message', (done) => {
        chai.request(server)
            .post('/api/secret')
            .end((err, res) => {
                expect(res.statusCode).to.equal(500)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done();
            });
    });

    it('should POST message', (done) => {
        let message = {
            "secret": "Test Secrete",
            "expireAfterViews": 8,
            "expireAfter": 1
        }
        chai.request(server)
            .post('/api/secret')
            .send(message)
            .end((err, res) => {
                expect(res.statusCode).to.equal(201)
                expect(res.body).to.have.property('message')
                expect(res.body).to.have.property('data')
                done();
            });
    });

    it('should NOT GET by hash', (done) => {
        let hash = '01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b'
        chai.request(server)
            .get('/api/secret' + hash)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404)
                expect(res.body).to.have.property('message')

                done();
            });
    });

});
