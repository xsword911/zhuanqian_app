<template>
	<view class="container">
		<view class="lay_money background_style">
			<view class="lay_test">
				余额
			</view>
			<view class="lay_money_num">
				￥<text>{{money}}</text>
			</view>
		</view>
		
		<view class="lay_group">
			<view class="lay_head">
				网银存款
			</view>
			<view class="lay_row">
				<view class="lay_box" @tap="toPay">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						建设银行
					</view>
				</view>
				<view class="lay_box" @tap="toPay">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						建设银行
					</view>
				</view>
				<view class="lay_box" @tap="toPay">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						在线(微信、支付宝、云闪付)
					</view>
				</view>
				<view class="lay_box" @tap="toPay">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						网银
					</view>
				</view>
			</view>
		</view>
		
		<view class="lay_group">
			<view class="lay_head">
				微信
			</view>
			<view class="lay_row">
				<view class="lay_box" @tap="toPay">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						建设银行
					</view>
				</view>
				<view class="lay_box" @tap="toPay">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						在线(微信、支付宝、云闪付)
					</view>
				</view>
				<view class="lay_box" @tap="toPay">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						网银
					</view>
				</view>
			</view>
		</view>
		
		<view class="lay_group">
			<view class="lay_head">
				支付宝
			</view>
			<view class="lay_row">
				<view class="lay_box">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						建设银行
					</view>
				</view>
				<view class="lay_box">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						在线(微信、支付宝、云闪付)
					</view>
				</view>
				<view class="lay_box">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						网银
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import api from "@/api/api.js";
import storage from "@/api/storage.js";
export default{
	data() {
		return {
			money: "",    //余额
			userEn: [],  //用户信息
			uid: "",  //uid
		}
	},
	onShow() {
		this.uid = storage.getUid();  //获取用户id
		this.getUserInfo();  //获取用户信息
	},
	methods:{
		//获取用户信息
		getUserInfo(){
			api.getUserByUid({uid: this.uid}, (res)=>{
				let data = api.getData(res);
				this.money = data.money;
			});
		},
		//跳转到支付页面
		toPay(){
			uni.navigateTo({
				url:"/pages/recharge/pay/pay"
			})
		},
	}
}
</script>

<style>
	.lay_money{
		width:100%;
		height:200rpx;
		border-radius:10px;
		color: #fff;
		padding-left:40rpx;
		box-sizing:border-box;
		position:relative;
	}
	.lay_test{
		position:absolute;
		top:40rpx;
	}
	.lay_money_num{
		font-size:24px;
		font-weight:bold;
		position:absolute;
		bottom:40rpx;
	}
	.lay_group{
		margin-top:20rpx;
		width:100%;
		height:auto;
		background-color:#fff;
		border-radius:10px;
		padding:0 20rpx;
		box-sizing:border-box;
	}
	.lay_head{
		color:#999999;
		border-bottom:1px solid #f4f4f4;
		padding:20rpx 0;
		box-sizing:border-box;
		font-size:14px;
	}
	.lay_row{
		width:100%;
		display:flex;
		flex-wrap: wrap;
	}
	.lay_box{
		width:33.333%;
		height:240rpx;
		text-align:center;
		display:flex;
		flex-direction: column;
		justify-content:center;
		align-items: center;
	}
	.lay_box_img{
		width:70rpx;
		height:70rpx;
	}
	.lay_box_test{
		font-size:14px;
		margin-top:10rpx;
	}
</style>
