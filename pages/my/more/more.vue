<template>
	<view class="content">
		<!-- 功能栏 -->
		<view class="content func">
			<view class="setting" @tap="toSetting">
				<view class="func_left">
					<view class="func_img">
						<image src="/static/img/update.png" mode="widthFix"></image>
					</view>
					<text class="func_test">版本更新</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="30"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="toSetting">
				<view class="func_left">
					<view class="func_img">
						<image src="/static/img/feedback.png" mode="widthFix"></image>
					</view>
					<text class="func_test">问题反馈</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="30"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="toSetting">
				<view class="func_left">
					<view class="func_img">
						<image src="/static/img/help.png" mode="widthFix"></image>
					</view>
					<text class="func_test">帮助中心</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="30"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="toSetting">
				<view class="func_left">
					<view class="func_img">
						<image src="/static/img/about.png" mode="widthFix"></image>
					</view>
					<text class="func_test">关于我们</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="30"></tui-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	image{
		width:100%;
		height:100%;
	}
	.content{
		padding:0 10rpx;
		box-sizing:border-box;
	}
	.func_img{
		width:55rpx;
		height:55rpx;
	}
	.func_left{
		font-size:14px;
		display:flex;
		align-items:center;
	}
	.func_test{
		margin-left:12rpx;
	}
	.setting{
		display:flex;
		justify-content:space-between;
		margin-top:20rpx;
		border-bottom:1px solid #f9f9f9;
		padding:10rpx 0;
	}
</style>
