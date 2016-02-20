console.info('you came console.info();')

TestService = {
	saveEntity:function(req,res,param){
		//console.info(req.query)
		res.send(global.configResult(param));
	},
	toS2tring:function(req,res,param){
		//console.info(req.query)
		res.send(global.configResult("this is service"));
	},
	update:function(req,res,param){
		//console.info(req.query)
		res.send(global.configResult("this is update functionaa!!!"));
	}
}

module.exports = TestService;