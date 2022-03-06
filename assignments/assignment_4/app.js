const Express = require('express');
const app = Express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/assignment_4');
const methodOverride = require("method-override")

const { Schema } = mongoose


const  Schemaset= new Schema({
  name: { type: String, required: true },
  email: { type: String,required: true },
  isPromoted:{type:Boolean,default:null}

});

const collections = mongoose.model('users', Schemaset);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(Express.static('public'));
app.use(methodOverride("_method"))
function main(){
  app.get('/', async (req, res) => {
   const users = await collections.find()
     res.render('index.ejs', {users});
  });
  
  app.get('/form', async (req, res) => {
    
      res.render('form.ejs');

   })
  app.post('/user/add', async (req, res) => {
    await collections.create({
      name: req.body.name,
      email: req.body.email ,
    });
    res.redirect('/');
  })

  ;
  app.put('/user/:id/edit', async (req, res) => {
    await collections.updateOne({_id:req.params.id} ,{isPromoted:true})
    res.redirect("/")
   });
   app.delete('/user/:id/delete', async (req, res) => {
     await collections.deleteOne({_id:req.params.id})
     res.redirect("/")
     
 
   });

  app.listen(3000);

}
main()


