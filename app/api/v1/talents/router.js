const router = require('express-promise-router')();
const { 
    index, 
    detail, 
    create, 
    update, 
    destroy 
} = require('./controller');

router.get(
    '/talents',
    index
);

router.post(
    '/talents',
    create
);

router.get(
    '/talents/:id',
    detail
);

router.put(
    '/talents/:id',
    update
);

router.delete(
    '/talents/:id',
    destroy
);

module.exports = router;