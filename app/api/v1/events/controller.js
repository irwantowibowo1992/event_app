const { StatusCodes } = require('http-status-codes');
const { 
    getAllEvents, 
    getDetailEvent, 
    addNewEvent, 
    updateEvent, 
    deleteEvent,
    updateStatusEvent
} = require('../../../services/mongoose/events');

const index = async (req, res) => {
    const query = req.query;

    const result = await getAllEvents(query);

    return res.status(StatusCodes.OK).json({
        data: result,
    });
}

const detail = async (req, res) => {
    const {id} = req.params;

    const result = await getDetailEvent(id);

    return res.status(StatusCodes.OK).json({
        data: result,
    });
}

const create = async (req, res) => {
    const body = req.body;

    const result = await addNewEvent(body);

    return res.status(StatusCodes.CREATED).json({
        data: result,
    });
}

const update = async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    const result = await updateEvent(id, body);

    return res.status(StatusCodes.OK).json({
        data: result,
    });
}

const updateStatus = async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    const result = await updateStatusEvent(id, body);

    return res.status(StatusCodes.OK).json({
        data: result,
    });
}

const destroy = async (req, res) => {
    const {id} = req.params;

    const result = await deleteEvent(id);

    return res.status(StatusCodes.OK).json({
        data: result,
    });
}

module.exports = {
    index,
    detail,
    create,
    update,
    destroy,
    updateStatus
}