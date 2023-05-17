const H2H = require('../../models/H2H');
const Match = require('../../models/Match');

const getPicks = async () => {
    try {
        const date = new Date()
        const today = date.toLocaleDateString()
        const tomorrow = (new Date(date.getTime() + (1000 * 60 * 60 * 24))).toLocaleDateString()
        const matches = await Match.find({
            $and: [
                {utcDate: {$gt: today}},
                {utcDate: {$lte: tomorrow}}
            ]
        }, {_id: 0})

        for(let i = 0; i < matches.length; i++) {
            const match = matches[i]
            console.log('fetching head-to-heads for', match._doc.homeTeam.name, 'v', match._doc.awayTeam.name)

            const h2h = await H2H.findById(match._doc.head2head)
            console.log('fetching', h2h.aggregates.homeTeam.name, 'previousMatches')
            const homePrevMatches = await Match.find({_id: {$in: h2h._doc.aggregates.homeTeam.previousMatches}})

            console.log('fetching', h2h.aggregates.awayTeam.name, 'previousMatches')
            const awayPrevMatches = await Match.find({_id: {$in: h2h._doc.aggregates.awayTeam.previousMatches}})

            console.log('fetching head-to-head matches')
            const h2hMatches = await Match.find({_id: {$in: h2h._doc.matches}})
            h2h.matches = h2hMatches
            h2h.aggregates.homeTeam.previousMatches = homePrevMatches
            h2h.aggregates.awayTeam.previousMatches = awayPrevMatches
            match.head2head = h2h
            matches[i] = match;
            console.log('match updated')

            if(h2h.matches.length > h2h.resultSet.count) return match;
        }

        return matches;
    } catch (error) {
        throw error;
    }
}

module.exports = getPicks