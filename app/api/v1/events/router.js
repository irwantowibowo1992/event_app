const router = require('express-promise-router')();
const {
    index,
    detail,
    create,
    update,
    destroy,
    updateStatus
} = require('./controller');

router.get(
    '/events',
    index
);

router.post(
    '/events',
    create
);

router.get(
    '/events/:id',
    detail
);

router.put(
    '/events/:id',
    update
);

router.put(
    '/events/:id/status',
    updateStatus
);

router.delete(
    '/events/:id',
    destroy
);

module.exports = router;