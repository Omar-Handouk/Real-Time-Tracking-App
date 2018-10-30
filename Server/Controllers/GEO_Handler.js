'use strict';

let Date_and_Time = require('date-and-time');
let request = require('request');

let ENV = require('../../Miscellaneous/ENVIROMENT_VARIABLES.json') || process.env;

let now = new Date();

exports.sendGEOJSON = async function (req, response, next) { // eslint-disable-line

    let cloudantDB_URL = ENV.VCAP_SERVICES.cloudantNoSQLDB[0].credentials.url;
    console.log('GEO_Handler<Info>: ' + cloudantDB_URL); // eslint-disable-line

    let payload = req.body;

    console.log('GEO_Handler.sendGEOJSON<Info>: ' + JSON.stringify(payload)); // eslint-disable-line

    let getRevision = new Promise((resolve, reject) => {
        console.log('GEO_Handler.sendGEOJSON<Info>: ' + payload.DEV_ID); // eslint-disable-line

        let options = {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json'
            },
            'url': cloudantDB_URL + '/geo_reports/' + payload.DEV_ID
        };

        request(options, (error, req, body) => {

            if (error) {
                console.log('GEO_Handler.sendGEOJSON<Error>: ' + error); // eslint-disable-line
            } else {
                let request_response = JSON.parse(body); // eslint-disable-line

                if (request_response.error != undefined) {
                    if (request_response.error != 'not_found') {
                        console.log('GEO_Handler.sendGEOJSON<Error>: ' + JSON.stringify(request_response)); // eslint-disable-line
                        reject(request_response);
                    } else {
                        console.log('GEO_Handler.sendGEOJSON<Info>: ' + JSON.stringify(request_response)); // eslint-disable-line
                        resolve(undefined);
                    }
                } else {
                    console.log('GEO_Handler.sendGEOJSON<Info>: ' + JSON.stringify(request_response)); // eslint-disable-line
                    console.log('GEO_Handler.sendGEOJSON<Info>: REVISION NUMBER =>' + request_response._rev); // eslint-disable-line
                    resolve(request_response._rev);
                }
            }
        });
    });

    let report = {
        'Coordinates': {
            'Latitude': payload.Latitude,
            'Longitude': payload.Longitude
        },
        'Date': Date_and_Time.format(now, 'ddd MMM DD YYYY'),
        'Time': Date_and_Time.format(now, 'hh:mm A [GMT]Z', true)
    };

    getRevision
        .then((revision_number) => {
            let options = {
                'method': 'PUT',
                'headers': {
                    'Content-Type': 'application/json'
                },
                'json': report,
                'url': cloudantDB_URL + '/geo_reports/' + payload.DEV_ID + (revision_number != undefined ? `?rev=${revision_number}` : '')
            };

            request(options, (error, res, body) => {

                if (error) {
                    console.log('GEO_Handler.sendGEOJSON<Error>: ' + error); // eslint-disable-line
                } else {
                    let request_response = body;

                    if (request_response.error != undefined) {
                        console.log('GEO_Handler.sendGEOJSON<Error>: ' + JSON.stringify(request_response)); // eslint-disable-line
                    } else {
                        console.log('GEO_Handler.sendGEOJSON<Info>: ' + JSON.stringify(request_response)); // eslint-disable-line
                        response.json(request_response);
                    }
                }
            });
        })
        .catch((error) => console.log('GEO_Handler.sendGEOJSON<Error>: ' + error)); // eslint-disable-line
};