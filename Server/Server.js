'use strict';

const express = require('express');
const body_parser = require('body-parser');
const method_override = require('method-override');

const PORT = process.env.PORT || require('./Configurations/Local_Configuration.json').PORT;

const app = express();

app.set('view engine', 'ejs');
app.set('views', '../Views');

app.use(express.static('../Public'));

app.use(body_parser.urlencoded({
    extended: false
}));
app.use(body_parser.json());

app.use(method_override('_method'));

// TODO: Add Routers Here
let ROUTER  = require('./Routes/Router'); ROUTER(app);

// TODO: Add 404 and 500 Errors
app.use((request, response, next) => { // eslint-disable-line
    response.status(404);
    response.write('ERROR 404: Page not Found');
});

app.use((error, request, response, next) => { // eslint-disable-line
    response.status(500);
    response.write('ERROR 505: Internal server error');
});

app.listen(PORT, () => {
    console.log('Server is Listening to PORT: ' + PORT); // eslint-disable-line
});