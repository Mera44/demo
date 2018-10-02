var express = require('express');
var router = express.Router();
const { check ,validationResult} = require('express-validator/check');
const fs = require('fs');





/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("herere"+req.session.errors);
  res.render('index');
  // {success:req.session.success,message:req.session.validationErrors});
  // req.session.validationErrors=null;

});
router.post('/',function(req, res,next){
  console.log(req.body);
  req.check('email','Enter a valid email').notEmpty().isEmail();
    const error = req.validationErrors();
    if(error){
      req.session.errors=error;
      req.session.success=false;
     // return res.render('error',{message:error});}
       return res.redirect('index')}
       else {
        req.session.success=true;
        fs.appendFile('public/subscribers.txt',req.body.email,function(err){
        })
      res.render('thankyou',{email:req.body.email});
    

       }
    
    
});

module.exports = router;
