'use strict';

let request = require('request');

let ENV = require('../../Miscellaneous/ENVIROMENT_VARIABLES.json') || process.env;

exports.getLocation = async function (req, response, next) { // eslint-disable-line

    let DEV_ID = req.query.DEV_ID;

    let cloudantDB_URL = ENV.VCAP_SERVICES.cloudantNoSQLDB[0].credentials.url;
    console.log('Location_Handler.getLocation<Info>: ' + cloudantDB_URL); // eslint-disable-line

    let document_ID = cloudantDB_URL + '/geo_reports/' + DEV_ID;
    console.log('Location_Handler.getLocation<Info>: ' + document_ID); // eslint-disable-line

    let options = {
        'method': 'GET',
        'headers': {'Content-Type': 'application/json'},
        'url': document_ID
    };

    request(options, (error, res, body) => {

        if (error)
        {
            console.log('Location_Handler.getLocation<Error>: ' + error); // eslint-disable-line
        }
        else
        {
            let request_response = JSON.parse(body);

            if (request_response.error != undefined)
            {
                console.log('Location_Handler.getLocation<Error>: ' + JSON.stringify(request_response)); // eslint-disable-line
            }
            else
            {
                console.log('Location_Handler.getLocation<Info>: ' + JSON.stringify(request_response)); // eslint-disable-line
                response.send(JSON.stringify(request_response));
            }
        }
    });
};