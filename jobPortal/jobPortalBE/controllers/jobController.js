var express = require('express');
const Company = require('../models/companySchema');
const Job = require('../models/jobSchema');
const JobSeeker = require('../models/jobSeeker');
const mongoose =require('mongoose');
const mailer = require('./mailer');


module.exports.createJob = (req, res, next) => {
    var job = req.body;
    job.provider = req.user.id;
    Job.create(job)
    .then(job => {
        Company.findOneAndUpdate({_id:req.user.id},{$push :{ jobs : job._id }},{new:true})
        .populate('jobs')
        .then( user => {
        //    console.log(user);
            res.json({
                success: true,
                message: 'Job Created Succesfully',
                data : user
            });
        
    })
    .catch((err) => {
        res.status(400);
        res.json({
             success : false,
              message : err.message,
        }); 
    })

    }) 
}


module.exports.findJobs = (req, res, next) =>{
    Job.find(req.body)
    .populate('provider')
    .then( jobs =>{
      //  console.log(jobs);
        res.json({
            success:true,
            message: 'Jobs fetched',
            data: jobs
        })
    } )
}

module.exports.getAllJobs = (req, res, next) => {
    var page_limit = Number(req.params.page_limit)
    var skip_no    = (Number(req.params.page_no)-1)*page_limit
    Job.find()
    .skip(skip_no)
    .limit(page_limit)
    .populate('provider')
    .then((jobs) => {
  
        Job.countDocuments({})
        .then(count=> {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
         // res.json({count: count, jobs:jobs});
          res.json({
            success:true,
            message: 'Jobs fetched',
            data: { count : count, jobs: jobs }
        })
        } )
    }, (err) => next(err))
    .catch((err) => next(err));
  }

  module.exports.getDistinct = (req, res, next) => {
    //console.log(req.params.distinctField);
    Job.distinct(req.params.distinctField)
    .then( distinctFieldValues => {
     //   console.log("locations: "+distinctFieldValues );
            res.json({
                success: true,
                message: 'got distinct',
                data :  distinctFieldValues
            });
        
    })
    .catch((err) => {
        res.status(400);
        res.json({
             success : false,
              message : err.message,
        }); 
    })

}

//    router.get('/getJobs/:field/:value/:page_no/:page_limit',
//    jobController.getJobs);
module.exports.getJobs = (req, res, next) => {
    console.log('query params: '+JSON.stringify(req.params))
    var field = req.params.field
    var value = req.params.value
    var page_limit = Number(req.params.page_limit)
    var skip_no    = (Number(req.params.page_no)-1)*page_limit
    let query ={};
    let query1 = {};

    console.log("field"+field);
    if(field!='search'){
        if(field!='all')
            query[field] = value;
    }
    else{
        query = { $or :[ {post : { $regex: value }},{requiredSkills : { $regex: value } }] }
        console.log(query);
    }
   
    //console.log(Job.find(query));    
    Job.find(query)
    .skip(skip_no)
    .limit(page_limit)
    .populate('provider')
    .then((jobs) => {  
     //   console.log(jobs);
        Job.count(query)
        .then(count=> {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(
          {
            success:true,
            message: 'Jobs fetched',
            data: { count : count, jobs: jobs }
          })
        } )
    }, (err) => next(err))
    .catch((err) => next(err));
  }

  module.exports.applyForJob = (req, res, next) => {
        console.log("req body: " + req.body.job_id);
        let job_id = mongoose.Types.ObjectId(req.body.job_id)
        console.log("job_id : "+job_id);
        Job.findOneAndUpdate({_id : job_id},{$push : { applicants : req.user.id }})
        .populate('provider')
        .then((job) => {  
           console.log("Applied for job: "+job);
            JobSeeker.findOneAndUpdate({_id : req.user.id},{$push : { appliedJobs : job._id }},{new : true})
            .then( user => {
                if(user){ 
                        console.log("sending mail");
                        mailer.sendMail(job,user);
                         //next();
                         console.log("apllied for job: "+user);
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json(
                         {
                           success:true,
                           message: 'Applied Succesfully',
                           data: user
                         })
                }
                else 
                    console.log("No user found");
            })
            .catch((err) => {
                  console.log(err);
                  next(err);
            })
          
        })
        .catch((err) => {
            console.log(err);
            next(err);
      })


  }


module.exports.getJobDetail = (req, res, next) =>{
    console.log('query params: '+JSON.stringify(req.params))

    let job_id = req.params.job_id;

    Job.findById(job_id)
    .populate('provider')
    .then((job) => {  
          console.log(job);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(
          {
            success:true,
            message: 'Jobs fetched',
            data: job
          })
    }).catch((err) => next(err));

}


module.exports.approveApplicant = (req, res, next) =>{
    console.log(req.body);
    Job.findOneAndUpdate({_id:req.body.job_id},{$push : { approvedApplicants : req.body.user_id }},{new : true})
    .populate('applicants')
    .then((job) => {  
           console.log(job);
             res.statusCode = 200;
             res.setHeader('Content-Type', 'application/json');
             res.json(
             {
               success:true,
               message: 'Jobs fetched',
               data: job
             })
    }).catch((err) => next(err));

}


module.exports.declineApplicant = (req, res, next) =>{
    console.log(req.body);
    Job.findOneAndUpdate({_id:req.body.job_id},{$pull : {applicants : req.body.user_id}},{new : true})
    .populate('applicants')
    .then((job) => {  
        //   console.log(jobs);
             res.statusCode = 200;
             res.setHeader('Content-Type', 'application/json');
             res.json(
             {
               success:true,
               message: 'Jobs fetched',
               data: job
             })
    }).catch((err) => next(err));

}