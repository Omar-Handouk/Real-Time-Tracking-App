'use strict';

module.exports = async function (app) {
    let GEO_Handler = require('../Controllers/GEO_Handler');

    app.route('/send')
        .post(GEO_Handler.sendGEOJSON);
};