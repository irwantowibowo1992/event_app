const mongoose = require('mongoose');

const ticketCategoriesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Type ticket is required'],
    },
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    statusTicketCategories: {
        type: Boolean,
        enum: [true, false],
        default: false,
    },
    expired: {
        type: Date,
    }
});

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minLength: 3,
            maxLenth: 50,
        },
        date: {
            type: Date,
            required: [true, 'Date and time is required'],
        },
        about: {
            type: String,
        },
        tagline: {
            type: String,
            required: [true, 'Tagline is required'],
        },
        keyPoint: {
            type: [String],
        },
        venueName: {
            type: String,
            required: [true, 'Venue name is required'],
        },
        statusEvent: {
            type: String,
            enum: ['Draft', 'Published'],
            default: 'Draft',
        },
        tickets: {
            type: [ticketCategoriesSchema],
            required: true,
        },
        image: {
            type: mongoose.Types.ObjectId,
            ref: 'Image',
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        talent: {
            type: mongoose.Types.ObjectId,
            ref: 'Talent',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);