const Users = require('../../api/v1/users/model');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { createJWT, createUserToken } = require('../../utils');

const signIn = async (data) => {
    const {email, password} = data;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const result = await Users.findOne({email: email});

    if (!result) {
        throw new UnauthenticatedError('Invalid credential');
    }

    const isPasswordCorrect = await result.comparePassword(password); // compare password diambil dari model yang sudah kita definisikan fungsi comparePassword
    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid credential');
    }

    const token = createJWT({payload: createUserToken(result)});

    return token;
}

module.exports = signIn;