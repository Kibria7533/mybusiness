const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CommentsReviews } = require("../model/Comments&Reviews");
const { userAuth, checkRole } = require("../utils/Auth");
const User = require("../model/User");
router.post('/savecomment&reviews',userAuth,
checkRole(["user","admin"]),async (req,res)=>{

    const newcommentsreviews=await  new CommentsReviews({
        author:req.user.user_id,
        productid: req.body.productId,
        username:req.user.username,
        comment:req.body.comment,
        ratings:req.body.rating
    })
newcommentsreviews.save().then(result=>{
    res.send(result)
}).catch(err=>{
    res.send(err)
})

    
})

router.get('/getsingularproductcomment',async(req,res)=>{
if(req.query.type==='single'){
    const data=await CommentsReviews.find({productid:req.query.id})
    res.send(data)
}
})

module.exports = router;