<template>
	<view class="content">
		<view class="modify_box" v-show="type != 'pwd'">
			<input type="text" v-model="val" />
		</view>
		
		<view class="modify_box" v-show="type == 'pwd'">
			<text>旧密码</text>
			<input type="text" v-model="pwdOld" :password="isOldPwd" />
			<view class="open_pwd" @tap="isOldPassWord">
				<tui-icon name="eye" :size="30"></tui-icon>
			</view>
		</view>
		
		<view class="modify_box" v-show="type == 'pwd'">
			<text>新密码</text>
			<input type="text" v-model="pwd" :password="isPwd" />
			<view class="open_pwd" @tap="isPassWord">
				<tui-icon name="eye" :size="30"></tui-icon>
			</view>
		</view>
		
		<view class="modify_box" v-show="type == 'pwd'">
			<text>确认密码</text>
			<input type="text" v-model="pwd2" />
		</view>
		<view class="modify_test">
			请修改信息
		</view>
		
		<view class="apply_friend">
			<button type="primary" @tap="apply" hover-class="btn_hover">提交</button>
		</view>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import util from "@/common/util.js";
import api from "@/api/api.js";
export default{
	data() {
		return {
			val: null,
			pwd:  null,  //新密码
			pwd2: null,  //确认密码
			pwdOld:  null, //旧密码
			type: null,
			userEn: [],  //我的信息
			isOldPwd: true,  //旧密码栏类型
			isPwd: true,  //新密码栏类型
			uid: "",  //uid
		}
	},
	onShow(){
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();
	},
	onLoad(res){
		this.type = res.type;
		this.val = res.value;
		util.setBarTitle('修改' + res.title);
	},
	methods:{
		//查看新密码
		isPassWord(){
			this.isPwd = this.isPwd ? false : true;
		},
		//查看旧密码
		isOldPassWord(){
			this.isOldPwd = this.isOldPwd ? false : true;
		},
		//判断修改信息是否合法
		apply(){
			if(this.type != 'pwd'){
				if(util.isEmpty(this.val)){
					uni.showModal({
						content: "修改信息不能为空",
						showCancel: false
					});
					return;
				}else if(this.type == "nick"){
					if(this.val.length > 8){
						uni.showModal({
							content: "昵称长度不能超过8位",
							showCancel: false
						});
						return;
					}
				}else if(this.type == 'tel'){
					var re = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
					if (!re.test(this.val)) {
						uni.showModal({
							content: "手机号格式错误",
							showCancel: false
						});
						return;
					}
				}
			}else if(this.type == 'pwd'){
				if(util.isEmpty(this.pwdOld) || util.isEmpty(this.pwd)){
					uni.showModal({
						content: "修改信息不能为空",
						showCancel: false
					});
					return;
				}else if(this.pwd.length < 6){
					uni.showModal({
						content: "密码长度不能小于6位",
						showCancel: false
					});
					return;
				}else if(this.pwd.length > 12){
					uni.showModal({
						content: "密码长度不能大于12位",
						showCancel: false
					});
					return;
				}else if(this.pwd2 != this.pwd){
					uni.showModal({
						content: "二次密码输入不一致",
						showCancel: false
					});
					return;
				}
			}
			this.submit();//提交修改
		},
		//提交修改
		submit(){
			let data = {};
			data["uid"] = this.uid;
			if(this.type === 'pwd'){
				data[this.type] = this.pwd;
				data.pwdOld = this.pwdOld;
			}
			else data[this.type] = this.val;
			api.setUser(data, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				if(code == 0){
					uni.showModal({
						content: msg,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								uni.navigateBack({
									delta: 1
								})
							};
						}
					});
				}else{
					uni.showModal({
						content: msg,
						showCancel: false
					});
				}
			});
		}
	}
}
</script>

<style>
	.modify_box{
		border-bottom: 1px solid #808080;
		width:90%;
		margin:0 auto;
		padding-top:50rpx;
		padding-left:15rpx;
		box-sizing:border-box;
		position:relative;
	}
	.modify_box text{
		font-size:14px;
	}
	.modify_test{
		color:#808080;
		font-size:14px;
		padding-left:30rpx;
		box-sizing:border-box;
		margin-top:10rpx;
	}
	.apply_friend{
		margin-top:100rpx;
	}
	.apply_friend button{
		background-color: #fcd030;
		font-size:14px;
		width:60%;
		border-radius:40rpx;
	}
	.open_pwd{
		position:absolute;
		right:20rpx;
		top:70%;
		transform:translateY(-50%);
	}
</style>
