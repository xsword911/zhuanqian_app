<template>
	<view class="">
		<web-view src="http://120.78.217.149/test/xiaoxiaogame/"></web-view>
	</view>
</template>

<script>
import util from "@/common/util.js";
import storage from "@/api/storage.js";
import utilCore from "@/api/utilCore.js";
export default {
	data() {
		return {

		}
	},
	onLoad() {
		//查询是否有uid，没有则使用设备号登录
		if(util.isEmpty(storage.getUid())){
			utilCore.loginByDevice();
		}
	},
	methods:{

	}
}
</script>

<style>
</style>

