const verifyAdding = (req, res, next) => {
    try {
        const data = req.body;

        if (!data || typeof data !== 'object' || !Array.isArray(data.items) || data.items.length === 0) {
            return res.status(400).json({ message: "Invalid data: 'items' must be a non-empty array." });
        }
        for (const item of data.items) {
            if (typeof item !== 'object' || item === null) {
                return res.status(400).json({ message: "Each item must be an object." });
            }
            if (!item.hasOwnProperty('name') || typeof item.name !== 'string' || item.name.trim() === "") {
                return res.status(400).json({ message: "Invalid name in one of the items." });
            }
            if (!item.hasOwnProperty('price') || typeof item.price !== 'number' || isNaN(item.price)) {
                return res.status(400).json({ message: "Invalid price in one of the items." });
            }
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid JSON format." });
    }
};


const verifyOrder=(req,res,next)=>{
    try{
        const data = req.body;
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ message: "Invalid data" });
        }
        if (!data.hasOwnProperty('name') || typeof data.name !== 'string' || data.name.trim() === "") {
            return res.status(400).json({ message: "Invalid name" });
        }
        if (!data.hasOwnProperty('items') || !Array.isArray(data.items)) {
            return res.status(400).json({ message: "Invalid items" });
        }
        next();

    }
    catch(error){
        return res.status(400).json({ message: "Invalid JSON format." });
    }
}

const verifyGetBill=(req,res,next)=>{
    try{
    const data = req.body;
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ message: "Invalid data" });
        }
        if (!data.hasOwnProperty('name') || typeof data.name !== 'string' || data.name.trim() === "") {
            return res.status(400).json({ message: "Invalid name" });
        }
        next();
    }
    catch(error){
        return res.status(400).json({ message: "Invalid JSON format." });
    }
}
module.exports = {verifyAdding,verifyOrder,verifyGetBill};
