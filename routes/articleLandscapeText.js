var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article-landscape-text', {
        title: 'Man Repeller - Article Text',
        htmlClass: 'Article Article-landscape Article-landscape-text',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
