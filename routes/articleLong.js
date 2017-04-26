var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article-long', {
        title: 'Man Repeller - Article Long',
        htmlClass: 'Article Article-landscape Article-long',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
