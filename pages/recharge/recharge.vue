<template>
	<view class="container" style="padding:0; height:100vh; background-color: #fff;">
		<view class="" style="background-color: #fbf9fe; height:100vh; padding:20rpx; box-sizing:border-box;" 
		v-if="isShowRecharge == 1">
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
		
		<view class="data_lack" v-if="isShowRecharge == 2" style="width:100%; height:100vh; background-color: #fff;">
			<view class="lack_box">
				<tui-icon name="nodata" :size="120"></tui-icon>
				<text class="lack_test">您还没有登录账号</text>
				<button type="default" class="coin_query" hover-class="btn_hover" @tap="toLogin" style="background-color:#fcd030;">去登录</button>
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
			isShowRecharge: 0,  //是否显示充值 0正在查询 1显示 2未登录 
		}
	},
	onLoad(res) {
		//游客登录
		if(res.loginType){
			this.isShowRecharge = 2;
			return;
		}else {
			this.uid = storage.getUid();  //获取用户id
			this.getUserInfo();  //获取用户信息
			this.getRechargeType();  //获取充值渠道大类列表
			this.isShowRecharge = 1;  //显示充值
		}
	},
	methods:{
		//跳转到登录界面
		toLogin(){
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},
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
	
	
	
	.lack_box{
		width:100%;
		height:700rpx;
		display:flex;
		justify-content:center;
		align-items:center;
		flex-direction:column;
	}
	.lack_test{
		font-size:16px;
		margin-top:20rpx;
		display:inline-block;
	}
	.coin_query{
		margin-top:40rpx;
		background-color:#fcd030;
		font-size:16px;
		border-radius:40rpx;
		width:400rpx;
	}
	.coin_query::after{
		border:none;
	}
</style>
