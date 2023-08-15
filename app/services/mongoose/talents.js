const Talents = require('../../api/v1/talents/model');
const { NotFoundError, BadRequestError } = require('../../errors');
const { deleteFile } = require('../../utils');
const { checkingImage, deleteImage } = require('./images');

const getAllTalents = async (keyword) => {
    let condition = {};

    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
    }
    return await Talents.find(condition)
        .populate({
            path: 'image',
            select: '_id name',
        })
        .select('_id name role image');
}

const getTalentByName = async(name) => {
    const result = await Talents.findOne({name: name});
    if (!result) throw new NotFoundError('Data not found');

    return result;
}

const createTalent = async(name, image, role) => {
    await checkingImage(image);

    const check = await Talents.findOne({name});

    if (check) throw new BadRequestError('Talent name is duplicated');

    return await Talents.create({
        name: name, 
        image: image, 
        role: role
    });
}

const getDetailTalent = async(id) => {
    const result = await Talents.findOne({_id: id})
        .populate({
            path: 'image',
            select: '_id name public_id'
        })
        .select('_id name role image');

    if (!result) throw new NotFoundError('Data not found');

    return result;
}

const updateTalent = async (id, data) => {
    await checkingImage(data.image);

    // cari data dengan field name dan id selain dari yang dikirim dara param
    const check = await Talents.findOne({
        name: data.name,
        _id: {$ne: id}
    });

    if(check) throw new BadRequestError('Data is duplicated');

    const result = await Talents.findOneAndUpdate(
        {_id: id},
        {name: data.name, image: data.image, role: data.role},
        {new: true, runValidator: true}
    );

    if(!result) throw new NotFoundError('Data not found');

    return result;
}

const deleteTalent = async (id) => {
    const result = await getDetailTalent(id);

    await Promise.all([
        deleteFile(result.image.public_id),

        result.deleteOne(),

        deleteImage(result.image._id),
    ]);

    return result;
}

const checkingTalent = async (id) => {
    const result = await Talents.findOne({ _id: id });

    if (!result)
        throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

    return result;
}



module.exports = {
    getAllTalents,
    getTalentByName,
    createTalent,
    getDetailTalent,
    updateTalent,
    deleteTalent,
    checkingTalent
}