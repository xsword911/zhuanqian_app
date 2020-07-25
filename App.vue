<script>
import audio from "@/common/audio.js";
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
		// plus.navigator.setFullscreen(true);
	},
	onHide: function() {
		console.log('App Hide');
	},
	onLoad(){
		//audio.createAudio();
	},
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
	.content{
		padding:0 20rpx;
		box-sizing:border-box;
		font-size:16px;
	}
	image{
		width:100%;
		height:100%;
	}
	button::after{
		border:none;
	}
	.btn_hover{
		transform:scale(0.9)
	}
</style>
