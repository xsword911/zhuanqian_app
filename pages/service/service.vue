<template>
	<view class="">
		<view class="lay_head">
			<view class="head_title">客服中心</view>
			<view class="head_tips">如遇到问题需要帮助请您尽快联系在线客服</view>
		</view>
		
		<view class="content">
			<view class="head_img">
				<image src="/static/img/msg.b2e6132.png" mode=""></image>
			</view>
			
			<view class="lay_sort">
				<view class="sort_box" @tap="toService(service1.value)">
					<view class="sort_title">在线客服</view>
					<view class="sort_img">
						<image src="/static/img/msg.d401713.png" mode=""></image>
					</view>
					<view class="kefu">
						<view class="kefu_img">
							<image src="/static/img/kefu.png" mode=""></image>
						</view>
						<view class="">
							12:00-23:59
						</view>
					</view>
				</view>
				
				<view class="sort_box" @tap="toService(service2.value)">
					<view class="sort_title">充值问题，提现问题</view>
					<view class="sort_img">
						<image src="/static/img/msg.d401713.png" mode=""></image>
					</view>
					<view class="kefu">
						<view class="kefu_img">
							<image src="/static/img/kefu.png" mode=""></image>
						</view>
						<view class="">
							12:00-23:59
						</view>
					</view>
				</view>
			</view>
			
			<view class="lay_introduce">
				<view class="introduce_img" @tap="toIntroduce">
					<image src="/static/img/k1.png" mode=""></image>
				</view>
				<view class="introduce_img" @tap="toRuleDescription">
					<image src="/static/img/k2.png" mode=""></image>
				</view>
				<view class="introduce_img" @tap="toCooperation">
					<image src="/static/img/k3.png" mode=""></image>
				</view>
				<view class="introduce_img" @tap="toCompany">
					<image src="/static/img/k4.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from "@/api/api.js";
import util from "@/common/util.js";
import storage from "@/api/storage.js";
import time from "@/common/time.js";
export default{
	data() {
		return {
			service1: "",  //在线客服信息
			service2: "",  //充值提现客服信息
		}
	},
	onShow() {
		this.getCustomerServiceUrl();  //获取客服链接
	},
	methods:{
		//跳转到联系客服界面
		toService(val){
			let state = storage.getLoginType();
			//游客登录跳转到登录界面
			if(state == 0) {
				uni.showModal({
					content: "需要登录账号",
					showCancel:false,
					success(res) {
						if(res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
					}
				})
			}
			else util.openUrlInner(val);
		},
		//获取客服链接
		getCustomerServiceUrl(){
			let postData = {
				page: 1,
				count: 5,
				key: "kefu1|kefu2"
			};
			api.getConfig(postData, (res)=>{
				let data = api.getData(res).data;
				data.forEach((item, index) =>{
					if(item.key == 'kefu1') this.service1 = item;
					if(item.key == 'kefu2') this.service2 = item;
				});
			});
		},
		//跳转到平台简介界面
		toIntroduce(){
			uni.navigateTo({
				url: "/pages/introduce/introduce"
			})
		},
		//跳转到规则说明界面
		toRuleDescription(){
			uni.navigateTo({
				// url: "/pages/ruleDescription/ruleDescription"
				url: "/pages/guide/guide"
			})
		},
		//跳转到代理合作界面
		toCooperation(){
			uni.navigateTo({
				url: "/pages/cooperation/cooperation"
			})
		},
		//跳转到公司资质界面
		toCompany(){
			uni.navigateTo({
				url: "/pages/company/company"
			})
		},
	}
}
</script>

<style>
	.lay_head{
		width:100%;
		height:260rpx;
		background-color:#BAC3D2;
		padding:40rpx;
		box-sizing:border-box;
		font-size:12px;
	}
	.head_title{
		font-size:24px;
		font-weight:bold;
		color:#2F3848;
		margin-bottom:20rpx;
	}
	.head_tips{
		color:#747D8D;
	}
	.content{
		padding:120rpx 30rpx 0;
		box-sizing:border-box;
		width:100%;
		height:400rpx;
		border-radius:20rpx 20rpx 0 0;
		position:relative;
		top:-40rpx;
		background-color: #fff;
	}
	.head_img{
		width:448rpx;
		height:368rpx;
		position:absolute;
		right:0;
		top:-180rpx;
		z-index:1;
	}
	.lay_sort{
		width:100%;
		display:flex;
		justify-content: space-between;
		align-items:center;
		position:relative;
		z-index: 9;
	}
	.sort_box{
		width:48%;
		padding:30rpx 20rpx 100rpx;
		box-sizing:border-box;
		background-color: #F6F7F7;
		border-radius:20rpx;
		font-size:14px;
	}
	.sort_title{
		margin-bottom:20rpx;
		font-weight:bold;
		color:#2F3848;
	}
	.sort_img{
		width:100%;
		height:160rpx;
	}
	.kefu{
		display:flex;
		align-items:center;
		font-size:12px;
		margin-top:20rpx;
	}
	.kefu_img{
		width:40rpx;
		height:40rpx;
	}
	.lay_introduce{
		width:90%;
		padding:0 10rpx;
		box-sizing:border-box;
		margin:40rpx auto 0;
		display:flex;
		justify-content:space-between;
		flex-wrap: wrap;
	}
	.introduce_img{
		margin-bottom:20rpx;
		width:44%;
		height:140rpx;
	}
</style>
