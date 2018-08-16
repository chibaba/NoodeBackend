/**
 * This file contains route flow
 */

const jwt = require('./jwt'); 

module.exports = class Flow {

    /** Checks if the username and password are supplied */
    static verifyUserAndPass(req, res, next) {
        if (! req.body.username || ! req.body.password) {
            return res.json({error: 'Username and password must be provided'});
        }
        next();
    }

    /** This is to Checks if the token is valid or invalid */
    static verifyToken(req, res, next) {
        if (! jwt.verifyToken(req.headers.token || '')) {
            return res.status(401).json({error: 'Token is invalid or missing'});
        }
        next();
    }
};