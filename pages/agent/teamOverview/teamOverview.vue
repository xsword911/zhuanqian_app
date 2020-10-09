<template>
	<view class="page">
		<!-- 筛选时间 -->
		<view class="search_column" >
			<view class="" style="display:flex; align-items:center;">
				<input type="text" value="" v-model="begTime" :disabled="true" @tap="openDrawer" placeholder="开始时间"/>
				<text>至</text>
				<input type="text" value="" v-model="endTime" :disabled="true" @tap="openDrawer" placeholder="结束时间"/>
			</view>
			<view class="sea_btn btn_style">
				<button type="default" @tap="getUserByClick" hover-class="btn_hover" style="padding: 0;">查询</button>
			</view>
		</view>
		
		<view class="lay_info" v-show="statisticsMonthShow">
			<view class="lay_box">
				<view class="style_Numtest">￥{{StatisticsMonthEn.moneyTaskAdd}}</view>
				<view class="">任务收入</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">￥{{StatisticsMonthEn.moneyTaskLose}}</view>
				<view class="">发布支出</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">{{StatisticsMonthEn.taskSum}}</view>
				<view class="">任务次数</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">￥{{StatisticsMonthEn.moneyActiveAdd}}</view>
				<view class="">活动收入</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">￥{{StatisticsMonthEn.moneyActiveLose}}</view>
				<view class="">活动支出</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">{{StatisticsMonthEn.rechargeSum}}</view>
				<view class="">充值次数</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">￥{{StatisticsMonthEn.rechargeMoney}}</view>
				<view class="">充值</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">￥{{StatisticsMonthEn.firstRechargeMoney}}</view>
				<view class="">首充金额</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">{{StatisticsMonthEn.firstRechargeMoneyNum}}</view>
				<view class="">首充人数</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">{{StatisticsMonthEn.drawSum}}</view>
				<view class="">提现次数</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">￥{{StatisticsMonthEn.drawMoney}}</view>
				<view class="">提现</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">￥{{StatisticsMonthEn.moneyIns}}</view>
				<view class="">加款</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">￥{{StatisticsMonthEn.moneySubtract}}</view>
				<view class="">扣款</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">￥{{StatisticsMonthEn.moneyAgency}}</view>
				<view class="">代理佣金</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">￥{{money}}</view>
				<view class="">盈利</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">{{userEn.subSum}}</view>
				<view class="">子属下级</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">{{userEn.allSubSum}}</view>
				<view class="">所有下级</view>
			</view>
			
			<view class="lay_box">
				<view class="style_Numtest">{{StatisticsMonthEn.isRegisterToday}}</view>
				<view class="">注册人数</view>
			</view>
			
<!-- 			<view class="lay_box" v-if="isOpenGold == 1">
				<view class="style_Numtest">{{StatisticsMonthEn.goldAdd}}</view>
				<view class="">得到金币</view>
			</view>
			
			<view class="lay_box" v-if="isOpenGold == 1">
				<view class="style_Numtest">{{StatisticsMonthEn.goldAgency}}</view>
				<view class="">代理奖励金币</view>
			</view>
			
			<view class="lay_box" v-if="isOpenGold == 1">
				<view class="style_Numtest">{{StatisticsMonthEn.goldLose}}</view>
				<view class="">消耗金币</view>
			</view> -->
	
			
<!-- 			<view class="lay_box" v-if="isOpenGold == 1">
				<view class="style_Numtest">{{gold}}</view>
				<view class="">盈利金币</view>
			</view> -->
			
			<view class="lay_desc">
				<view class="">
					<view class="">
						盈利金额 = （任务收入 + 代理佣金 + 活动收入 + 加款）
					</view>
					<view class="">
						- （任务发布支出 + 活动支出 + 扣款）
					</view>
				</view>
