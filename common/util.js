function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	
	//页面跳转前,取传送的param参数数据
	getTargetParam: function(e) {return e.currentTarget.dataset.param;},
	
	 //判断是否为空
	isEmpty: function(val){
		//判断是否为数组
		if(this.isArray(val)) return (val.length <= 0);
        return (val === null) || (val === '') ? true : false;
	},
	//判断是否为数组
	isArray: function(o){
		return Object.prototype.toString.call(o)== '[object Array]';
	},
	
	//修改标题
	setBarTitle: function(val){
		uni.setNavigationBarTitle({
		    title: val
		});
	},
	//是否是数字
	isNum(num){
		if(!isNaN(num)){
			return true;
		}
		return false;
	},
	
	//数据格式化
	dataFormat(data){
		if(this.isEmpty(data)) return "无";
		if(this.isNum(data)){
			if(data%1 == 0) return data;
			
			return data.toFixed(2);
		}
		
		return data;
	},
	
	//获取设备号
	getUuid(){
		// #ifdef APP-PLUS
		let uuid = plus.device.uuid;  //App平台获取设备唯一标识号
		// #endif
		
		// #ifdef H5
		let uuid = "00813494be9";  //H5平台设置设备唯一标识号
		// #endif
		return uuid;
	},
	
	//打开外部网站
	openUrl(url){
		// #ifdef APP-PLUS
			//plus.runtime.openWeb(url);   //App平台使用内置浏览器打开外部网站
			plus.runtime.openURL(url); //App平台使用第三方浏览器打开外部网站
		// #endif
		
		// #ifdef H5
		  window.location.href = url;  //H5平台打开外部网站
		// #endif
	},
	
	//打开内部网站
	openUrlInner(url){
		// #ifdef APP-PLUS
			plus.runtime.openWeb(url);   //App平台使用内置浏览器打开外部网站
		// #endif
		
		// #ifdef H5
		  window.location.href = url;  //H5平台打开外部网站
		// #endif
	},
	
	//rpx转px
	rpx2px(size) {
	    const info = uni.getSystemInfoSync()
	    this.scale = 750 / info.windowWidth;
		// 分离字体大小和单位,rpx 转 px
		let s = Number.isNaN(parseFloat(size)) ? 0 : parseFloat(size)
		let u = size.toString().replace(/[0-9]/g, '').replace('-','')
		if (u == 'rpx') {
			s /= this.scale
			u = 'px'
		} else if (u == '') {
			u = 'px'
		}else if (u == 'vw') {
			u = 'px'
			s = s / 100 * 750 / this.scale
		}
		return s;
	},
	//返回当前平台版本号的key
	getVerKey(){
		switch(uni.getSystemInfoSync().platform){
		    case 'android':
		       return 'android_ver';
		       break;
		    case 'ios':
		       return 'ios_ver';
		       break;
		    default:
		       return 'android_ver';
		       break;
		}
	},
	
	//获取状态栏高度
	getStateBarHeight(){
		return uni.getSystemInfoSync().statusBarHeight;
	}
}