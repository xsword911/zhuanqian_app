<template>
	<view class="">
		<view class="lay">
			<view class="logo_img">
				<image src="/static/img/logo.png" mode=""></image>
			</view>
			<view class="lay_name">云点赞</view>
			<view class="lay_ver">Version 1.0.1</view>
		</view>
	</view>
</template>

<script>
import api from "@/api/api.js";
export default{
	data() {
		return {
			
		}
	},
}
</script>

<style>
	.lay{
		margin-top:200rpx;
		display:flex;
		justify-content:center;
		align-items:center;
		flex-direction: column;
	}
	.logo_img{
		width:180rpx;
		height:180rpx;
	}
	.lay_name{
		font-weight:bold;
		margin-top:40rpx;
		color:#F28776;
	}
	.lay_ver{
		margin-top:10rpx;
		font-size:16px;
	}
</style>
