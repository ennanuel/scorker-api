const mongoose = require('mongoose');
const Schema = mongoose.Schema

const H2HSchema = new mongoose.Schema(
    {
        resultSet: {
            count: { type: Number },
            competitions: { type: String },
            first: { type: Date },
            last: { type: Date }
        },
        aggregates: {
            numberOfMatches: { type: Number },
            totalGoals: { type: Number },
            homeTeam: {
                id: { type: Number },
                name: { type: String },
                wins: { type: Number },
                draws: { type: Number },
                losses: { type: Number },
                previousMatches: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Match',
                    }
                ]
            },
            awayTeam: {
                id: { type: Number },
                name: { type: String },
                wins: { type: Number },
                draws: { type: Number },
                losses: { type: Number },
                previousMatches: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Match',
                    }
                ]
            }
        },
        matches: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Match'
            }
        ]
    },
    {timestamps: true}
)

module.exports = mongoose.model('H2H', H2HSchema)