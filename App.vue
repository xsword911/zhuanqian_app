<script>
import audio from "@/common/audio.js";
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
		this.uid = storage.getUid();  //获取uid
		this.getNotReadMsgSum(); //查询未读消息数
		// plus.navigator.setFullscreen(true);
	},
	onHide: function() {
		console.log('App Hide');
	},
	onLoad(){
		//audio.createAudio();
	},
	data() {
		return {
			uid: "",  //uid
			notReadMsgSum: null,  //未读消息数
		}
	},
	methods:{
		//查询未读消息数
		getNotReadMsgSum(){
			api.getNotReadMsgSum({uid: this.uid}, (res)=>{
				this.notReadMsgSum = api.getData(res);
				//有未读消息时tabbar显示红点提示
				if(this.notReadMsgSum > 0){
					uni.setTabBarBadge({
					  index: 3,
					  text: this.notReadMsgSum + ''
					})
				}else uni.hideTabBarRedDot({index:3})  //没有未读消息时tabba移除红点提示
			});
		},
	}
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
	.container{
		padding:20rpx;
		box-sizing:border-box;
		font-size:16px;
		background-color: #fbf9fe;
		width:100%;
		height:100vh;
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
	.background_style{
		background-color:#fcd030;
	}
	.btn_style>button{
		background-color:#fcd030;
	}
</style>
