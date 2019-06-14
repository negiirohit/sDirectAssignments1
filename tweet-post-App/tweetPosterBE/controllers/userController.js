var express = require('express');
const auth = require('../auth/authenticate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const User = require('../models/user');
const Tweet = require('../models/tweet');

const mongoose =require('mongoose');

module.exports.register = (req,res,next) => {
    User.findOne({ handle : req.body.handle })
    .then( (user) => {
            if(user) {
                    console.log("user already exists: " +user)
                    //res.status(422);
                    res.json({ 
                        success : false,
                        message : 'User already exists',
                        data:null
                    });
            }
            else {
                    newUser = User(req.body);
                    
                    return( 
                        newUser.save()
                        .then((user) => {
                            res.status(200);                    
                            console.log("user created " +user);
                            res.json({ 
                                success : true, 
                                message : 'User created!',
                                data :{user : user }
                             })
                        })
                    
                    )
            }
                        
    })
    .catch((err) => {
        //res.status(500);
        res.json({
            success : false,
            message : err.message,
            data: null
        }); 
    });
}

module.exports.login = (req, res, next) => {
    console.log(req.body);
    User.findOne({ handle : req.body.handle })
    .then((user) => {

            if(user!=null){
                if(bcrypt.compareSync(req.body.password,user.password)){                    
                                    let token = jwt.sign({id: user._id,handle: user.handle},config.secret,{ expiresIn: '24h' });
                                    res.status(200);
                                    res.json({
                                        success: true,
                                        message: 'Authentication successful!',
                                        data : { token: token }
                                    });
                                } 
                    
            }
           // res.status(401);
            res.json({
            success: false,
            message: 'Incorrect username or password'
            });

      
    })
    .catch((err) => {
        //res.status(500);        
        res.json({
            success : false,
            message : err.message,
        }); 
    });
}

//Fetch all the tweets of the logged in user
module.exports.getTweets = (req, res, next) => {
    //Use authentication middleware before getTweets
    Tweet.find({handler: req.user.id})
    .sort({_id:-1})
    .then( tweets =>{
        res.status(200);
        res.json({
            success: true,
            message: 'fetched tweets',
            data: {tweets: tweets }
        })
    })
    .catch((err) => {
        //res.status(500);        
        res.json({
            success : false,
            message : err.message,
        }); 
    });

}



module.exports.getMentions = (req, res, next) => {
    //Use authentication middleware before getTweets
    console.log(req.user.handle);
    Tweet.find({content : { $regex: req.user.handle }})
    .sort({_id:-1})
    .populate('handler',{handle : 1})
    .then( tweets =>{
        res.status(200);
        console.log("success");
        res.json({
            success: true,
            message: 'fetched tweets with mentions',
            data: {tweets: tweets }
        })
    })
    .catch((err) => {
        //res.status(500);    
        console.log(err)    
        res.json({
            success : false,
            message : err.message,
        }); 
    });

}


module.exports.createTweet = (req, res, next) => {
    //Use authentication middleware before getTweets
    req.body.handler = req.user.id;
    console.log("tweet: "+JSON.stringify(req.body));
    Tweet.create(req.body)
    .then( tweet =>{
        console.log("tweet created" +tweet)
        return User.findOneAndUpdate({_id:req.user.id},{$push : { tweets : tweet._id }},{password : 0 })
            .populate('tweets') 
            .then( user => {
                res.status(200);
                res.json({
                success: true,
                message: 'tweet created',
                data: {user : user,createdTweet:tweet }
                })        
                  
              } )
    })
    .catch((err) => {
        //res.status(500);        
        res.json({
            success : false,
            message : err.message,
        }); 
    });

}

//find all the handles matching with the string for req parameters
module.exports.findHandles = (req, res, next) => {
    let pattern = '^'+req.params.handle;
    User.find({handle : { $regex : pattern, $options : 'm' }},{ handle : 1,_id:0 })
    .then( handles => {
        res.status(200);
        res.json({
        success: true,
        message: 'tweet created',
        data: { handles : handles }
        })        
    })
    .catch((err) => {
        //res.status(500);        
        res.json({
            success : false,
            message : err.message,
        }); 
    });

    
}

module.exports.findAllHandles = (req, res, next) => {
    User.find({},{ handle : 1,_id:0 })
    .then( handles => {
        res.status(200);
        res.json({
        success: true,
        message: 'find handles',
        data: { handles : handles }
        })        
    })
    .catch((err) => {
        //res.status(500);        
        res.json({
            success : false,
            message : err.message,
        }); 
    });

    
}


module.exports.getProfile = (req, res, next) => {
    console.log(req.params.handle)
    User.findOne({handle:req.params.handle},{ password:0 })
    .populate('tweets')
    .then( user => {
        res.status(200);
        res.json({
        success: true,
        message: 'find handles',
        data: { user : user }
        })        
    })
    .catch((err) => {
        //res.status(500);        
        res.json({
            success : false,
            message : err.message,
        }); 
    });

    
}


module.exports.demoApiController = (req,res, next) =>{
    console.log("test ");
    console.log("demo api callled :  ",req.body.demo);
    console.log("type: ",typeof(req.body.demo));
    res.json();
}