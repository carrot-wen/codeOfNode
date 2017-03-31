var express = require('express')
var search = require('./search')
var app = express.createServer()

app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('view options',{ layout: false });
console.log(app.set('views'));

app.get('/',function(req,res){
	res.render('index');
});

app.get('/search',function(req,res,next){
	search(req.query.q,function(err,ans){
		if(err){return next(err)}
		res.render('tests',{result: ans})
	})
});

app.listen(3000);