const express = require('express');

const Order_Con= require("../../controllers/order");

const validate=require("../../validator/validate");

const orderRoutes=express.Router();

orderRoutes.get('/GetMenu',Order_Con.getMenu);

orderRoutes.post('/Order',validate.verifyOrder,Order_Con.addOrder);

orderRoutes.get('/BillMyOrder',validate.verifyGetBill,Order_Con.billMyOrder);

module.exports=orderRoutes;