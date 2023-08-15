const {StatusCodes} = require('http-status-codes');
const signIn = require('../../../services/mongoose/auth');

const signInCms = async (req, res, next) => {
    const body = req.body;
    const result = await signIn(body);

    res.status(StatusCodes.CREATED).json({
        data: {token: result}
    });
}

module.exports = {signInCms};