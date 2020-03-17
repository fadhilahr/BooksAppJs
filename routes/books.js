var express = require('express')
var cors = require('cors')
var app = express();
var BooksController = require("../modules/controller/bookscontroller")

var router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))





// middleware that is specific to this router
router.use(
    cors(),
    function timeLog(req, res, next) {
        console.log('Time: ', Date.now())
        next();
    })

router.get('/download', BooksController.downloadAll)
router.get('/', BooksController.findAll)
router.post('/', BooksController.add)
router.get('/:id', BooksController.find)
router.put('/:id', BooksController.edit)
router.delete('/:id', BooksController.delete)




module.exports = router;