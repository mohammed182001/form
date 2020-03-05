const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//log in
router.get('/login',(req,res) => {
    res.render('login');
})
//user model
const User = require('../models/User');
//register
router.get('/register',(req,res) => {
    res.render('register');
})
//register handle
router.post('/register',(req,res) => {
    const {name , email ,tel} = req.body;
    let errors = [];
    //chech required fields
    if(!name || !email || !tel)
    {
        errors.push({msg : 'fill all the fields'});
    }
    //chech for mobile length
    if(tel.length !== 11){
        errors.push({msg : 'Enter a valid mobile number'});
    }
    if(errors.lenth > 0){
        res.render('register',{
            errors,
            name,
            email,
            tel
        });
        
    }else{
        User.findOne({email : email})
        .then(user => {
            if(user){
               //user exists
               errors.push({msg : 'this email is already taken'});
               res.render('register',{
                errors,
                name,
                email,
                tel
                
            });
               
            }else{
                const newuser = new User({name,email,tel});
                console.log(newuser);
                newuser.save()
                    .then(user => {
                            res.redirect('/users/login');  
                    })
                    .catch(err => console.log(err));
            }
        });
    }
})
module.exports = router