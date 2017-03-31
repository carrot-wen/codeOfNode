var request = require('superagent');
//url = "http://www.baidu.com/s?pn="+(page-1)*pageSize+"&wd="+keyword
module.exports = function search(meg,fn){
	request
		.get('http://www.baidu.com/s')
		.send({
			wd:meg,
			cl:3
		})
		.end(function(res){
			return fn(null,res);
		})
}