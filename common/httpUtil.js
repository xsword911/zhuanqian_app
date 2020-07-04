import config from '@/static/app/config.js';
import util from '@/common/util.js';
//http操作工具类
module.exports = {
	
	//进行http的post请求
	post: function(url, postData, funSuccess) {
		uni.request({
			url: config.baseUrl + "/api/" + url,
			method: 'post',
			dataType: 'json',
			data: postData,
			success: (res) => {
				funSuccess(res);
			}
		});
	},
	
	//进行http的get请求
	get: function(url, getData, funSuccess, headData = null) {
		// let _this = this;
		// let head = !util.isEmpty(headData) ? headData : {'Content-Type': 'application/x-www-form-urlencoded'};
		uni.request({
			header: {"Content-Type":"application/x-www-form-urlencoded"},
			url: config.baseUrl + "/" + url + getData,
			method: 'get',
			dataType: 'json',
			success: (res) => {
				funSuccess(res);
			}
		});
	},
}