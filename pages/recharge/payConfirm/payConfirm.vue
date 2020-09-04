<template>
	<view class="container" style="padding:20rpx 0; height:100vh;">
		<view class="lay_group">
			<view class="lay_row">
				<view class="lay_row_test">收款平台</view>
				<text class="lay_row_info" selectable="true">{{recharge.platform}}</text>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">收款金额</view>
				<text class="lay_row_info" selectable="true">{{recharge.money}}</text>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">订单号</view>
				<text class="lay_row_info" selectable="true">{{recharge.sn}}</text>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">收款人</view>
				<text class="lay_row_info" selectable="true">{{recharge.owner}}</text>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">收款账号</view>
				<text class="lay_row_info" selectable="true">{{recharge.account}}</text>
			</view>
			<view class="lay_row" v-if="recharge.bankBranch != ''">
				<view class="lay_row_test">开户支行</view>
				<text class="lay_row_info" selectable="true">{{recharge.bankBranch}}</text>
			</view>
		</view>
		
		<view class="lay_test" style="color: #dc3b40;">
			请备份订单号，填入进您的汇款备注栏。长按可复制信息
		</view>
		
<!-- 		<view class="lay_test" style="color: #dc3b40;">
			温馨提示：请保存二维码，点击可复制信息
		</view> -->
		
		<view class="lay_btn btn_style">
			<button type="default" @tap="payConfirm" hover-class="btn_hover">确认支付</button>
		</view>
		
		
		<view class="lay_qrCode" v-if="recharge.imgUrl">
			<image :src="recharge.imgUrl" mode="" @tap="checkImg"></image>
		</view>
	</view>
</template>

<script>
import tran from "@/common/tran.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
import storage from "@/api/storage.js";
export default{
	data() {
		return {
			recharge: "", //申请充值返回信息
			wayId: null,  //渠道id
			uid: "",  //用户id
			desc: "",  //备注
		}
	},
	methods:{
		//查看图片
		checkImg(){
			uni.previewImage({
				urls: [this.recharge.imgUrl]
			});
		},
		//提交
		payConfirm(){
			let _this = this;
			uni.showModal({
				content: "确认支付",
				success: function (res) {
				    if (res.confirm) {
				        api.rechargePut({
							id: _this.recharge.id,
							uid: _this.uid,
							desc: _this.desc
						}, (res)=>{
							let code = api.getCode(res);
							if(code == 0){
								uni.showModal({
									content: "您的充值申请已提交！将尽快为您确认到账",
									showCancel: false,
									success(res) {
										if(res.confirm){
											uni.reLaunch({
											    url: '/pages/my/my'
											});
										}
									}
								});
							}else {
								let msg = api.getMsg(res);
								uni.showModal({
									content: msg,
									showCancel: false
								});
							}
						});
				    } else if (res.cancel) {
				        console.log('用户点击取消');
				    }
				}
			})
		},
	},
	onLoad(res) {
		this.desc = res.desc;
		this.recharge = tran.url2Obj(res.rechargeAccountEn);  //获取充值信息
		this.wayId = parseInt(res.wayId);  //获取渠道id
		this.uid = storage.getUid();  //获取uid
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
		display:inline-block;
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
		font-size:14px;
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
