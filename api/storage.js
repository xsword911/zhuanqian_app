import util from '@/common/util.js';

const myInfo = "myInfo"; //用户详细信息的key
const myBankInfo = "myBankInfo"; //用户银行卡信息的key
const userPwd = "userPwd"; //账号密码的key
const deviceId = "deviceId"; //设备号
const token = "token"; //token
const uid = "uid"; //用户uid
const loginType = "loginType"; //登录方式0:设备号(游客)登录 1：账号密码登录 2：微信登录
const levelList = "levelList"; //会员列表
const levelDesc = "levelDesc"; //全部会员列表
const taskTree = "taskTree"  //任务分类树形结构数据
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
		uni.removeStorage({
			key: myInfo
		});
		uni.removeStorage({
			key: myBankInfo
		});
	},

	//保存用户账号和密码
	setUserPwd: function(data) {
		uni.setStorageSync(userPwd, data);
	},

	//获取用户账号和密码
	getUserPwd: function() {
		return uni.getStorageSync(userPwd);
	},

	//删除用户账号和密码
	delUserPwd: function() {
		uni.removeStorage({
			key: userPwd
		})
	},

	//保存设备号
	setDeviceId(data) {
		uni.setStorageSync(deviceId, data);
	},

	//获取设备号
	getDeviceId() {
		return uni.getStorageSync(deviceId);
	},

	//保存token
	setToken(data) {
		uni.setStorageSync(token, data);
	},

	//获取token
	getToken() {
		return uni.getStorageSync(token);
	},

	//保存uid
	setUid(data) {
		uni.setStorageSync(uid, data);
	},

	//获取uid
	getUid() {
		return uni.getStorageSync(uid);
	},

	//保存登录方式
	setLoginType(data) {
		uni.setStorageSync(loginType, data);
	},

	//获取方式
	getLoginType() {
		return uni.getStorageSync(loginType);
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
		uni.removeStorage({
			key: myBankInfo
		});
	},
	
	//保存会员表信息
	setLevelList(data) {
		uni.setStorageSync(levelList, data);
	},
	
	//获取会员表信息
	getLevelList() {
		return uni.getStorageSync(levelList);
	},
	
	//保存全部会员表信息
	setLevelDescList(data) {
		uni.setStorageSync(levelDesc, data);
	},
	
	//获取全部会员表信息
	getLevelDescList() {
		return uni.getStorageSync(levelDesc);
	},
	
	//保存任务分类树形结构数据
	setTaskTree(data) {
		uni.setStorageSync(taskTree, data);
	},
	
	//获取任务分类树形结构数据
	getTaskTree() {
		return uni.getStorageSync(taskTree);
	},
}
