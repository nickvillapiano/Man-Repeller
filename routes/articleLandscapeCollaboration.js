var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article-landscape-collaboration', {
        title: 'Man Repeller - Article Collaboration',
        htmlClass: 'Article Article-landscape Article-landscape-feature Article-landscape-collaboration',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
