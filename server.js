if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
// Bring in express and express layouts
const express = require('express');
const app = express();
const expressLayouts=require('express-ejs-layouts');
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // npm i method-override

// Set up router/ controller
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');


// Configuring expresslayouts with view folder* Memorize
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// Tells where our public files are going to be

// Connect to mongoose * Memorize
const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to Mongoose"))

// Utilize Routes, Keep down here below the layouts
app.use('/', indexRouter)
app.use('/authors', authorRouter) // Every route inside Author route will be prepended with "/authors"
app.use('/books', bookRouter) 

// Creates the port
app.listen(process.env.PORT || 3000)

