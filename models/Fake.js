const mongoose = require('mongoose');
const Schema = mongoose.Schema

const fakeSchema = new Schema(
    {
        name: String
    },
    { timestamps: true }
)

module.exports = mongoose.model('Fake', fakeSchema)