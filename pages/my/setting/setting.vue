<template>
	<view class="content">
		<!-- 功能栏 -->
		<view class="content func">
			<view class="setting" @tap="">
				<view class="func_left">
					<text class="func_test">账号</text>
				</view>
				
				<view class="func_right">
					<view class="">{{1212}}</view>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="">
				<view class="func_left">
					<text class="func_test">昵称</text>
				</view>
				
				<view class="func_right">
					<view class="">{{1212}}</view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="">
				<view class="func_left">
					<text class="func_test">手机号</text>
				</view>
				
				<view class="func_right">
					<view class="">{{1212}}</view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="">
				<view class="func_left">
					<text class="func_test">邀请码</text>
				</view>
				
				<view class="func_right">
					<view class="">{{1212}}</view>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="">
				<view class="func_left">
					<text class="func_test">注册时间</text>
				</view>
				
				<view class="func_right">
					<view class="">{{ }}</view>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="">
				<view class="func_left">
					<text class="func_test">最后一次登录时间</text>
				</view>
				
				<view class="func_right">
					<view class="">{{ }}</view>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="toBank">
				<view class="func_left">
					<text class="func_test">银行卡</text>
				</view>
				
				<view class="func_right">
					<view class="">{{ }}</view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			
		}
	},
	methods:{
		//跳转到银行卡信息页
		toBank(){
			uni.navigateTo({
				url: '/pages/my/setting/bank/bank'
			})
		},
	}
}
</script>

<style>
	.func_left{
		font-size:15px;
		display:flex;
		align-items:center;
	}
	.func_right{
		display:flex;
		align-items:center;
		color:#999999;
		font-size:15px;
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
