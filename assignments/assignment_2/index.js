var http=require('http')
let fs=require('fs')


fs.writeFile('index.html','<h1>Hello world</h1>',(err,data)=>{

    http.createServer((req,res)=>{
        res.writeHead(200,{
            'Content-Type':'text/html'
        })
      fs.readFile('index.html',{encoding:"utf-8"},(err,data)=>{
          res.end(data)
      })
        
       
   
    }).listen(3000)
})


  



