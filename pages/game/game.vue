<template>
	<view class="">
		<web-view src="http://120.78.217.149/test/xiaoxiaogame/"></web-view>
	</view>
</template>

<script>
import util from "@/common/util.js";
import storage from "@/api/storage.js";
export default {
	data() {
		return {

		}
	},
	onLoad() {
		//查询是否登录
		if(util.isEmpty(storage.getMyInfo())){
			uni.reLaunch({
				url: "/pages/login/login"
			});
			return;
		}
	},
	methods:{

	}
}
</script>

<style>
</style>

