const express = require('express');

const orderRoutes= require('./routes/Customer/order');

const adminRoutes=require('./routes/Manager/order');

const authentication=require("./middleware/authorization");

const roles=require("./middleware/roles");

require("dotenv").config()

const app=express();

const port= process.env.PORT;

app.use(express.json());

app.use("/Order",authentication,roles("customer"),orderRoutes);

app.use("/Admin",authentication,roles("manager"),adminRoutes);

app.listen(port,()=>console.log(`Server started on port ${port}`));


