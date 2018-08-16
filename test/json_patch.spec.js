const supertest = require('supertest');
const {assert} = require('chai');
const config = require('../config');
const jwt = require('../utils/jwt');

describe('JSON Patch API', () => {

    const api = supertest(config.URL);
    
    const jsonObj = {
        name: 'Leonard',
        country: 'Nigeria'
    };

    const patchObj = {
        op: 'replace',
        path: '/name',
        value: 'onyeoka'
    };

    const loginData = {
        username: 'chuks',
        password: 'gbondi'
    };

    const token = jwt.getToken(loginData);

    it('can patch a JSON object', (done) => {

        api.patch('/apply-patch')
        .send({ jsonObj, patchObj })
        .set('token', token)
        .expect((res) => {
            let body = res.body;
            assert.isObject(body);
            assert.equal(body.name, "onyeoka");
            assert.equal(body.country, "Nigeria");
        })
        .expect(200, done);
    });

    it('cannot apply a patch without a JWT', (done) => {

        api.patch('/apply-patch')
        .send({ jsonObj, patchObj })
        .expect((res) => {
            let body = res.body;
            assert.exists(body.error);
        })
        .expect(401, done);
    });

    it('cannot apply patch with an invalid Patch object', (done) => {

        let patchObj = {
            op: 'replace',
            value: 'Ikechukwu'
        };

        api.patch('/apply-patch')
        .send({ jsonObj, patchObj })
        .set('token', token)
        .expect((res) => {
            let body = res.body;
            assert.exists(body.error);
        })
        .expect(200, done);
    });
});