var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article-slideshow', {
        title: 'Man Repeller - Article Slideshow',
        htmlClass: 'Article Article-portrait Article-portrait-feature Article-slideshow',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
