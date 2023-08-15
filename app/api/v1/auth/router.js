const router = require('express-promise-router')();
const { signInCms } = require('./controller');

router.post(
    '/auth/signin',
    signInCms
);

module.exports = router;