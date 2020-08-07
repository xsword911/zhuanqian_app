<template>
	<view class="content">
		<view class="content func">
			<view class="setting" @tap="">
				<view class="func_left">
					<text class="func_test">银行</text>
				</view>
				
				<view class="func_right">
					<view class=""><input type="text" value="" :placeholder="userBank" v-model="userBank"/></view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="">
				<view class="func_left">
					<text class="func_test">开户支行</text>
				</view>
				
				<view class="func_right">
					<view class=""><input type="text" value="" :placeholder="bankBranch" v-model="bankBranch"/></view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="">
				<view class="func_left">
					<text class="func_test">银行卡号</text>
				</view>
				
				<view class="func_right">
					<view class=""><input value="" type="number" :placeholder="bankCode" v-model="bankCode"/></view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="">
				<view class="func_left">
					<text class="func_test">提现密码</text>
				</view>
				
				<view class="func_right">
					<view class=""><input type="number" 
					value="" 
					:password="true" 
					v-model="pwd" 
					maxlength="6" 
					placeholder="纯数字6位密码"/></view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="" v-if="type == '1'">
				<view class="func_left">
					<text class="func_test">密码确认</text>
				</view>
				
				<view class="func_right">
					<view class=""><input type="number" 
					value="" 
					:password="true" 
					v-model="pwdAgain" 
					maxlength="6" 
					placeholder="请再次输入提现密码" /></view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
		</view>
		
		<view class="submit btn_style">
			<button type="default" v-if="type == '0'" @tap="updSubmit" hover-class="btn_hover">提交修改</button>
			<button type="default" v-if="type == '1'" @tap="addSubmit" hover-class="btn_hover">提交添加</button>
		</view>
	</view>
</template>

<script>
import storage from '@/api/storage.js';
import api from "@/api/api.js";
import util from "@/common/util.js";
import md5 from "@/common/md5.js";
export default{
	data() {
		return {
			type: null,  	//操作类型 0:修改银行卡信息 1:添加银行卡信息
			account: null,  //账号
			userBankEn: [], //用户银行卡信息
			userBank: null, //银行名称
			bankBranch: null, //开户支行
			bankCode: null, //银行卡号
			pwd: null, //提现密码
			pwdAgain: null, //确认提现密码
			uid: "",  //uid
		}
	},
	onLoad(res) {
		this.uid = storage.getUid();  //获取uid
		this.type = res.type;
		this.account = res.account;
		if(this.type == '0'){
			util.setBarTitle('修改银行卡信息');
			this.userBankEn = storage.getMyBankInfo();  //获取我的银行卡信息
			this.userBank = storage.getMyBankInfo().bank;  
			this.bankBranch = storage.getMyBankInfo().bankBranch; 
			
			let code = storage.getMyBankInfo().bankCode;
			this.bankCode = "000000000000" + code.substring(code.length - 4);  //银行卡号截取最后四位数
			
			this.pwd = storage.getMyBankInfo().pwd;
		}else{
			util.setBarTitle('添加银行卡信息');
		}
	},
	methods:{
		//提交修改
		updSubmit(){
			let data = {
				id: this.userBankEn.id,
				uid: this.uid,
				bank: this.userBank,
				bankBranch: this.bankBranch,
				bankCode: this.bankCode,
				pwd: md5(this.pwd)
			};
			api.updUserBank(data, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				if(code == 0){
					storage.setMyBankInfo(data);  //修改成功后将银行卡信息保存到storage
					uni.showToast({
						title: msg,
						image: "/static/img/check-circle.png",
						duration: 1500,
						success() {
							setTimeout(function(){ 
								uni.navigateBack({
									delta: 1
								}) 
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
		//添加银行卡
		addSubmit(){
			//判断信息是否填写完整
			if(util.isEmpty(this.userBank) && util.isEmpty(this.bankBranch) && util.isEmpty(this.bankCode) && util.isEmpty(this.pwd)){
				uni.showToast({
					title: '信息填写不完整',
					image: "/static/img/info-circle.png",
					duration: 2000
				});
			}else if(this.pwd != this.pwdAgain){
				uni.showToast({
					title: '密码输入不一致',
					image: "/static/img/fail-circle.png",
					duration: 2000
				})
			}else{
				let data = {
					uid: this.uid,
					bank: this.userBank,
					bankBranch: this.bankBranch,
					bankCode: this.bankCode,
					pwd: md5(this.pwd)
				};
				api.addUserBank(data, (res)=>{
					let code = api.getCode(res);
					let msg = api.getMsg(res);
					if(code == 0){
						storage.setMyBankInfo(data);  //修改成功后将银行卡信息保存到storage
						uni.showToast({
							title: msg,
							image: "/static/img/check-circle.png",
							duration: 1500,
							success() {
								setTimeout(function(){ 
									uni.navigateBack({
										delta: 1
									}) 
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
			}
		},
	}
}
</script>

<style>
	.func{
		margin-top:40rpx;
	}
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
	.func_right input{
		text-align:right;
	}
	.submit{
		margin-top:100rpx;
	}
	.submit button{
		border-radius:40rpx;
		font-size:15px;
	}
</style>
