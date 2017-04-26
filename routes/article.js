var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article', {
        title: 'Man Repeller - Article Portrait',
        htmlClass: 'Article Article-portrait',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
