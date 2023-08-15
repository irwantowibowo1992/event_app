const Events = require('../../api/v1/events/model');
const {NotFoundError, BadRequestError} = require('../../errors');
const { checkingImage, deleteImage } = require('./images');
const {getDetailCategory} = require('./categories');
const {getDetailTalent} = require('./talents');

const getAllEvents = async (query) => {
    const {keyword, category, talent, statusEvent} = query;
    let condition = {};

    if (keyword) {
        condition = { 
            ...condition, 
            title: { 
                $regex: keyword, 
                $options: 'i' 
            } 
        };
    }

    if (category) {
        condition = {
            ...condition, 
            category: category
        }
    }

    if (talent) {
        condition = {
            ...condition, 
            talent: talent
        }
    }

    if (statusEvent) {
        condition = {
            ...condition, 
            statusEvent: statusEvent
        }
    }

    const result = await Events.find(condition)
        .populate({ path: 'image', select: '_id name' })
        .populate({
            path: 'category',
            select: '_id name',
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { path: 'image', select: '_id  name' },
        });

    return result;
}

getDetailEvent = async (id) => {
    const result = await Events.findOne({_id: id})
        .populate({
            path: 'image',
            select: '_id name'
        })
        .populate({
            path: 'category',
            select: '_id name'
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: ({
                path: 'image',
                select: '_id name'
            })
        });

    if(!result) throw new NotFoundError('Data not found');

    return result;
}

addNewEvent = async (data) => {
    await Promise.all([
        checkingImage(data.image),
        getDetailCategory(data.category),
        getDetailTalent(data.talent)
    ]);

    const check = await Events.findOne({
        title: data.title
    });

    if(check) throw new BadRequestError('Talent is duplicated');

    return await Events.create({
        title: data.title,
        date: data.date,
        about: data.about,
        tagline: data.tagline,
        venueName: data.venueName,
        keyPoint: data.keyPoint,
        statusEvent: data.statusEvent,
        tickets: data.tickets,
        image: data.image,
        category: data.category,
        talent: data.talent,
    });
};

updateEvent = async (id, data) => {
    await Promise.all([
        checkingImage(data.image),
        getDetailCategory(data.category),
        getDetailTalent(data.talent)
    ]);

    const check = await Events.findOne({
        title: data.title,
        _id: {$ne: id}
    });

    if(check) throw new BadRequestError('Talent is duplicated');

    const result =  await Events.findByIdAndUpdate(
        {
            _id: id,
        },
        {
            title: data.title,
            date: data.date,
            about: data.about,
            tagline: data.tagline,
            vanueName: data.vanueName,
            keyPoint: data.keyPoint,
            statusEvent: data.statusEvent,
            tickets: data.tickets,
            image: data.image,
            category: data.category,
            talent: data.talent,
        },
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError(`Data not found`);

    return result;
};

updateStatusEvent = async (id, data) => {
    const result =  await Events.findByIdAndUpdate(
        {
            _id: id,
        },
        {
            statusEvent: data.statusEvent,
        },
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError(`Data not found`);

    return result;
};

deleteEvent = async (id) => {
    const result = await Events.findOne({
        _id: id,
    });

    if(!result) throw new NotFoundError('Data not found');

    await result.deleteOne();

    return result;
}


module.exports = {
    getAllEvents,
    getDetailEvent,
    addNewEvent,
    updateEvent,
    deleteEvent,
    updateStatusEvent
}