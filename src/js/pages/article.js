import $ from 'jquery';
import gestures from 'jquery-touch-events';
import debounce from 'lodash/debounce';
import imagesLoaded from 'imagesloaded';

var signals;

// How many times have we changed slides in the slideshow?
let slideshowNavCount = 0;

// Grab/set the height that the right rail is supposed to be
function setRailHeight($heightEl, $railEl) {
    const railHeight = ($heightEl.offset().top + $heightEl.height()) - $railEl.offset().top;
    $railEl.height(railHeight);
}

function changeSlides(e, touch) {
    const $this = $(this);
    const $slideshow = $this.closest('.slideshow-js');
    const $slides = $slideshow.children('.image-slide');
    const slideCount = $slides.length;
    console.log('changing slides');

    // Set up references to the individual slideshows
    const $inlineSlides = $('.Inline-slideshow .image-slide');
    const $lightboxSlides = $('.Slideshow-modal .image-slide');

    const $currentSlide = $slideshow.find('.image-slide.show');
    const currentIndex = $slides.index($currentSlide);

    let direction;
    let elIndexToShow;

    if (touch) {
        switch (touch.direction) {
        case 'left':
            direction = 1;
            break;
        case 'right':
            direction = -1;
            break;
        default:
            return false;
        }
    } else {
        direction = $this.hasClass('left-arrow') ? -1 : 1;
    }

    // Find the destination slide
    if (currentIndex >= slideCount - 1 && direction === 1) {
        elIndexToShow = 0;
    } else if (currentIndex <= 0 && direction === -1) {
        elIndexToShow = slideCount - 1;
    } else {
        elIndexToShow = currentIndex + direction;
    }

    // Update the classes in the inline slide
    $inlineSlides.eq(currentIndex).removeClass('show');
    $inlineSlides.eq(elIndexToShow).addClass('show');

    // Update the classes in the modal to match (ghettoooo)
    $lightboxSlides.eq(currentIndex).removeClass('show');
    $lightboxSlides.eq(elIndexToShow).addClass('show');

    // Increment and update the ad for every 3rd nav event
    if (++slideshowNavCount % 3 === 0) {
        const $ad = $('.side-ad-desktop');
        const newAd = ($ad.attr('src') === 'images/side-ad.jpg') ? 'images/side-ad2.jpg' : 'images/side-ad.jpg';
        $ad.attr('src', newAd);
    }

    return true;
}

