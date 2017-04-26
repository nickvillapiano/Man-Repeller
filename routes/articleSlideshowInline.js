var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article-slideshow-inline', {
        title: 'Man Repeller - Article Slideshow Inline',
        htmlClass: 'Article Article-landscape Article-landscape-text Article-slideshow-inline',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
