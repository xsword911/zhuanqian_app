<template>
	<view class="">
		<view class="lay_head">
			<view class="">
				<view class="head_title">
					总资产(元)
				</view>
				<view class="head_num" style="font-size:14px;">
					{{userEn.money}}
				</view>
			</view>
			
			<view class="">
				<view class="head_title">
					余额宝(元)
				</view>
				<view class="head_num money_num">
					+<text>{{moneySum}}</text>
				</view>
			</view>
			
			<view class="">
				<view class="head_title">
					预计收益(元)
				</view>
				<view class="head_num">
					+<text>{{rateMoneySum}}</text>
				</view>
			</view>
		</view>
		
		<view class="lay_content">
			<view class="">
				<view class="">余额转入</view>
				<view class="lay_money">
					<text class="">￥</text>
					<input value="" type="number" v-model="money"/>
				</view>
			</view>
			
			<view class="">
				<view class="lay_money">
					<text class="" style="margin-right:60rpx;">预计收益</text>
					<input value="" type="number" v-model="profit" disabled="true" />
				</view>
			</view>
			
			<view class="">
				<view class="head_title" style="margin-bottom:20rpx;">收益标准</view>
				
				<view class="lay_option">
					<view class="option_box" :class="{'click_open' : option == index}"
					@tap="optionChange(item, index)" v-for="(item,index) in planRateList" :key="index">
						<view class="option_test">{{item.planName}}</view>
						<view class="option_test">+{{item.planRate / 100}} %</view>
						<view class="">[定] {{item.planDays}}天</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="lay_btn">
			<button type="default" hover-class="btn_hover" @tap="toInteresList">转出</button>
			<button type="default" hover-class="btn_hover" @tap="deposit">转入</button>
		</view>
	</view>
</template>

<script>
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import util from "@/common/util.js";
export default{
	data() {
		return {
			uid: "",  //用户id
			option: 0,  	//选中的收益类型
			optionPlanRate: "",  //选中的收益类型信息
			profit: null, 	//预计收益
			money: 1000,	//输入的余额
			userEn: [],  //我的信息
			
			planRateList: [],  //存款利率列表
			rateMoneySum: null, //预计收益
			moneySum: null, //余额宝存款总额
		}
	},
	watch:{
		//计算预计收益
		money(val){
			if(util.isEmpty(val)) return;
			this.money = parseFloat(val);
			let num = parseFloat(this.money * (this.optionPlanRate.planRate / 10000));
			this.profit = num.toFixed();
		},
	},
	onShow() {
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();  //获取我的信息
		this.getPlanRateOpen();   //获取开启的存款利率
		this.getPlanMoneySum();  //获取余额宝存款总额和预计收益
	},
	methods:{
		//获取余额宝存款总额和预计收益
		getPlanMoneySum(){
			api.getPlanMoneySumByUid({uid: this.uid}, (res)=>{
				let data = api.getData(res);
				this.rateMoneySum = data.rateMoneySum;
				this.moneySum = data.moneySum;
			});
		},
		//获取开启的存款利率
		getPlanRateOpen(){
			api.getPlanRateOpen((res)=>{
				let data = api.getData(res).data;
				this.planRateList = data;  //获取存款利率列表
				this.optionPlanRate = this.planRateList[0];  //设置默认收益类型信息
			});
		},
		//收益类型切换
		optionChange(item, index){
			this.optionPlanRate = item;
			if(this.option == index) return;
			this.option = index;  //添加点击样式
			let planRate = item.planRate / 10000;  //获取存款利率(小数格式) 1% = 0.01
			this.profit = this.money * planRate;  //计算收益
		},
		//跳转到余额生金存取记录界面
		toInteresList(){
			uni.navigateTo({
				url: "/pages/interest/interestList/interestList"
			})
		},
		//存入余额宝判断
		deposit(){
			if(util.isEmpty(this.money)){
				uni.showToast({
					title: "余额转入不能为空",
					icon: "none"
				});
				return;
			}else if(this.money < 300){
				uni.showToast({
					title: "该产品起投金额不能低于300",
					icon: "none"
				});
				return;
			}else if(this.money > this.userEn.money){
				uni.showToast({
					title: "余额不足",
					icon: "none"
				});
				return;
			}
			let data = {
				uid: this.uid,
				planId: this.optionPlanRate.id,
				addMoney: this.money
			};
			this.submitDeposit(data);
		},
		//存入余额宝
		submitDeposit(data){
			uni.showModal({
				content: "确定购买该产品？",
				success(res) {
					if(res.confirm){
						api.planMoneyIn(data, (res)=>{
							let code = api.getCode(res);
							if(code == 0){
								uni.showModal({
									content: "购买成功",
									showCancel: false,
									success(res) {
										if(res.confirm){
											uni.navigateTo({
												url: "/pages/interest/interestList/interestList"
											})
										}
									}
								})
							}else{
								let msg = api.getMsg(res);
								uni.showToast({
									title: msg,
									icon: "none"
								});
							}
						});
					}
				}
			})
		},
	}
}
</script>

<style>
	.lay_head{
		width:100%;
		font-size:14px;
		text-align:center;
		display:flex;
		justify-content:space-between;
		padding:20rpx 0;
		box-sizing:border-box;
		border-bottom:1px solid #ECECEC;
		box-shadow: 0 3px 3px rgb(236, 236, 236);
	}
	.lay_head>view{
		width:23%;
	}
	.head_title{
		color:#9C9C9C;
	}
	.head_num{
		font-size:18px;
		color:#FF575C;
	}
	.money_num{
		font-size:14px;
		color:#000;
	}
	
	
	
	.lay_content{
		margin-top:20rpx; 
		border-top:1px solid #F5F5F5;
		padding:40rpx;
		box-sizing:border-box;
		font-size:14px;
		box-shadow: 0 3px 3px rgb(236, 236, 236);
	}
	.lay_content>view{
		margin-bottom:20rpx;
	}
	.lay_money{
		padding:20rpx 0;
		box-sizing:border-box;
		border-bottom:1px solid #DDDDDD;
		display:flex;
		align-items:center;
	}
	.lay_money>text:nth-child(1){
		color:#E8402F;
		display: inline-block;
		margin-right:10rpx;
	}
	.lay_money>input{
		color:#666666;
		font-size:20px;
	}
	.lay_option{
		width:100%;
		display:flex;
		flex-wrap: wrap;
		justify-content:space-between;
	}
	.option_box{
		width:48%;
		padding:10rpx;
		box-sizing:border-box;
		display:flex;
		flex-direction: column;
		justify-content:center;
		align-items:center;
		border:1px solid #BBBBBB;
		margin-bottom:10rpx;
	}
	.option_test{
		color:#D91D37;
	}
	
	.lay_btn{
		width:100%;
		display:flex;
		justify-content:space-between;
		margin-top:40rpx;
		padding:0 30rpx;
		box-sizing:border-box;
	}
	.lay_btn>button{
		font-size:15px;
		width:46%;
		height:80rpx;
		line-height:80rpx;
	}
	.lay_btn>button:nth-child(1){
		border:1px solid #CDCDCD;
		background-color:transparent;
	}
	.lay_btn>button:nth-child(2){
		color:#fff;
		background-color:#FF6225;
	}
	.click_open{
		color:#fff;
		background-color: #D91D37;
	}
	.click_open>view{
		color:#fff;
	}
</style>
