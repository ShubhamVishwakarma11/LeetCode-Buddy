const {GraphQLID} = require('graphql')
const InstituteType = require('../type/InstituteType')
const Institute = require('../../models/Institute')

const InstituteQuery = {
    type: InstituteType,
    args: {id: {type: GraphQLID}},
    resolve(parent,args) {
        return Institute.findById(args.id)
    }
}

module.exports = InstituteQuery