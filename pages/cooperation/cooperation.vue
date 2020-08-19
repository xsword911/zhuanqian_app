<template>
	<view class="container" style="background-color: #fff;font-size:14px;">
		<view class="">
			<view class="question">问：什么是一级二级三级升级奖励？</view>
			<view class="answer">
				答：首页点击邀请好友，分享二维码或者链接（<text class="tips_test">如注册页面无显示邀请码需手动输入</text>），注册完成即可。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：邀请还有如何赚钱?</view>
			<view class="answer">
				答：邀请好友可获得充值分佣和升级分佣两种奖励，.最高为三级奖励（A：10%）（B：2%）（C：1%）
			</view>
		</view>
		
		<view class="">
			<view class="question">问：如何计算A/B/C三级分佣？</view>
			<view class="answer">
				答：你的直属下级用户为A，A的直属下级为B，B的直属下级为C，您可以获得以上所有用户的充值分佣和任务分佣。
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.question{
		color: #2980B9;
	}
	.container{
		margin-top:60rpx;
		font-weight:bold;
		padding:0 40rpx;
		box-sizing:border-box;
	}
	.container>view{
		margin-bottom:40rpx;
	}
	.tips_test{
		color:#E74C3C;
	}
</style>
