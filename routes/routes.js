const {Router} = require('express');
const flow = require('../utils/flow'); 
const User = require('../models/user'); 

const router = Router();

/** Authentication URL */
router.post('/login', flow.verifyUserAndPass, User.login);

/** JSON Patch URL */
router.patch('/apply-patch', flow.verifyToken, User.applyPatch);

/** Image thumbnail URL */
router.get('/gen-thumbnail', flow.verifyToken, User.generateThumbnail);

module.exports = { router };