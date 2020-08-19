<template>
    <view class="page">
		<!-- 筛选时间 -->
		<view class="search_column"  style="display:flex; justify-content: space-between;">
			<view class="" style="display:flex; align-items:center;" @tap="openDrawer">
<!-- 				<input type="text" value="" v-model="begTime" :disabled="true" @tap="openDrawer" placeholder="开始时间"/>
				<text>至</text>
				<input type="text" value="" v-model="endTime" :disabled="true" @tap="openDrawer" placeholder="结束时间"/> -->
				任务状态：
				<text v-if="arrayStateIndex == 0">进行中</text>
				<text v-if="arrayStateIndex == 1">未审核</text>
				<text v-if="arrayStateIndex == 2">已完成</text>
				<text v-if="arrayStateIndex == 3">任务失败</text>
				<text v-if="arrayStateIndex == 10">任务取消</text>
			</view>
			<view class="sea_btn btn_style">
				<button type="default" @tap="getTaskDetails" hover-class="btn_hover" style="padding: 0;">查询</button>
			</view>
		</view>
		<!-- 金币收入明细 -->
		<view class="gold_info">
			<view class="" v-show="showIncome">
				<tui-list-cell v-for="(item,index1) in incomeList" :key="index1" :arrow="true"
				style="display: flex; align-items: center; justify-content: space-between; padding:10rpx 30rpx;"
				@tap="toUpdWork(item)">
					<view class="info_left">
						<view class="info_title">{{item.title}}</view>
						<view>
							任务类型：
							<text v-if="item.type == 0">邀请好友</text>
							<text v-if="item.type == 1">分享朋友圈</text>
							<text v-if="item.type == 2">加好友</text>
							<text v-if="item.type == 3">下载app</text>
							<text v-if="item.type == 4">签到任务</text>
							<text v-if="item.type == 5">点赞任务</text>
						</view>
						<view class="info_time">接受时间：{{item.receiveTime}}</view>
						<view>
							状态：
							<text v-if="item.state == 0">进行中</text>
							<text v-if="item.state == 1">未审核</text>
							<text v-if="item.state == 2">已完成</text>
							<text v-if="item.state == 3">失败</text>
							<text v-if="item.state == 10">已放弃</text>
						</view>
					</view>
					<view class="" style="padding-right:40rpx; box-sizing: border-box;">
						<view class="info_right">
							<view class="" style="font-size:17px; margin-right:10rpx;">{{item.award}}</view>
							<view class="" v-if="item.awardType == 0">金币</view>
							<view class="" v-if="item.awardType == 1">现金</view>
						</view>
						<view class="info_time info_num">
							任务限时：{{item.doneLong | doneLong}}
						</view>
					</view>
				</tui-list-cell>
			</view>
			
			<view class="data_lack" v-show="!showIncome">
				<view class="lack_box">
					<tui-icon name="nodata" :size="120"></tui-icon>
					<text class="lack_test">暂无数据</text>
					<!-- <button type="default" class="coin_query" hover-class="btn_hover">去获取金币</button> -->
				</view>
			</view>

		</view>
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" @confirm="change" style="z-index:100000;"></tui-datetime>
		 
		 <tui-drawer mode="right" :visible="rightDrawer" @close="closeDrawer" style="position:relative; z-index: 999;">
		 	<view class="d-container">
				<view class="search_time">
					<view class="search_test">
						<text>任务状态</text>
					</view>
					<view class="uni-list-cell-db" style="border-bottom:1px solid #808080;">
						<picker @change="statePickerChange" :value="arrayState[arrayStateIndex].key" :range="arrayState" range-key="state" name="state">
							<view class="uni-input">{{arrayState[arrayStateIndex].state}}</view>
						</picker>
					</view>
				</view>
				<view class="search_time" v-if="arrayLevel.length > 0">
					<view class="search_test">
						<text>任务等级</text>
					</view>
					<view class="uni-list-cell-db" style="border-bottom:1px solid #808080;">
						<picker @change="levelPickerChange" :value="arrayLevel[arrayLevelIndex].key" :range="arrayLevel" range-key="val" name="level">
							<view class="uni-input">{{arrayLevel[arrayLevelIndex].val}}</view>
						</picker>
					</view>
				</view>
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
				<view class="search_btn btn_style">
					<button type="default" @tap="getTaskDetails" hover-class="btn_hover">确定</button>
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
import tran from "@/common/tran.js";
import tuiDatetime from "@/components/tui-datetime/tui-datetime.vue";
import tuiDrawer from "@/components/tui-drawer/tui-drawer.vue";
import tuiLoadmore from "@/components/tui-loadmore/tui-loadmore.vue";
import tuiNomore from "@/components/tui-nomore/tui-nomore.vue";
import tuiCollapse from "@/components/tui-collapse/tui-collapse.vue";
import tuiListCell from "@/components/tui-list-cell/tui-list-cell.vue";
import time from "@/common/time.js";
export default {
	components:{
		tuiDatetime,
		tuiDrawer,
		tuiLoadmore,
		tuiNomore,
		tuiCollapse,
		tuiListCell
	},
	filters:{
		doneLong(data){
			return time.timeChange(data);
		}
	},
    data() {
        return {
			arrayState: [
				{"state": "进行中", "key": 0}, 
				{"state": "未审核", "key": 1},
				{"state": "已完成", "key": 2},
				{"state": "任务失败", "key": 3},
				{"state": "任务取消", "key": 10},
			],   //任务状态列表
			arrayStateIndex: 0,
			state: null,	//选中的任务状态码
			
			
			loadding: false, //加载数据提示
			pullUpOn: true,  //上拉加载数据
			rightDrawer: false,//抽屉开关
			
			userEn: [],  //我的信息
			showIncome: false, // 收入明细列表是否显示
			incomeList:[]   ,//提现明细列表
			page: 1,  //查询页数
			
			
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
			current: -1,
			
			arrayLevel: [],   //任务等级列表
			arrayLevelIndex: 0,
			level: 0,	//选中的任务等级码
        };
    },
    onShow(){
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();  //获取我的信息		
		this.getTaskDetails();  //获取金币收入明细表
		this.getLevelDesc(); //获取会员等级列表
	},
	methods:{
		//获取会员等级列表
		getLevelDesc(){
			this.arrayLevel = storage.getLevelDescList();
		},
		//选择任务等级
		levelPickerChange(e){
			this.arrayLevelIndex = e.detail.value;
			this.arrayLevel.forEach((item, index) =>{
				 //获取选中的任务状态码
				if(this.arrayLevelIndex == index) this.level = item.key;
			});
		},
		
		//选择任务状态
		statePickerChange(e){
			this.arrayStateIndex = e.detail.value;
			this.arrayState.forEach((item, index) =>{
				 //获取选中的任务状态码
				if(this.arrayStateIndex == index) this.state = item.key;
			});
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
				this.getTaskDetails();
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
		// 判断金币收入明细表是否有数据
		isShowIncome(){
			if(util.isEmpty(this.incomeList)) this.showIncome = false;
			else this.showIncome = true;
		},
		//获取金币明细表
		getTaskDetails(){
			this.closeDrawer();  //关闭抽屉
			this.page = 1;
			let data = {
				doneUid: this.uid,
				page: this.page,
				count: 10,
				level: parseInt(this.level)
			};
		if(!util.isEmpty(this.state)) data.state = this.state;
		if(!util.isEmpty(this.begTime)){
			let time = this.begTime + " 00:00:00";
			data.begAddTime = time
		};		
		if(!util.isEmpty(this.endTime)){
			let time = this.endTime + " 23:59:59";
			data.endAddTime = time;
		};
		api.getTaskDetails(data, (res)=>{
			let data = api.getData(res).data;
			if(util.isEmpty(data)) this.showIncome = false;
				 //this.isShowIncome();  //控制金币收入明细表显示
			else{
				this.incomeList = data;
				this.showIncome = true;
			}
		});
		},
		//跳转查看我接受的任务界面
		toUpdWork(item){
			// uni.navigateTo({
			// 	url: "/pages/workList/workUpd/workUpd?id=" + data.id
			// })
			uni.navigateTo({
				url: "/pages/workExplain/workExplain?id=" + item.id + "&type=2" 
			});
		},
	},
	//上拉获取更多金币收益明细数据
	onReachBottom(){
		if (!this.pullUpOn) return;
		if(!this.showIncome) return;
		this.loadding = true;
		this.page = this.page + 1;
		
		api.getTaskDetails({
			doneUid: this.uid,
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
					this.incomeList.push(item);
				});
			}
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
		
	}
	.incomeTime{
		display:flex;
		flex-direction: column;
	}
	.info_from{
		margin-bottom:10rpx;
		font-size:14px;
	}
	.info_time{
		font-size:12px;
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
		margin-right:10rpx;
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
	.info_right{
		display:flex; 
		padding-right:40rpx; 
		box-sizing:border-box; 
		align-items: center;
		color:#dc3b40;
	}
	.info_left>view{
		margin-bottom:10rpx;
	}
	.info_title{
		font-size:15px;
		font-weight:bold;
	}
	.info_num{
		margin-top:10rpx;
	}
</style>

