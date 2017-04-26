var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/home', {
        title: 'Man Repeller - Home',
        htmlClass: 'Home',
        bodyClass: 'fade',
        pageJs: 'home',
    });
});

module.exports = router;