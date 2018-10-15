'use strict';

exports.loadIndex = async function (request, response, next) // eslint-disable-line
{
    response.render('Index', {'Directory': 'Home'});
};
