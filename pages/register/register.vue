<template>
	<view class="content page">
		<!-- 用户名 -->
		<view class="name">
			<tui-icon name="people" color="#6d7a87" :size="20"></tui-icon>
			<view class="ipt">
				<input type="text" :value="userName" placeholder="请输入用户名" :adjust-position="false" maxlength="30"/>
			</view>
		</view>
		
		<!-- 密码 -->
		<view class="pwd">
			<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
			<view class="ipt">
				<input type="text" :value="passWord" placeholder="请输入密码" :adjust-position="false" maxlength="30"/>
			</view>
		</view>
		
		<!-- 手机号 -->
		<view class="phone">
			<tui-icon name="mobile" color="#6d7a87" :size="20"></tui-icon>
			<view class="ipt">
				<input type="text" :value="passWord" placeholder="请输入手机号" :adjust-position="false" maxlength="11"/>
			</view>
		</view>
		
		<!-- 登录按钮 -->
		<view class="login">
			<button type="default" class="login_btn">注册</button>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			userName: null,  //用户名
			passWord: null,  //密码
		}
	},
	methods:{}
}
</script>

<style>
	.page{
		padding-top:100rpx;
		box-sizing:border-box;
	}
	.name, .pwd, .phone{
		display:flex;
		padding:40rpx;
		border-bottom:1px solid #F2F4F6;
		margin-bottom:40rpx;
	}
	.ipt{
		margin-left:20rpx;
		flex:1;
	}
	.ipt>input{
		font-size:15px;
	}
	.reg{
		width:100%;
		text-align:right;
		font-size:12px;
		color:#999999;
	}
	.reg_test{
		color:#5677FC;
	}
	.login{
		margin-top:100rpx;
	}
	.login_btn{
		border-radius:60rpx;
		color:#999999;
		font-size:15px;
		padding:10rpx 0;
	}
</style>

