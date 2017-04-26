import $ from 'jquery';

var signals;


module.exports = {
    shoppingSlides: function() {
        console.log( 'shoppingSlides' );
        $('.arrow.right').click( function() {
            $('.set').toggleClass('transformX');
        });
        $('.arrow.left').click( function() {
            $('.set').removeClass('transformX');
        });
    },
    paperDoll: function() {
        console.log( 'paperDoll' );
        $('.header-nav .logo').click( function() {
            $('.paper-doll').toggleClass('change');
        });
    },
    moreButton: function() {
        console.log( 'moreButton' );
        $('.More-button').click( function() {
            $(this).toggleClass('loading').toggleClass('remove');
        });
    },
    featureSwitch: function() {
        console.log( 'featureSwitch' );
        $('.Portrait-feature.slideshow, .normal-feature').click( function() {
            $('.normal-feature').toggleClass('show');
        });
        $('.two-features-square').click( function() {
            $('.branded').toggleClass('show');
        });
    },
    init: function(config) {
        console.log('  === home ===');
        this.shoppingSlides();
        this.paperDoll();
        this.moreButton();
        this.featureSwitch();
        signals = config.signals;

        signals['domReady'].dispatch();
    },
};

