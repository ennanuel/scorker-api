const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
    {
        area: {
            id: {
                type: Number
            },
            name: {
                type: String
            },
            code: {
                type: String
            },
            flag: {
                type: String
            }
        },
        competition: {
            id: {
                type: Number
            },
            name: {
                type: String
            },
            code: {
                type: String
            },
            type: {
                type: String
            },
            emblem: {
                type: String
            }
        },
        season: {
            id: {
                type: Number
            },
            startDate: {
                type: String
            },
            endDate: {
                type: String
            },
            currentMatchDay: {
                type: String
            },
            winner: {
                type: String,
                default: ''
            }
        },
        id: {
            type: Number,
        },
        utcDate: {
            type: String
        },
        status: {
            type: String
        },
        matchDay: {
            type: Number
        },
        dtage: {
            type: String
        },
        group: {
            type: String
        },
        lastUpdated: {
            type: String
        },
        homeTeam: {
            id: {
                type: Number,
            },
            name: {
                type: String
            },
            shortName: {
                type: String
            },
            tla: {
                type: String
            },
            crest: {
                type: String
            }
        },
        "awayTeam": {
            id: {
                type: Number,
            },
            name: {
                type: String
            },
            shortName: {
                type: String
            },
            tla: {
                type: String
            },
            crest: {
                type: String
            }
        },
        score: {
            winner: {
                type: String,
                default: null
            },
            duration: {
                type: String
            },
            fullTime: {
                home: {
                    type: Number,
                    default: 0
                },
                away: {
                    type: Number,
                    default: 0
                }
            },
            halfTime: {
                home: {
                    type: Number,
                    default: 0
                },
                away: {
                    type: Number,
                    default: 0
                }
            }
        },
        referees: {
            type: Array
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Match', matchSchema)