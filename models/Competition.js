const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        area: {
            type: Object,
        },
        name: {
            type: String
        }, 
        code: {
            type: String,
            default: ''
        }, 
        type: {
            type: String
        },
        emblem: {
            type: String,
            default: ''
        },
        currentSeason: {
            type: Object
        },
        numberOfAvailableSeasons: {
            type: Number
        },
        lastUpdated: {
            type: String
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Competition', CompetitionSchema)