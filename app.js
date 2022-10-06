const cors = require('cors')
// creating our server
const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const productsRoutes = require('./routes/products')
const categoriesRoutes = require('./routes/categories')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')

const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')


app.use(cors())
app.options('*', cors())
app.use(authJwt());

// not an api but a static path which is serving the files
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(errorHandler)

// importing .dotenv library
require('dotenv/config')
const api = process.env.API_URL

// a connection to the database is added before starting the server
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
})
.then(() =>{
    console.log('Database connection is ready...')
})
.catch((err) =>{
    console.log(err)
})

const PORT = process.env.PORT || 3000

// making the server to listen on port 3000
// creating a callback function that will be run 
// after the server is successfully created
app.listen(PORT, ()=> {
    console.log('server is running on http://localhost:3000')
})

// middleware
// bodyparser - depracated
// app.use(bodyParser)
app.use(express.json())
app.use(morgan('tiny'))

// Routers
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)
