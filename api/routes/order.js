const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');
const { verifyTokenAndAdmin } = require("../middlewares/auth");

    // TEST URL: http://localhost:8010/api/v1/orders/all
router.get('/all', ( request, response ) => {
    Order.find().then( dbResponse => {
        if (dbResponse) {
            response.status(200).send({ order: dbResponse });
        } else {
            response.status( 400 ).send({ error: "Request error" });
        }
    });
});

// To get orders details
router.get(`/:status`, verifyTokenAndAdmin, ( request, response ) => {
    // to get all pending or completed orders
    if (request.params.status === "pending" || request.params.status === "completed"){
        Order.find({"status": request.params.status}).then( dbResponse => {
            if (!dbResponse) {
                response.status( 400 ).send({ error: "Request error" });  
            } else {
                response.status(200).send({ orders: dbResponse });
            }
        });
    } else if (request.params.status === "all"){
        // To get all orders
        Order.find().then( dbResponse => {
            if (dbResponse) {
                response.status(200).send({ orders: dbResponse });
            } else {
                response.status( 400 ).send({ error: "Request error" });
            }
        });
    } else {
        // if endpoint is not in the options
        response.status( 400 ).send({ error: "Invalid Request" });
    }
    
});

// get one order and data
router.get(`/ordernumber/:id`, verifyTokenAndAdmin, ( request, response ) => {
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
router.post(`/neworder`, ( request, response ) => {
    const newOrder = new Order({ 
        userId: request.body.userId, 
        items: request.body.items,
        amount: request.body.amount,
        address: request.body.address,
        contact: request.body.contact
    });
    newOrder.save().then(data => {
        if (data) {
            response.status( 201 ).send({ message: "Order Submitted", order: data  });
        } else {
            response.status( 400 ).send({ error: "Order Unsuccessful" });
        }

    })
});


module.exports = router;