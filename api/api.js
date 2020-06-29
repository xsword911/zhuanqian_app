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
}