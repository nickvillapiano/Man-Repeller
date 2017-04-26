var express = require('express');

var router = express.Router();

/* GET styleguide. */
router.get('/', function(req, res, next) {
    res.render('pages/border', {
        title: 'Man Repeller Redesign - Border',
        bodyClass: 'Border fade',
        // htmlClass: 'styleguide-background',
        pageJs: 'border',
    });
});

module.exports = router;
