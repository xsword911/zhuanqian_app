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
		
		<view class="lay_group" v-for="(item, index) in rechargeType" :key="index">
			<view class="lay_head">
				{{item.key}}
			</view>
			<view class="lay_row" style="text-align: left;">
				<button class="lay_box" @tap="toPay(item1)" v-for="(item1, index1) in item.val" :key="index1" 
				type="default" hover-class="lay_hover">
					<view class="lay_box_img">
						<image src="/static/img/recharge_img.png" mode=""></image>
					</view>
					<view class="lay_box_test">
						{{item1.wayName}}
					</view>
				</button>
			</view>
		</view>
		
	</view>
</template>

<script>
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import tran from "@/common/tran.js";
export default{
	data() {
		return {
			money: "",    //余额
			userEn: [],  //用户信息
			uid: "",  //uid
			rechargeType: [],  //充值渠道大类列表
		}
	},
	onShow() {
		this.uid = storage.getUid();  //获取用户id
		this.getUserInfo();  //获取用户信息
		this.getRechargeType();  //获取充值渠道大类列表
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
		toPay(data){
			uni.navigateTo({
				// url:"/pages/recharge/pay/pay?data=" + encodeURIComponent(JSON.stringify(data1))
				url:"/pages/recharge/pay/pay?data=" + tran.obj2Url(data)
			})
		},
		//获取充值渠道大类列表
		getRechargeType(){
			api.getRechargeWayEnable({}, (res)=>{
				let data = api.getData(res);
				this.rechargeType = data;
			});
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
		background-color:#fff;
		padding:0; 
		margin:0;
		border-radius:0; 
	}
	.lay_box_img{
		width:70rpx;
		height:70rpx;
	}
	.lay_box_test{
		font-size:14px;
		margin-top:10rpx;
	}
	.lay_hover[type = default]{
		background-color:#F8F8F8;
	}
</style>
