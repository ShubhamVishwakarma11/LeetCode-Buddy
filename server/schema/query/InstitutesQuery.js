const {GraphQLList} = require('graphql')
const Institute = require('../../models/Institute')
const InstituteType = require('../type/InstituteType')

const InstitutesQuery = {
    type: new GraphQLList(InstituteType),
    resolve(parent, args) {
        return Institute.find()
    }
}

module.exports = InstitutesQuery