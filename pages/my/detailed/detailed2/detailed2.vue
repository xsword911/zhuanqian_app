<template>
    <view class="page">
        <tabControl :current="current" :values="items" bgc="#fff" :fixed="true" 
		:scrollFlag='true' :isEqually='true' @clickItem="onClickItem"></tabControl>
        <!-- 使用 swiper 配合 滑动切换 -->
        <swiper class="swiper" @change='scollSwiper' :current='current' id="page" style="display: flex;">
			<!-- 转换明细 -->
            <swiper-item class="swiper_item" style="flex: 1;">
				<scroll-view scroll-y="true" class="sv" :show-scrollbar="true">
					<view class="item0" >
						<view class="income" v-for="(item,index) in moneyTranList" :key='index' v-show="moneyTranShow" @tap="moneyTranOpen(item.id)">
							<view class="incomeTime">
								<text v-show="item.type == 0">金币转换现金</text>
								<text v-show="item.type == 1">现金转换金币</text>
								<view class="moneyTran_time">
									{{item.addTime}}
								</view>
							</view>
							
							<view class="incomeNum">
								<text>{{item.money}} 元</text>
								<view class="open">
									<tui-icon name="arrowdown" :size="20" v-show="!item.openMoneyTranTag"></tui-icon>
									<tui-icon name="arrowup" :size="20" v-show="item.openMoneyTranTag"></tui-icon>
								</view>
							</view>
							
							<view class="open_box" v-show="item.id == openMoneyTranId">
								<view class="open_column">
									<view class="open_test">账单号：</view>
									<text class="income_data" selectable="true">{{item.sn}}</text>
								</view>
								<view class="open_column">
									<view class="open_test">金币</view>
									<text class="income_data" selectable="true">{{item.gold}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

				
				<view class="data_lack" v-show="!moneyTranShow">
					<view class="lack_box">
						<tui-icon name="nodata" :size="120"></tui-icon>
						<text class="lack_test">暂无数据</text>
						<button type="default" class="coin_query">去提现</button>
					</view>
				</view>
            </swiper-item>
			
			<!-- 提现明细 -->
            <swiper-item class="swiper_item" >
				<scroll-view scroll-y="true" id="swiper" :show-scrollbar="true">
					<view class="item1" >
						<view class="income" v-for="(item,index) in extractMoneyList" :key='index' v-show="moneyDrawShow" @tap="moneyDrawopen(item.id)">
							<view class="incomeTime">
								<text>{{item.addTime}}</text>
							</view>
							
							<view class="incomeNum">
								<text>+ {{item.money}} 元</text>
								<view class="open">
									<tui-icon name="arrowdown" :size="20" v-show="!item.openMoneyDrawTag"></tui-icon>
									<tui-icon name="arrowup" :size="20" v-show="item.openMoneyDrawTag"></tui-icon>
								</view>
							</view>
							
							<view class="open_box" v-show="item.id == openMoneyDrawId">
								<view class="open_column">
									<view class="open_test">账单号：</view>
									<text class="income_data" selectable="true">{{item.sn}}</text>
								</view>
								<view class="open_column">
									<view class="open_test">状态：</view>
									<text class="income_data" v-show="item.state == 0">未审核</text>
									<text class="income_data" v-show="item.state == 1">审核通过</text>
									<text class="income_data" v-show="item.state == 2">审核未通过</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				
				<view class="data_lack" v-show="!moneyDrawShow">
					<view class="lack_box">
						<tui-icon name="nodata" :size="120"></tui-icon>
						<text class="lack_test">暂无数据</text>
						<button type="default" class="coin_query">去提现</button>
					</view>
				</view>
            </swiper-item>
			

			<!-- 账变明细 -->
            <swiper-item class="swiper_item">
				<scroll-view scroll-y="true" id="swiper"  :show-scrollbar="true">
					<view class="item2" >
						<view class="income" v-for="(item,index) in moneyList" :key='index' v-show="moneyShow" @tap="moneyOpen(item.id)">
							<view class="incomeTime">
								<text v-show="item.type == 0">金币转换现金</text>
								<text v-show="item.type == 101">现金转换金币</text>
								<text class="income_data" v-show="item.type > 0 && item.type < 100">收入</text>
								<text class="income_data" v-show="item.type >= 100 && item.type <= 200 && item.type != 101">支出</text>
								<view class="moneyTran_time">
									{{item.addTime}}
								</view>
							</view>
							
							<view class="incomeNum">
								<text>{{item.money}} 元</text>
								<view class="open">
									<tui-icon name="arrowdown" :size="20" v-show="!item.openMoneyTag"></tui-icon>
									<tui-icon name="arrowup" :size="20" v-show="item.openMoneyTag"></tui-icon>
								</view>
							</view>
							
							<view class="open_box" v-show="item.id == openMoneyId">
								<view class="open_column">
									<view class="open_test">账单号：</view>
									<text class="income_data" selectable="true">{{item.sn}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				
				<view class="data_lack" v-show="!moneyShow">
					<view class="lack_box">
						<tui-icon name="nodata" :size="120"></tui-icon>
						<text class="lack_test">暂无数据</text>
						<button type="default" class="coin_query">去提现</button>
					</view>
				</view>
            </swiper-item>

        </swiper>
    </view>
</template>

<script>
import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
import util from "@/common/util.js";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
export default {
    components: { tabControl },
    data() {
        return {
			userEn: [], //我的信息
            items: ['转换明细', '提现明细', '账变流水'],
            current: 0,
			
			extractMoneyList:[],   //提现明细列表
			moneyDrawShow: true,  //提现明细列表是否显示
			moneyDrawPage: 1,  //提现记录查询页数
			openMoneyDrawTag: false,  //展开图表控制
			openMoneyDrawId: null,  //展开内容盒子的id
			
			moneyTranList:[],   //金额转换列表
			moneyTranShow: false,  //金额转换列表是否显示
			moneyTranPage: 1,  //金额转换记录查询页数
			openMoneyTranTag: false,  //展开图表控制
			openMoneyTranId: null,  //展开内容盒子的id
			
			moneyList:[],   //账变记录列表
			moneyShow: false,  //账变记录列表是否显示
			moneyPage: 1,  //账变记录记录查询页数
			openMoneyTag: false,  //展开图表控制
			openMoneyId: null,  //展开内容盒子的id
			
			swiperHeight: 1400,  //外部的高度
			listHeight:0,  //内部的高度
			navHeight: 0,  //scorllView高度
			pH:0, //窗口高度
        };
    },
	onReady() {
			let that=this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success(res) { //成功回调函数
					that.pH=res.windowHeight //windoHeight为窗口高度，主要使用的是这个

					let titleH=uni.createSelectorQuery().select(".sv"); //想要获取高度的元素名（class/id）
					titleH.boundingClientRect(data=>{
						let pH=that.pH; 
						that.navHeight=pH-data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})
	},
	onLoad(res) {
		if(res.type) this.current = parseInt(res.type);
	},
    onShow() {
    	this.userEn = storage.getMyInfo();  //获取我的信息
		this.getMoneyTran();  //获取金额转换记录
		this.getMoneyDraw();  //获取提现记录
		this.getMoney();  //获取账变记录
    },
    methods: {
		//获取账变记录
		getMoney(){
			api.getMoney({
				account: this.userEn.account, 
				page: this.moneyTranPage, 
				count: 10,
			}, (res)=>{
				let data = api.getData(res).data;
				if(util.isEmpty(data))
					 this.isShowMoney();  //控制转换收入明细表显示;
				else{
					data.forEach((item) =>{
						data.openMoneyTag = false;
					});
					this.moneyList = data;
					this.moneyShow = true;
				}
			});
		},
		// 判断账变记录列表是否有数据
		isShowMoney(){
			if(util.isEmpty(this.moneyList)) this.moneyShow = false;
			else this.moneyShow = true;
		},
		//账变记录列表展开内容
		moneyOpen(id){
			if(this.openMoneyId == id){
				this.openMoneyId = -1;				
			} 
			else
			 this.openMoneyId = id;
			
			this.moneyList.forEach((item) =>{
				if(item.id == this.openMoneyId){
					item.openMoneyTag = true;
				}else{
					item.openMoneyTag = false;
				}
			});
		},
		
		
		//获取金额转换记录
		getMoneyTran(){
			api.getMoneyTran({
				account: this.userEn.account, 
				page: this.moneyTranPage, 
				count: 10,
			}, (res)=>{
				let data = api.getData(res).data;
				if(util.isEmpty(data))
					 this.isShowMoneyTran();  //控制转换收入明细表显示;
				else{
					data.forEach((item) =>{
						data.openMoneyTranTag = false;
					});
					this.moneyTranList = data;
					this.moneyTranShow = true;
				}
			});
		},
		// 判断金额转换记录列表是否有数据
		isShowMoneyTran(){
			if(util.isEmpty(this.moneyTranList)) this.moneyTranShow = false;
			else this.moneyTranShow = true;
		},
		//金额转换记录列表展开内容
		moneyTranOpen(id){
			if(this.openMoneyTranId == id){
				this.openMoneyTranId = -1;				
			} 
			else
			 this.openMoneyTranId = id;
			
			this.moneyTranList.forEach((item) =>{
				if(item.id == this.openMoneyTranId){
					item.openMoneyTranTag = true;
				}else{
					item.openMoneyTranTag = false;
				}
			});
		},
		
		
		//获取提现记录
		getMoneyDraw(){
			api.getMoneyDraw({
				account: this.userEn.account, 
				page: this.moneyDrawPage, 
				count: 12,
			}, (res)=>{
				let data = api.getData(res).data;
				if(util.isEmpty(data))
					 this.isShowMoneyDraw();  //控制金币收入明细表显示
				else{
					data.forEach((item) =>{
						data.openMoneyDrawTag = false;
					});
					this.extractMoneyList = data;
					this.moneyDrawShow = true;
				}
			});
		},
		// 判断提现明细列表是否有数据
		isShowMoneyDraw(){
			if(util.isEmpty(this.extractMoneyList)) this.moneyDrawShow = false;
			else this.moneyDrawShow = true;
		},
		//提现列表展开内容
		moneyDrawopen(id){
			if(this.openMoneyDrawId == id){
				this.openMoneyDrawId = -1;				
			} 
			else
			 this.openMoneyDrawId = id;
			
			this.extractMoneyList.forEach((item) =>{
				if(item.id == this.openMoneyDrawId){
					item.openMoneyDrawTag = true;
				}else{
					item.openMoneyDrawTag = false;
				}
			});
		},
		
		
		onClickItem(val) {
		    this.current = val.currentIndex
		},
		//获取高度
			// getlistHeight(list){
			// 	let _this = this
			// 	let info = uni.createSelectorQuery().select(list);
			// 	info.boundingClientRect(function(data) {
			// 		// console.log(data)  // 获取元素的各种参数
			// 		console.log(data.height);
			// 		 _this.listHeight = data.height ; // 获取元素高度
			// 		_this.getHeight();
			// 	}).exec();
			// },
			// //给外部Swiper进行高度赋值
			// getHeight(){
			// 	let _this = this;
			// 	_this.swiperHeight = _this.listHeight;
			// 	return _this.swiperHeight;
			// },
		//选项卡切换
		scollSwiper(e){
		    this.current = e.target.current;
				 //    let _this = this;
					// // 不同的tab不同的高度赋不同的值
					// if(e.target.current==0){
					// 	let list = ".item0";
					// 	_this.getlistHeight(list);
					// }else if(e.target.current==1){
					// 	let list = ".item1";
					// 	_this.getlistHeight(list);
					// }else if(e.target.current==2){
					// 	let list = ".item2";
					// 	_this.getlistHeight(list);
					// }
		},
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
	.swiper{
		height: 100%;
	}
	.swiper_item{
		padding-top:55px;		
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
	.incomeNum{
		display:flex;
		align-items:center;
	}
	.open{
		margin-left:10rpx;
	}
	.open_box{
		margin-top:20rpx;
		width:100%;
	}
	.open_column{
		display:flex;
		align-items:center;
	}
	.open_test{
		width:25%;
	}
	.moneyTran_time{
		margin-top:10rpx;
		font-size:12px;
		color:#808080;
	}
</style>