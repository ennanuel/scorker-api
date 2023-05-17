const mongoose = require('mongoose');
const Schema = mongoose.Schema

const matchSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        utcDate: { type: Date, required: true },
        status: { type: String, required: true },
        matchday: { type: Number, default: null },
        stage: { type: String, },
        group: { type: String, default: '' },
        lastUpdated: { type: Date, required: true },
        homeTeam: {
            id: { type: Number, },
            name: { type: String },
            shortName: { type: String },
            tla: { type: String },
            crest: { type: String },
        },
        awayTeam: {
            id: { type: Number },
            name: { type: String },
            shortName: { type: String },
            tla: { type: String },
            crest: { type: String },
        },
        score: {
            winner: { type: String },
            duration: { type: String },
            fullTime: {
                home: { type: Number },
                away: { type: Number }
            },
            halfTime: {
                home: { type: Number },
                away: { type: Number }
            }
        },
        referees: { type: Array },
        head2head: { 
            type: Schema.Types.ObjectId,
            ref: 'H2H',
            default: null
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Match', matchSchema)