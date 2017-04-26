var Express = require('express');

var router = Express.Router();

/* GET table-of-contents page. */
router.get('/', function(req, res, next) {
    res.render('pages/table-of-contents', {
        title: 'Table of Contents',
        htmlClass: 'table-of-contents-background',
        bodyClass: 'table-of-contents fade',
        pageJs: 'table-of-contents',
        sections: [
            [
                {
                    label: 'Home',
                    url: 'home',
                },
                {
                    label: 'Article',
                    url: 'article',
                },
                {
                    label: 'Article Long',
                    url: 'article-long',
                },
                {
                    label: 'Article Landscape',
                    url: 'article-landscape',
                },
                {
                    label: 'Article Landscape Text',
                    url: 'article-landscape-text',
                },
                {
                    label: 'Article Landscape Feature',
                    url: 'article-landscape-feature',
                },
                {
                    label: 'Article Portrait Feature',
                    url: 'article-portrait-feature',
                },
                {
                    label: 'Article Landscape Collaboration',
                    url: 'article-landscape-collaboration',
                },
                {
                    label: 'Article Landscape Sponsored',
                    url: 'article-landscape-sponsored',
                },
                {
                    label: 'Article Podcast',
                    url: 'article-podcast',
                },
                // {
                //     label: 'Article Slideshow',
                //     url: 'article-slideshow',
                // },
                {
                    label: 'Article Slideshow Inline',
                    url: 'article-slideshow-inline',
                },
                {
                    label: 'StyleGuide',
                    url: 'styleguide',
                },
            ],
        ],
    });
});

module.exports = router;
