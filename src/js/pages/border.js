import $ from 'jquery';

var signals;

module.exports = {
    init: function(config) {
        console.log('  === border ===');
        signals = config.signals;


        signals['domReady'].dispatch();
    },
};
