const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;

//making express app
var app=express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}:${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append.')
        }
    });
   next();
});

// app.use((req,res,next)=>{
//    res.render('maintenance.hbs',{
//     msg:' We are down for maintenance. We will be back shortly.'
// }) ;
// });

app.use(express.static(__dirname +'/public'));


hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()
})

app.get('/',function(req,res){
   // res.send('<h1>Hello Express!</h1>');
res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMsg: 'Welcome user!',
    currentYear: new Date().getFullYear()
});
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
});
});

// /bad
app.get('/bad',(req,res) => {
    res.send({
    error:'404 bad request'
});
});


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
