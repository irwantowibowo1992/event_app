const {StatusCodes} = require('http-status-codes');
const { 
    getAllTalents, 
    getDetailTalent, 
    createTalent, 
    updateTalent, 
    deleteTalent 
} = require('../../../services/mongoose/talents');

const index = async (req, res) => {
    const result = await getAllTalents();

    res.status(StatusCodes.OK).json({
      data: result,
    });
}

const detail = async (req, res) => {
    const {id} = req.params;

    const result = await getDetailTalent(id);

    res.status(StatusCodes.OK).json({
      data: result,
    });
}

const create = async (req, res) => {
    const {name, image, role} = req.body;

    const result = await createTalent(name, image, role);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
}

const update = async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    const result = await updateTalent(id, body);

    res.status(StatusCodes.OK).json({
      data: result,
    });
}

const destroy = async (req, res) => {
    const {id} = req.params;

    const result = await deleteTalent(id);

    res.status(StatusCodes.OK).json({
      data: result,
    });
}

module.exports = {
    index,
    detail,
    create,
    update,
    destroy
}