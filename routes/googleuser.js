const router = require("express").Router();
const { OAuth2Client } = require('google-auth-library');
const User = require("../model/User");
const jwt = require("jsonwebtoken");
// const { SECRET } = require("../config");
const { response } = require("express");
const client = new OAuth2Client('255391627954-ns76akj2cfe49brdb9l4ndoktmvt2ret.apps.googleusercontent.com');
router.post('/google',   (req, res) => {
  const {tokenId}=req.body;
   client.verifyIdToken({ idToken: tokenId, audience: "255391627954-ns76akj2cfe49brdb9l4ndoktmvt2ret.apps.googleusercontent.com" }).then(response => {
   User.findOne({ 'email': response.payload.email })
      .then((user) => {
        if (!user) {
       User.create({
            email: response.payload.email,
            username: response.payload.given_name,
            confirmed: true
          }).then( (user) => {
           
            const token =  jwt.sign(
              {
                user_id: user._id,
                role: user.role,
                username: user.username,
                email: user.email
              },
              SECRET,
              { expiresIn: "7 days" }
            );

           const result = {
              username: user.username,
              role: user.role,
              email: user.email,
              token: `Bearer ${token}`,
              expiresIn: 168
            };
            res.send(result);
           
          }).catch(e => {

            console.log('cant save');
          })

        } else {
          const token = jwt.sign(
            {
              user_id: user._id,
              role: user.role,
              username: user.username,
              email: user.email
            },
            SECRET,
            { expiresIn: "7 days" }
          );

        const  result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
          };
          
         res.send(result);
        }


      }).catch(err=>{
        console.log(err);
      })
     
      
  }).catch(err=>{
    console.log(err);
  })

 
});


module.exports = router;