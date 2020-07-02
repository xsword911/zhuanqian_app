import httpUtil from '@/common/httpUtil.js';
import config from '@/static/app/config.js';
//网络操作封装
module.exports = {
	//取返回数据内,code数据
	getCode: function(res) {return res.data.code},
	
	//取返回数据内,msg数据
	getMsg: function(res) {return res.data.msg},
	
	//取返回数据内,data数据
	getData: function(res) {return res.data.data},
	
	//获取图片路径
	getFileUrl(postData){
		let url = config.baseUrl + "/File/FetchFile?pc=" + postData.pc + "&openId=" +postData.openId;
		return url;
	},
	
	//取返回数据内,page分页的列表数据.只返回分页列表数据,不返回总页数等数据
	getPageList: function(res) {return res.data.data},
	
	//登录到网关
	loginGate: function(postData, funSuccess) {httpUtil.post('gate/loginGate', postData, funSuccess);},
	
	//上传文件
	uploadFileToCache: function(path, funSuccess) {httpUtil.upload('external/uploadFileToCache', path, 'file', funSuccess);},
	
	//登录
	login: function(path, funSuccess) {httpUtil.post('user/login', path, funSuccess);},
	
	//注册
	register: function(path, funSuccess) {httpUtil.post('user/register', path, funSuccess);},
	
	//查询用户详细信息
	getUser: function(path, funSuccess) {httpUtil.post('user/getUser', path, funSuccess);},
	
	//查询用户绑定银行卡
	getUserBank: function(path, funSuccess) {httpUtil.post('user/getUserBank', path, funSuccess);},
	
	//修改用户绑定银行
	updUserBank: function(path, funSuccess) {httpUtil.post('user/updUserBank', path, funSuccess);},
	
	//添加用户绑定银行
	addUserBank: function(path, funSuccess) {httpUtil.post('user/addUserBank', path, funSuccess);},
	
	//添加用户绑定银行
	delUserBankArr: function(path, funSuccess) {httpUtil.post('user/delUserBankArr', path, funSuccess);},
	
	//获取任务列表
	getTask: function(path, funSuccess) {httpUtil.post('activity/getTask', path, funSuccess);},
	
	//查询今天统计金额
	getStatisticsToday: function(path, funSuccess) {httpUtil.post('money/getStatisticsToday', path, funSuccess);},
}