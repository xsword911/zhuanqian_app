<template>
	<view class="">
		<view class="lay_head">
			<view class="head_info">
				<view class="head_img">
					<image src="/static/img/head.png" mode=""></image>
				</view>
				<view class="">
					会员等级：新人任务
				</view>
			</view>
			
			<view class="">
				每天可接：3(任务)
			</view>
			
			<view class="">
				会员到期时间：21-08-07 17:02:38
			</view>
			
			<view class="vip" @tap="toPower">
				会员详情
			</view>
		</view>
		
		<view class="content">
			<view class="func">
				<view class="lay_func">
					<view class="func_img">
						<image src="/static/img/v1.png" mode=""></image>
					</view>
					<view class="func_test test1">
						佣金加成
					</view>
				</view>
				
				<view class="lay_func">
					<view class="func_img">
						<image src="/static/img/v2.png" mode=""></image>
					</view>
					<view class="func_test test2">
						任务增多
					</view>
				</view>
				
				<view class="lay_func">
					<view class="func_img">
						<image src="/static/img/v3.png" mode=""></image>
					</view>
					<view class="func_test test3">
						专属客服
					</view>
				</view>
			</view>
			
			<view class="lay_pay" v-show="isShowPay">
				<view class="pay_info">
					<view class="" style="display: flex; align-items: center;">
						<view class="pay_img">
							<image src="/static/img/yq.png" mode=""></image>
						</view>
						<view class="" style="font-size:12px;">
							余额支付
						</view>
					</view>
					<view class="pay_success">
						<image src="/static/img/gou.png" mode=""></image>
					</view>
				</view>
				
				<view class="pay_btn btn_style">
					<button type="default" hover-class="btn_hover">立即升级需支付{{payNum}}元</button>
				</view>
			</view>
			
			<view class="lay_level">
				<view class="level_box level_test">
					<view class="level_type">新人任务</view>
					<view class="level_money">0.00元</view>
					<view class="">任务数量:3/天</view>
					<view class="">提现次数:1/次</view>
					<view class="">任务佣金: 1元</view>
					<view class="">-</view>
					<view class="">-</view>
					<view class="">开通会员:365天</view>
				</view>
				
				<view class="level_box level_box2" 
				@tap="openPay(299.00)"
				:class="{'click_box' : payNum == 299.00}">
					<view class="level_type">白银会员</view>
					<view class="level_money">299.00元</view>
					<view class="">任务数量:10/天</view>
					<view class="">提现次数:1/次</view>
					<view class="">任务佣金: 2元</view>
					<view class="">-</view>
					<view class="">-</view>
					<view class="level_test">开通会员:365天</view>
				</view>
				
				<view class="level_box level_box2" 
				@tap="openPay(999.00)"
				:class="{'click_box' : payNum == 999.00}">
					<view class="level_type">黄金会员</view>
					<view class="level_money">999.00元</view>
					<view class="">任务数量:20/天</view>
					<view class="">提现次数:1/次</view>
					<view class="">任务佣金: 3元</view>
					<view class="">-</view>
					<view class="">-</view>
					<view class="level_test">开通会员:365天</view>
				</view>
				
				<view class="level_box level_box2" 
				@tap="openPay(2999.00)"
				:class="{'click_box' : payNum == 2999.00}">
					<view class="level_type">铂金会员</view>
					<view class="level_money">2999.00元</view>
					<view class="">任务数量:35/天</view>
					<view class="">提现次数:3/次</view>
					<view class="">任务佣金: 5元</view>
					<view class="">-</view>
					<view class="">-</view>
					<view class="level_test">开通会员:365天</view>
				</view>
				
				<view class="level_box level_box2" 
				@tap="openPay(4999.00)"
				:class="{'click_box' : payNum == 4999.00}">
					<view class="level_type">钻石急单</view>
					<view class="level_money">4999.00元</view>
					<view class="">任务数量:50/天</view>
					<view class="">提现次数:5/次</view>
					<view class="">任务佣金: 6元</view>
					<view class="">-</view>
					<view class="">-</view>
					<view class="level_test">开通会员:365天</view>
				</view>
				
				<view class="level_box level_box2" 
				@tap="openPay(8999.00)"
				:class="{'click_box' : payNum == 8999.00}">
					<view class="level_type">至尊会员</view>
					<view class="level_money">8999.00元</view>
					<view class="">任务数量:70/天</view>
					<view class="">提现次数:10/次</view>
					<view class="">任务佣金: 8元</view>
					<view class="">-</view>
					<view class="">-</view>
					<view class="level_test">开通会员:365天</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			isShowPay: false,  //是否显示支付盒子
			payNum: 0,  //支付金额
		}
	},
	onShow() {
		
	},
	methods:{
		//跳转到会员特权界面
		toPower(){
			uni.navigateTo({
				url: "/pages/power/power"
			})
		},
		//打开支付盒子
		openPay(num){
			this.payNum = num.toFixed(2);
			this.isShowPay = true;
		}
	}
}
</script>

<style>
	.lay_head{
		width:100%;
		height:380rpx;
		background-image:linear-gradient(to right, rgb(42,164,249) , rgb(139,114,245));
		color:#fff;
		font-size:14px;
		padding:60rpx 40rpx;
		box-sizing:border-box;
		display:flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}
	.head_info{
		display:flex;
		align-items:center;
		font-weight:bold;
		font-size:17px;
	}
	.head_img{
		width:120rpx;
		height:120rpx;
		margin-right:20rpx;
	}
	.vip{
		width:200rpx;
		height:60rpx;
		text-align:center;
		line-height:60rpx;
		border-radius:40rpx 0 0 40rpx;
		background-color:#CFA55D;
		position:absolute;
		right:0;
		top:50%;
		transform: translateY(-50%);
	}
	.func{
		display:flex;
		justify-content:space-between;
		margin-top:60rpx;
	}
	.lay_func{
		width:30%;
		display:flex;
		flex-direction: column;
		align-items:center;
		justify-content:center;
	}
	.func_img{
		width:120rpx;
		height:120rpx;
	}
	.func_test{
		font-size:15px;
	}
	.test1{
		color:#FEBB35;
	}
	.test2{
		color:#FA3B56;
	}
	.test3{
		color:#3BD4F8;
	}
	.lay_level{
		width:100%;
		display:flex;
		flex-wrap: wrap;
		justify-content:space-between;
		margin-top:40rpx;
	}
	.level_box{
		width:26%;
		height:400rpx;
		padding:40rpx 20rpx;
		border: 1px solid #CCCCCC;
		border-radius:30rpx;
		text-align:center;
		font-size:24rpx;
		margin-top:20rpx;
	}
	.level_box>view{
		margin-top:10rpx;
	}
	.level_type{
		font-size:18px;
	}
	.level_box2{
		color:#000;
	}
	.level_money{
		color:#228AFF;
		font-weight:bold;
	}
	.level_test{
		color: #A6A6BA;
	}
	.lay_pay{
		width:60%;
		margin:40rpx auto;
	}
	.pay_info{
		display:flex;
		align-items:center;
		justify-content: space-between;
	}
	.pay_img{
		width:40rpx;
		height:40rpx;
		margin-right:40rpx;
	}
	.pay_success{
		width:32rpx;
		height:32rpx;
	}
	.pay_btn{
		margin-top:40rpx;
	}
	.pay_btn>button{
		padding:5rpx;
		border-radius:40rpx;
		box-sizing:border-box;
		font-size:14px;
		color:#fff;
	}
	.click_box{
		background-color:#0A91FB;
		color:#fff;
	}
	.click_box>view{
		color:#fff;
	}
</style>
