const express=require('express')
const router= express.Router();

router.get('/', (req,res) => {
    res.render('index') // passes in the index from views into the body section of our layout.
})

module.exports = router;