<template>
	<view class="container" style="padding:20rpx 0; height:100vh;">
		<view class="lay_group">
			<view class="lay_row">
				<view class="lay_row_test">收款平台</view>
				<view class="lay_row_info">{{rechargeAccountEn.platform}}</view>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">收款金额</view>
				<view class="lay_row_info">{{money}}</view>
			</view>
			
<!-- 			<view class="lay_row">
				<view class="lay_row_test">订单号</view>
				<view class="lay_row_info">12121</view>
			</view> -->
			
			<view class="lay_row">
				<view class="lay_row_test">收款人</view>
				<view class="lay_row_info">{{rechargeAccountEn.owner}}</view>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">收款账号</view>
				<view class="lay_row_info">{{rechargeAccountEn.account}}</view>
			</view>
		</view>
		

<!-- 		<view class="lay_test" style="color: #dc3b40;">
			温馨提示：请保存二维码，点击可复制信息
		</view> -->
		
		<view class="lay_btn btn_style">
			<button type="default" @tap="payConfirm">确认支付</button>
		</view>
		
		
		<view class="lay_qrCode" v-if="rechargeAccountEn.imgUrl">
			<image :src="rechargeAccountEn.imgUrl" mode=""></image>
		</view>
	</view>
</template>

<script>
import tran from "@/common/tran.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
export default{
	data() {
		return {
			rechargeAccountEn: "", //收款账户
			money: null,  //存入金额
		}
	},
	methods:{
		//提交
		payConfirm(){
			uni.showModal({
				content: "您的充值申请已提交！将尽快为您确认到账",
				showCancel: false
			})
		},
	},
	onLoad(res) {
		this.rechargeAccountEn = tran.url2Obj(res.rechargeAccountEn);
		console.log(this.rechargeAccountEn);
		this.money = res.money;
	}
}
</script>

<style>
	.lay_group{
		margin-top:20rpx;
		border-top:1px solid #f9f7fa;
		border-bottom:1px solid #f9f7fa;
		margin-bottom:30rpx;
		padding-left:30rpx;
		box-sizing:border-box;
		background-color:#fff;
	}
	.lay_row{
		padding:20rpx 0 20rpx 0;
		box-sizing:border-box;
		width:100%;
		display:flex;
		align-items: center;
		font-size:15px;
		border-bottom:1px solid #f9f9f9;
	}
	.lay_row_test{
		width:24%;
		text-align:right;
	}
	.lay_row_info{
		padding-right:40rpx;
		box-sizing:border-box;
		flex: 1;
		text-align: right;
		color:#1d93d8;
		text-decoration:underline;
	}
	.lay_test{
		width:100%;
		text-align:center;
		font-size:15px;
		margin-bottom:30rpx;
	}
	.lay_test>text{
		color:#dc3b40;
	}
	.lay_btn>button{
		font-size:14px;
		width:80%;
	}
	.lay_qrCode{
		width:200rpx;
		height:200rpx;
		margin:100rpx auto 0;
	}
</style>