<!-- 				<text class="" v-if="isOpenGold == 1">
					盈利金币 = 得到金币 + 代理奖励金币 - 消费金币
				</text> -->
			</view>
		</view>
		
		<view class="data_lack" v-show="!statisticsMonthShow">
			<view class="lack_box">
				<tui-icon name="nodata" :size="120"></tui-icon>
				<text class="lack_test">暂无数据</text>
				<!-- <button type="default" class="coin_query" hover-class="btn_hover">去获取金币</button> -->
			</view>
		</view>
		
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" @confirm="change" style="z-index:100000;"></tui-datetime>
		 
		 <tui-drawer mode="right" :visible="rightDrawer" @close="closeDrawer">
		 	<view class="d-container">
				<view class="search_time">
					<view class="search_test">
						<text>开始时间</text>
					</view>
					<view class="">
						<input type="text" value="" @tap="show(1)" v-model="begTime" :disabled="true" />
					</view>
				</view>
				<view class="search_time">
					<view class="search_test">
						<text>结束时间</text>
					</view>
					<view class="">
						<input type="text" value="" @tap="show(2)" v-model="endTime" :disabled="true" />
					</view>
				</view>
				<view class="search_time">
					<view class="search_test">
						<text>用户</text>
					</view>
					<view class="">
						<input type="text" value="" v-model="userName" />
					</view>
				</view>
				
				<view class="search_time">
					<view>
						<radio-group @change="radioChange">
							<label class="radio" style="margin-right: 30rpx;">
								<radio value="1" :checked="subType == 1" color="#FFCC33" style="transform:scale(0.8)"/>直属下级
							</label>
							<label class="radio">
								<radio value="2" color="#FFCC33" :checked="subType == 2" style="transform:scale(0.8)"/>所有下级
							</label>
						</radio-group>
					</view>
				</view>
								
				<view class="search_btn btn_style">
					<button type="default" @tap="getUserByClick" hover-class="btn_hover">查询</button>
				</view>
			</view>
		 </tui-drawer>
		 
		 <!--加载loadding-->
		 <tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>
		 <tui-nomore v-if="!pullUpOn"></tui-nomore>
		 <!--加载loadding-->
	</view>
</template>

<script>
import util from "@/common/util.js";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import tuiDatetime from "@/components/tui-datetime/tui-datetime.vue";
import tuiDrawer from "@/components/tui-drawer/tui-drawer.vue";
import tuiLoadmore from "@/components/tui-loadmore/tui-loadmore.vue";
import tuiNomore from "@/components/tui-nomore/tui-nomore.vue";
export default{
	components:{
		tuiDatetime,
		tuiDrawer,
		tuiLoadmore,
		tuiNomore
	},
	data() {
	    return {
			loadding: false, //加载数据提示
			pullUpOn: true,  //上拉加载数据
			rightDrawer: false,//抽屉开关
			
			StatisticsMonthEn: [],  //个人总览信息
			statisticsMonthShow: false,  //是否显示数据
			money: 0,  //盈利金额
			gold: 0,  //盈利金币
			
			begTime: "", //开始时间
			endTime: "", //结束时间
			type: 0,
			startYear: 1980,
			endYear: 2030,
			cancelColor: "#888",
			color: "#5677fc",
			setDateTime: "",
			num: null,    //区分开始时间和结束时间的标识
			uid: "",  //uid
			subType: 1, //单选框选中值 1:直属下级 2:所有下级
			userName: "",  //输入的用户id	
					
			isOpenGold: null,  //是否开启金币 0关闭 1开启
			
			userEn: [], //个人信息
	    };
	},
	onLoad(res) {
		if(res.userName){
			this.uid = res.userName;
			this.userName = res.userName;
		}
	},
	onShow() {
		if(util.isEmpty(this.userName)) this.uid = storage.getUid();  //获取uid
		this.getStatisticsMonth(this.uid);   //获取个人总览信息
		this.isOpenGold = storage.getOpenGold();  //获取是否开启金币
		this.userEn = storage.getMyInfo();   //获取个人信息
	},
	methods:{
		//点击查询按钮
		getUserByClick(){
			if(util.isEmpty(this.userName)){
				this.uid = storage.getUid();				 
			} 
			else{
				this.uid = this.userName;				
			}
			this.getStatisticsMonth(this.uid);  //获取个人总览信息
		},
		//单选框操作
		radioChange(evt){
			this.subType = parseInt(evt.detail.value);
		},
		//获取个人总览信息
		getStatisticsMonth(uid){
			this.closeDrawer();  //关闭抽屉
			let data = {
				uid: uid,
				page: 1,
				count: 10,
				subType: this.subType
			};
			console.log(data);
			if(!util.isEmpty(this.begTime)){
				let time = this.begTime + " 00:00:00";
				data.begFinishTime = time
			};		
			if(!util.isEmpty(this.endTime)){
				let time = this.endTime + " 23:59:59";
				data.endFinishTime = time;
			};
			api.getStatisticsMonthGroup(data, (res)=>{
				let data = api.getData(res).data;
				if(util.isEmpty(data)) this.statisticsMonthShow = false;
				else {
					this.StatisticsMonthEn = data[0];
					//保留二位小数
					this.StatisticsMonthEn.moneyTaskAdd = parseFloat(this.StatisticsMonthEn.moneyTaskAdd).toFixed(2);
					this.StatisticsMonthEn.moneyAgency = parseFloat(this.StatisticsMonthEn.moneyAgency).toFixed(2);
					this.StatisticsMonthEn.moneyActiveAdd = parseFloat(this.StatisticsMonthEn.moneyActiveAdd).toFixed(2);
					this.StatisticsMonthEn.moneyIns = parseFloat(this.StatisticsMonthEn.moneyIns).toFixed(2);
					
					this.StatisticsMonthEn.moneyTaskLose = parseFloat(this.StatisticsMonthEn.moneyTaskLose).toFixed(2);
					this.StatisticsMonthEn.moneyActiveLose = parseFloat(this.StatisticsMonthEn.moneyActiveLose).toFixed(2);
					this.StatisticsMonthEn.moneySubtract = parseFloat(this.StatisticsMonthEn.moneySubtract).toFixed(2);
					
					//计算盈利金额
					this.money = parseFloat(this.StatisticsMonthEn.moneyTaskAdd) + parseFloat(this.StatisticsMonthEn.moneyAgency)
					 + parseFloat(this.StatisticsMonthEn.moneyActiveAdd) + parseFloat(this.StatisticsMonthEn.moneyIns)
					 + parseFloat(this.StatisticsMonthEn.moneyTaskLose) + parseFloat(this.StatisticsMonthEn.moneyActiveLose)
					 + parseFloat(this.StatisticsMonthEn.moneySubtract);
					 
					 this.money = this.money.toFixed(2);
					//  //计算盈利金币
					// this.gold = (parseFloat(this.StatisticsMonthEn.goldAdd) + parseFloat(this.StatisticsMonthEn.goldAgency))
					//  - parseFloat(this.StatisticsMonthEn.goldLose);
					 
					this.statisticsMonthShow = true;
				}
			});
		},
		//上拉刷新
		onPullDownRefresh: function() {
			//延时为了看效果
			setTimeout(() => {
				this.getStatisticsMonth(this.uid);
				this.pullUpOn = true;
				this.loadding = false;
				uni.stopPullDownRefresh();
				uni.showToast({
					title: '刷新成功',
					icon: "none",
					duration: 1000
				});
			}, 200)
		},
		
		//关闭抽屉
		closeDrawer(e) {
			this.rightDrawer = false;
		},
		//打开抽屉
		openDrawer() {
			this.rightDrawer = true;
		},
		//区分开始时间和结束时间
		show(num){
			this.cancelColor = "#888";
			this.color = "#5677fc";
			this.setDateTime = "";
			this.startYear = 1980;
			this.endYear = 2030;
		    this.type = 2;
			switch (num){
				case 1:
					this.num = 1;
					break;
				case 2:
					this.num = 2;
					break;														
				default:
					break;
			}
			this.$refs.dateTime.show()
		},
		change: function(e) {
			switch (this.num){
				case 1:
					this.begTime = e.result;
					break;
				case 2:
					this.endTime = e.result;
					break;
				default:
					break;
			}
		},
	}
}
</script>

