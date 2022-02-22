const express=require('express')
const app=express()
const bodyparser=require('body-parser')
app.set('views','./views')
app.set('view engine','ejs')
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static('public'))
const users=[{
    name:'naveen',
    email:'hello@gmail.com'
}]
app.get('/',(req,res)=>{
    res.render('index.ejs',{users})

})
app.get('/form',(req,res)=>{
    res.render('form.ejs',{users})
    
})
app.post('/user/add',(req,res)=>{
    users.push({
        name:req.body.name,
        email:req.body.email
    })
    res.redirect('/')

    
})
app.listen(3000)
