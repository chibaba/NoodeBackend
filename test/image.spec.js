const {isBuffer} = require('util');
const supertest = require('supertest');
const {assert} = require('chai');
const config = require('../config');
const jwt = require('../utils/jwt');

describe('Image Thumbnail API', () => {

    const api = supertest(config.URL);

    const loginData = {
        username: 'chiboy',
        password: 'Andemurray'
    };

    const token = jwt.getToken(loginData);

    it('can resize an image', (done) => {

        api.get('/gen-thumbnail')
        .query('image=https://avatars2.githubusercontent.com/u/11578670?s=40&v=4')
        .set('token', token)
        .expect((res) => {
            let body = res.body;
            assert.isTrue(isBuffer(body));
        })
        .expect(200, done);
    }).timeout(20000);

    it('cannot resize an image without a JWT', (done) => {

        api.get('/gen-thumbnail')
        .query('image=https://avatars2.githubusercontent.com/u/11578670?s=40&v=4')
        .expect((res) => {
            let body = res.body;
            assert.exists(body.error);
        })
        .expect(401, done);
    });

    it('gives an error if no image is passed as a query paramter', (done) => {

        api.get('/gen-thumbnail')
        .set('token', token)
        .expect((res) => {
            let body = res.body;
            assert.isObject(body);
            assert.exists(body.error);
        })
        .expect(200, done);
    }).timeout(20000);
});