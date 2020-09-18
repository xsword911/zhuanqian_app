import util from '@/common/util.js';
import api from "@/api/api.js";
import storage from "@/api/storage.js";
//封装保存本地数据操作
const utilCore = {

	 //判断是否登录
	// isLogin(){
	// 	let user = uni.getStorageSync('myInfo');
 //        return !util.isEmpty(user);
	// },
	
	//跳转登录界面
	toLoginUi(){
		// uni.switchTab({
		// 	url: '/pages/my/my'
		// });
		// uni.navigateTo({
		// 	url: '/pages/login/login'
		// })
		uni.reLaunch({
			url:'/pages/user/login/login'
		});
	},
	
	toLoginUiCanBack(){
		uni.navigateTo({
			url: '/pages/login/login'
		})
	},
	
	//是否游客登录
	isLoginByDeviceId(){
		let loginType = storage.getLoginType();  //获取登录方式
		return (loginType == 0);
	},
	
	//设备号登录（游客登录）
	loginByDevice(fun = null){
		storage.setLoginType(0);   //保存登录方式，设备号登录
		//取设备号
		let device = util.getUuid();
		
		api.loginByOth({deviceId: device}, (res)=>{
			let uid = api.getData(res);
			let token = api.getToken(res);
			storage.setUid(uid);  //保存uid
			//storage.setLoginType(0);   //保存登录方式，设备号登录
			//回调监听
			if(fun != null) fun(res);
		});
	},
};
 
export default utilCore;
