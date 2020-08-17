<template>
	<view class="">
		<view class="lay_head">
			<view class="head_title">客服中心</view>
			<view class="head_tips">如遇到问题需要帮助请您尽快联系在线客服</view>
		</view>
		
		<view class="content">
			<view class="head_img">
				<image src="/static/img/msg.b2e6132.png" mode=""></image>
			</view>
			
			<view class="lay_sort">
				<view class="sort_box">
					<view class="sort_title">在线客服</view>
					<view class="sort_img">
						<image src="/static/img/msg.d401713.png" mode=""></image>
					</view>
					<view class="kefu">
						<view class="kefu_img">
							<image src="/static/img/kefu.png" mode=""></image>
						</view>
						<view class="">
							12:00-23:59
						</view>
					</view>
				</view>
				
				<view class="sort_box">
					<view class="sort_title">充值问题，提现问题</view>
					<view class="sort_img">
						<image src="/static/img/msg.d401713.png" mode=""></image>
					</view>
					<view class="kefu">
						<view class="kefu_img">
							<image src="/static/img/kefu.png" mode=""></image>
						</view>
						<view class="">
							12:00-23:59
						</view>
					</view>
				</view>
			</view>
			
			<view class="lay_introduce">
				<view class="introduce_img">
					<image src="/static/img/k1.png" mode=""></image>
				</view>
				<view class="introduce_img">
					<image src="/static/img/k2.png" mode=""></image>
				</view>
				<view class="introduce_img">
					<image src="/static/img/k3.png" mode=""></image>
				</view>
				<view class="introduce_img">
					<image src="/static/img/k4.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.lay_head{
		width:100%;
		height:260rpx;
		background-color:#BAC3D2;
		padding:40rpx;
		box-sizing:border-box;
		font-size:12px;
	}
	.head_title{
		font-size:24px;
		font-weight:bold;
		color:#2F3848;
		margin-bottom:20rpx;
	}
	.head_tips{
		color:#747D8D;
	}
	.content{
		padding:120rpx 30rpx 0;
		box-sizing:border-box;
		width:100%;
		height:400rpx;
		border-radius:20rpx 20rpx 0 0;
		position:relative;
		top:-40rpx;
		background-color: #fff;
	}
	.head_img{
		width:448rpx;
		height:368rpx;
		position:absolute;
		right:0;
		top:-180rpx;
		z-index:1;
	}
	.lay_sort{
		width:100%;
		display:flex;
		justify-content: space-between;
		align-items:center;
		position:relative;
		z-index: 9;
	}
	.sort_box{
		width:48%;
		padding:30rpx 20rpx 100rpx;
		box-sizing:border-box;
		background-color: #F6F7F7;
		border-radius:20rpx;
		font-size:14px;
	}
	.sort_title{
		margin-bottom:20rpx;
		font-weight:bold;
		color:#2F3848;
	}
	.sort_img{
		width:100%;
		height:160rpx;
	}
	.kefu{
		display:flex;
		align-items:center;
		font-size:12px;
		margin-top:20rpx;
	}
	.kefu_img{
		width:40rpx;
		height:40rpx;
	}
	.lay_introduce{
		width:100%;
		padding:0 10rpx;
		box-sizing:border-box;
		margin-top:40rpx;
		display:flex;
		justify-content:space-between;
	}
	.introduce_img{
		width:164rpx;
		height:90rpx;
	}
</style>
