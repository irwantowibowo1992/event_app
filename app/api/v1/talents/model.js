const mongoose = require('mongoose');
const {model, Schema} = mongoose;

let talentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name field is required']
        },
        role: {
            type: String,
            default: '-'
        },
        image: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Image',
            required: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Talent', talentSchema);