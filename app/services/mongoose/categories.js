const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllCategories = async (user) => {
    return await Categories.find({organizer: user.organizer});
}

const getCategoryByName = async (name) => {
    return await Categories.findOne({name});
}

const createNewCategory = async (data, user) => {
    const checkCategory = await getCategoryByName(data.name);
    if(checkCategory) {
        throw new BadRequestError('Category is exists');
    }

    return await Categories.create(
        {
            name: data.name, 
            organizer: user.organizer
        }
    );
}

const getDetailCategory = async (id, user) => {
    const response = await Categories.findOne(
        {
            _id: id, 
            organizer: user.organizer
        }
    );

    if(!response) {
        throw new NotFoundError('Data not found');
    }

    return response;
}

const updateCategory = async (id, user, name) => {
    const [check, result] = await Promise.all([
        Categories.findOne({
            name,
            organizer: user.organizer,
            _id: {$ne: id} // ne ini akan mencari di semua record kecuali id yang ini
        }),

        Categories.findByIdAndUpdate(
            {_id: id}, 
            {name}, 
            {
                new: true,
                runValidators: true
            }
        )
    ]);

    if (check) {
        throw new BadRequestError('Data is duplicated');
    }

    if(!result) throw new NotFoundError('Data not found');

    return await Categories.findByIdAndUpdate(
        {_id: id}, 
        {name}, 
        {
            new: true,
            runValidators: true
        }
    )
}

const deleteCategory = async (id, user) => {
    const result = await getDetailCategory(id, user);
    if(!result) throw NotFoundError('Data not found'); 

    await result.deleteOne()

    return result;
}

module.exports = {
    getAllCategories,
    createNewCategory,
    getCategoryByName,
    getDetailCategory,
    updateCategory,
    deleteCategory,
}