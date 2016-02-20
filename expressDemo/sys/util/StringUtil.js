var  StringUtil = {
	/**
	 *获取Action名称
	 *url url
	 **/
	getActionName : function(url) {
		var expStr = url.split('!');
		var tempArr = expStr[0].split('/');
		return tempArr[tempArr.length - 1];
	},
	/**
	 *获取Action名称
	 *url url
	 **/
	getMethodName : function(url) {
		var arr = url.split('!');
		return arr[arr.length - 1].split('?')[0];
	}
}
module.exports = StringUtil;