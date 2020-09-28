<template>
	<view class="container" style="padding:20rpx 0; height:100vh;">
		<view class="lay_group">
			<view class="lay_row">
				<view class="lay_row_test"><text style="color:#dc3b40;">*</text>存入金额</view>
				<view class="lay_row_input">
					<input type="number" value="" v-model="money" placeholder="请输入金额"/>
				</view>
			</view>
			<view class="lay_row">
				<view class="lay_row_test"><text style="color:#dc3b40;">*</text>备注</view>
				<view class="lay_row_input">
					<input type="text" value="" v-model="desc" placeholder="请输入付款账户信息"/>
				</view>
			</view>
		</view>
		
		<view class="lay_test">
			温馨提示:最小金额：<text>{{moneyMin}}</text>；最大金额：<text>{{moneyMax}}</text>
		</view>
		
		<view class="lay_test" style="margin-bottom:0;">
			<text>备注填写任何可以识别您付款账户的信息（例</text>
		</view>
		<view class="lay_test" style="margin-bottom:0;">
			<text>（例如支付人姓名，微信号，支付宝号），可</text>
		</view>
		<view class="lay_test">			
			<text>增加到款速度</text>
		</view>
		
		<view class="lay_btn btn_style">
			<button type="default" @tap="getRechargeAccountEnable" hover-class="btn_hover">下一步</button>
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
			userEn: "", //用户信息
			money: "",  //输入金额
			desc: "",  //备注
			rechargeData: '',  //上级页面传过来的充值信息
			rechargeAccountEn: "", //收款账户
			uid: "",  //用户id
			moneyMin: null, //充值最小金额
			moneyMax: null, //充值最大金额
		}
	},
	onLoad(res) {
		this.rechargeData = tran.url2Obj(res.data);
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();  //获取我的信息
		this.getRechargeLimit();  //用户查询充值限制
	},
	methods:{
		//用户查询充值限制
		getRechargeLimit(){
			api.getRechargeLimit({level: this.userEn.level}, (res)=>{
				let data = api.getData(res);
				this.moneyMin = data.min;   //获取充值最小金额
				this.moneyMax = data.max;   //获取充值最大金额
			});
		},
		//获取收款账户信息
		getRechargeAccountEnable(){
			if(util.isEmpty(this.money)){
				uni.showToast({
				    icon: 'none',
				    title: '存入金额不能为空'
				});
				return;
			}
			else if(util.isEmpty(this.desc))
			{
				uni.showToast({
				    icon: 'none',
				    title: '请填写备注'
				});
				return;
			}
			else if(this.money > this.moneyMax || this.money < this.moneyMin){
				uni.showToast({
				    icon: 'none',
				    title: '存入金额错误'
				});
				return;
			}
			else if(!this.isNum(parseFloat(this.money))){
				uni.showToast({
					title: "充值金额只能是整数",
					image: "/static/img/fail-circle.png",
					duration: 2000
				});
				return;
			}
			api.recharge({
				wayId: this.rechargeData.wayId, 
				money: this.money,
				uid: this.uid
				}, (res)=>{
					let code = api.getCode(res);
					if(code == 0){
						let data = api.getData(res);
						this.rechargeAccountEn = data;
						this.toPayConfirm();
					}else{
						let msg = api.getMsg(res);
						uni.showToast({
						    icon: 'none',
						    title: msg
						});
						return;
					}

			});
		},
		//跳转到确认支付界面  
		toPayConfirm(){
			uni.navigateTo({
				url: "/pages/recharge/payConfirm/payConfirm?rechargeAccountEn=" + tran.obj2Url(this.rechargeAccountEn)
				+ "&desc=" + this.desc + "&wayId=" + this.rechargeData.wayId
			})
		},
		//判断是否是纯数字
		isNum(value){
			const reg = /^[0-9]*$/;
			return reg.test(value);
		},
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
