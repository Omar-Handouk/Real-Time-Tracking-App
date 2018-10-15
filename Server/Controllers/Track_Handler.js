'use strict';

exports.loadTrack = async function (request, response, next) { // eslint-disable-line
    response.render('Track', {'Directory': 'Track an Asset'});
};