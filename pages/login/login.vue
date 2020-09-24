<template>
	<view class="content page">
		<view class="logi_type">
			当前登录方式：
			<text v-show="loginType == 0">游客登录</text>
			<text v-show="loginType == 1">账号密码登录</text>
			<text v-show="loginType == 2">微信登录</text>
		</view>
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
				<input type="text" value=" " v-model="passWord" placeholder="请输入密码" 
				:adjust-position="false" maxlength="30" :password="isPwd" />
			</view>
			<view class="open_pwd" @tap="isPassWord">
				<tui-icon name="eye" :size="30" v-show="!isPwd"></tui-icon>
				<tui-icon name="unseen" :size="30" v-show="isPwd"></tui-icon>
			</view>
		</view>
		
		<view class="input-group">
			<view class="input-row savePwd">
			    <text class="title login_info text-df margin-right-sm" style="width: 50%;">记住密码：</text>
			    <!-- <switch @change="SetShadow" :class="shadow?'checked':''" color="#39B54A"></switch> -->
				<switch @change="SetShadow" checked color="#FFCA00"></switch>
			</view>
		</view>
		
		<!-- 注册链接 -->
		<view class="reg">
			还没有账号？<text class="reg_test" @tap="toReg">注册</text>
		</view>
		
		<!-- 登录按钮 -->
		<view class="login btn_style">
			<button type="default" class="login_btn" @tap="bindLogin" hover-class="btn_hover">登录</button>
		</view>
		
		<view class="loginByOth" v-if="loginType != 0">
			<view class="">其他方式登录</view>
			<view class="login_bar" :class="{'login_bar1': loginBarCenter == 1}">
<!-- 				<view class="login_icon" v-show="loginType != 2">
					<image src="/static/img/wx.jpg" mode="widthFix"></image>
				</view> -->
				
				<view class="login_icon" v-show="loginType != 0" @tap="loginByDevice">
					<image src="/static/img/phone.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import util from "@/common/util.js";
import utilCore from "@/api/utilCore.js";
import md5 from "@/common/md5.js";
export default{
	data() {
		return {
			userName: null,  //用户名
			passWord: null,  //密码
			isPwd: true,  //是否是密码框
			shadow: true,
			loginBarCenter: 0,
			loginType: null, //登录方式
			uid: "",  //uid
			
			regType: null,  //注册方式 0:用户名注册 1:手机注册
		}
	},
	onLoad() {
		this.uid = storage.getUid();  //获取uid
		let userPwd = storage.getUserPwd();
		if(!util.isEmpty(userPwd)){
			this.userName = userPwd.userName;
			this.passWord = userPwd.passWord; 
		}
		this.loginType = storage.getLoginType();  //获取登录方式
		this.loginBarCenter = this.loginType;
	},
	onShow() {
		this.getRegType();  //获取注册方式
	},
	methods:{
		//获取注册方式
		getRegType(){
			api.getConfig({key: 'reg_tel'}, (res)=>{
				this.regType = api.getData(res).data[0].value;
			});
		},
		//设备号登录
		loginByDevice(){
			uni.showModal({
				content: '确定使用设备号登录？',
				success: function (res) {
					if (res.confirm) {
						utilCore.loginByDevice();
						uni.reLaunch({
							url: "/pages/index/index"
						});
					}
				}
			});
		},
		//控制勾选按钮
		SetShadow(e) {
			this.shadow = e.detail.value;
		},
		//查看密码
		isPassWord(){
			this.isPwd = this.isPwd ? false : true;
		},
		//跳转到注册页  this.regType注册类型 0:普通用户名注册 1:手机注册
		toReg(){
			if(this.regType == '0'){
				uni.navigateTo({
					url: '/pages/register/register'
				});
			}
			if(this.regType == '1'){
				uni.navigateTo({
					url: '/pages/register/registerTel/registerTel'
				});
			}
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
		        pwd: md5(this.passWord),
				type: 0
		    };
			this.login(data);
		},
		//保存用户uid
		setUid(uid){
			this.uid = uid;
			storage.setUid(this.uid);
		},
		//登录提交
		login(data){
			api.login(data, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				let uid = api.getData(res);
				if(code == 0){
					if(this.shadow){
						let userInfo = {
							userName: this.userName,
							passWord: this.passWord
						}
						storage.setUserPwd(userInfo);
						storage.setLoginType(1);   //保存登录方式为账号密码登录
					}else{
						storage.delUserPwd(); 
					}
					this.setUid(uid); //保存新uid
					this.toGame();	  //跳转
				}else{
					uni.showToast({
						title: msg,
						image: "/static/img/fail-circle.png",
						duration: 2000
					});
				}
			});
		},
		//登录成功查询我的信息并跳转到game页面
		toGame(){
			api.getUserByUid({uid: this.uid}, (res)=>{
				storage.setMyInfo(api.getData(res));
				uni.reLaunch({
					url: "/pages/index/index"
				});
			});
		},
	}
}
</script>

<style scoped>
	.example {
	    color: #FF0000;
	}
	
	.page{
		padding-top:20rpx;
		box-sizing:border-box;
	}
	.logi_type{
		margin-bottom:40rpx;
		font-size:15px;
		padding-left:40rpx;
		box-sizing:border-box;
	}
	.name, .pwd{
		display:flex;
		padding:40rpx;
		border-bottom:1px solid #F2F4F6;
		margin-bottom:40rpx;
	}
	.pwd{
		position:relative;
	}
	.open_pwd{
		position:absolute;
		right:40rpx;
		top:50%;
		transform:translateY(-50%);
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
		font-size:16px;
		color:#999999;
		margin-top:25rpx;
	}
	.reg_test{
		color:#5677FC;
	}
	.login{
		margin-top:100rpx;
	}
	.login>button{
		border-radius:60rpx;
		font-size:15px;
		/* padding:10rpx 0; */
	}
	.savePwdGroup{
		margin-top:10rpx;
	}
	.savePwd{
		padding:10rpx 10rpx 10rpx 50rpx;
		box-sizing:border-box;
		display:flex;
		justify-content: space-between;
		align-items:center;
		font-size:14px;
		color: #999999;
	}
	.loginByOth{
		margin-top:100rpx;
		text-align:center;
		font-size:14px;
		color: #646263;
	}
	.login_bar{
		width:50%;
		margin:40rpx auto auto;
		display: flex;
		justify-content: center;
	}
	.login_bar1{
		justify-content:center;
	}
	.login_icon{
		width:80rpx;
		height:80rpx;
		border-radius:50%;
		overflow:hidden;
	}
</style>
