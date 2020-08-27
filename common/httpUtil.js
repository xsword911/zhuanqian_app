import config from '@/static/app/config.js';
import util from '@/common/util.js';
import tran from '@/common/tran.js';
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import utilCore from "@/api/utilCore.js";
//http操作工具类
const httpUtil = {
	
	//取返回数据内,token数据
	getToken: function(res) {return res.data.token},
	getCode: function(res) {return res.data.code},
	
	//进行http的post请求
	post: function(url, postData, funSuccess, state) {
		// if(state){
		// 	uni.showLoading({
		// 	    title: '加载中'
		// 	});
		// 	console.log(1);
		// };
		let token = storage.getToken();
		uni.request({
			url: config.baseUrl + "/api/" + url,
			method: 'post',
			dataType: 'json',
			data: postData,
			header: {
			  'token': token  //上传token
			},
			success: (res) => {
				// uni.hideLoading();
				let token = this.getToken(res);
				//判断是否有token
				if(!util.isEmpty(token) && token.length == 17)
				{
					let oldToken = storage.getToken();
					//token不同时保存新token
					console.log(token);
					if(token != oldToken) storage.setToken(token);
				}
				
				//验证token是否失效
				let code = this.getCode(res);
				if(code == 10000)
				{
					//清理旧数据
					storage.setToken("");
					storage.setUid("");
					//使用设备号登录
					utilCore.loginByDevice();
					return;
				}
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
		let token = storage.getToken();
		uni.uploadFile({
			url: config.baseUrl + '/api/' + url, //文件上传地址
			filePath: path,
			name: name,
			header: {
			  'token': token  //上传token
			},
			success: (res) => {			
				let data = tran.json2Obj(res.data);
				funSuccess(data);
			}
		});
	}
};

export default httpUtil;