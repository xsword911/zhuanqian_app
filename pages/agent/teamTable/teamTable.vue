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
		
		<view class="lay_table" v-if="teamTableShow">
			<view class="lay_row">
				<block v-for="(item,index) in teamTableEn" :key="index">
					<tui-collapse :index="index" :current="current" :disabled="item.disabled" @click="change3">
						<template v-slot:title>
							<tui-list-cell :hover="!item.disabled" 
							style="display: flex; flex-direction: column; padding:20rpx; box-sizing: border-box;">
									<view class="lay_group" style="margin-bottom:10rpx;">
										<view class="" style="width:50%; font-weight:bold;">
											日期：<text class="lay_group_title" style="font-weight:normal;">{{item.addTime}}</text>
										</view>
										<view class="" style="width:50%; font-weight:bold;">
											充值：<text class="lay_group_title" style="font-weight:normal;">￥{{item.rechargeMoney}}</text>
										</view>
									</view>
									<view class="lay_group" style="margin-bottom:10rpx;">
										<view class="" style="width:50%; font-weight:bold;">
											用户：<text class="lay_group_title" style="font-weight:normal;">{{item.uid}}</text>
										</view>
										<view class="" style="font-weight:bold;">
											盈利：<text class="lay_group_title" style="font-weight:normal;">￥{{item.money}}</text>
										</view>
									</view>
								
<!-- 								<view class="lay_group">
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
										任务收入：<text class="style_Numtest">￥{{item.moneyTaskAdd}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										发布支出：<text class="style_Numtest">￥{{item.moneyTaskLose}}</text>
									</view>
									<view class="">
										任务次数：<text class="style_Numtest">{{item.taskSum}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										活动收入：<text class="style_Numtest">￥{{item.moneyActiveAdd}}</text>
									</view>
									<view class="">
										活动支出：<text class="style_Numtest">￥{{item.moneyActiveLose}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										充值次数：<text class="style_Numtest">{{item.rechargeSum}}</text>
									</view>
									<view class="">
										充值：<text class="style_Numtest">￥{{item.rechargeMoney}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										首充金额：<text class="style_Numtest">￥{{item.firstRechargeMoney}}</text>
									</view>
									<view class="" style="width:50%;">
										提现次数：<text class="style_Numtest">{{item.drawSum}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										提现：<text class="style_Numtest">￥{{item.drawMoney}}</text>
									</view>
									<view class="" style="width:50%;">
										加款：<text class="style_Numtest">￥{{item.moneyIns}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="" style="width:50%;">
										扣款：<text class="style_Numtest">￥{{item.moneySubtract}}</text>
									</view>
									<view class="" style="width:50%;">
										代理佣金：<text class="style_Numtest">{{item.moneyAgency}}</text>
									</view>
								</view>
								
								<view class="lay_group">
									<view class="">
										当天注册：<text class="style_Numtest">{{item.isRegisterTodayTip}}</text>
									</view>
								</view>
							</view>
						</template>
					</tui-collapse>
				</block>
			</view>
		</view>
		
		<view class="data_lack" v-show="!teamTableShow">
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
				<view class="search_time">
<!-- 					<view class="search_test">
						<text>选择</text>
					</view> -->
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
import tuiCollapse from "@/components/tui-collapse/tui-collapse.vue";
import tuiListCell from "@/components/tui-list-cell/tui-list-cell.vue";
export default{
	components:{
		tuiDatetime,
		tuiDrawer,
		tuiLoadmore,
		tuiNomore,
		tuiCollapse,
		tuiListCell
	},
	data() {
	    return {
			loadding: false, //加载数据提示
			pullUpOn: true,  //上拉加载数据
			rightDrawer: false,//抽屉开关
			
			current: -1,
			teamTableEn: [],
			teamTableShow: false,  //是否显示数据
			page: 1,  //查询页数
			
			begTime: "", //开始时间
			endTime: "", //结束时间
			userName: "", //输入的用户名
			subType: 1, //单选框选中值 1:直属下级 2:所有下级
			type: 0,
			startYear: 1980,
			endYear: 2030,
			cancelColor: "#888",
			color: "#5677fc",
			setDateTime: "",
			num: null,    //区分开始时间和结束时间的标识
			uid: "",  //uid
			
			isOpenGold: null,  //是否开启金币 0关闭 1开启
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
		this.getTeamTableEn(this.uid);   //获取团队报表
		this.isOpenGold = storage.getOpenGold();  //获取是否开启金币
	},
	methods:{
		//单选框操作
		radioChange(evt){
			this.subType = parseInt(evt.detail.value);
		},
		//点击查询按钮
		getUserByClick(){
			if(util.isEmpty(this.userName)){
				this.uid = storage.getUid();	
			} 
			else{
				this.uid = this.userName;				
			}
			this.getTeamTableEn(this.uid);  //获取个人总览信息
		},
		//折叠面板
		change3(e) {
			//可关闭自身
			this.current = this.current == e.index ? -1 : e.index
		},
		//获取个人总览信息
		getTeamTableEn(uid){
			this.page = 1;
			this.closeDrawer();  //关闭抽屉
			let data = {
				uid: uid,
				page: this.page,
				count: 10,
				subType: this.subType
			};
			if(!util.isEmpty(this.begTime)){
				let time = this.begTime + " 00:00:00";
				data.begFinishTime = time
			};		
			if(!util.isEmpty(this.endTime)){
				let time = this.endTime + " 23:59:59";
				data.endFinishTime = time;
			};
			api.getStatisticsDayGroup(data, (res)=>{
				let data = api.getData(res).data;
				if(util.isEmpty(data)) this.teamTableShow = false;
				else {
					data.forEach((item, index) =>{
						item.current = -1;
						item.disabled = false;
						//保留二位小数处理
						item.moneyOld = parseFloat(item.moneyOld).toFixed(2);  //前一天余额
						
						item.moneyAgency = parseFloat(item.moneyAgency).toFixed(2);  //代理佣金
						item.moneyIns = parseFloat(item.moneyIns).toFixed(2);  //加款
						item.moneyActiveAdd = parseFloat(item.moneyActiveAdd).toFixed(2);  //活动收入
						item.moneyTaskAdd = parseFloat(item.moneyTaskAdd).toFixed(2);  //任务收入
						item.rechargeMoney = parseFloat(item.rechargeMoney).toFixed(2);  //充值
						
						item.moneyActiveLose = parseFloat(item.moneyActiveLose).toFixed(2);  //活动支出
						item.moneyTaskLose = parseFloat(item.moneyTaskLose).toFixed(2);  //任务支出
						item.moneySubtract = parseFloat(item.moneySubtract).toFixed(2);  //扣款
						
						//计算盈利金额
						item.money = parseFloat(item.moneyTaskAdd) + parseFloat(item.moneyAgency)
						 + parseFloat(item.moneyActiveAdd) + parseFloat(item.moneyIns)
						 + parseFloat(item.moneyTaskLose) + parseFloat(item.moneyActiveLose)
						 + parseFloat(item.moneySubtract);
						 
						 item.money = item.money.toFixed(2);
						 
						 if(item.isRegisterToday == 0) item.isRegisterTodayTip = "否";
						 if(item.isRegisterToday == 1) item.isRegisterTodayTip = "是";
					});
					this.teamTableEn = data;
					this.teamTableShow = true;
				}
			});
		},
		//上拉刷新
		onPullDownRefresh: function() {
			//延时为了看效果
			setTimeout(() => {
				this.getTeamTableEn(this.uid);
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
			
			api.getTaskDetails({
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
						this.teamTableEn.push(item);
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
		padding:10rpx 40rpx;
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


