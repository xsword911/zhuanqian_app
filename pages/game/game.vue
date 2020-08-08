<template>
	<view class="">
		<web-view src="http://120.78.217.149/test/xiaoxiaogame/"></web-view>
	</view>
</template>

<script>
import util from "@/common/util.js";
import storage from "@/api/storage.js";
import utilCore from "@/api/utilCore.js";
import api from "@/api/api.js";
export default {
	data() {
		return {
			uid: "",  //uid
			notReadMsgSum: null,  //未读消息数
		}
	},
	onLoad() {
		//查询是否有uid，没有则使用设备号登录
		if(util.isEmpty(storage.getUid())){
			utilCore.loginByDevice();
		}
	},
	onShow() {
		console.log(storage.getToken());
		this.uid = storage.getUid();  //获取uid
		this.getNotReadMsgSum(); //查询未读消息数
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
}
</script>

<style>
</style>

