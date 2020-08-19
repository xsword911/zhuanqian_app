<template>
	<view class="">
		<!-- 功能栏 -->
		<view class=" func">
			<button class="setting" @tap="toUpdMyImg" hover-class="setting_hover" type="default">
				<view class="func_left">
					<text class="func_test">头像</text>
				</view>
				
				<view class="func_right">
					<view class="header_img" @tap.stop="revise" >
						<image :src="userEn.headUrl == '' ? '/static/img/headImg.jpg' : userEn.headUrl" mode="widthFix"></image>
					</view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</button>
			
			<button class="setting" hover-class="setting_hover" type="default" style="line-height: 1.8;">
				<view class="func_left">
					<text class="func_test">账号</text>
				</view>
				
				<view class="func_right">
					<text class="name">{{userName}}</text>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</button>
			
			<button class="setting" hover-class="setting_hover" type="default" style="line-height: 1.8;">
				<view class="func_left">
					<text class="func_test">等级</text>
				</view>
				
				<view class="func_right">
					<text class="name">{{levelName}}</text>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</button>
			
			<button class="setting" hover-class="setting_hover" type="default" style="line-height: 1.8;">
				<view class="func_left">
					<text class="func_test">邀请码</text>
				</view>
				
				<view class="func_right">
					<view class="">{{userEn.code}}</view>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</button>
			
			<button class="setting" @tap="toUpdInfo('nick', '昵称', userEn.nick)" hover-class="setting_hover" type="default" style="line-height: 1.8;">
				<view class="func_left">
					<text class="func_test">昵称</text>
				</view>
				
				<view class="func_right">
					<view class="">{{userEn.nick}}</view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</button>
			
			<button class="setting" @tap="toUpdInfo('tel', '手机号',userEn.tel)" hover-class="setting_hover" type="default" style="line-height: 1.8;">
				<view class="func_left">
					<text class="func_test">手机号</text>
				</view>
				
				<view class="func_right">
					<view class="">{{userEn.tel}}</view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</button>
			
<!-- 			<button class="setting" @tap="toUpdInfo('pwd', '密码', userEn.pwd)" hover-class="setting_hover" type="default" style="line-height: 1.8;">
				<view class="func_left">
					<text class="func_test">修改密码</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</button> -->
			
			<button class="setting" hover-class="setting_hover" type="default" style="line-height: 1.8;">
				<view class="func_left">
					<text class="func_test">注册时间</text>
				</view>
				
				<view class="func_right">
					<text class="">{{userEn.regTime}}</text>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</button>
			
			<button class="setting" hover-class="setting_hover" type="default" style="line-height: 1.8;">
				<view class="func_left">
					<text class="func_test">最后一次登录时间</text>
				</view>
				
				<view class="func_right">
					<view class="">{{userEn.loginTime}}</view>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</button>
			
<!-- 			<button class="setting" @tap="toBank" hover-class="setting_hover" type="default" style="line-height: 1.8;">
				<view class="func_left">
					<text class="func_test">银行卡</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</button> -->
		</view>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
export default{
	data() {
		return {
			userEn: [],  //我的信息
			uid: "",  //uid
			loginType: null, //登录方式
			wxId: '',  //微信id
			userName: '',  //用户账号
			levelName: '新人',  //我的会员等级名称
			levelList: [],  //会员列表
		}
	},
	onShow() {
		this.uid = storage.getUid();  //获取uid
		this.loginType = storage.getLoginType();  //获取登录方式
		this.userEn = storage.getMyInfo();   //获取我的信息
		this.levelList = storage.getLevelList();  //获取会员表
		//刷新我的信息
		api.getUserByUid({uid: this.uid}, (res)=>{
			let data = api.getData(res);
			this.userEn = data;
			storage.setMyInfo(this.userEn);
			this.getName();  //获取用户名
		});
		this.getMyLevelName();  //获取我的会员等级名称
	},
	methods:{
		//获取我的会员等级名称
		getMyLevelName(){
			this.levelList.forEach((item, index) =>{
				if(item.id == this.userEn.level) this.levelName = item.levelName;
			});
		},
		//获取用户名
		getName(){
			//游客登录
			if(this.loginType == 0) this.userName = this.uid;
			//账号密码登录or微信登录
			else{
				//优先显示微信id
				if(!util.isEmpty(this.userEn.wxId)) this.userName = this.userEn.wxId;
				else this.userName = this.userEn.account;
			}
		},
		//查看头像
		revise(){
			uni.previewImage({
				urls: [this.userEn.headUrl],
			});
		},
		//跳转到银行卡信息页
		toBank(){
			uni.navigateTo({
				url: '/pages/my/setting/bank/bank'
			})
		},
		//跳转到修改信息页
		toUpdInfo(type, title, value){
			uni.navigateTo({
				url: '/pages/my/setting/updMyInfo/updMyInfo?type=' + type + "&title=" + title + "&value=" +value
			})
		},
		//跳转到修改头像页
		toUpdMyImg(){
			uni.navigateTo({
				url: "/pages/my/setting/updMyImg/updMyImg"
			})
		},
	}
}
</script>

<style>
	.func>button{
		background-color:#fff;
		padding:0 40rpx;
		box-sizing:border-box;
		border-radius:0;
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
		/* margin-top:20rpx; */
		border-bottom:1px solid #f9f9f9;
		padding:10rpx 0;
	}
	.setting_hover[type = default]{
		background-color:#EEEEEE;
	}
	.header_img {
		width: 100rpx;
		height: 100rpx;
		border-radius:50%;
		overflow: hidden;
	    display:flex;
		align-items:center;
		margin-right:10rpx;
	}
</style>
