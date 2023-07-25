const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel');
const { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin } = require("../middlewares/auth");

// GET products - active, nonactive, all, facialsoaps, bodysoaps, fragrantsoaps
router.get(`/get/:status`, ( request, response ) => {
    // to get all active products
    if(request.params.status === "active") {
        Product.find({"isActive": true}).then( dbResponse => {
            if (dbResponse){
                response.status(200).send({ products: dbResponse });
            }
        }).catch(() => {
            response.status(503).send({ errorMessage: "service unavailable" });
        });
    } else if (request.params.status === "nonactive") {
    // to get all non active products
        Product.find({"isActive": false}).then( dbResponse => {  
            if (dbResponse) {          
                response.status(200).send({ products: dbResponse });  
            }         
        }).catch(() => {
            response.status(503).send({ errorMessage: "service unavailable" });
        });
    } else if (request.params.status === "all") {
    //to get all products in database
        Product.find().then( dbResponse => {
            if (dbResponse) {            
                response.status(200).send({ products: dbResponse });  
            }         
        }).catch(() => {
            response.status(503).send({ errorMessage: "service unavailable" });
        });
    } else {
    // if query is not in the options
        response.status( 400 ).send({ error: "Products Not Found" });
    }  
});  

// GET one product 
router.get(`/id/:productId`, ( request, response ) => {
    Product.findOne({"productId": request.params.productId}).then( dbResponse => {
        if (dbResponse){
            response.status(200).send({ product: dbResponse });            
        }else{
            response.status( 400 ).send({ error: "Product Not Found" });
        }     
    });
});


//POST add product
router.post(`/addproduct`, verifyTokenAndAdmin, ( request, response ) => {
    // create new product 
    const newProduct = new Product({ 
        title: request.body.title, 
        img: request.body.img,
        description: request.body.description,
        price: request.body.price,
        productId: request.body.productId,
        isActive: request.body.isActive,
        categories: request.body.categories
    });

    // save newProduct to database
    newProduct.save().then(data => {
        if (data) {
            response.status( 201 ).send({ product: data });
        } else {
            response.status( 400 ).send({ errorMessage: "save UNSUCCESSFUL" });
        }
    }).catch((error)=>{
        response.status( 400 ).send({ errorMessage: error });
    })
});

// DELETE(soft) product
router.post(`/removeproduct/:id`, verifyTokenAndAdmin, ( request, response ) => {
    Product.updateOne({ "productId" : request.params.id},  { $set: { "isActive" : false }})
    .then( dbResponse => {
        if (dbResponse) {
            response.status(200).send({message: "product is deleted"}) 
        } else {
            response.status(404).send({error: "product does not exist"})
        }   
    }).catch((error) => {
        response.status( 400 ).send({ errorMessage: error });
    })
});

// PUT edit product
router.put("/editproduct/:id", verifyTokenAndAdmin, (request, response) => {
    Product.updateOne({ productId: request.params.id }, {$set:request.body})
    .then( dbResponse => {
        if (dbResponse) {
            response.status(200).send({message: "product is updated"})
        } else {
            response.status(404).send({error: "product does not exist"})
        }
    }).catch((error) => {
        response.status( 400 ).send({ errorMessage: error });
    })
})


module.exports = router;