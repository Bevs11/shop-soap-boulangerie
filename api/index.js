const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const helmet = require('helmet');

// routes import
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');
const orderRoute = require('./routes/order');
const emailRoute = require('./routes/email');

dotenv.config();

const server = express();
const PORT   = 8000;

// mongoose connection
mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("database connection SUCCESSFUL"))
    .catch((error) => console.log(`database connection ERROR: ${error}`));

server.use( helmet() );
server.use( bodyParser.json() ); // This solves getting the body of the request
server.use( cors() ); // Solves communication by other software

server.get('/', (request, response) => {
    response.status( 200 ).send('Welcome to express app');
});

// enpoint call
server.use('/api/v1/products', productRoute);
server.use('/api/v1/user', userRoute);
server.use('/api/v1/orders', orderRoute);
server.use('/api/v1/emails', emailRoute);


server.listen( PORT, () => { console.log(`Server is running on port ${PORT}`); })