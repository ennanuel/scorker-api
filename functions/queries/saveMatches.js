const Competition = require('../../models/Competition')
const Match = require('../../models/Match')
const H2H = require('../../models/H2H')
const axios = require('axios')
const { headers } = require('../../data')

const saveMatches = async () => {
    try {
        const date = new Date()
        const threeDays = 259200000
        let compMatches = []

        const foundComps = await Competition.find({ dateFrom: { $lt: (new Date(date.getTime() - threeDays).toLocaleDateString()) }})
        console.log('this may take a while')

        if (foundComps.length < 1) return "nothing left to do, THANK GOD!"

        foundComps.forEach( elem => {
            compMatches.push(...elem._doc.matches);
        })

        let i = 0
        for(let competition of foundComps) {
            if (i >= 3) break;
            const dateTo = (new Date( date.getTime() - threeDays )).toLocaleDateString()
            const prevMatches = await Match.find({$and: [
                {utcDate: {$gte: competition._doc.dateFrom}}, 
                {utcDate: {$lt: dateTo}}, 
                {_id: {$in: compMatches}}
            ]})

            if(prevMatches.length > 0) {
                const h2hs = await H2H.find()
                console.log('head 2 heads found!')

                for(let prevMatch of prevMatches) {

                    const foundMatch = await Match.find({$and: [
                        {'homeTeam.name': {$in: [prevMatch._doc.homeTeam.name, prevMatch._doc.awayTeam.name]}}, 
                        {'awayTeam.name': {$in: [prevMatch._doc.homeTeam.name, prevMatch._doc.awayTeam.name]}},
                        {status: {$regex: /[^(finished|cancelled|postponed)]/i}}
                    ]})
                    
                    if(foundMatch.length > 0) {
                        await H2H.findById/*AndUpdate*/(
                            prevMatch._doc.head2head, 
                            {
                                $push: {
                                    matches: prevMatch, 
                                    'aggregates.homeTeam.previousMatches': prevMatch,
                                    'aggregates.awayTeam.previousMatches': prevMatch
                                }
                            }
                        )
                    } else {
                        const tbd = prevMatch._doc.head2head
                        const h2h = await H2H.findById(tbd)

                        // Finding if there are any previous matches that contain the match I'm about to delete
                        const matchesTbd = h2h._doc.matches.filter( 
                            elem => !h2hs.some( 
                                h2h => h2h._doc.aggregates.homeTeam.previousMatches.includes(elem) || h2h._doc.aggregates.awayTeam.previousMatches.includes(elem)
                            ) 
                        )
                        
                        const {homeTeam, awayTeam, ...others} = h2h.aggregates
                        
                        // Checking if there are any home team or away team that haven't played so I won't delete their previous matches
                        for(let team of [homeTeam, awayTeam]) {
                            console.log('looking for', team.name, 'matches')
                            const found = await Match.find({$and: [
                                {_id: {$ne: prevMatch._doc._id}},
                                {_id: {$in: compMatches}},
                                {$or: [{'homeTeam.name': team.name}, {'awayTeam.name': team.name}]},
                            ]})

                            if(found.length > 0) {
                                matchesTbd.filter( elem => typeof(elem) !== 'object')

                                await H2H.updateMany(
                                    { 'aggregates.homeTeam.name': team.name, 'aggregates.homeTeam.previousMatches': prevMatch },
                                    { $push: {'aggregates.homeTeam.previousMatches': prevMatch}}
                                )
                                await H2H.updateMany(
                                    { 'aggregates.awayTeam.name': team.name, 'aggregates.awayTeam.previousMatches': prevMatch },
                                    { $push: {'aggregates.awayTeam.previousMatches': prevMatch}}
                                )
                            } else {
                                matchesTbd.push(prevMatch._doc._id)

                                const prevMatchesTbd = team.previousMatches.filter(
                                    match => !h2hs
                                        .filter(elem1 => elem1._doc.matches.every( m => h2h._doc.matches.includes(m) ) )
                                        .some( elem1 => elem1._doc.matches.includes(match) )
                                )

                                await Match.deleteMany({_id: { $in: prevMatchesTbd} })
                                console.log(team.name, 'previous matches deleted')
                            }
                        }

                        await Match.deleteMany({_id: { $in: [...matchesTbd]} })
                        console.log('matches deleted!')

                        await H2H.findByIdAndDelete(h2h._doc._id)
                        console.log('h2h deleted!')
                    }
                        
                    await Competition.findOneAndUpdate({matches: prevMatch._doc._id}, {$pull: {matches: prevMatch._doc._id}})
                    console.log('unimportant competition matches pulled!')
                }
            }

            const newDateTo = (new Date((new Date(competition._doc.dateTo)).getTime() + (1000 * 60 * 60 * 24)).toLocaleDateString()).split('/')
            const filterDate = `${newDateTo[2]}-${newDateTo[0] < 10 ? '0' + newDateTo[0] : newDateTo[0]}-${newDateTo[1] < 10 ? '0' + newDateTo[1] : newDateTo[1]}`
            
            const response = await axios.get(`${process.env.FOOTBALL_API_URL}/competitions/${competition._doc.id}/matches?dateFrom=${filterDate}&dateTo=${filterDate}`, { headers })
            console.log('fetched competition matches')

            const response1 = await axios.get(`${process.env.FOOTBALL_API_URL}/competitions/${competition._doc.id}/standings`, { headers })
            console.log('fetched competition standings')

            const {standings, season, ...others1} = response1.data
            season.standings = standings
            const { matches: fetchedMatches, ...others} = response.data
            const matches = fetchedMatches.map( elem => {
                const { area, competition, season, odds, ...match } = elem
                return match
            })

            const newMatches = await Match.insertMany(matches)

            const thisTing = await Competition.findByIdAndUpdate(
                competition._doc._id,
                {
                    $set: {
                        dateFrom: (new Date( date.getTime() - threeDays )).toLocaleDateString(),
                        dateTo: (new Date( date.getTime() + threeDays )).toLocaleDateString(),
                        currentSeason: season,
                    },
                    $push: {
                        matches: {$each: newMatches}
                    }
                }
            )
            i++
        }

        const comps = await Competition.count({ dateFrom: { $lt: (new Date(date.getTime() - threeDays).toLocaleDateString()) }})
        return {count: comps}

    } catch (error) {
        throw error.message
    }
}

module.exports = saveMatches