<template>
    <view class="page">
		<!-- 金币收入明细 -->
		<view class="gold_info">
			<view class="income" v-for="(item,index) in incomeList" :key='index' v-show="incomeList != []">
				<view class="incomeTime">
					<text class="info_from">{{item.from}}</text>
					<text class="info_time">{{item.time}}</text>
				</view>
				
				<view class="incomeNum">
					<text class="num">+ {{item.num}}</text>
					<view class="gold_img">
						<image src="/static/img/gold2.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			
			<view class="data_lack" v-show="incomeList == []">
				<view class="lack_box">
					<tui-icon name="nodata" :size="120"></tui-icon>
					<text class="lack_test">暂无数据</text>
					<button type="default" class="coin_query">去获取金币</button>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
import util from "@/common/util.js";
export default {
    data() {
        return {
			showIncome: true, // 收入明细列表是否显示
			//收入明细列表
			incomeList:[{
				from: '转盘',
				time: "2020-06-22",
				num: 10
			},{
				from: '转盘',
				time: "2020-06-22",
				num: 10
			},{
				from: '转盘',
				time: "2020-06-22",
				num: 10
			},{
				from: '转盘',
				time: "2020-06-22",
				num: 10
			},{
				from: '转盘',
				time: "2020-06-22",
				num: 10
			}]   //提现明细列表
        };
    },
    onShow(){
		if(util.isEmpty(this.incomeList)) this.showIncome = false;
		else this.showIncome = true;
	}
};
</script>

<style>
	page{
	    height: 100%;
	}
	.page{
	    height: 100%;
	}
	.income{
		padding:20rpx 40rpx;
		box-sizing:border-box;
		font-size:14px;
		display:flex;
		justify-content:space-between;
		align-items:center;
		border-bottom:1px solid #eee;
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
	.gold_info{
		padding-top:40rpx;
	}
	.incomeTime{
		display:flex;
		flex-direction: column;
	}
	.info_from{
		margin-bottom:10rpx;
		font-size:16px;
	}
	.info_time{
		font-size:13px;
		color:#959FA6;
	}
	.incomeNum{
		display:flex;
		align-items:center;
	}
	.gold_img{
		width:60rpx;
		height:60rpx;
	}
	.num{
		margin-right:20rpx;
		font-size:16px;
	}
</style>