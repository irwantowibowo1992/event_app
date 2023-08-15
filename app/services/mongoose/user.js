const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const { BadRequestError } = require('../../errors');

const createOrganizer = async (data) => {
    if(data.password !== data.confirmPassword) {
        throw new BadRequestError('Passwor dan confirmation is not match');
    }

    const result = await Organizers.create({
        organizer: data.organizer,
    });

    const user = await Users.create({
        email: data.email,
        name: data.name,
        password: data.password,
        organizer: result._id,
        role: data.role
    });

    delete user._doc.password; // _doc diperlukan supaya user.password bisa dihapus, soalnya kalau langsung delete user.password dia tidak mau dihapus

    return user;
}

const createUser = async (user, data) => {
    if(data.password !== data.confirmPassword) {
        throw new BadRequestError('Password and confirmation is not match');
    }

    const result = await Users.create({
        name: data.name,
        email: data.email,
        organizer: user.organizer,
        password: data.password,
        role: data.role,
    });

    return result;
}

module.exports = {
    createOrganizer,
    createUser,
}