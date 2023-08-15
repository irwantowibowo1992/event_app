const {StatusCodes} = require('http-status-codes');
const { 
    createOrganizer, 
    createUser
} = require('../../../services/mongoose/user');

const createCMSOrganizer = async(req, res) => {
    const body = req.body;
    
    const result = await createOrganizer(body);

    res.status(StatusCodes.CREATED).json({
        data: result,
    });
}

const createCMSUser = async(req, res) => {
    const body = req.body;
    const user = req.user;
    
    const result = await createUser(user, body);

    res.status(StatusCodes.CREATED).json({
        data: result,
    });
}

module.exports = {
    createCMSOrganizer,
    createCMSUser,
}