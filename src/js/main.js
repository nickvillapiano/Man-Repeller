import $ from 'jquery';
import _ from 'lodash';
import Signal from 'signals';

require('waypoints/lib/jquery.waypoints.min');

// global configuration object. Passed via init() to all modules
const config = {
    signals: {
        open: new Signal(),
        domReady: new Signal(),
    },
};

// Show Notification
function showNotification() {
    $('.Large-ad').click(function() {
        $('.Notification').toggleClass('in');
    });
    $('.Notification').click(function() {
        $('.Notification').addClass('fade');
        setTimeout(function() {
            $('.Notification').removeClass('fade');
        }, 800);
        setTimeout(function() {
            $('.Notification').removeClass('in');
        }, 400);
    });
}

// Share bucket
function shareBucket() {
    $('.share-bucket').click(function() {
        $('.share-icons-wrapper .share-icons, .Nav').toggleClass('expand');
        $(this).toggleClass('flip');
    });
}

// Show Lookbook
function showLookbook() {
    $('.lookbook-trigger, .Lookbook-modal .x-close').click(function() {
        $('.Lookbook-modal').toggleClass('expand');
        $('body').toggleClass('slide-down');
    });
}

// Show Lookbook credits
function expandCreditsLookbook() {
    $('.lookbook-caret, .lookbook-caret-mobile').click( function() {
        $(this).closest('.Lookbook-modal').find('.footer-bar, .lookbook-caret-mobile').toggleClass('expand');
        console.log( "expand lookbook credits" );
    });
}

// Blockquote waypoint
function blockquoteWaypoint() {
    $('blockquote').each(function() {
        const waypoint = new Waypoint({
            element: this,
            offset: '50%',
            handler: function(direction) {
                $(this.element).toggleClass('transform');
            },
        });
    });
}

// Show Lookbook credits
function commentsAlertsCycle() {
    $('.commentsCycle a').click(function(e) {
        e.preventDefault();
        const $commentsTray = $(this).closest('.commentsCycle').children('.commentsCount');
        if ($commentsTray.attr('mode') === 'hidden') {
            $commentsTray.attr('mode', 'alert');
        } else if ($commentsTray.attr('mode') === 'alert') {
            $commentsTray.attr('mode', 'number');
        } else {
            $commentsTray.attr('mode', 'hidden');
        }
        console.log( "cycling comments alerts" );
    });
}

// do this when the dom is ready
function _onDomReady() {
    $('body').addClass('in');
}

// NV: turn the site upside-down
$('.logo.footer').click(function() {
    $('body').toggleClass('upside-down');
});
function navAnimate() {
    console.log( 'navAnimate' );
    $('.mobile-menu-trigger, .x-icon, .mobile-menu-fpo').click( function() {
        $('.mobile-menu').toggleClass('show');
        $('.mobile-logo').toggleClass('transform');
    });
}


// Dynamic Javascript Module loader, for concerns-separated per-page JS inclusion
function autoJsModule() {
    // Is the pageJS variable declared in your route vars? Load it.
    if (typeof pageJs !== 'undefined') {
        // Require the module via webpack's dynamic context module
        const pageModule = require(`./pages/${pageJs}`);
        // Does the module have an init()? Run it, w/ config included.
        if (pageModule && typeof pageModule.init === 'function') {
            pageModule.init(config);
        }
    }
}

// Create the global App module
const App = {

    // init the app
    init() {
        console.log('=== init ===');
        config.signals['domReady'].add(_onDomReady);
        autoJsModule();
        navAnimate();
        showLookbook();
        expandCreditsLookbook();
        commentsAlertsCycle();
        shareBucket();
        showNotification();
        blockquoteWaypoint();
    },

    // expose the config
    config: config,
    $,
};

// kickoff the app
$(App.init);

// export App to the browser/console
module.exports = App;
