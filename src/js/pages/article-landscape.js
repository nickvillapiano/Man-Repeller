import $ from 'jquery';

var signals;


module.exports = {
    blockquoteWaypoint: function() {
        $('blockquote').each(function() {
            const waypoint = new Waypoint({
                element: this,
                offset: '50%',
                handler: function(direction) {
                    $(this.element).toggleClass('transform');
                    console.log('waypoint triggered');
                },
            });
        });
    },
    init: function(config) {
        console.log('  === article landscape ===');
        this.blockquoteWaypoint();
        signals = config.signals;

        signals['domReady'].dispatch();
    },
};

