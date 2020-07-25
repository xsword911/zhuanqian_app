let innerAudioContext = null;   //创建音频对象
//封装音频操作
module.exports = {
	createAudio(){
		this.innerAudioContext = uni.createInnerAudioContext();
		this.innerAudioContext.src = '/static/audio/click.bubble.mp3';  //引入音频地址
	},
	//播放音频
	playAudio(){
		this.innerAudioContext = uni.createInnerAudioContext();
		this.innerAudioContext.src = '/static/audio/click.bubble.mp3';  //引入音频地址
		this.innerAudioContext.play();
	}
} 