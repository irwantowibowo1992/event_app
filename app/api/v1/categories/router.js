const router = require('express-promise-router')();

const {create, index, detail, update, destroy} = require('./controller');
const {authorizeRole, authenticateUser} = require('../../../middlewares/auth');

router.get(
    '/categories',
    authenticateUser,
    authorizeRole('organizer'),
    index
);

router.post(
    '/categories',
    authenticateUser,
    authorizeRole('organizer'),
    create
);

router.get(
    '/categories/:id',
    authenticateUser,
    authorizeRole('organizer'),
    detail
);

router.put(
    '/categories/:id',
    authenticateUser,
    authorizeRole('organizer'),
    update
);

router.delete(
    '/categories/:id',
    authenticateUser,
    authorizeRole('organizer'),
    destroy
);
module.exports = router;