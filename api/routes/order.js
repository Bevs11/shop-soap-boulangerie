const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');

    // TEST URL: http://localhost:8010/api/v1/orders/
router.get('/', ( request, response ) => {
    Order.find().then( dbResponse => {
        if (dbResponse) {
            response.status(200).send({ order: dbResponse });
        } else {
            response.status( 400 ).send({ error: "Request error" });
        }
    });
});
    // TEST URL: http://localhost:8010/api/v1/orders/pending
    // TEST URL: http://localhost:8010/api/v1/orders/completed
router.get(`/:status`, ( request, response ) => {
    Order.find({"status": request.params.status}).then( dbResponse => {
        if (!dbResponse) {
            response.status( 400 ).send({ error: "Request error" });
            
        } else {
            response.status(200).send({ order: dbResponse });
        }
    });
});

    // TEST URL: http://localhost:8010/api/v1/orders/ordernumber/6465fe12e68a887ab2c9b726
router.get(`/ordernumber/:id`, ( request, response ) => {
    Order.findOne({ "_id" : request.params.id }).then( dbResponse => {
        if (dbResponse) {
            response.status(200).send({ order : dbResponse });
        } else {
            response.status( 400 ).send({ error: "Order Not Found" });
        }
    });
});
    // new order
    // TEST URL: http://localhost:8010/api/v1/orders/
    /* {
        "userId": "c001",
        "items": 
        [{
            "productId": "a001",
            "quantity": 3
        }],
        "amount": 98,
        "address": "5th avenue",
        "status": "completed",
        "contact": "0987789xxxx" 
    } */
router.post(`/`, ( request, response ) => {
    const newOrder = new Order({ 
        userId: request.body.userId, 
        items: request.body.items,
        amount: request.body.amount,
        address: request.body.address,
        contact: request.body.contact
    });
    newOrder.save().then(data => {
        if (data) {
            response.status( 201 ).send({ message: "Order Created" });
        } else {
            response.status( 400 ).send({ error: "Order Unsuccessful" });
        }

    })
});






module.exports = router;