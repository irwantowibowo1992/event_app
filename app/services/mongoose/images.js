const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

const createImages = async (name, public_id = null) => {
    const result = await Images.create({
        name: name ? name : `uploads/avatar/default.jpeg`,
        public_id: public_id
    });

    return result;
}

const checkingImage = async(image) => {
    const result = await Images.findOne({_id: image});

    if (!result) throw new NotFoundError('Image not found');

    return result;
}

const deleteImage = async(id) => {
    const result = await Images.findOne({_id: id});

    if (!result) throw new NotFoundError('Image not found');

    await result.deleteOne();
}

module.exports = {
    createImages,
    checkingImage,
    deleteImage,
}