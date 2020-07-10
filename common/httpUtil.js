import config from '@/static/app/config.js';
import util from '@/common/util.js';
import tran from '@/common/tran.js';
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
	
	//上传文件  url:服务器地址 path:本地文件路径 name:上传文件名称 funSuccess:成功时的回调函数
	upload: function(url, path, name, funSuccess) {
		uni.uploadFile({
			url: config.baseUrl + '/api/' + url, //文件上传地址
			filePath: path,
			name: name,
			success: (res) => {
				let data = tran.json2Obj(res.data);
				funSuccess(data);
			}
		});
	}
}