module.exports = {
    toggleLightbox: function() {
        $('.lightbox-trigger .zoom-icon, .Slideshow-modal .x-close').click( function() {
            $('.Slideshow-modal').toggleClass('show');
        });
        $('.slideshow-js .image-slide').on('doubletap', function() {
            $('.Slideshow-modal').toggleClass('show');
        });
    },
    playButton: function() {
        $('.play-icon').click( function() {
            $(this).toggleClass('active');
            $('.Podcast-bar').toggleClass('expand');
            console.log( "playButton" );
        });
    },
    expandCaption: function() {
        $('.caret').click( function() {
            $(this).parent().toggleClass('expand');
            console.log( "expand caption" );
        });
    },
    expandCreditsLightbox: function() {
        $('.lightbox-caret').click( function() {
            $(this).closest('.slideshow-js').find('.footer-bar').toggleClass('expand');
            console.log( "expand lightbox credits" );
        });
    },
    expandSlideshowCaption: function() {
        $('.deets').click( function() {
            $(this).parent().next().toggleClass('show');
            console.log( "show caption" );
        });
    },
    slideshowPure: function() {
        $('.pureMode').one('click swipe', function() {
            $(this).removeClass('pureMode');
            console.log( "Removing pureMode" );
        });
    },
    flipDirection: function() {
        $('.Article-portrait-feature .Hero-header').click( function() {
            $('.Article-portrait-feature .Hero-header').toggleClass('reverse');
            console.log( "clicked it" );
        });
    },
    adWaypoint: function() {
        // Distance from the top that we want to trigger the fixed 'stick' mode?
        // NOTE: Derived from padding in _article-copy.scss
        const topOffset = 20;

        // Sliding rail setup capability
        if ($('#right-rail').hasClass('slidingRail')) {
            // debounce the resize function
            const debounceResize = debounce(function() {
                setRailHeight($('.left-rail'), $('.slidingRail'));
            }, 150);

            // handle the resizing, yo.
            $(window).on('resize', debounceResize);
            const imgLoad = imagesLoaded(document.querySelector('.left-rail'), debounceResize);
            debounceResize();

            $('.rail-slider-wrapper').each(function() {
                // Content hits top:
                $(this).waypoint({
                    offset: topOffset,
                    handler: function(direction) {
                        if (direction === 'down') {
                            this.element.setAttribute('mode', 'stuck');
                        } else {
                            this.element.setAttribute('mode', '');
                        }
                    },
                });
                // Content hits bottom:
                $(this).waypoint({
                    offset: function() {
                        // Figure out heights of both wrapper and content;
                        // return the height differential in negative to fire when el
                        // reaches the 'bottom' of its container
                        const $el = $(this.element);
                        const wrapperHeight = $el.outerHeight(true);
                        const contentHeight = $el.find('.rail-slider-content').outerHeight(true);
                        return -(wrapperHeight - contentHeight - topOffset);
                    },
                    handler: function(direction) {
                        if (direction === 'down') {
                            this.element.setAttribute('mode', 'bottom');
                        } else {
                            this.element.setAttribute('mode', 'stuck');
                        }
                    },
                });
            });
        } else {
            console.log('DefaultRail!');
            const waypoint = new Waypoint({
                element: document.getElementById('right-rail'),
                offset: topOffset,
                handler: function(direction) {
                    if (direction === 'down') {
                        $('.Article-copy').addClass('fixed');
                    } else {
                        $('.Article-copy').removeClass('fixed');
                    }
                },
            });
        }
    },
    adWaypointAbsolute: function() {
        // Distance from the top that we want to trigger the fixed 'stick' mode?
        // NOTE: Derived from padding in _article-copy.scss
        const topOffset = 20;

        // NOTE: Not working as desired due to comments height affecting
        // left-rail. Revisit once that's sorted.
        if (!$('#right-rail').hasClass('slidingRail')) {
            const waypoint = new Waypoint({
                // element: '.next-steps',
                // offset: 'bottom-in-view',
                element: '.right-rail-wrapper',
                offset: function() {
                    // Figure out heights of both wrapper and content;
                    // return the height differential in negative to fire when el
                    // reaches the 'bottom' of its container
                    const $el = $(this.element);
                    const wrapperHeight = $el.outerHeight(true);
                    const contentHeight = $el.find('.right-rail-content').outerHeight(true);
                    return -(wrapperHeight - contentHeight - topOffset);
                },
                handler: function(direction) {
                    if (direction === 'down') {
                        $('.Article-copy').removeClass('fixed');
                        $('.Article-copy').addClass('absolute');
                    } else {
                        $('.Article-copy').removeClass('absolute');
                        $('.Article-copy').addClass('fixed');
                    }
                    console.log( "waypoint2" );
                },
            });
        }
    },
    adWaypointTrending: function() {
        $('.Side-ad').click( function() {
            $('.Article .Side-ad').toggleClass('show-trending');
        });
    },
    alternateBorder: function() {
        $('.Article-portrait .logo').click( function() {
            if ( $('html').hasClass('.Article-portrait-feature') ) {
                console.log( "no clicky border swap" );
            } else {
                $('.Article-portrait, .border, .border-accent, .Paper-doll').toggleClass('alternate');
            }
        });
    },
    inlineSlideshow: function() {
        $('.slideshow-js .arrow').on('click', changeSlides);
        $('.slideshow-js .image-slide').on('swipe', changeSlides);
    },
    init: function(config) {
        console.log('  === article ===');
        this.alternateBorder();
        signals = config.signals;

        this.adWaypoint();
        // this.blockquoteWaypoint();
        this.slideshowPure();
        this.flipDirection();
        this.adWaypointAbsolute();
        this.adWaypointTrending();
        this.expandCaption();
        this.expandCreditsLightbox();
        this.playButton();
        this.expandSlideshowCaption();
        this.inlineSlideshow();
        this.toggleLightbox();

        signals['domReady'].dispatch();
    },
};
