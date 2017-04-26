import $ from 'jquery';

var signals;

module.exports = {
    expandSlideshowCaption: function() {
        console.log( "show caption" );
        $('.deets').click( function() {
            $(this).parent().next().toggleClass('show');
            console.log( "show caption" );
        });
    },
    init: function(config) {
        console.log('  === article ===');
        signals = config.signals;

        this.expandSlideshowCaption();

        signals['domReady'].dispatch();
    },
};

