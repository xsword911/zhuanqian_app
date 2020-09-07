import httpUtil from '@/common/httpUtil.js';
import config from '@/static/app/config.js';
//网络操作封装
const api = {
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
		let url = config.baseUrl + "/api/external/uploadFileToCache";
		return url;
	},
	
	//取返回数据内,page分页的列表数据.只返回分页列表数据,不返回总页数等数据
	getPageList: function(res) {return res.data.data},
	
	//登录到网关
	loginGate: function(postData, funSuccess, state = false) {httpUtil.post('gate/loginGate', postData, funSuccess, state);},
	
	//上传文件
	uploadFileToCache: function(path, funSuccess, state = false) {httpUtil.upload('external/uploadFileToCache', path, 'file', funSuccess, state);},
	
	//第三方登录
	loginByOth: function(path, funSuccess, state = false) {httpUtil.post('user/loginByOth', path, funSuccess, state);},
	
	//登录
	login: function(path, funSuccess, state = true) {httpUtil.post('user/login', path, funSuccess, state);},
	
	//注册
	register: function(path, funSuccess, state = true) {httpUtil.post('user/register', path, funSuccess, state);},
	
	//查询用户详细信息
	getUserByUid: function(path, funSuccess, state = false) {httpUtil.post('user/getUserByUid', path, funSuccess, state);},
	
	//修改用户信息
	setUser: function(path, funSuccess, state = true) {httpUtil.post('user/setUser', path, funSuccess, state);},
	
	//查询全部用户详细信息
	getUser: function(path, funSuccess, state = false) {httpUtil.post('user/getUser', path, funSuccess, state);},
	
	//用户修改密码
	updPwd: function(path, funSuccess, state = true) {httpUtil.post('user/updPwd', path, funSuccess, state);},
	
	//用户修改资金密码
	updCashPwd: function(path, funSuccess, state = true) {httpUtil.post('user/updCashPwd', path, funSuccess, state);},
	
	//查询用户绑定银行卡
	getUserBank: function(path, funSuccess, state = false) {httpUtil.post('user/getUserBank', path, funSuccess, state);},
	
	//修改用户绑定银行
	updUserBank: function(path, funSuccess, state = true) {httpUtil.post('user/updUserBank', path, funSuccess, state);},
	
	//添加用户绑定银行
	addUserBank: function(path, funSuccess, state = false) {httpUtil.post('user/addUserBank', path, funSuccess, state);},
	
	//添加用户绑定银行
	delUserBankArr: function(path, funSuccess, state = true) {httpUtil.post('user/delUserBankArr', path, funSuccess, state);},
	
	//查询打工任务
	getTask1: function(path, funSuccess, state = false) {httpUtil.post('activity/getTask1', path, funSuccess, state);},
	
	//查询赚赚任务
	getTask2: function(path, funSuccess, state = false) {httpUtil.post('activity/getTask2', path, funSuccess, state);},
	
	//做一个任务
	taskDo: function(path, funSuccess, state = false) {httpUtil.post('activity/taskDo', path, funSuccess, state);},
	
	//查询任务完成情况
	getTaskDetails: function(path, funSuccess, state = false) {httpUtil.post('activity/getTaskDetails', path, funSuccess, state);},
	
	//查询今天统计金额
	getStatisticsToday: function(path, funSuccess, state = false) {httpUtil.post('statistics/getStatisticsToday', path, funSuccess, state);},
	
	//发起提现申请
	addMoneyDraw: function(path, funSuccess, state = true) {httpUtil.post('money/addMoneyDraw', path, funSuccess, state);},
	
	//金额和金币转换
	moneyTran: function(path, funSuccess, state = false) {httpUtil.post('money/moneyTran', path, funSuccess, state);},
	
	//查询提现记录
	getMoneyDraw: function(path, funSuccess, state = false) {httpUtil.post('money/getMoneyDraw', path, funSuccess, state);},
	
	//查询提现记录
	getMoneyTran: function(path, funSuccess, state = false) {httpUtil.post('money/getMoneyTran', path, funSuccess, state);},
	
	//查询账变记录
	getMoney: function(path, funSuccess, state = false) {httpUtil.post('money/getMoney', path, funSuccess, state);},
	
	//查询金币账变记录
	getGold: function(path, funSuccess, state = false) {httpUtil.post('money/getGold', path, funSuccess, state);},
	
	//查询签到进度
	getSignProgress: function(path, funSuccess, state = false) {httpUtil.post('activity/getSignProgress', path, funSuccess, state);},
	
	//签到领奖
	sign: function(path, funSuccess, state = false) {httpUtil.post('activity/sign', path, funSuccess, state);},
	
	//查询月签到详情
	getMonthSignDetails: function(path, funSuccess, state = false) {httpUtil.post('activity/getMonthSignDetails', path, funSuccess, state);},
	
	//玩家查询抽奖列表
	getOpenLucky: function(path, funSuccess, state = false) {httpUtil.post('activity/getOpenLucky', path, funSuccess, state);},
	
	//进行幸运抽奖
	openLucky: function(path, funSuccess, state = false) {httpUtil.post('activity/openLucky', path, funSuccess, state);},
	
	//查看抽奖历史记录
	getLuckyDetails: function(path, funSuccess, state = false) {httpUtil.post('activity/getLuckyDetails', path, funSuccess, state);},
	
	//查询通知设置列表
	getNotice: function(path, funSuccess, state = false) {httpUtil.post('message/getNotice', path, funSuccess, state);},
	
	//查询消息列表
	getMssage: function(path, funSuccess, state = false) {httpUtil.post('message/getMsg', path, funSuccess, state);},
	
	//查询未读消息数
	getNotReadMsgSum: function(path, funSuccess, state = false) {httpUtil.post('message/getNotReadMsgSum', path, funSuccess, state);},
	
	//设置消息已读
	readMsg: function(path, funSuccess, state = false) {httpUtil.post('message/readMsg', path, funSuccess, state);},
	
	//查询可用的充值渠道(包括渠道大类)
	getRechargeWayEnable: function(path, funSuccess, state = false) {httpUtil.post('money/rechargeWay/getRechargeWayEnable', path, funSuccess, state);},
	
	//申请充值
	recharge: function(data, funSuccess, state = false) {httpUtil.post('money/rechargeWay/recharge', data, funSuccess, state);},
	
	//申请充值提交
	rechargePut: function(path, funSuccess, state = false) {httpUtil.post('money/rechargeWay/rechargePut', path, funSuccess, state);},
	
	//查询充值记录
	getMoneyRecharge: function(path, funSuccess, state = false) {httpUtil.post('money/getMoneyRecharge', path, funSuccess, state);},
	
	//查询用户月报表
	getStatisticsMonth: function(path, funSuccess, state = false) {httpUtil.post('statistics/getStatisticsMonth', path, funSuccess, state);},
	
	//查询日报表
	getStatisticsDay: function(path, funSuccess, state = false) {httpUtil.post('statistics/getStatisticsDay', path, funSuccess, state);},
	
	//查询团队总览
	getStatisticsMonthGroup: function(path, funSuccess, state = false) {httpUtil.post('statistics/getStatisticsMonthGroup', path, funSuccess, state);},
	
	//查询团队报表
	getStatisticsDayGroup: function(path, funSuccess, state = false) {httpUtil.post('statistics/getStatisticsDayGroup', path, funSuccess, state);},
	
	//查询系统配置
	getConfig: function(path, funSuccess, state = false) {httpUtil.post('system/getConfig', path, funSuccess, state);},
	
	//查询任务类型
	getTaskType: function(path, funSuccess, state = false) {httpUtil.post('activity/getTaskType', path, funSuccess, state);},
	
	//添加任务
	addTask: function(path, funSuccess, state = true) {httpUtil.post('activity/addTask', path, funSuccess, state);},
	
	//查询我发布的任务
	getTaskInfo: function(path, funSuccess, state = false) {httpUtil.post('activity/getTaskInfo', path, funSuccess, state);},
	
	//修改任务
	updTask: function(path, funSuccess, state = true) {httpUtil.post('activity/updTask', path, funSuccess, state);},
	
	//用户接受一个任务
	receiveTask: function(path, funSuccess, state = true) {httpUtil.post('activity/receiveTask', path, funSuccess, state);},
	
	//用户放弃一个任务
	cancelTask: function(path, funSuccess, state = true) {httpUtil.post('activity/cancelTask', path, funSuccess, state);},
	
	//查询任务完成情况
	getTaskDetails: function(path, funSuccess, state = false) {httpUtil.post('activity/getTaskDetails', path, funSuccess, state);},
	
	//审核任务记录
	auditTaskDetails: function(path, funSuccess, state = true) {httpUtil.post('activity/auditTaskDetails', path, funSuccess, state);},
	
	//用户提交一个任务
	submitTask: function(path, funSuccess, state = true) {httpUtil.post('activity/submitTask', path, funSuccess, state);},
	
	//查询等级信息
	getUserLevel: function (path, funSuccess, state = false) {httpUtil.post("user/getUserLevel", path, funSuccess, state);},
	
	//返回会员等级下拉信息
	getLevelDesc: function (path, funSuccess, state = false) {httpUtil.post("user/getLevelDesc", path, funSuccess, state);},
	
	//购买等级
	buyLevel: function (path, funSuccess, state = true) {httpUtil.post("user/buyLevel", path, funSuccess, state);},
	
	//查询开放的所有等级
	getLevelAll: function (funSuccess, state = false) {httpUtil.post("user/getLevelAll", {}, funSuccess, state);},
	
	//查询开启的存款利率
	getPlanRateOpen: function (funSuccess, state = false) {httpUtil.post("activity/planRate/getPlanRateOpen", {}, funSuccess, state);},
	
	//转入余额宝
	planMoneyIn: function (path, funSuccess, state = true) {httpUtil.post("activity/planRate/planMoneyIn", path, funSuccess, state);},
	
	//查询余额宝存款记录
	getPlanMoney: function (path, funSuccess, state = false) {httpUtil.post("activity/planRate/getPlanMoney", path, funSuccess, state);},
	
	//钱转出余额宝
	planMoneyOut: function (path, funSuccess, state = true) {httpUtil.post("activity/planRate/planMoneyOut", path, funSuccess, state);},
	
	//查询用户利息宝总余额
	getPlanMoneySumByUid: function (path, funSuccess, state = false) {httpUtil.post("activity/planRate/getPlanMoneySumByUid", path, funSuccess, state);},
	
	//返回大类和子类树形结构数据
	getTaskTree: function (path, funSuccess, state = false) {httpUtil.post("activity/task/getTaskTree", path, funSuccess, state);},
	
	//查询资讯列表
	getInformation: function (path, funSuccess, state = false) {httpUtil.post("message/getInformation", path, funSuccess, state);},
	
	//发送手机验证码
	sendTelCode: function (path, funSuccess, state = true) {httpUtil.post("user/sendTelCode", path, funSuccess, state);},
	
	//手机号注册
	registerByTel: function (path, funSuccess, state = true) {httpUtil.post("user/registerByTel", path, funSuccess, state);},
	
	//用户查询取现限制
	getDrawLimit: function (path, funSuccess, state = false) {httpUtil.post("money/getDrawLimit", path, funSuccess, state);},
	
	//用户查询充值限制
	getRechargeLimit: function (path, funSuccess, state = false) {httpUtil.post("money/rechargeWay/getRechargeLimit", path, funSuccess, state);},
};

export default api;