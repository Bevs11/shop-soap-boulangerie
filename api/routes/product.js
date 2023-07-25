const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel');
const { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin } = require("../middlewares/auth");

// GET products - active, nonactive, all, facialsoaps, bodysoaps, fragrantsoaps
router.get(`/get/:status`, ( request, response ) => {
    
    if(request.params.status === "active") {
        Product.find({"isActive": true}).then( dbResponse => {
            response.status(200).send({ products: dbResponse });
        }).catch(() => {
            response.status(503).send({ errorMessage: "service unavailable" });
        });
    } else if (request.params.status === "nonactive") {
        Product.find({"isActive": false}).then( dbResponse => {            
            response.status(200).send({ products: dbResponse });           
        }).catch(() => {
            response.status(503).send({ errorMessage: "service unavailable" });
        });
    } else if (request.params.status === "all") {
        Product.find().then( dbResponse => {            
            response.status(200).send({ products: dbResponse });           
        }).catch(() => {
            response.status(503).send({ errorMessage: "service unavailable" });
        });
    } else {
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
    const newProduct = new Product({ 
        title: request.body.title, 
        img: request.body.img,
        description: request.body.description,
        price: request.body.price,
        productId: request.body.productId,
        isActive: request.body.isActive,
        categories: request.body.categories
    });


    newProduct.save().then(data => {
        response.status( 201 ).send({ product: data });
    }).catch((error)=>{
        response.status( 400 ).send({ errorMessage: error });
    })
});

    //soft delete
    // TEST URL: http://localhost:8000/api/v1/products/removeproduct
    /* TEST BODY:
    { 
        "productId": "b006"
    }
    */

router.post(`/removeproduct`, ( request, response ) => {
    Product.updateOne({ "productId" : request.body.id},  { $set: { "isActive" : false }})
    .then( dbResponse => {
        if (!dbResponse) {
            return response.status(404).send({error: "product does not exist"})
        } else {
            response.status(200).send({message: "product is deleted"})
        }
    })
});

    // edit
    // TEST URL: http://localhost:8000/api/v1/products/edit
    /* TEST BODY:
    { 
        "productId": "b006",
        "update": {
          "title": "changed title"
        }
    }
    */
router.post("/edit", (request, response) => {
    Product.updateOne({ productId: request.body.productId }, {$set:request.body.update})
    .then( dbResponse => {
        if (!dbResponse) {
            return response.status(404).send({error: "product does not exist"})
        } else {
            response.status(200).send({message: "product is updated"})
        }
    })


})



module.exports = router;