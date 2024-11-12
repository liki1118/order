const OrderSchema=require('../models/order');

exports.addItem=async (req,res,next)=>{
    const items = req.body.items;
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Invalid items list" });
    }
    const result=await OrderSchema.addItem(items);
    if(result=="true"){
        return res.status(200).json({ message: "Item added" });
    }
    else if(result=="false"){
        return res.status(404).json({ message: "Something went wrong" });
    }
    else{
        return res.status(404).json({ message: "Item already added" });
    }
};

exports.getMenu=async (req,res,next)=>{
    const result=await OrderSchema.getMenu();
    if(result){
        return res.status(200).json({ data: result });
    }
    else{
        return res.status(404).json({ message: "Something went wrong" });
    }
}

exports.addOrder=async (req,res,next)=>{
    const simliar=await OrderSchema.CheckData(req.body.items);
    if(simliar){
        const result=await OrderSchema.addOrder(req.body);
        if(result){
            return res.status(200).json({ message:"order placed" });
        }
        else{
            return res.status(404).json({ message: "Something went wrong" });
        }
    }
    else{
        return res.status(404).json({ message: "Invalid Items" });
    }
}

exports.billMyOrder=async (req,res,next)=>{
    const result=await OrderSchema.GetBill(req.body);
    if(result=="false"){
        return res.status(200).json({ message:"Something went wrong" });
    }
    else{
        if(result=="name_err"){
            return res.status(404).json({ message: "Invalid name first order" });
        }
        else{
            return res.status(404).json({ message: result });
        }
    }
};






