const {StatusCodes} = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../../../errors');
const { 
    getAllCategories, 
    createNewCategory, 
    getDetailCategory,
    updateCategory,
    deleteCategory
} = require('../../../services/mongoose/categories');

const create = async(req, res) => {
    const body = req.body;
    const user = req.user;
    
    const result = await createNewCategory(body, user);

    res.status(StatusCodes.CREATED).json({
        data: result,
    });
}

const index = async(req, res) => {
    const user = req.user;
    const result = await getAllCategories(user);
    return res.status(StatusCodes.OK).json({
        data: result,
    });
}

const detail = async(req, res, next) => {
    const {id} = req.params;
    const user = req.user;
    const result = await getDetailCategory(id, user);
    return res.status(StatusCodes.OK).json({
        data: result,
    });
}

const update = async(req, res, next) => {
    const {id} = req.params;
    const {name} = req.body;
    const user = req.user;

    const result = await updateCategory(id, user, name);

    return res.status(StatusCodes.OK).json({
        data: result,
    });
}

const destroy = async(req, res, next) => {
    const {id} = req.params;
    const user = req.user;
    const result = await deleteCategory(id, user);

    return res.status(StatusCodes.OK).json({
        data: result,
    });
}

module.exports = {
    index,
    create,
    detail,
    update,
    destroy,
}