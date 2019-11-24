const express= require('express')
const router= express.Router();
const Author = require('../models/author')

// All Authors
router.get('/', async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try { 
        const authors = await Author.find({searchOptions}) // leave this empty so it searches for ALL authors
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
         }) // 'index' from views folder
    } catch {
        res.redirect('/') // if all goes wrong, direct user back to homepage
    }
})

// New Author Route
router.get('/new', (req,res) => {
    res.render('authors/new', { author: new Author() });
})

// Create Author Route
router.post('/', async (req,res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
                    })
    }
})
module.exports = router;