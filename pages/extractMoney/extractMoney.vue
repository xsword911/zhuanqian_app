<template>
	<view class="content">
		<view class="info_bar">
			<view class="test">可提现金额</view>
			<view class="sum">{{sumMoney}}</view>
		</view>
		
		<view class="info_bar">
			<view class="test">到账账号</view>
			<view class="sum">
				<view class="user_img">
					 <image src="/static/img/headImg.jpg" mode="widthFix"></image>
				</view>
				<view class="info">
					<text>{{userName}}</text>
					<text class="tips_test">1个工作日内打款微信账户零钱</text>
				</view>
			</view>
		</view>
		
		<view class="info_bar" style="border: none;">提现金额</view>
		<view class="option">
			<view class="option_box" v-for="(item,index) in optionSumMoney" :key='index' @tap="option(index)" :class="index == selectSumMoney ? 'select' : '' ">{{item}}元</view>
		</view>
		
		<view class="confirm_btn">
			<button type="default" @tap="confirm">确认提现</button>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			sumMoney: 2.57,   //可提现金额
			userName: 'kkkkk',  //账号用户名
			userImg: null,  //账号头像
			optionSumMoney: [50, 100, 200, 300],  //可选的提现金额值
			selectSumMoney: null  //选中的提现金额值索引
		}
	},
	methods:{
		//确认提现
		confirm(){
			uni.showModal({
			    title: '提示',
			    content: '您确定提现？',
			    success: function (res) {
			        if (res.confirm) {
			            console.log('用户点击确定');
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		},
		//选择提现金额值 
		option(index){
			for(let i = 0; i <= this.optionSumMoney.length-1; ++i){
				if(i == index) this.selectSumMoney = index;
			}
		},
	}
}
</script>

<style>
	.content{
		padding:0 20rpx;
		box-sizing:border-box;
	}
	image{
		width:100%;
		height:100%;
	}
	.info_bar{
		width:100%;
		padding:40rpx 0;
		box-sizing:border-box;
		font-size:14px;
		border-bottom:1px solid #eee;
		display:flex;
	}
	.test{
		width:30%;
	}
	.sum{
		width:70%;
		display:flex;
	}
	.user_img{
		width:80rpx;
		height:80rpx;
		border-radius:50%;
		overflow:hidden;
	}
	.info{
		display:flex;
		flex-direction:column;
		margin-left:20rpx;
	}
	.tips_test{
		margin-top:10rpx;
		font-size:12px;
		color:#8d989f;
	}
	.option{
		display:flex;
		justify-content:space-between;
		flex-wrap: wrap;
		width:100%;
	}
	.option_box{
		border:1px solid #000;
		border-radius:10rpx;
		width:28%;
		height:140rpx;
		text-align:center;
		line-height:140rpx;
		margin-bottom:40rpx;
	}
	.select{
		background:#fcd030;
		border:1px solid #fcd030;
	}
	.confirm_btn{
		margin-top:100rpx;
	}
	.confirm_btn>button{
		background-color:#fcd030;
		border-radius:40rpx;
		font-size:14px;
	}
	.confirm_btn>button::after{
		border:none;
	}
</style>
