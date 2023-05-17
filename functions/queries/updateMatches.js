const axios = require('axios')

const Match = require('../../models/Match')
const { headers } = require('../../data')
const apiURL = process.env.FOOTBALL_API_URL

const updateMatches = async () => {
    try {
        const response = await axios.get(`${apiURL}/matches`, { headers })
        const data = response.data.matches
        const matches = data.map( elem => {
            const { id, score, status, ...match } = elem
            return {id, score, status}
        })

        for( let match of matches ) {
            await Match.findOneAndUpdate({id: match.id}, {$set: match})
            console.log('updating', match.id)
        }

        console.log('matches updated')
        return matches
    } catch (error) {
        throw error
    }
}

module.exports = updateMatches