const axios = require("axios")
const Match = require('../../models/Match')
const Competition = require("../../models/Competition")
const { headers, compRanking } = require('../../data')
const { rearrangeComps } = require("../rearrange")

const getTopLeagues = async () => {
    const endpoint = process.env.FOOTBALL_API_URL + '/matches'
    let data;
    
    try {
        const response = await axios.get(endpoint, { headers })
        data = response.data.matches
    } catch (error) {
        throw error
    }

    if (data.length < 1) return data;

    const leagues = rearrangeComps(data)
    const sortedLeagues = leagues
        .map( (league) => ( 
            {...league,
                 competition: { 
                    ...league.competition, 
                    name: compRanking[compRanking.findIndex(elem => elem.code === league.competition.code)].name
                } 
            }
        ))
        .sort( (a, b) => (
            compRanking.findIndex( elem => elem.code === a.competition.code) < compRanking.findIndex( elem => elem.code === b.competition.code) ? -1 : 1
        ))

    return sortedLeagues;
}

module.exports = getTopLeagues