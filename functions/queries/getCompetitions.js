const Competition = require("../../models/Competition")
const Match = require("../../models/Match")

const getCompetitions = async (withMatches) => {
    console.log('starting...')
    const date = new Date()
    const today = date.toLocaleDateString()
    const tomorrow = (new Date(date.getTime() + (1000 * 60 * 60 * 24))).toLocaleDateString()
    let result;

    try {
        if (withMatches) {
            result = await Competition.find({}, {_id: 0, matches: 0})
        } else {
            const competitions = await Competition.find({}, {_id: 0, name: 1, code: 2, matches: 3})
            console.log(competitions.length, 'competitions found')
            let num = 0
            
            for(let i = 0; i < competitions.length; i++) {
                const competition = competitions[i]
                console.log(competition._doc.matches.length, 'matches available for', competition._doc.name)
                console.log('fetching', competition._doc.name, 'matches')

                const matches = await Match.find(
                    {
                        $and: [
                            {_id: {$in: competition._doc.matches}},
                            {utcDate: {$gt: today}},
                            {utcDate: {$lte: tomorrow}}
                        ]
                    }, {_id: 0}
                )
                console.log(matches.length, competition._doc.name, 'matches added')
                num += matches.length

                competition.matches = matches;
                competitions[i] = competition;
            }
            
            result = competitions.filter(
                competition => competition.matches.length > 0
            )
        }
    } catch (error) {
        throw error
    }
        
    return result
}

module.exports = getCompetitions