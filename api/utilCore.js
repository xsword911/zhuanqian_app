import util from '@/common/util.js';
import api from "@/api/api.js";
import storage from "@/api/storage.js";
//封装保存本地数据操作
module.exports = {

	 //判断是否登录
	isLogin: function(){
		let user = uni.getStorageSync('myInfo');
        return !util.isEmpty(user);
	},
	
	//跳转登录界面
	toLoginUi: function(){
		uni.reLaunch({
			url:'/pages/user/login/login'
		});
	},
	
	//设备号登录（游客登录）
	loginByDevice(){
		//取设备号
		let device = util.getUuid();
		api.loginByOth({deviceId: device}, (res)=>{
			let uid = api.getData(res);
			let token = api.getToken(res);
			storage.setUid(uid);  //保存uid
			storage.setLoginType(0);   //保存登录方式，设备号登录
		});
	},
} 