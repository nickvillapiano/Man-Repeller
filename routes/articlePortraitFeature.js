var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article-portrait-feature', {
        title: 'Man Repeller - Article Portrait Feature',
        htmlClass: 'Article Article-portrait Article-portrait-feature',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
