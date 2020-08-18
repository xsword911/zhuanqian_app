<template>
	<view class="">
		<view class="lay_head">
			<view class="">
				<view class="head_title">
					总资产(元)
				</view>
				<view class="head_num">
					1.00
				</view>
			</view>
			
			<view class="">
				<view class="head_title">
					余额宝(元)
				</view>
				<view class="head_num money_num">
					+<text>1.00</text>
				</view>
			</view>
			
			<view class="">
				<view class="head_title">
					总收益(元)
				</view>
				<view class="head_num">
					+<text>1</text>
				</view>
			</view>
			
			<view class="">
				<view class="head_title">
					昨日收益(元)
				</view>
				<view class="head_num">
					+<text>1</text>
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
					<text>{{profit}}</text>
				</view>
			</view>
			
			<view class="">
				<view class="head_title" style="margin-bottom:20rpx;">收益标准</view>
				
				<view class="lay_option">
					<view class="option_box" :class="{'click_open' : option == 0}"
					@tap="optionChange(0)">
						<view class="option_test">7天体验</view>
						<view class="option_test">+1 %</view>
						<view class="">[定] 30天</view>
					</view>
					
					<view class="option_box" :class="{'click_open' : option == 1}"
					@tap="optionChange(1)">
						<view class="option_test">白银理财计划</view>
						<view class="option_test">+3 %</view>
						<view class="">[定] 15天</view>
					</view>
					
					<view class="option_box" :class="{'click_open' : option == 2}"
					@tap="optionChange(2)">
						<view class="option_test">黄金理财计划</view>
						<view class="option_test">+4 %</view>
						<view class="">[定] 30天</view>
					</view>
					
					<view class="option_box" :class="{'click_open' : option == 3}"
					@tap="optionChange(3)">
						<view class="option_test">钻石理财计划</view>
						<view class="option_test">+5 %</view>
						<view class="">[定] 30天</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="lay_btn">
			<button type="default" hover-class="btn_hover" @tap="toInteresList">转出</button>
			<button type="default" hover-class="btn_hover" @tap="toInteresList">转入</button>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			option: 0,  	//选中的收益类型
			profit: 70, 	//预计收益
			money: 1000,	//输入的余额
		}
	},
	methods:{
		//收益类型切换
		optionChange(num){
			if(this.option == num) return;
			this.option = num;
			switch (num){
				case 0:
				this.profit = 70;
					break;
				case 1:
				this.profit = 450;
					break;
				case 2:
				this.profit = 1200;
					break;
				case 3:
				this.profit = 1500;
					break;
				default:
					break;
			}
		},
		//跳转到余额生金存取记录界面
		toInteresList(){
			uni.navigateTo({
				url: "/pages/interest/interestList/interestList"
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
