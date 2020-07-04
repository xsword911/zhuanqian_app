import util from '@/common/util.js';

const myInfo 		= "myInfo"; 		//用户详细信息的key
const myBankInfo 	= "myBankInfo"; 	//用户银行卡信息的key
//封装保存本地数据操作
module.exports = {
	//保存我的数据
	setMyInfo: function(data) {
		uni.setStorageSync(myInfo, data);
	},

	//获取我的数据
	getMyInfo: function() {
		return uni.getStorageSync(myInfo);
	},

	//退出登录
	outLogin: function() {
		uni.removeStorage({key: myInfo});
		uni.removeStorage({key: myBankInfo});
	},
	
	//保存我的银行卡数据
	setMyBankInfo: function(data) {
		uni.setStorageSync(myBankInfo, data);
	},
	
	//获取我的银行卡数据
	getMyBankInfo: function() {
		return uni.getStorageSync(myBankInfo);
	},
	
	//删除我的银行卡数据
	delMyBankInfo: function() {
		uni.removeStorage({key: myBankInfo});
	},
}
