const Competition = require('../../models/Competition')
const axios = require('axios')
const { headers } = require('../../data')

const saveCompetition = async () => {
    try {
        // Checks if there are already competitions in the DB; if there are, show them. If not, save the new competitinos
        // const foundCompetitions = await Competition.find()
        // const date = new Date()
        // const threeDays = 259200000
        // const dateFrom = (new Date( date.getTime() - threeDays )).toLocaleDateString()
        // const dateTo =  (new Date( date.getTime() + threeDays )).toLocaleDateString()

        // if(foundCompetitions.length < 1) {
        //     const response = await axios.get(process.env.FOOTBALL_API_URL + '/competitions', { headers })
        //     const data = response.data.competitions
        //     const result = data.map( competition => {
        //         competition.currentSeason.standings = competition.matches = []
        //         competition.dateFrom = dateFrom
        //         competition.dateTo = dateTo
        //         const { plan, ...others } = competition
        //         return others
        //     })
        //     const competitions = await Competition.insertMany(result)
        //     return competitions
        // } else {
        //     return foundCompetitions
        // }

        // Add seasons to each competition
        // const competitions = await Competition.find({ 'currentSeason.standings': {$size: 0} }, { id: 1, name: 2 })
        // let i = 0

        // for ( let competition of competitions ) {
        //     if( i >= 4 ) break;
        //     const id = competition._doc.id
        //     const response = await axios.get(`${process.env.FOOTBALL_API_URL}/competitions/${id}/standings`, { headers })
        //     const season = {...response.data.season, standings: response.data.standings }
        //     await Competition.findOneAndUpdate({id: id}, { currentSeason: season })
        //     console.log(`added season for ${competition._doc.name}`)
        //     i++
        // }
        // const foundSeasons = await Competition.count({ 'currentSeason.standings': {$not: {$size: 0}} })
        // return {size: foundSeasons} 

        // Add matches for each competition
        // const competitions = await Competition.find({matches: {$size: 0}})
        // let i = 0

        // for( let competition of competitions ) {
        //     if(i >= 4) break;
            
        //     const id = competition._doc.id
        //     const from = (new Date(competition._doc.dateFrom)).toLocaleDateString().split('/')
        //     const to = (new Date(competition._doc.dateTo)).toLocaleDateString().split('/')
        //     const dateFrom = `${from[2]}-${from[0] < 10 ? '0' + from[0] : from[0]}-${from[1] < 10 ? '0' + from[1] : from[1]}`
        //     const dateTo = `${to[2]}-${to[0] < 10 ? '0' + to[0] : to[0]}-${to[1] < 10 ? '0' + to[1] : to[1]}`
        //     const response = await axios.get(`${process.env.FOOTBALL_API_URL}/competitions/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, { headers })
        //     console.log('adding...')
        //     const data = response.data.matches

        //     if(data.length < 1) continue;

        //     const result = data.map( elem => {
        //         const { area, competition, season, odds, ...match } = elem
        //         return match
        //     })
        //     const matches = await Match.insertMany(result)
        //     await Competition.findOneAndUpdate({ id: id }, {matches: matches} )
        //     console.log(`${competition._doc.name} matches added!`)
        //     i++
        // }
        // console.log('done')

        // const compscount = await Competition.count({matches: {$not: {$size: 0}}})
        // return {count: compscount}


        // Save head 2 heads
        const comps = await Competition.find({}, {matches: 1, _id: 0})
        const compMatches = []

        comps.forEach(comp => {
            compMatches.push(...comp.matches)
        })

        // Save head 2 heads
        // const matches = await Match.find(
        //     {
        //         $and: [
        //             { head2head: null },
        //             { 'homeTeam.name': {$ne: null} },
        //             { 'awayTeam.name': {$ne: null} },
        //             { _id: {$in: compMatches} }
        //         ]
        //     }, {id: 1, homeTeam: 2, awayTeam: 3}
        // )
        // let i = 0
        
        // for(let match of matches) {
        //     if(i < 4) {
        //         let savedMatches;
        //         console.log('starting...')

        //         const response = await axios.get(`${process.env.FOOTBALL_API_URL}/matches/${match._doc.id}/head2head`, { headers })
        //         console.log('head2head fetched.')

        //         const {filter, matches: h2hMatches, ...head2head} = response.data
        //         head2head.aggregates.homeTeam.previousMatches = head2head.aggregates.awayTeam.previousMatches = []

        //         const foundMatches = await Match.find({$or: h2hMatches.map(elem => ({id: elem.id}))}, {id: 1, homeTeam: 2, awayTeam: 3})
        //         const filteredMatches = h2hMatches.filter( match => !(foundMatches.some(elem => elem.id === match.id)) )

        //         if(filteredMatches.length > 0) {
        //             savedMatches = await Match.insertMany(filteredMatches.map( match => {
        //                 const { area, competition, season, odds, ...others } = match
        //                 return others
        //             }))
        //             console.log('new matches saved.')
        //         } else if(head2head.resultSet.count < 1) {
        //             savedMatches = []
        //         } else {
        //             savedMatches = foundMatches
        //         }

        //         console.log('saving head2head...')
        //         const h2h = new H2H({...head2head, matches: savedMatches})
        //         const savedH2h = await h2h.save()
        //         console.log('head2head saved.')

        //         const teamsId = [savedH2h.aggregates.homeTeam.id, savedH2h.aggregates.awayTeam.id]

        //         await Match.updateMany({$and: [{'homeTeam.id': {$in: teamsId}}, {'awayTeam.id': {$in: teamsId}}]}, {head2head: savedH2h})
        //         console.log('matches updated', i)
        //         i++
        //     } else {
        //         break;
        //     }
        // }
        // console.log('done!')
        
        // const data = await Match.aggregate(
        //     [
        //         {
        //             $match: {
        //                 head2head: {$ne: null},
        //             }
        //         },
        //         {
        //           $group: {
        //             _id: {
        //               head2head: "$head2head",
        //             },
        //             count: {$sum: 1}
        //           }
        //         },
        //         {
        //             $project: {
        //               homeTeam: "$id.homeTeam.name",
        //               awayTeam: "$id.awayTeam.name"
        //             },
        //         }
        //     ]
        // )
        // return {result: data.length}

        // Add previous Matches
        // const foundH2Hs = await H2H.find(
        //     {
        //         $and: [
        //             {'aggregates.homeTeam.previousMatches': {$size: 0}}, 
        //             {'aggregates.awayTeam.previousMatches': {$size: 0}}
        //         ]
        //     }
        // )
        // let i = 0

        // if(foundH2Hs.length < 1) {
        //     return {count: 'no more matches'}
        // }
        
        // for(let foundH2H of foundH2Hs) {
        //     if( i >= 2 ) break;

        //     const {homeTeam, awayTeam, ...others} = foundH2H._doc.aggregates

        //     if(!homeTeam || !awayTeam) return {error: 'homeTeam or awayTeam does not exist'};
        //     let j = 0
            
        //     for(let team of [homeTeam, awayTeam]) {
        //         let filteredMatches;
        //         const response = await axios.get(`${process.env.FOOTBALL_API_URL}/teams/${team.id}/matches?status=FINISHED&limit=10`, { headers })
        //         console.log('matches fetched')

        //         const { matches, ...others } = response.data
        //         const newMatches = matches.map( elem => {
        //             const {area, competition, season, odds, ...match} = elem
        //             return match
        //         })

        //         const foundMatches = await Match.find({id: { $in: newMatches.map(elem => elem.id) }})

        //         if(foundMatches.length > 0) {
        //             filteredMatches = newMatches.filter( match => !(foundMatches.map( elem => elem.id ).includes(match.id)) )
        //             console.log('some matches were found')
        //         } else {
        //             filteredMatches = newMatches
        //             console.log('no old matches were found')
        //         }

        //         if( filteredMatches.length > 0 ) {
        //             await Match.insertMany(filteredMatches)
        //             console.log('new matches added')
        //         }

        //         const foundPrevMatches = await Match.find({id: { $in: newMatches.map(match => match.id) }})
        
        //         console.log('updating aggregates...')
        //         if(j === 0) {
        //             await H2H.findByIdAndUpdate(foundH2H._doc._id, {'aggregates.homeTeam.previousMatches': foundPrevMatches})
        //         } else {
        //             await H2H.findByIdAndUpdate(foundH2H._doc._id, {'aggregates.awayTeam.previousMatches': foundPrevMatches})
        //         }

        //         j++
        //         console.log(team.name, ' previous matches added!')
        //     }

        //     i++
        // }

        // const h2hs = await H2H.count(
        //     {
        //         $and: [
        //             {'aggregates.homeTeam.previousMatches': {$not: {$size: 0}}}, 
        //             {'aggregates.awayTeam.previousMatches': {$not: {$size: 0}}}
        //         ]
        //     }
        // )

        // return {count: h2hs}
    } catch (error) {
        throw error
    }
}

module.exports = saveCompetition

