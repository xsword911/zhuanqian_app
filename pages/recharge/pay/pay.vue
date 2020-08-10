<template>
	<view class="container" style="padding:20rpx 0; height:100vh;">
		<view class="lay_group">
			<view class="lay_row">
				<view class="lay_row_test">存入金额</view>
				<view class="lay_row_input">
					<input type="text" value="" v-model="money" placeholder="请输入金额"/>
				</view>
			</view>
			<view class="lay_row">
				<view class="lay_row_test">备注</view>
				<view class="lay_row_input">
					<input type="text" value="" v-model="desc" placeholder="备注"/>
				</view>
			</view>
		</view>
		
		<view class="lay_test">
			温馨提示:最小金额：<text>100</text>；最大金额：<text>10000</text>
		</view>
		<view class="lay_test" style="color: #dc3b40;">
			请备份订单号，并填写进您的汇款备注栏！
		</view>
		
		<view class="lay_btn btn_style">
			<button type="default" @tap="getRechargeAccountEnable">下一步</button>
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
			money: "",  //输入金额
			desc: "",  //备注
			rechargeData: '',  //上级页面传过来的充值信息
			rechargeAccountEn: "", //收款账户
		}
	},
	methods:{
		//获取收款账户信息
		getRechargeAccountEnable(){
			if(util.isEmpty(this.money)){
				uni.showToast({
				    icon: 'none',
				    title: '存入金额不能为空'
				});
				return;
			}
			api.getRechargeAccountEnable({wayId: this.rechargeData.wayId, lv: 0}, (res)=>{
				let data = api.getData(res).data;
				this.rechargeAccountEn = data[0];
				this.toPayConfirm();
			});
		},
		//跳转到确认支付界面  
		toPayConfirm(){
			uni.navigateTo({
				url: "/pages/recharge/payConfirm/payConfirm?rechargeAccountEn=" + tran.obj2Url(this.rechargeAccountEn)
				+ "&money=" + this.money + "&desc" + this.desc
			})
		},
	},
	onLoad(res) {
		this.rechargeData = tran.url2Obj(res.data);
	}
}
</script>

<style>
	.lay_group{
		margin-top:20rpx;
		border-top:1px solid #f9f7fa;
		border-bottom:1px solid #f9f7fa;
		margin-bottom:30rpx;
	}
	.lay_row{
		padding:20rpx 0 20rpx 20rpx;
		box-sizing:border-box;
		width:100%;
		background-color:#fff;
		display:flex;
		align-items: center;
		font-size:15px;
	}
	.lay_row_test{
		width:20%;
		text-align:right;
	}
	.lay_row_input{
		padding-left:40rpx;
		box-sizing:border-box;
	}
	.lay_row_input>input{
		font-size:15px;
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
</style>
