var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article-landscape', {
        title: 'Man Repeller - Article Landscape',
        htmlClass: 'Article Article-landscape',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
