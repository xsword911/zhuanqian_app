<template>
	<view class="content page">
		<!-- 用户名 -->
		<view class="name">
			<tui-icon name="people" color="#6d7a87" :size="20"></tui-icon>
			<view class="ipt">
				<input type="text" v-model="userName" placeholder="请输入用户名" :adjust-position="false" maxlength="30"/>
			</view>
		</view>
		
		<!-- 密码 -->
		<view class="pwd">
			<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
			<view class="ipt pwd_ipt">
				<input type="text" v-model="passWord" placeholder="请输入密码" :adjust-position="false" maxlength="30" :password="isPwd" />
				<view class="open_pwd" @tap="isPassWord">
					<tui-icon name="eye" :size="30"></tui-icon>
				</view>
			</view>
		</view>
		
		<!-- 密码 -->
		<view class="pwd">
			<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
			<view class="ipt">
				<input type="text" v-model="passWordAgain" placeholder="请再次输入密码" :adjust-position="false" maxlength="30" :password="true" />
			</view>
		</view>
		
		<!-- 手机号 -->
		<view class="code">
			<tui-icon name="member" color="#6d7a87" :size="24"></tui-icon>
			<view class="ipt">
				<input type="text" v-model="code"placeholder="请输入邀请码" :adjust-position="false" maxlength="30"/>
			</view>
		</view>
		
		<!-- 登录按钮 -->
		<view class="login btn_style">
			<button type="default" class="login_btn" @tap="bindReg" hover-class="btn_hover">注册</button>
		</view>
	</view>
</template>

<script>
import util from "@/common/util.js";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
export default{
	data() {
		return {
			userName: null,  //用户名
			passWord: null,  //密码
			passWordAgain: null, //确认密码
			code: null,  //邀请码
			isPwd: true, //密码输入框类型切换
			uid: "", //uid
			
		}
	},
	onShow() {
		this.uid = storage.getUid();  //获取uid
	},
	methods:{
		//查看密码
		isPassWord(){
			this.isPwd = this.isPwd ? false : true;
		},
		//注册检测
		bindReg() {
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
			if(this.passWord != this.passWordAgain){
				uni.showToast({
				    icon: 'none',
				    title: '二次密码输入不一致'
				});
				return;
			}
		    let data = {
		        account: this.userName,
		        pwd: this.passWord,
				uid: this.uid,
				type: 0   //普通用户注册
		    };
			if(!util.isEmpty(this.code)) data.upperCode = this.code;
			this.register(data);
		},
		//注册
		register(data){
			let _this = this;
			api.register(data, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				if(code == 0){
					let uid = api.getData(res);   //返回用户uid
					uni.showToast({
						title: msg,
						image: "/static/img/check-circle.png",
						duration: 1500,
						success() {
							setTimeout(function(){
								storage.setUid(uid);  //保存用户新uid
								storage.setLoginType(1);  //保存登录方式
								uni.reLaunch({
									url: "/pages/index/index"
								});
							}, 1600);
						}
					})
				}else{
					uni.showToast({
						title: msg,
						image: "/static/img/fail-circle.png",
						duration: 2000
					})
				}
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
	.name, .pwd, .code{
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
	.login>button{
		border-radius:60rpx;
		color:#000;
		font-size:15px;
	}
	.pwd_ipt{
		position:relative;
	}
	.open_pwd{
		position:absolute;
		right:20rpx;
		top:50%;
		transform:translateY(-50%);
	}
</style>

