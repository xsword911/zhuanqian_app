
//时间转换操作
module.exports = {
	//秒数转换时分秒
	timeChange(auditLong){
		if(auditLong == null) return "";
		let res = "";
		let sp = auditLong;
		let hour = parseInt(auditLong / 3600);
		if(hour > 0) res += `${hour}小时`;
		let min = parseInt([auditLong - (hour * 3600)] / 60);
		if(min > 0) res += `${min}分`;
		let second = parseInt(auditLong - [(hour * 3600) + (min * 60)]);
		if(second > 0) res += `${second}秒`;
		
		return res;
	},
	//倒计时转换时分秒
	toHHmmss (data) {
	   var time;
	   var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	   var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
	   var seconds = (data % (1000 * 60)) / 1000;
	   time = (hours < 10 ? ('0' + hours) : hours) + '小时' + (minutes < 10 ? ('0' + minutes) : minutes) + '分' + (seconds < 10 ? ('0' + seconds) : seconds)+ '秒';
	   return time;
	},
	
}