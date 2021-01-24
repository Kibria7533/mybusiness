const router=require('express').Router();
const Menus= require("../model/Menus");
const mongoose = require('mongoose');
const {userAuth, checkRole } = require("../utils/Auth");
router.post('/savemenu',userAuth,
checkRole(["admin"]),(req,res)=>{
    const menu=new Menus({
        CategoryName:req.body.categoryname,
        Type:req.body.Type
    });
    menu.save().then(response=>{
          res.json({"success":true});
    }).catch(err=>{
        res.send.json(err);
    })
})
router.post('/addasubcategory',userAuth,
checkRole(["admin"]),async (req,res)=>{
    const {CategoryName,SubCategory}=req.body;
    const data= await Menus.updateOne({ "CategoryName" : CategoryName},{$push:{"SubCategory":{_id: new mongoose.Types.ObjectId().toHexString(),"Name":SubCategory}}})
    if(data){
        res.json({"success":true});
    }
})
router.get('/getmenus',async(req,res)=>{
    const data=await Menus.find({});
    res.send(data);
   
    
})

router.post('/editcategory',userAuth,
checkRole(["admin"]),async(req,res)=>{
    const {oldcategory,newcategory}=req.body;
    const data= await Menus.updateOne({ "CategoryName" : oldcategory},{$set:{ "CategoryName" : newcategory}})
    if(data){
        res.json({"success":true});
    }

})
router.post('/editsubcategory',userAuth,
checkRole(["admin"]),async(req,res)=>{
    const {oldsubcategory,newsubcategory}=req.body;
    const data=await Menus.updateOne({"SubCategory.Name":oldsubcategory},{$set:{"SubCategory.$":{"Name":newsubcategory}}})
    if(data){
        res.json({"success":true});
    }
})
router.post('/deletesubcategory',userAuth,
checkRole(["admin"]),async(req,res)=>{
    const {subcategory}=req.body;
    const data=await Menus.updateOne({ "SubCategory.Name":subcategory},{$pull:{"SubCategory":{"Name":subcategory}}})
    if(data){
        res.json({"success":true});
    }
})
router.post('/deletecategory',userAuth,
checkRole(["admin"]),async(req,res)=>{
    const {id}=req.body;
    const data=await Menus.findOneAndRemove({_id:id});
    if(data){
        res.json({"success":true});
    }

})
module.exports = router;
