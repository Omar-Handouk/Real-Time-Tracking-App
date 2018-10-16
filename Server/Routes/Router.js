'use strict';

module.exports = function (app) {
    let GEO_Handler = require('../Controllers/GEO_Handler');
    app.route('/Send')
        .post(GEO_Handler.sendGEOJSON);

    let Index_Handler = require('../Controllers/Index_Handler');
    app.route('/Index')
        .get(Index_Handler.loadIndex);
    app.get('/', (request, response, next) => { // eslint-disable-line
        response.redirect('/Index');
    });

    let Track_Handler = require('../Controllers/Track_Handler');
    app.route('/Track')
        .get(Track_Handler.loadTrack);

    let Location_Handler = require('../Controllers/Location_Handler');
    app.route('/GetLocation')
        .get(Location_Handler.getLocation);
};