<style>
	page{
	    height: 100%;
	}
	.page{
	    height: 100%;
	}
	.search_column{
		display:flex;
		align-items: center;
		justify-content:center;
		margin-top:20rpx;
		font-size:16px;
		padding:0 40rpx 10rpx;
		box-sizing:border-box;
		border-bottom:1px solid #808080;
	}
	.search_column input{
		text-align:center;
	}
	.sea_btn button{
		font-size:12px;
		color:#fff;
		width:120rpx;
	}
	.d-container{
		padding:50rpx;
		font-size:15px;
	}
	.search_time{
		margin-top:40rpx;
	}
	.search_test{
		margin-bottom:20rpx;
	}
	.d-container input{
		border-bottom:1px solid #808080;
		color:#808080;
	}
	.search_btn{
		margin-top:100rpx;
	}
	.search_btn button{
		font-size:14px;
		color:#fff;
		border-radius:40rpx;
		padding:0 !important;
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
	
	
	
	.lay_info{
		width:100%;
		display:flex;
		flex-wrap: wrap;
		font-size:14px;
	}
	.lay_info>view:nth-child(3n+3){
		border-right: none;
	}
	.lay_box{
		width:33%;
		height:160rpx;
		text-align:center;
		display:flex;
		flex-direction: column;
		justify-content:center;
		align-items: center;
		border-bottom:1px solid #e3e3e3;
		border-right:1px solid #e3e3e3 ;
/* 		background-color:#fff;
		padding:0; 
		margin:0;
		border-radius:0; */
	}
	.boderNone{
		border-right: none;
	}
	.style_Numtest{
		color: #dc3b40;
		font-size:16px;
		margin-bottom:10rpx;
	}
	.lay_desc{
		width:100%;
		color: #dc3b40;
		padding:20rpx;
		box-sizing:border-box;
		border-bottom:1px solid #e3e3e3;
	}
	.lay_desc>view{
		width:100%;
	}
</style>
