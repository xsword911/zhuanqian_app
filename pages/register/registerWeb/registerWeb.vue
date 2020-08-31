<template>
	<view class="content page">
		<!-- 用户名 -->
		<view class="name">
			<tui-icon name="people" color="#6d7a87" :size="20"></tui-icon>
			<view class="ipt">
				<input type="text" v-model="tel" placeholder="请输入手机号" :adjust-position="false" maxlength="30"/>
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
				<input type="text" v-model="code" placeholder="请输入邀请码" :adjust-position="false" maxlength="30"/>
			</view>
		</view>
		
		<view class="code">
			<view class="ipt">
				<input type="number" v-model="telCode" placeholder="请输入手机验证码" :adjust-position="false" maxlength="30"/>
			</view>
			<view class="tel_code btn_style">
				<text v-if="isQuery">{{second}}重新获取</text>
				<button type="default" hover-class="btn_hover" v-if="!isQuery" @tap="openTimer">获取验证码</button>
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
			tel: null,  //手机号
			passWord: null,  //密码
			passWordAgain: null, //确认密码
			code: null,  //邀请码
			telCode: null,  //手机验证码
			isPwd: true, //密码输入框类型切换
			uid: "", //uid
			isQuery: false, //验证码和倒计时切换显示
			second: 60,  //验证码倒计时秒数
			timerId: '',  //计时器id
			regSubUrl: '',  //注册成功跳转url
		}
	},
	onShow() {
		this.uid = storage.getUid();  //获取uid
		this.getRegSubUrl();  //获取注册成功跳转url
	},
	methods:{
		//获取注册成功跳转url
		getRegSubUrl(){
			api.getConfig({key: 'reg_subUrl'}, (res)=>{
				this.regSubUrl = api.getData(res).data[0].value;
			});
		},
		//开启计时器
		openTimer(){
			api.sendTelCode({account: this.tel}, (res)=>{
				let code = api.getCode(res);
				if(code == 0){
					this.second = 60;   	//重置倒计时秒数
					this.isQuery = true;  	//显示倒计时
					this.timerId = setInterval(this.telCodeTimer, 1000);
				}
			});
		},
		//获取验证码计时器
		telCodeTimer(){
			if(this.second == 0){
				clearInterval(this.timerId);
				this.isQuery = false;  //关闭倒计时，显示按钮
			}
			this.second -= 1;
		},
		//查看密码
		isPassWord(){
			this.isPwd = this.isPwd ? false : true;
		},
		//判断是否手机号是否合法
		isPhone(str) {
		  const reg = /^1\d{10}$/;
		  return reg.test(str);
		},
		//注册检测
		bindReg() {
		    if (!this.isPhone(this.tel)) {
		        uni.showToast({
		            icon: 'none',
		            title: '手机号格式不合法'
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
		    if (util.isEmpty(this.telCode)) {
		        uni.showToast({
		            icon: 'none',
		            title: '请输入手机验证码'
		        });
		        return;
		    }
			if (this.telCode.length != 5) {
			    uni.showToast({
			        icon: 'none',
			        title: '请输入正确的手机验证码'
			    });
			    return;
			}
		    let data = {
		        account: this.tel,
		        pwd: this.passWord,
				uid: this.uid,
				telCode: this.telCode,
				type: 0   //普通用户注册
		    };
			if(!util.isEmpty(this.code)) data.upperCode = this.code;
			this.register(data);
		},
		//注册
		register(data){
			let _this = this;
			api.registerByTel(data, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				if(code == 0){
					let uid = api.getData(res);   //返回用户uid
					uni.showModal({
						content: '注册成功，去下载',
						showCancel:false,
						success(res) {
							if(res.confirm){
								util.openUrl(_this.regSubUrl);  //注册成功跳转
							}
						}
					})
				}else{
					uni.showModal({
						content: msg,
						showCancel:false
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
		display:flex;
		align-items:center;
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
	.tel_code{
		display:flex;
		align-items:center;
		color:#999999;
		height:60rpx;
	}
	.tel_code>button{
		font-size:12px;
	}
</style>


