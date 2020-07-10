<template>
	<view class="content">
		<!-- 功能栏 -->
		<view class="content func">
			<view class="setting" @tap="toUpdMyImg">
				<view class="func_left">
					<text class="func_test">头像</text>
				</view>
				
				<view class="func_right">
					<view class="header_img" @tap.stop="revise" >
						<image :src="userEn.headUrl == '' ? '/static/img/headImg.jpg' : userEn.headUrl" mode="widthFix"></image>
					</view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
			
			<view class="setting">
				<view class="func_left">
					<text class="func_test">账号</text>
				</view>
				
				<view class="func_right">
					<view class="">{{userEn.account}}</view>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</view>
			
			<view class="setting">
				<view class="func_left">
					<text class="func_test">邀请码</text>
				</view>
				
				<view class="func_right">
					<view class="">{{userEn.code}}</view>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="toUpdInfo('nick', '昵称', userEn.nick)">
				<view class="func_left">
					<text class="func_test">昵称</text>
				</view>
				
				<view class="func_right">
					<view class="">{{userEn.nick}}</view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="toUpdInfo('tel', '手机号',userEn.tel)">
				<view class="func_left">
					<text class="func_test">手机号</text>
				</view>
				
				<view class="func_right">
					<view class="">{{userEn.tel}}</view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="toUpdInfo('pwd', '密码', userEn.pwd)">
				<view class="func_left">
					<text class="func_test">修改密码</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
			
			<view class="setting">
				<view class="func_left">
					<text class="func_test">注册时间</text>
				</view>
				
				<view class="func_right">
					<view class="">{{userEn.regTime}}</view>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</view>
			
			<view class="setting">
				<view class="func_left">
					<text class="func_test">最后一次登录时间</text>
				</view>
				
				<view class="func_right">
					<view class="">{{userEn.loginTime}}</view>
					<tui-icon name="arrowright" :size="26" style="visibility: hidden;"></tui-icon>
				</view>
			</view>
			
			<view class="setting" @tap="toBank">
				<view class="func_left">
					<text class="func_test">银行卡</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import api from "@/api/api.js";
export default{
	data() {
		return {
			userEn: [],  //我的信息
		}
	},
	onShow() {
		this.userEn = storage.getMyInfo();
		api.getUser({account: this.userEn.account}, (res)=>{
			let data = api.getData(res);
			this.userEn = data;
			storage.setMyInfo(this.userEn);
		});
	},
	methods:{
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
