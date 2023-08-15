const { createImages } = require("../../../services/mongoose/images");
const { uploadFile } = require("../../../utils");


const generateImageUrl = async(req, res, next) => {
    try {
        const file = req.file;
        const {folder} = req.body;

        const result = await uploadFile(file.buffer, folder);
        const response = await createImages(result.secure_url, result.public_id)
        return res.status(200).json({
            data: response,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    generateImageUrl,
}