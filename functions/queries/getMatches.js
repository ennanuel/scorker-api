const Match = require("../../models/Match")

const getMatches = async (filter) => {
    console.log('starting...')
    const status = filter
    const date = new Date()
    const today = date.toLocaleDateString()
    const tomorrow = (new Date(date.getTime() + (1000 * 60 * 60 * 24))).toLocaleDateString()

    try {
        const matches = await Match.find({
            $and: [
                {utcDate: {$gt: today}},
                {utcDate: {$lte: tomorrow}}
            ]
        }, {_id: 0})

        console.log('success!')

        return matches;
        return matches.filter( elem => elem.status === status );
    } catch (error) {
        throw error;
    }
}

module.exports = getMatches