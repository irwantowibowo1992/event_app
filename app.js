const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('server-semina:server');

const v1 = '/api/v1/cms';

const app = express();

// router
const categoriesRouter = require('./app/api/v1/categories/router');
const imageRouter = require('./app/api/v1/images/router');
const talentRouter = require('./app/api/v1/talents/router');
const eventRouter = require('./app/api/v1/events/router');
const organizerRouter = require('./app/api/v1/organizers/router');
const authCMSRouter = require('./app/api/v1/auth/router');

const notFoundMiddleware = require('./app/middlewares/not-found-url');
const handleErrorMiddleware = require('./app/middlewares/handle-error');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(v1, categoriesRouter);
app.use(v1, imageRouter);
app.use(v1, talentRouter);
app.use(v1, eventRouter);
app.use(v1, organizerRouter);
app.use(v1, authCMSRouter);

// Error handle, pastikan dia di bawah router supaya tidak dieksekusi lebih dulu
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
