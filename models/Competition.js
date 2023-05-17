const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CompetitionSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        area: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true,
        }, 
        code: {
            type: String,
            required: true
        }, 
        type: {
            type: String,
            required: true
        },
        emblem: {
            type: String,
        },
        numberOfAvailableSeasons: {
            type: Number,
            required: true
        },
        currentSeason: {
            type: Object,
            required: true
        },
        lastUpdated: {
            type: String,
            required: true
        },
        dateFrom: {
            type: Date,
            required: true
        },
        dateTo: {
            type: Date,
            required: true
        },
        matches: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Match'
            }
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model('Competition', CompetitionSchema)