var express = require('express');
var router = express.Router();

/* GET all messages */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET one message */
router.get('/:id', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* POST a message */
router.post('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* PUT/UPDATE a message */
router.put('/:id', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* DELETE a message */
router.delete('/:id', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
