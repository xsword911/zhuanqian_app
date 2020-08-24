<template>
	<view class="">
		<web-view :src="openUrl"></web-view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			openUrl: "",  //跳转链接
		}
	},
	onLoad(res) {
		// console.log(res.url);
		this.openUrl = "http://120.78.217.149:8029/JhdG2yF/";
		// this.openUrl = res.url;
	}
}
</script>

<style>
</style>
