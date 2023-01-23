const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const colors = require('colors')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

// Configuration
dotenv.config()
const app = express()


// Middleware
app.use(cors())

app.use('/graphql', graphqlHTTP ( {
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))




// Connect to DB
const port = process.env.PORT || 5000
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        // listening for requests
        app.listen(port, () => {
            console.log(`Server started on port ${port} !!!`.blue.underline.bold)
            console.log('Connected to MongoDB'.cyan.underline.bold)
        })
    })
    .catch( (error) => {
        console.log(error);
    })