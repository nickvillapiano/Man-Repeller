var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/article-podcast', {
        title: 'Man Repeller - Article Podcast',
        htmlClass: 'Article Article-portrait Article-podcast',
        bodyClass: 'fade',
        pageJs: 'article',
    });
});

module.exports = router;
