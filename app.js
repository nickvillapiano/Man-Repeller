var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var auth = require('http-auth');

var tableOfContents = require('./routes/table-of-contents');
var styleguide = require('./routes/styleguide');

// Pages
const home = require('./routes/home');
// const border = require('./routes/border');
const article = require('./routes/article');
const articleLandscape = require('./routes/articleLandscape');
const articleLandscapeText = require('./routes/articleLandscapeText');
const articleLandscapeFeature = require('./routes/articleLandscapeFeature');
const articlePortraitFeature = require('./routes/articlePortraitFeature');
const articleLandscapeCollaboration = require('./routes/articleLandscapeCollaboration');
const articleLandscapeSponsored = require('./routes/articleLandscapeSponsored');
const articlePodcast = require('./routes/articlePodcast');
// const articleSlideshow = require('./routes/articleSlideshow');
const articleSlideshowInline = require('./routes/articleSlideshowInline');
const articleLong = require('./routes/articleLong');
// const lookbook = require('./routes/lookbook');

var app = express();
var basic;
var development = app.get('env') !== 'production';

// Read data fixture objects for app-wide use
const slideData = require('./data/slideData');
const articleLongSlideData = require('./data/articleLongSlideData');

// http-auth
if (!development) {
    basic = auth.basic({
        realm: 'Clients Only.',
        file: path.join(__dirname, '/../data/users.htpasswd'),
    });
    app.use(auth.connect(basic));
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Set our global app-wide local variables
Object.assign(app.locals, {
    // Set the SVG spritesheet contents as a globally available variable
    svgSprite: fs.readFileSync('./dist/images/svg-sprites.svg', 'utf8'),
    slideData,
    articleLongSlideData,
});

// uncomment after placing your favicon in /dist
app.use(favicon(path.join(__dirname, 'dist/images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Define/declare routes
// app.use('/', home);
app.use('/', tableOfContents);
app.use('/styleguide', styleguide);
app.use('/home', home);
// app.use('/border', border);
app.use('/article', article);
app.use('/article-landscape', articleLandscape);
app.use('/article-landscape-text', articleLandscapeText);
app.use('/article-landscape-feature', articleLandscapeFeature);
app.use('/article-portrait-feature', articlePortraitFeature);
app.use('/article-landscape-collaboration', articleLandscapeCollaboration);
app.use('/article-landscape-sponsored', articleLandscapeSponsored);
app.use('/article-podcast', articlePodcast);
// app.use('/article-slideshow', articleSlideshow);
app.use('/article-slideshow-inline', articleSlideshowInline);
app.use('/article-long', articleLong);
// app.use('/lookbook', lookbook);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('pages/error');
});

module.exports = app;
