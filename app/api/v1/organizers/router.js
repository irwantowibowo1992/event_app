const router = require('express-promise-router')();

const { authenticateUser } = require('../../../middlewares/auth');
const {createCMSOrganizer, createCMSUser} = require('./controller');

router.post(
    '/organizers',
    createCMSOrganizer
);

router.post(
    '/admin',
    authenticateUser,
    createCMSUser
);

module.exports = router;