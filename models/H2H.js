const mongoose = require('mongoose');

const H2HSchema = new mongoose.Schema({
    filters: {
        limit: {
            type: Number
        },
        permission: {
            type: String
        }
    },
    resultSet: {
        count: 2,
        competitions: {
            type: String
        },
        first: {
            type: String
        },
        last: {
            type: String
        }
    },
    aggregates: {
        numberMatches: {
            type: Number
        },
        totalGoals: {
            type: Number
        },
        homeTeam: {
            type: Object
        },
        awayTeam: {
            type: Object
        }
    },
    matches: {
        type: Array,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('H2H', H2HSchema)