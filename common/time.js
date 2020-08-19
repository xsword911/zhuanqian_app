
//时间转换操作
module.exports = {
	//秒数转换时分秒
	timeChange(auditLong){
		if(auditLong == null) return;
		let sp = auditLong;
		let hour = parseInt(auditLong / 3600);
		let min = parseInt([auditLong - (hour * 3600)] / 60);
		let second = parseInt(auditLong - [(hour * 3600) + (min * 60)]);
		let counDown = `${hour}小时${min}分${second}秒`;
		return counDown;
	},
	//时间戳转换时分秒
	toHHmmss (data) {
	   var time;
	   var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	   var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
	   var seconds = (data % (1000 * 60)) / 1000;
	   time = (hours < 10 ? ('0' + hours) : hours) + '小时' + (minutes < 10 ? ('0' + minutes) : minutes) + '分' + (seconds < 10 ? ('0' + seconds) : seconds)+ '秒';
	   return time;
	},
	
}