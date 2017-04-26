var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/lookbook', {
        title: 'Man Repeller - Lookbook',
        htmlClass: 'Article Lookbook',
        bodyClass: 'fade',
        pageJs: 'lookbook',
    });
});

module.exports = router;
