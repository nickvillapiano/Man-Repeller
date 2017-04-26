var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article-landscape-sponsored', {
        title: 'Man Repeller - Article Sponsored',
        htmlClass: 'Article Article-landscape Article-landscape-feature Article-landscape-sponsored',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
