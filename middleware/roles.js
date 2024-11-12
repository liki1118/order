const roles=(role)=>{
    return (req,res,next)=>{
        if(role==req.role){
            next();
        }
        else{
            return res.status(403).json({message:"Access denied"});
        }
    }
}
module.exports=roles;