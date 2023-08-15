const mongoose = require('mongoose');
const {model, Schema} = mongoose;

let imageSchema = Schema(
    {
        name: {type: String},
        public_id: {type: String},
    },
    {timestamps: true}
);

module.exports = model('Image', imageSchema);