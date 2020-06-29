<template>
	<view class="content page">
		<!-- 用户名 -->
		<view class="name">
			<tui-icon name="people" color="#6d7a87" :size="20"></tui-icon>
			<view class="ipt">
				<input type="text" value=" " v-model="userName" placeholder="请输入用户名" :adjust-position="false" maxlength="30"/>
			</view>
		</view>
		
		<!-- 密码 -->
		<view class="pwd">
			<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
			<view class="ipt">
				<input type="text" value=" " v-model="passWord" placeholder="请输入密码" :adjust-position="false" maxlength="30" password="true" />
			</view>
		</view>
		
		<!-- 注册链接 -->
		<view class="reg">
			还没有账号？<text class="reg_test" @tap="toReg">注册</text>
		</view>
		
		<!-- 登录按钮 -->
		<view class="login">
			<button type="default" class="login_btn" @tap="bindLogin">登录</button>
		</view>
	</view>
</template>

<script>
import api from "@/api/api.js";
import storage from "@/api/storage.js";
export default{
	data() {
		return {
			userName: null,  //用户名
			passWord: null,  //密码
		}
	},
	methods:{
		//跳转到注册页
		toReg(){
			uni.navigateTo({
				url: '/pages/register/register'
			});
		},
		//登录检测
		bindLogin() {
		    if (this.userName.length < 3) {
		        uni.showToast({
		            icon: 'none',
		            title: '账号最短为 3 个字符'
		        });
		        return;
		    }
		    if (this.passWord.length < 3) {
		        uni.showToast({
		            icon: 'none',
		            title: '密码最短为 3 个字符'
		        });
		        return;
		    }
		    let data = {
		        account: this.userName,
		        pwd: this.passWord
		    };
			this.login(data);
		},
		//登录提交
		login(data){
			api.login(data, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				if(code == 0){
					storage.setMyInfo(api.getData(res).user);  //保存我的信息
					this.toGame();
				}else{
					uni.showToast({
						title: msg,
						image: "/static/img/fail-circle.png",
						duration: 2000
					});
				}
			});
		},
		//登录成功跳转到game页面
		toGame(){
			uni.reLaunch({
				url: "/pages/game/game"
			});
		},
	}
}
</script>

<style>
	.page{
		padding-top:100rpx;
		box-sizing:border-box;
	}
	.name, .pwd{
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
