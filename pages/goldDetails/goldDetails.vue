<template>
    <view class="page">
		<!-- 金币收入明细 -->
		<view class="gold_info">
			<view class="income" v-for="(item,index) in incomeList" :key='index'  v-show="showIncome" @tap="open(item.id)">
				<view class="incomeTime">
					<text class="info_from">{{item.title}}</text>
					<text class="info_time">{{item.finishTime}}</text>
				</view>
				
				<view class="incomeNum">
					<text class="num">+ {{item.award}}</text>
					<view class="gold_img">
						<image src="/static/img/gold2.png" mode="widthFix"></image>
					</view>
					<view class="open">
						<tui-icon name="arrowdown" :size="20" v-show="!item.openTag"></tui-icon>
						<tui-icon name="arrowup" :size="20" v-show="item.openTag"></tui-icon>
					</view>
				</view>
				
				<view class="open_box" v-show="item.id == openId">
					<view class="">
						内容：<text class="income_data">{{item.explain}}</text>
					</view>
				</view>
			</view>
			
			<view class="data_lack" v-show="!showIncome">
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
import api from "@/api/api.js";
import storage from "@/api/storage.js";
export default {
    data() {
        return {
			userEn: [],  //我的信息
			showIncome: true, // 收入明细列表是否显示
			incomeList:[]   ,//提现明细列表
			openTag: false,  //展开图表控制
			// openBox: false,  //控制内容盒子是否打开
			openId: null,  //展开内容盒子的id
			page: 1,  //查询页数
        };
    },
    onShow(){
		this.userEn = storage.getMyInfo();  //获取我的信息		
		this.getTaskDetails();  //获取金币收入明细表		
	},
	methods:{
		// 判断金币收入明细表是否有数据
		isShowIncome(){
			if(util.isEmpty(this.incomeList)) this.showIncome = false;
			else this.showIncome = true;
		},
		//获取金币收入明细表
		getTaskDetails(){
			api.getTaskDetails({
				account: this.userEn.account,
				state: 1,
				page: this.page,
				count: 10
			}, (res)=>{
				let data = api.getData(res).data;
				if(util.isEmpty(data))
					 this.isShowIncome();  //控制金币收入明细表显示
				else{
					data.forEach((item) =>{
						data.openTag = false;
					});
					this.incomeList = data;
					this.showIncome = true;
				}
			});
		},
		//展开活动内容
		open(id){
			if(this.openId == id){
				this.openId = -1;				
			} 
			else
			 this.openId = id;
			
			this.incomeList.forEach((item) =>{
				if(item.id == this.openId){
					item.openTag = true;
				}else{
					item.openTag = false;
				}
			});
		},
	},
	//上拉获取更多金币收益明细数据
	onReachBottom(){
		this.page = this.page + 1;
		api.getTaskDetails({
			account: this.userEn.account,
			state: 1,
			page: this.page,
			count: 10
		}, (res)=>{
			let data = api.getData(res).data;
			if(util.isEmpty(data)) return;
			data.forEach((item) =>{
				this.incomeList.push(item);
			});
		});
	},
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
		flex-wrap: wrap;
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
	.open{
		margin-left:10rpx;
	}
	.open_box{
		margin-top:20rpx;
		width:100%;
	}
	.income_data{
		color:#959FA6;
	}
	.open_box>view{
		margin-top:10rpx;
	}
</style>