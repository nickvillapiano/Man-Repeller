var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article-landscape-feature', {
        title: 'Man Repeller - Article Landscape Feature',
        htmlClass: 'Article Article-landscape Article-landscape-feature',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
