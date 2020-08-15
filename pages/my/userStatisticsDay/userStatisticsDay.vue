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
		
		<view class="lay_table" v-show="statisticsDayShow">			
			<view class="lay_row">
				<block v-for="(item,index) in statisticsDayEn" :key="index">
					<tui-collapse :index="index" :current="current" :disabled="item.disabled" @click="change3">
						<template v-slot:title>
							<tui-list-cell :hover="!item.disabled" 
							style="display: flex; flex-direction: column; padding:20rpx; box-sizing: border-box;">
									<view class="lay_group" style="margin-bottom:10rpx;">
										<view class="" style="width:50%; font-weight:bold;">
											交易日期：<text class="lay_group_title" style="font-weight:normal;">{{item.addTime}}</text>
										</view>
										<view class="" style="width:50%; font-weight:bold;">
											收入：<text class="lay_group_title" style="font-weight:normal;">￥{{item.moneyAdd}}</text>
										</view>
									</view>
									<view class="lay_group">
										<view class="" style="width:50%; font-weight:bold;">
											用户：<text class="lay_group_title" style="font-weight:normal;">{{item.uid}}</text>
										</view>
										<view class="" style="width:50%; font-weight:bold;">
											得到金币：<text class="lay_group_title" style="font-weight:normal;">￥{{item.goldAdd}}</text>
										</view>
									</view>
			<!-- 					<view class="lay_group">
									<view class="" style="width:50%;">
										用户账号：<text>user10</text>
									</view>
									<view class="">
										类型：<text>代理</text>
									</view>
								</view> -->
								
			<!-- 					<view class="lay_group">
									<view class="" style="width:50%;">
										盈亏：<text class="style_Numtest">0.00</text>
									</view>
									<view class="">
										盈亏：<text class="style_Numtest">0.00</text>
									</view>
								</view> -->
							</tui-list-cell>
						</template>
						<template v-slot:content>
							<view class="lay_info">
								<view class="lay_group">
									<view class="" style="width:50%;">
										前一天余额：<text class="style_Numtest">￥{{item.moneyOld}}</text>
									</view>
									<view class="">
										收入：<text class="style_Numtest">￥{{item.moneyAdd}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										代理佣金：<text class="style_Numtest">￥{{item.moneyAgency}}</text>
									</view>
									<view class="">
										支出：<text class="style_Numtest">￥{{item.moneyLose}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										充值次数：<text class="style_Numtest">{{item.rechargeSum}}</text>
									</view>
									<view class="">
										提现次数：<text class="style_Numtest">{{item.drawSum}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										前一天金币：<text class="style_Numtest">{{item.goldOld}}</text>
									</view>
									<view class="">
										得到金币：<text class="style_Numtest">{{item.goldAdd}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										代理奖励金币：<text class="style_Numtest">{{item.goldAgency}}</text>
									</view>
									<view class="">
										消耗金币：<text class="style_Numtest">{{item.goldLose}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										任务次数：<text class="style_Numtest">{{item.taskSum}}</text>
									</view>
									<view class="">
										备注：<text class="style_Numtest">{{item.desc}}</text>
									</view>
								</view>
							</view>
						</template>
					</tui-collapse>
				</block>
			</view>
		</view>
		
		<view class="data_lack" v-show="!statisticsDayShow">
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
						<text>用户名</text>
					</view>
					<view class="">
						<input type="text" value="" v-model="userName" />
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
			page: 1,
			
			statisticsDayEn: [],  //个人总览信息
			statisticsDayShow: false,  //是否显示数据
			
			current: -1,
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
			userName: "",  //输入的用户id
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
		this.getStatisticsDay(this.uid);   //获取个人总览信息
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
			this.getStatisticsDay(this.uid);  //获取个人总览信息
		},
		//获取个人总览信息
		getStatisticsDay(uid){
			this.page = 1;
			let data = {
				uid: uid,
				page: this.page,
				count: 10
			};
			if(!util.isEmpty(this.begTime)){
				let time = this.begTime + " 00:00:00";
				data.begFinishTime = time
			};		
			if(!util.isEmpty(this.endTime)){
				let time = this.endTime + " 23:59:59";
				data.endFinishTime = time;
			};
			api.getStatisticsDay(data, (res)=>{
				let data = api.getData(res).data;
				if(util.isEmpty(data)) this.statisticsDayShow = false;
				else {
					data.forEach((item, index) =>{
						item.current = -1;
						item.disabled = false;
						if(index == 0) item.current = 0;
					});
					this.statisticsDayEn = data;
					this.statisticsDayShow = true;
				}
			});
			this.closeDrawer();  //关闭抽屉
		},
		//折叠面板
		change3(e) {
			//可关闭自身
			this.current = this.current == e.index ? -1 : e.index
		},
		//上拉刷新
		onPullDownRefresh: function() {
			//延时为了看效果
			setTimeout(() => {
				this.getStatisticsDay(this.uid);
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
		//上拉获取更多数据
		onReachBottom(){
			if (!this.pullUpOn) return;
			this.loadding = true;
			this.page = this.page + 1;
			
			api.getStatisticsDay({
				uid: this.uid,
				state: 1,
				page: this.page,
				count: 10
			}, (res)=>{
				let data = api.getData(res).data;
				if(util.isEmpty(data)){
					this.loadding = false;
					this.pullUpOn = false;
				}else{
					this.loadding = false;
					data.forEach((item) =>{
						this.statisticsDayEn.push(item);
					});
				}
			});
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
	
	
	
	.lay_group{
		display: flex; 
		flex-direction: row;
	}
	.style_Numtest{
		color: #dc3b40;
	}
	.lay_info{
		display: flex; 
		flex-direction: column; 
		padding:20rpx;
		box-sizing: border-box;
		font-size:14px;
	}
	.lay_group_title{
		color:#808080;
		font-size:13px;
	}
	.lay_info>.lay_group{
		margin-bottom:16rpx;
	}
</style>

