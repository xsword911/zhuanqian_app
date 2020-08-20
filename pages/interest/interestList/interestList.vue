<template>
    <view class="page">
		<!-- 筛选时间 -->
		<view class="search_column"  style="display:flex; justify-content: space-between;">
<!-- 			<view class="" style="display:flex; align-items:center;">
				<input type="text" value="" v-model="begTime" :disabled="true" @tap="openDrawer" placeholder="开始时间"/>
				<text>至</text>
				<input type="text" value="" v-model="endTime" :disabled="true" @tap="openDrawer" placeholder="结束时间"/>
			</view> -->
			<view class="" style="display:flex; align-items:center;" @tap="openDrawer">
				存取状态：
				<text v-if="arrayStateIndex == 0">在存</text>
				<text v-if="arrayStateIndex == 1">已取出</text>
			</view>
			<view class="sea_btn btn_style">
				<button type="default" @tap="getTaskDetails" hover-class="btn_hover" style="padding: 0;">查询</button>
			</view>
		</view>
		<!-- 金币收入明细 -->
		<view class="gold_info">
			<view class="income" v-for="(item,index) in incomeList" :key='index'  v-show="showIncome" @tap="open(item.id)">
				<view class="incomeTime">
					<view class="" style="display:flex;">
						<text class="info_from takeout_title" v-show="item.state == 0">转入利息宝</text>
						<text class="info_from store_title" v-show="item.state == 1">利息宝转出</text>
						
						<view class="" style="margin-left:20rpx;">
							<text>{{item.planName}}</text>(<text>{{item.planDays}}天</text>)
						</view>
					</view>
					
					<view class="">
						<text class="info_time" style="display:inline-block; margin-right:40rpx;">存入金额：{{item.addMoney}}</text>
						<text class="info_time" v-if="item.state == 1">取出金额：{{item.outMoney}}</text>
					</view>
					
					<view class="">
						<text class="info_time">存入时间：{{item.addTime}}</text>
					</view>
					
					<view class="">
						<text class="info_time" v-show="item.state == 1">取出时间：{{item.outTime}}</text>
					</view>
				</view>
				
				<view class="incomeNum">
					<view class="operation_box">
						<text v-show="item.state == 1">已取出</text>
						<button type="default" v-show="item.state == 0" hover-class="btn_hover" 
						@click.stop="moneyFetch(item)">取出</button>
					</view>
					
					<view class="open">
						<tui-icon name="arrowdown" :size="20" v-show="!item.openTag"></tui-icon>
						<tui-icon name="arrowup" :size="20" v-show="item.openTag"></tui-icon>
					</view>
				</view>
				
				<view class="open_box" v-show="item.id == openId">
					<view class="">
						交易订单号：<text class="">{{item.sn}}</text>
					</view>
					<view class="" style="display:flex;">
						<view class="" style="width:50%;">
							存款利率：<text class="">{{item.planRate / 100}}%</text>
						</view>
						<view class="">
							服务费利率：<text class="">{{item.planServe / 100}}%</text>
						</view>
					</view>
					<view class="" style="display:flex;">
						<view class="" v-if="item.state != 0" style="width:50%;">
							手续费：<text class="">{{item.serveMoney}}</text>
						</view>
						
						<view class="" v-if="item.state == 1">
							利息：<text class="">{{item.rateMoney}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="data_lack" v-show="!showIncome">
				<view class="lack_box">
					<tui-icon name="nodata" :size="120"></tui-icon>
					<text class="lack_test">暂无数据</text>
					<button type="default" class="coin_query" hover-class="btn_hover">去获取金币</button>
				</view>
			</view>

		</view>
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" @confirm="change" style="z-index:100000;"></tui-datetime>
		 
		 <tui-drawer mode="right" :visible="rightDrawer" @close="closeDrawer" style="position:relative; z-index: 999;">
		 	<view class="d-container">
				<view class="search_time">
					<view class="search_test">
						<text>存取状态</text>
					</view>
					<view class="uni-list-cell-db" style="border-bottom:1px solid #808080;">
						<picker @change="statePickerChange" :value="arrayState[arrayStateIndex].key" :range="arrayState" range-key="state" name="state">
							<view class="uni-input">{{arrayState[arrayStateIndex].state}}</view>
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
import tuiDatetime from "@/components/tui-datetime/tui-datetime.vue";
import tuiDrawer from "@/components/tui-drawer/tui-drawer.vue";
import tuiLoadmore from "@/components/tui-loadmore/tui-loadmore.vue";
import tuiNomore from "@/components/tui-nomore/tui-nomore.vue";
export default {
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
			
			userEn: [],  //我的信息
			showIncome: true, // 收入明细列表是否显示
			incomeList:[]   ,//提现明细列表
			openTag: false,  //展开图表控制
			// openBox: false,  //控制内容盒子是否打开
			openId: null,  //展开内容盒子的id
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
			
			arrayState: [
				{"state": "在存", "key": 0}, 
				{"state": "已取出", "key": 1},
			],   //存取状态列表
			arrayStateIndex: 0,
			state: 0,	//选中的存取状态码
        };
    },
    onShow(){
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();  //获取我的信息		
		this.getTaskDetails();  //获取金币收入明细表		
	},
	methods:{
		//选择存取状态
		statePickerChange(e){
			this.arrayStateIndex = e.detail.value;
			this.arrayState.forEach((item, index) =>{
				 //获取选中的存取状态码
				if(this.arrayStateIndex == index) this.state = item.key;
			});
		},
		
		//转出余额宝
		moneyFetch(data){
			let _this = this;
			let serveMoney = util.isEmpty(data.serveMoney) ? 0 : data.serveMoney;  //计算手续费
			uni.showModal({
				content: "提前取出没有收益，并扣除手续费:" + serveMoney,
				success(res) {
					if(res.confirm){
						api.planMoneyOut({id: data.id}, (res)=>{
							let code = api.getCode(res);
							if(code == 0){
								uni.showToast({
									title: "余额宝取出成功",
									icon: "none"
								});
								_this.getTaskDetails();  //刷新余额宝存取列表
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
		// 判断余额宝存取列表是否有数据
		isShowIncome(){
			if(util.isEmpty(this.incomeList)) this.showIncome = false;
			else this.showIncome = true;
		},
		//获取余额宝存取列表
		getTaskDetails(){
			this.closeDrawer();
			this.page = 1;
			let data = {
				uid: this.uid,
				page: this.page,
				count: 10,
				state: this.state
			};
		// if(!util.isEmpty(this.state)) data.state = this.state;
		if(!util.isEmpty(this.begTime)){
			let time = this.begTime + " 00:00:00";
			data.begAddTime = time
		};		
		if(!util.isEmpty(this.endTime)){
			let time = this.endTime + " 23:59:59";
			data.endAddTime = time;
		};
		api.getPlanMoney(data, (res)=>{
			let data = api.getData(res).data;
			if(util.isEmpty(data)) this.showIncome = false;
				 //this.isShowIncome();  //控制金币收入明细表显示
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
	//上拉获取更多余额宝存取列表数据
	onReachBottom(){
		if (!this.pullUpOn) return;
		this.loadding = true;
		this.page = this.page + 1;
		
		api.getPlanMoney({
			uid: this.uid,
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
	
	
	.takeout_title{
		color:#2C962C;
	}
	.store_title{
		color:#FF0000;
	}
	.operation_box>button{
		font-size:12px;
		border: 1px solid #464646;
		background-color:transparent;
		padding:0 16rpx;
		box-sizing:border-box;
		line-height:2;
	}
</style>
