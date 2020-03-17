var Books = require('../../models').Books
var response = require('../response')
var path = require('path');
var PDFMake = require('pdfmake')
var BooksController = function () {

}

var books = [
    {
        "id": "123",
        "title": "Perdamaian",
        "publisher": "Melon Indonesia",
        "price": "90000",
        "stock": "9"

    },
    {
        "id": "12",
        "title": "Persatuan",
        "publisher": "Melon Indonesia",
        "price": "80000",
        "stock": "19"

    },
    {
        "id": "23",
        "title": "Perikanan",
        "publisher": "Melon Indonesia",
        "price": "50000",
        "stock": "23"

    }
]

BooksController.findAll = function (req, res, next) {

    Books.findAll().then(entities => {
        res.json(response.success(entities))
    }).catch(error => {
        res.json(response.error(500, error.message))
    })

    // database.query("SELECT * FROM books", function (error, results, fields) {
    //   if (error) throw error
    // if (results.length) {
    //   res.json(response.success(results))
    //} else {
    //  res.json(response.error(404, "Books not found"))
    // }
    //})


}

BooksController.find = function (req, res, next) {

    var id = req.params.id
    Books.findOne({ where: { id: id } }).then(entity => {
        if (entity) {
            res.json(response.success(entity))
        } else {
            throw 'Books not found';
        }
    }).catch(error => {
        res.json(response.error(500, error.message))
    })
    //var id = req.params.id
    //database.query('SELECT * FROM books where id = ?', id, function (err, results, fields) {
    //  if (!err) {
    //    return res.json(response.success(results))
    //}
    //res.json(response.error(404, 'Books not found'))
    //})


}

BooksController.add = function (req, res, next) {

    var data = req.body
    console.log(data)
    Books.create(data).then(entity => {
        if (entity) {
            res.json(response.success(entity))
        } else {
            throw 'Create failed';
        }
    }).catch(error => {
        res.json(response.error(500, error.message))
    })
    //var books = req.body
    //database.query('INSERT INTO books SET ?', books, function (err, results, fields) {
    //  if (!err) {
    //    return res.json(response.success(results))
    //}
    //res.json(response.error(404, 'Books already exist'))
    // })

}
BooksController.edit = function (req, res, next) {
    var data = req.body
    Books.findOne({ where: { id: data.id } }).then(entity => {
        if (entity) {
            return entity.update(data)
        } else {
            throw 'Books not found';
        }
    }).then(entity => {
        res.json(response.success(entity))
    }).catch(error => {
        res.json(response.error(500, error.message))
    })


    // var id = req.params.id
    //for (var i = 0; i < books.length; i++) {
    //  var entity = books[i]
    //if (entity.id == id) {
    //  var data = req.body
    //entity.title = data.title
    //return res.json(success(entity))
    //}
    //}
    //res.json(404, 'Books not found')
}
BooksController.delete = function (req, res, next) {

    var id = req.params.id
    Books.destroy({ where: { id: id } }).then(affectedRows => {
        if (affectedRows) {
            res.json(response.success(true))
        } else {
            throw 'Delete failed'
        }
    }).catch(error => {
        res.json(response.error(500, error.message))
    })

    // var id = req.params.id

    //database.query('DELETE FROM books where id = ?', id, function (err, results, fields) {
    //  if (!err) {
    //    return res.json(response.success(results))
    //}
    //res.json(response.error(404, 'Books not found'))
    //})


}
BooksController.downloadAll = function (req, res, next) {


    var pdfMake = new PDFMake({
        Roboto: {
            normal: path.resolve('assets', 'fonts', 'roboto', 'Roboto-Regular.ttf'),
            italics: path.resolve('assets', 'fonts', 'roboto', 'Roboto-Italic.ttf'),
            bold: path.resolve('assets', 'fonts', 'roboto', 'Roboto-Bold.ttf'),
        }
    })
    Books.findAll().then(entity => {
        var doc = pdfMake.createPdfKitDocument({
            info: {
                title: 'Task PDF',
                author: 'Nurfadhilah Ramadhan',
                subject: 'Task PDF',
            },
            content: [
                {
                    text: 'LAPORAN DATA BUKU',
                    bold: true,
                    fontSize: 20,
                    aligment: 'center',
                    style: 'header'
                },


                {

                    style: 'tableExample',
                    table: {
                        widths: ['auto', '*', '*', '*', 'auto'],

                        body: [

                            [{ text: 'Id', style: 'tableHeader' }, { text: 'Title', style: 'tableHeader' }, { text: 'Publisher', style: 'tableHeader' }, { text: 'Price', style: 'tableHeader' }, { text: 'Stock', style: 'tableHeader' }],
                            ...entity.map(value => [value.id, value.title, value.publisher, value.price, value.stock])
                        ]
                    }
                }

            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                bigger: {
                    fontSize: 15,
                    italics: true
                }
            }
        })

        doc.end()

        res.setHeader('Content-type', 'application/pdf')
        res.setHeader('Content-disposition', 'attachment; filename="List Buku.pdf"')

        doc.pipe(res)



    })
}

module.exports = BooksController;