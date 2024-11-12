const express = require('express');

const Order_Con= require("../../controllers/order");

const validate=require("../../validator/validate");

const orderRoutes=express.Router();

orderRoutes.post('/AddItems',validate.verifyAdding,Order_Con.addItem);

module.exports=orderRoutes;