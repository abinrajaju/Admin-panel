const express = require('express')
const route = express.Router()
const session = require('express-session')
const axios = require('axios')
const service = require('../service/render')
const controller = require('../controller/controller')
const {off,getMaxListeners}=require('../model/model')
const {adminCheck}=require('../../util/middleware')



route.get('/',(req,res)=>{
    if(req.session.user&& req.session.user.role=='admin'){
        res.redirect('/admin')
    }else if (req.session.user){
        res.redirect('/userhome')
    }else{
        res.render('login')
    }
})
//admin 
route.get('/admin',adminCheck,(req,res)=>{
     if(req.session.user){
        axios.get("http://localhost:100/api/users")
        .then((response)=>{
            res.render('admin',{users:response.data})
        })
        .catch(err=>{
            res.send(err)
        })
     }
     else{
        res.redirect('/')
     }
})

route.get('/userhome',(req,res)=>{
    if(req.session.user && req.session.user.role!='admin'){
        res.render('userhome')
    }else {
        res.redirect('/')
    }
})

 route.get('/addUser',adminCheck,service.addUser)
route.get('/updateuser',adminCheck,service.updateUser)
route.get('/search',adminCheck,service.searchUser)


route.get('/logout',(req, res) =>{
    if(req.session.user){
    req.session.destroy(function(err){
         if(err){
              console.log(err)
              res.send("Error")
         }else{
              res.redirect('/')
         }
    })
}
else{
    res.redirect('/')
}
})

// //API
route.post('/api/users/login', controller.login)
route.route('/api/users')
  .post(controller.create)
  .get(controller.find);
route.get('/api/users/search', controller.search);
route.route('/api/users/:id')
  .put(controller.update)
  .delete(controller.delete)


module.exports = route