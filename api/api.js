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
	
	//取返回数据内,token数据
	getToken: function(res) {return res.data.token},
	
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
	
	//第三方登录
	loginByOth: function(path, funSuccess) {httpUtil.post('user/loginByOth', path, funSuccess);},
	
	//登录
	login: function(path, funSuccess) {httpUtil.post('user/login', path, funSuccess);},
	
	//注册
	register: function(path, funSuccess) {httpUtil.post('user/register', path, funSuccess);},
	
	//查询用户详细信息
	getUserByUid: function(path, funSuccess) {httpUtil.post('user/getUserByUid', path, funSuccess);},
	
	//修改用户信息
	setUser: function(path, funSuccess) {httpUtil.post('user/setUser', path, funSuccess);},
	
	//查询用户绑定银行卡
	getUserBank: function(path, funSuccess) {httpUtil.post('user/getUserBank', path, funSuccess);},
	
	//修改用户绑定银行
	updUserBank: function(path, funSuccess) {httpUtil.post('user/updUserBank', path, funSuccess);},
	
	//添加用户绑定银行
	addUserBank: function(path, funSuccess) {httpUtil.post('user/addUserBank', path, funSuccess);},
	
	//添加用户绑定银行
	delUserBankArr: function(path, funSuccess) {httpUtil.post('user/delUserBankArr', path, funSuccess);},
	
	//查询打工任务
	getTask1: function(path, funSuccess) {httpUtil.post('activity/getTask1', path, funSuccess);},
	
	//查询赚赚任务
	getTask2: function(path, funSuccess) {httpUtil.post('activity/getTask2', path, funSuccess);},
	
	//做一个任务
	taskDo: function(path, funSuccess) {httpUtil.post('activity/taskDo', path, funSuccess);},
	
	//查询任务完成情况
	getTaskDetails: function(path, funSuccess) {httpUtil.post('activity/getTaskDetails', path, funSuccess);},
	
	//查询今天统计金额
	getStatisticsToday: function(path, funSuccess) {httpUtil.post('money/getStatisticsToday', path, funSuccess);},
	
	//发起提现申请
	addMoneyDraw: function(path, funSuccess) {httpUtil.post('money/addMoneyDraw', path, funSuccess);},
	
	//金额和金币转换
	moneyTran: function(path, funSuccess) {httpUtil.post('money/moneyTran', path, funSuccess);},
	
	//查询提现记录
	getMoneyDraw: function(path, funSuccess) {httpUtil.post('money/getMoneyDraw', path, funSuccess);},
	
	//查询提现记录
	getMoneyTran: function(path, funSuccess) {httpUtil.post('money/getMoneyTran', path, funSuccess);},
	
	//查询账变记录
	getMoney: function(path, funSuccess) {httpUtil.post('money/getMoney', path, funSuccess);},
	
	//查询金币账变记录
	getGold: function(path, funSuccess) {httpUtil.post('money/getGold', path, funSuccess);},
	
	//查询签到进度
	getSignProgress: function(path, funSuccess) {httpUtil.post('activity/getSignProgress', path, funSuccess);},
	
	//签到领奖
	sign: function(path, funSuccess) {httpUtil.post('activity/sign', path, funSuccess);},
	
	//查询月签到详情
	getMonthSignDetails: function(path, funSuccess) {httpUtil.post('activity/getMonthSignDetails', path, funSuccess);},
	
	//玩家查询抽奖列表
	getOpenLucky: function(path, funSuccess) {httpUtil.post('activity/getOpenLucky', path, funSuccess);},
	
	//进行幸运抽奖
	openLucky: function(path, funSuccess) {httpUtil.post('activity/openLucky', path, funSuccess);},
	
}