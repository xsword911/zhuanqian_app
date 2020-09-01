<template>
    <view class="tabs">
		<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" class="tab_class"
		:scrollFlag='true' :isEqually='true' @clickItem="onClickItem"></tabControl>
		
		
        <swiper :current="current" class="swiper-box" style="flex: 1;" :duration="200" @change="ontabchange">
			
			<swiper-item class="swiper-item" style="flex: 1;">
				<scroll-view scroll-y="true" class="sv" :show-scrollbar="true" style="flex: 1;" v-show="moneyTranShow" 
				@scrolltolower="getMoneyTran(1)" lower-threshold="40" :refresher-enabled="true"
				@refresherrefresh="onRefresh" @refresherrestore="onRestore" :refresher-triggered="triggered">
					<view class="item0" >
						<!-- 筛选时间 -->
						<view class="search_column">
							<view class="" style="display:flex; align-items:center;">
								<input type="text" value="" v-model="moneyTranBegTime" :disabled="true" @tap="openDrawer(0)" placeholder="开始时间"/>
								<text>至</text>
								<input type="text" value="" v-model="moneyTranEndTime" :disabled="true" @tap="openDrawer(0)" placeholder="结束时间"/>
							</view>
							<view class="sea_btn btn_style">
								<button type="default" @tap="getMoneyTran(0)" hover-class="btn_hover" style="padding: 0;">查询</button>
							</view>
						</view>
						<view class="income" v-for="(item,index) in moneyTranList" :key='index' @tap="moneyTranOpen(item.id)">
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
					
					<!--加载loadding-->
					<tui-loadmore v-if="moneyTranLoadding" :index="3" type="primary"></tui-loadmore>
					<tui-nomore v-if="!moneyTranPullUpOn"></tui-nomore>
					<!--加载loadding-->
				</scroll-view>
			
				
				<view class="data_lack" v-show="!moneyTranShow">
					<view class="lack_box">
						<tui-icon name="nodata" :size="120"></tui-icon>
						<text class="lack_test">暂无数据</text>
						<button type="default" class="coin_query" hover-class="btn_hover" @tap="toMoneyChange">去转换</button>
					</view>
				</view>
			</swiper-item>
			
			
			
			<!-- 充值明细 -->
			<swiper-item class="swiper-item"  style="flex: 1;">
				<scroll-view scroll-y="true" id="swiper" :show-scrollbar="true"  style="flex: 1;" v-show="moneyRechargeShow" 
				@scrolltolower="getMoneyRecharge(1)" lower-threshold="40" :refresher-enabled="true"
				@refresherrefresh="onRefresh" @refresherrestore="onRestore" :refresher-triggered="triggered">
					<view class="item1" >
						<!-- 筛选时间 -->
						<view class="search_column" >
							<view class="" style="display:flex; align-items:center;">
								<input type="text" value="" v-model="moneyRechargeBegTime" :disabled="true" @tap="openDrawer(1)" placeholder="开始时间"/>
								<text>至</text>
								<input type="text" value="" v-model="moneyRechargeEndTime" :disabled="true" @tap="openDrawer(1)" placeholder="结束时间"/>
							</view>
							<view class="sea_btn btn_style">
								<button type="default" @tap="getMoneyRecharge(0)" hover-class="btn_hover" style="padding: 0;">查询</button>
							</view>
						</view>
						<view class="income" v-for="(item,index) in moneyRechargeList" :key='index' @tap="moneyRechargeOpen(item.id)">
							<view class="incomeTime">
								<view class="">
									<text v-show="item.state == -1">未提交</text>
									<text v-show="item.state == 0">充值申请</text>
									<text v-show="item.state == 1">充值成功</text>
									<text v-show="item.state == 2">充值失败</text>
								</view>
								<view class="moneyTran_time">
									<!-- <text v-show="item.state == 0">{{item.addTime}}</text> -->
									<text>{{item.addTime}}</text>
								</view>
							</view>
							
							<view class="incomeNum">
								<text>{{item.money}} 元</text>
								<view class="open">
									<tui-icon name="arrowdown" :size="20" v-show="!item.openMoneyRechargeTag"></tui-icon>
									<tui-icon name="arrowup" :size="20" v-show="item.openMoneyRechargeTag"></tui-icon>
								</view>
							</view>
							
							<view class="open_box" v-show="item.id == openMoneyRechargeId">
								<view class="open_column">
									<view class="open_test">账单号：</view>
									<text class="income_data" selectable="true">{{item.sn}}</text>
								</view>
<!-- 								<view class="open_column">
									<view class="open_test">状态：</view>
									<text class="income_data" v-show="item.state == 0">未审核</text>
									<text class="income_data" v-show="item.state == 1">审核通过</text>
									<text class="income_data" v-show="item.state == 2">审核未通过</text>
								</view> -->
							</view>
						</view>
					</view>
					
					<!--加载loadding-->
					<tui-loadmore v-if="moneyRechargeLoadding" :index="3" type="primary"></tui-loadmore>
					<tui-nomore v-if="!moneyRechargePullUpOn"></tui-nomore>
					<!--加载loadding-->
				</scroll-view>
				
				<view class="data_lack" v-show="!moneyRechargeShow">
					<view class="lack_box">
						<tui-icon name="nodata" :size="120"></tui-icon>
						<text class="lack_test">暂无数据</text>
						<button type="default" class="coin_query" hover-class="btn_hover" @tap="toExtractMoney">去充值</button>
					</view>
				</view>
			</swiper-item>
			
			
			
			<!-- 提现明细 -->
			<swiper-item class="swiper-item"  style="flex: 1;">
				<scroll-view scroll-y="true" id="swiper" :show-scrollbar="true"  style="flex: 1;" v-show="moneyDrawShow" 
				@scrolltolower="getMoneyDraw(1)" lower-threshold="40" :refresher-enabled="true"
				@refresherrefresh="onRefresh" @refresherrestore="onRestore" :refresher-triggered="triggered">
					<view class="item2" >
						<!-- 筛选时间 -->
						<view class="search_column" >
							<view class="" style="display:flex; align-items:center;">
								<input type="text" value="" v-model="extractMoneyBegTime" :disabled="true" @tap="openDrawer(2)" placeholder="开始时间"/>
								<text>至</text>
								<input type="text" value="" v-model="extractMoneyEndTime" :disabled="true" @tap="openDrawer(2)" placeholder="结束时间"/>
							</view>
							<view class="sea_btn btn_style">
								<button type="default" @tap="getMoneyDraw(0)" hover-class="btn_hover" style="padding: 0;">查询</button>
							</view>
						</view>
						<view class="income" v-for="(item,index) in extractMoneyList" :key='index' @tap="moneyDrawopen(item.id)">
							<view class="incomeTime">
								<view class="">
									<text v-show="item.state == 0">提现申请</text>
									<text v-show="item.state == 1">提现成功</text>
									<text v-show="item.state == 2">提现失败</text>
								</view>
								<view class="moneyTran_time">
									<text v-show="item.state == 0">{{item.addTime}}</text>
								</view>
							</view>
							
							<view class="incomeNum">
								<text>{{item.money}} 元</text>
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
					
					<!--加载loadding-->
					<tui-loadmore v-if="moneyDrawLoadding" :index="3" type="primary"></tui-loadmore>
					<tui-nomore v-if="!moneyDrawPullUpOn"></tui-nomore>
					<!--加载loadding-->
				</scroll-view>
				
				<view class="data_lack" v-show="!moneyDrawShow">
					<view class="lack_box">
						<tui-icon name="nodata" :size="120"></tui-icon>
						<text class="lack_test">暂无数据</text>
						<button type="default" class="coin_query" hover-class="btn_hover" @tap="toExtractMoney">去提现</button>
					</view>
				</view>
			</swiper-item>
			
			
			<!-- 账变明细 -->
			<swiper-item class="swiper-item"  style="flex: 1;">
				<scroll-view scroll-y="true" id="swiper"  :show-scrollbar="true"  style="flex: 1;" v-show="moneyShow" 
				@scrolltolower="getMoney(1)" lower-threshold="40":refresher-enabled="true"
				@refresherrefresh="onRefresh" @refresherrestore="onRestore" :refresher-triggered="triggered">
					<view class="item3" >
						<!-- 筛选时间 -->
						<view class="search_column" >
							<view class="" style="display:flex; align-items:center;">
								<input type="text" value="" v-model="moneyBegTime" :disabled="true" @tap="openDrawer(3)" placeholder="开始时间"/>
								<text>至</text>
								<input type="text" value="" v-model="moneyEndTime" :disabled="true" @tap="openDrawer(3)" placeholder="结束时间"/>
							</view>
							<view class="sea_btn btn_style">
								<button type="default" @tap="getMoney(0)" hover-class="btn_hover" style="padding: 0;">查询</button>
							</view>
						</view>
						<view class="income" v-for="(item,index) in moneyList" :key='index' @tap="moneyOpen(item.id)">
							<view class="incomeTime">
								<text v-show="item.type == 0">金币转换现金</text>
								<text v-show="item.type == 1">提现审核失败</text>
								<text v-show="item.type == 2">签到奖励</text>
								<text v-show="item.type == 3">幸运抽奖获奖</text>
								<text v-show="item.type == 4">充值</text>
								<text v-show="item.type == 5">利息宝取出</text>
								<text v-show="item.type == 10">加款</text>
								<text v-show="item.type == 50">代理佣金</text>
								<text v-show="item.type == 100">提现</text>
								<text v-show="item.type == 101">余额转金币</text>
								<text v-show="item.type == 102">升级</text>
								<text v-show="item.type == 103">利息宝转入</text>
								<text v-show="item.type == 104">扣款</text>
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
					
					<!--加载loadding-->
					<tui-loadmore v-if="moneyLoadding" :index="3" type="primary"></tui-loadmore>
					<tui-nomore v-if="!moneyPullUpOn"></tui-nomore>
					<!--加载loadding-->
				</scroll-view>
				
				<view class="data_lack" v-show="!moneyShow">
					<view class="lack_box">
						<tui-icon name="nodata" :size="120"></tui-icon>
						<text class="lack_test">暂无数据</text>
					</view>
				</view>
			</swiper-item>
        </swiper>
		
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" @confirm="change" style="z-index:100000;"></tui-datetime>
		 
		 <tui-drawer mode="right" :visible="rightDrawer" @close="closeDrawer">
		 	<view class="d-container">
				<view class="" style="width:100%; text-align: center; color:#F57341;" v-show="drawerType == 0"><text>转换明细</text></view>
				<view class="" style="width:100%; text-align: center; color:#F57341;" v-show="drawerType == 1"><text>充值明细</text></view>
				<view class="" style="width:100%; text-align: center; color:#F57341;" v-show="drawerType == 2"><text>提现明细</text></view>
				<view class="" style="width:100%; text-align: center; color:#F57341;" v-show="drawerType == 3"><text>账变明细</text></view>
				<view class="search_time">
					<view class="search_test">
						<text>开始时间</text>
					</view>
					<view class="">
						<input type="text" value="" @tap="show(1)" v-model="drawerBegTime" :disabled="true" />
					</view>
				</view>
				<view class="search_time">
					<view class="search_test">
						<text>结束时间</text>
					</view>
					<view class="">
						<input type="text" value="" @tap="show(2)" v-model="drawerEndTime" :disabled="true" />
					</view>
				</view>
				<view class="search_btn btn_style">
					<button type="default" @tap="closeDrawer" hover-class="btn_hover">确定</button>
				</view>
			</view>
		 </tui-drawer>
    </view>
</template>
<script>
import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
import utilCore from "@/api/utilCore.js";
import util from "@/common/util.js";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import tuiDatetime from "@/components/tui-datetime/tui-datetime.vue";
import tuiDrawer from "@/components/tui-drawer/tui-drawer.vue";
import tuiLoadmore from "@/components/tui-loadmore/tui-loadmore.vue";
import tuiNomore from "@/components/tui-nomore/tui-nomore.vue";
    export default {
        components: {
			tabControl,
			tuiDatetime,
			tuiDrawer,
			tuiLoadmore,
			tuiNomore
        },
		onShow() {
			this.userEn = storage.getMyInfo();  //获取我的信息
			this.getMoneyTran(0);  //获取金额转换记录
			this.getMoneyDraw(0);  //获取提现记录
			this.getMoney(0);  //获取账变记录
			this.getMoneyRecharge(0); //获取充值明细
		},
        data() {
            return {
				moneyTranBegTime: "", //金额转换开始时间
				moneyTranEndTime: "", //金额转换结束时间
				moneyTranList:[],   //金额转换列表
				moneyTranShow: true,  //金额转换列表是否显示
				moneyTranPage: 1,  //金额转换记录查询页数
				openMoneyTranTag: false,  //展开图表控制
				openMoneyTranId: null,  //展开内容盒子的id
				moneyTranLoadding: false, //金额转换加载数据提示
				moneyTranPullUpOn: true,  //金额转换上拉加载数据
				
				moneyRechargeBegTime: "", //充值转换开始时间
				moneyRechargeEndTime: "", //充值转换结束时间
				moneyRechargeList:[],   //充值转换列表
				moneyRechargeShow: true,  //充值转换列表是否显示
				moneyRechargePage: 1,  //充值转换记录查询页数
				openMoneyRechargeTag: false,  //展开图表控制
				openMoneyRechargeId: null,  //展开内容盒子的id
				moneyRechargeLoadding: false, //充值转换加载数据提示
				moneyRechargePullUpOn: true,  //充值转换上拉加载数据
				
				extractMoneyBegTime: "", //提现明细开始时间
				extractMoneyEndTime: "", //提现明细结束时间
				extractMoneyList:[],   //提现明细列表
				moneyDrawShow: true,  //提现明细列表是否显示
				moneyDrawPage: 1,  //提现记录查询页数
				openMoneyDrawTag: false,  //展开图表控制
				openMoneyDrawId: null,  //展开内容盒子的id
				moneyDrawLoadding: false, //提现明细加载数据提示
				moneyDrawPullUpOn: true,  //提现明细上拉加载数据
				
				moneyBegTime: "", //账变记录开始时间
				moneyEndTime: "", //账变记录结束时间
				moneyList:[],   //账变记录列表
				moneyShow: true,  //账变记录列表是否显示
				moneyPage: 1,  //账变记录记录查询页数
				openMoneyTag: false,  //展开图表控制
				openMoneyId: null,  //展开内容盒子的id
				moneyLoadding: false, //提现明细加载数据提示
				moneyPullUpOn: true,  //提现明细上拉加载数据
				
				userEn: [], //我的信息
				items: ['转换明细', '充值明细', '提现明细', '账变流水'],
				current: 0,
                newsList: [],
                cacheTab: [],
				rightDrawer: false,//抽屉开关
				drawerType: 0,  //抽屉类型
				drawerBegTime: '', //抽屉开始时间 
				drawerEndTime: '', //抽屉结束时间 
                tabIndex: 0,
				
				type: 0,
				startYear: 1980,
				endYear: 2030,
				cancelColor: "#888",
				color: "#5677fc",
				setDateTime: "",
				num: null,    //区分开始时间和结束时间的标识
				uid: "",  //uid
				triggered: false  //当前下拉刷新状态
            }
        },
        onLoad(res) {
			if(res.type) this.current = parseInt(res.type);
			this.uid = storage.getUid();  //获取uid
        },
        methods: {
			//scroll-view开始上拉刷新
			onRefresh(){
				if(this.triggered) return;
				this.triggered = true;
				if(this.current == 0){
					//延时为了看效果
					setTimeout(() => {
						this.moneyTranPage = 1;
						this.getMoneyTran(0);
						this.moneyTranPullUpOn = true;
						this.moneyTranLoadding = false;
					}, 200)
				}else if(this.current == 1){
					setTimeout(() => {
						this.moneyRechargePage = 1;
						this.getMoneyDraw(0);
						this.moneyRechargePullUpOn = true;
						this.moneyRechargeLoadding = false;
					}, 200)
				}
				else if(this.current == 2){
					setTimeout(() => {
						this.moneyDrawPage = 1;
						this.getMoneyDraw(0);
						this.moneyDrawPullUpOn = true;
						this.moneyDrawLoadding = false;
					}, 200)
				}else if(this.current == 3){
					setTimeout(() => {
						this.moneyPage = 1;
						this.getMoney(0);
						this.moneyPullUpOn = true;
						this.moneyLoadding = false;
					}, 200)
				}
			},
			
			//scroll-view结束上拉刷新 type 0:普通获取数据 1:上拉刷新获取数据
			onRestore(type){
				//是否是上拉刷新获取数据
				if(type == 1){
					uni.showToast({
						title: '刷新成功',
						icon: "none",
						duration: 1000
					});
					this.triggered = false;
				}else return;
			},
			
			//普通上拉刷新
			onPullDownRefresh: function() {
				if(this.current == 0){
					//延时为了看效果
					setTimeout(() => {
						this.moneyTranPage = 1;
						this.getMoneyTran(0);
						this.moneyTranPullUpOn = true;
						this.moneyTranLoadding = false;
						uni.stopPullDownRefresh();
						uni.showToast({
							title: '刷新成功',
							icon: "none",
							duration: 1000
						});
					}, 200)
				}else if(this.current == 1){
					setTimeout(() => {
						this.moneyRechargePage = 1;
						this.getMoneyDraw(0);
						this.moneyRechargePullUpOn = true;
						this.moneyRechargeLoadding = false;
						uni.stopPullDownRefresh();
						uni.showToast({
							title: '刷新成功',
							icon: "none",
							duration: 1000
						});
					}, 200)
				}else if(this.current == 2){
					setTimeout(() => {
						this.moneyDrawPage = 1;
						this.getMoneyDraw(0);
						this.moneyDrawPullUpOn = true;
						this.moneyDrawLoadding = false;
						uni.stopPullDownRefresh();
						uni.showToast({
							title: '刷新成功',
							icon: "none",
							duration: 1000
						});
					}, 200)
				}else if(this.current == 3){
					setTimeout(() => {
						this.moneyPage = 1;
						this.getMoney(0);
						this.moneyPullUpOn = true;
						this.moneyLoadding = false;
						uni.stopPullDownRefresh();
						uni.showToast({
							title: '刷新成功',
							icon: "none",
							duration: 1000
						});
					}, 200)
				}
			},
			
			//区分开始时间和结束时间
			show(num){
				this.cancelColor = "#888";
				this.color = "#5677fc";
				this.setDateTime = "";
				this.startYear = 1980;
				this.endYear = 2030;
			    this.type = 2;
				//num  1：开始时间 2：结束时间
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
				if(this.drawerType == 0){
					switch (this.num){
						case 1:
							this.moneyTranBegTime = e.result;
							this.drawerBegTime = e.result;
							break;
						case 2:
							this.moneyTranEndTime = e.result;
							this.drawerEndTime = e.result;
							break;
						default:
							break;
					}
				}else if(this.drawerType == 1){
					switch (this.num){
						case 1:
							this.moneyRechargeBegTime = e.result;
							this.drawerBegTime = e.result;
							break;
						case 2:
							this.moneyRechargeEndTime = e.result;
							this.drawerEndTime = e.result;
							break;
						default:
							break;
					}
				}else if(this.drawerType == 2){
					switch (this.num){
						case 1:
							this.extractMoneyBegTime = e.result;
							this.drawerBegTime = e.result;
							break;
						case 2:
							this.extractMoneyEndTime = e.result;
							this.drawerEndTime = e.result;
							break;
						default:
							break;
					}
				}else if(this.drawerType == 3){
					switch (this.num){
						case 1:
							this.moneyBegTime = e.result;
							this.drawerBegTime = e.result;
							break;
						case 2:
							this.moneyEndTime = e.result;
							this.drawerEndTime = e.result;
							break;
						default:
							break;
					}
				}
			},
			//关闭抽屉
			closeDrawer(e) {
				this.rightDrawer = false;
			},
			//打开抽屉
			openDrawer(type) {
				this.rightDrawer = true;
				//抽屉类型 0：转换列表时间 1：提现列表时间 2：账变列表时间
				switch (type){
					case 0:
						this.drawerType =  type;
						this.drawerEndTime = this.moneyTranEndTime;
						this.drawerBegTime = this.moneyTranBegTime;
						break;
					case 1:
						this.drawerType =  type;
						this.drawerEndTime = this.moneyRechargeEndTime;
						this.drawerBegTime = this.moneyRechargeBegTime;
						break;
					case 2:
						this.drawerType =  type;
						this.drawerEndTime = this.extractMoneyEndTime;
						this.drawerBegTime = this.extractMoneyBegTime;
						break;
					case 3:
						this.drawerType =  type;
						this.drawerEndTime = this.moneyEndTime;
						this.drawerBegTime = this.moneyBegTime;
						break;
					default:
						break;
				}
			},
			//获取充值明细   0:普通查询 1：加载更多数据
			getMoneyRecharge(type){
				let page = null;
				if(type == 1){
					if (!this.moneyRechargePullUpOn) return;
					this.moneyRechargeLoadding = true;
					this.moneyRechargePage = this.moneyRechargePage + 1;
					page = this.moneyRechargePage;
				}else page = 1;
				let data = {
					uid: this.uid,
					page: page, 
					count: 10,
				};
				if(!util.isEmpty(this.moneyRechargeBegTime)){
					let time = this.moneyRechargeBegTime + " 00:00:00";
					data.begAddTime = time;
				};		
				if(!util.isEmpty(this.moneyRechargeEndTime)){
					let time = this.moneyRechargeEndTime + " 23:59:59";
					data.endAddTime = time;
				};
				api.getMoneyRecharge(data, (res)=>{
					let data = api.getData(res).data;
					if(type == 0){
						if(util.isEmpty(data))
							this.moneyRechargeShow = false;
							//this.isMoneyRechargeShow();  //控制转换收入明细表显示;
						else{
							data.forEach((item) =>{
								item.openMoneyTag = false;
							});
							this.moneyRechargeList = data;
							this.moneyRechargeShow = true;
							if(this.triggered) this.onRestore(1);
						}
					}else if(type == 1){
						if(util.isEmpty(data)){
							this.moneyRechargeLoadding = false;
							this.moneyRechargePullUpOn = false;
						}else{
							this.moneyRechargeLoadding = false;
							data.forEach((item) =>{
								item.openMoneyRechargeTag = false;
								this.moneyRechargeList.push(item);
							});
							this.moneyRechargeShow = true;
						}
					}
				});
			},
			// 判断充值记录列表是否有数据
			isMoneyRechargeShow(){
				if(util.isEmpty(this.moneyRechargeList)) this.moneyRechargeShow = false;
				else this.moneyRechargeShow = true;
			},
			//充值记录列表展开内容			
			moneyRechargeOpen(id){
				if(this.openMoneyRechargeId == id){
					this.openMoneyRechargeId = -1;				
				} 
				else
				 this.openMoneyRechargeId = id;
				
				this.moneyRechargeList.forEach((item) =>{
					if(item.id == this.openMoneyRechargeId){
						item.openMoneyRechargeTag = true;
					}else{
						item.openMoneyRechargeTag = false;
					}
				});
			},
			
			
			
			
			
			
			//获取账变记录   0:普通查询 1：加载更多数据
			getMoney(type){
				let page = null;
				if(type == 1){
					if (!this.moneyPullUpOn) return;
					this.moneyLoadding = true;
					this.moneyPage = this.moneyPage + 1;
					page = this.moneyPage;
				}else page = 1;
				let data = {
					uid: this.uid,
					page: page, 
					count: 10,
				};
				if(!util.isEmpty(this.moneyBegTime)){
					let time = this.moneyBegTime + " 00:00:00";
					data.begAddTime = time;
				};		
				if(!util.isEmpty(this.moneyEndTime)){
					let time = this.moneyEndTime + " 23:59:59";
					data.endAddTime = time;
				};
				api.getMoney(data, (res)=>{
					let data = api.getData(res).data;
					if(type == 0){
						if(util.isEmpty(data))
							this.moneyShow = false;
							//this.isShowMoney();  //控制转换收入明细表显示;
						else{
							data.forEach((item) =>{
								item.openMoneyTag = false;
							});
							this.moneyList = data;
							this.moneyShow = true;
							if(this.triggered) this.onRestore(1);
						}
					}else if(type == 1){
						if(util.isEmpty(data)){
							this.moneyLoadding = false;
							this.moneyPullUpOn = false;
						}else{
							this.moneyLoadding = false;
							data.forEach((item) =>{
								item.openMoneyTag = false;
								this.moneyList.push(item);
							});
							this.moneyShow = true;
						}
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
			
			
			
			//获取提现记录  0:普通查询 1：加载更多数据
			getMoneyDraw(type){
				let page = null;
				if(type == 1){
					if (!this.moneyDrawPullUpOn) return;
					this.moneyDrawLoadding = true;
					this.moneyDrawPage = this.moneyDrawPage + 1;
					page = this.moneyDrawPage;
				}else page = 1;
				let data = {
					uid: this.uid,
					page: page, 
					count: 10,
				};
				if(!util.isEmpty(this.extractMoneyBegTime)){
					let time = this.extractMoneyBegTime + " 00:00:00";
					data.begAddTime = time
				};		
				if(!util.isEmpty(this.extractMoneyEndTime)){
					let time = this.extractMoneyEndTime + " 23:59:59";
					data.endAddTime = time;
				};
				api.getMoneyDraw(data, (res)=>{
					let data = api.getData(res).data;
					if(type == 0){
						if(util.isEmpty(data))
							this.moneyDrawShow = false;
							 //this.isShowMoneyDraw();  //控制金币收入明细表显示
						else{
							data.forEach((item) =>{
								item.openMoneyDrawTag = false;
								this.extractMoneyList = data;
							});
							this.moneyDrawShow = true;
							if(this.triggered) this.onRestore(1);
						}
					}else if(type == 1){
						if(util.isEmpty(data)){
							this.moneyDrawLoadding = false;
							this.moneyDrawPullUpOn = false;
						}else{
							this.moneyDrawLoadding = false;
							data.forEach((item) =>{
								item.openMoneyDrawTag = false;
								this.extractMoneyList.push(item);
							});
							this.moneyDrawShow = true;
						}
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
			
			
			//获取金额转换记录  0:普通查询 1：加载更多数据
			getMoneyTran(type){
				let page = null;
				if(type == 1){
					if (!this.moneyTranPullUpOn) return;
					this.moneyTranLoadding = true;
					this.moneyTranPage = this.moneyTranPage + 1;
					page = this.moneyTranPage;
				}else page = 1;
				let data = {
					uid: this.uid,
					page: page, 
					count: 10,
				};
				if(!util.isEmpty(this.moneyTranBegTime)){
					let time = this.moneyTranBegTime + " 00:00:00";
					data.begAddTime = time
				};		
				if(!util.isEmpty(this.moneyTranEndTime)){
					let time = this.moneyTranEndTime + " 23:59:59";
					data.endAddTime = time;
				};
				api.getMoneyTran(data, (res)=>{
					let data = api.getData(res).data;
					if(type == 0){
						if(util.isEmpty(data))
							this.moneyTranShow = false;
							//this.isShowMoneyTran();  //控制转换收入明细表显示;
						else{
							data.forEach((item) =>{
								item.openMoneyTranTag = false;
							});
							this.moneyTranList = data;
							this.moneyTranShow = true;
							if(this.triggered) this.onRestore(1);
						}
					}else if(type == 1){
						if(util.isEmpty(data)){
							this.moneyTranLoadding = false;
							this.moneyTranPullUpOn = false;
						}else{
							this.moneyTranLoadding = false;
							data.forEach((item) =>{
								item.openMoneyTranTag = false;
								this.moneyTranList.push(item);
							});
							this.moneyTranShow = true;
						}
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
			onClickItem(val) {
			    this.current = val.currentIndex;
			},
            ontabchange(e) {
				this.current = e.target.current;
            },
			//跳转到兑换现金页
			toMoneyChange(){
				if(utilCore.isLoginByDeviceId()) {
					utilCore.toLoginUiCanBack();
				}else{
					uni.navigateTo({
						url: "/pages/moneyChange/moneyChange"
					})
				}
			},
			//跳转到提现页
			toExtractMoney(){
				if(utilCore.isLoginByDeviceId()) {
					utilCore.toLoginUiCanBack();
				}else{
					uni.navigateTo({
						url: '/pages/extractMoney/extractMoney'
					});
				}
			},
        }
    }
</script>

<style>
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    .tabs {
        flex: 1;
		display:flex;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
    }

    .scroll-h {
        width: 750rpx;
        height: 80rpx;
        flex-direction: row;
        white-space: nowrap;
        /* flex-wrap: nowrap; */
        /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }

    .line-h {
        height: 1rpx;
        background-color: #cccccc;
    }

    .uni-tab-item {
        display: inline-block;

        flex-wrap: nowrap;
        padding-left: 34rpx;
        padding-right: 34rpx;
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex-wrap: nowrap;
        white-space: nowrap;
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }

    .swiper-box {
        flex: 1;
		margin-top:30px;
    }

    /* 指定h5高度样式, app样式高度为组件内定义 */
    .tab_class{
		/* #ifdef H5 */
		margin-top:44px;  
		/* #endif */
		
		/* #ifdef APP-NVUE */
		margin-top:0px;
		/* #endif */
	}

    .swiper-item {
		display:flex;
        flex: 1;
        flex-direction: row;
/* 		justify-content: center;
		align-items: center; */
    }

    .scroll-v {
        flex: 1;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
        width: 750rpx;
    }
	
	.item0, .item1, .item2, .item3{
		overflow:auto;
		margin:auto;
		position:relative;
		top:0;
		bottom:0;
		left:0;
		right:0;
	}

    .update-tips {
        position: absolute;
        left: 0;
        top: 41px;
        right: 0;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #FDDD9B;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .update-tips-text {
        font-size: 14px;
        color: #ffffff;
    }

    .refresh {
        width: 750rpx;
        height: 64px;
        justify-content: center;
    }

    .refresh-view {
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
    }

	.refresh-icon {
		width: 30px;
		height: 30px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}

	.refresh-icon-active {
		transform: rotate(180deg);
	}

	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}

    .loading-text {
        margin-left: 2px;
        font-size: 16px;
        color: #999999;
    }

    .loading-more {
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }

    .loading-more-text {
        font-size: 28rpx;
        color: #999;
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
	.data_lack{
		flex: 1;
	}
	.lack_box{
		width:100%;
		height:700rpx;
		display:flex;
		justify-content:center;
		align-items:center;
		flex-direction:column;
	}
	.lack_box>button{
		margin-top:40rpx;
		background-color:#fcd030;
		font-size:16px;
		border-radius:40rpx;
		width:400rpx;
	}
	.lack_test{
		font-size:16px;
		margin-top:20rpx;
		display:inline-block;
	}
	.coin_query{

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
		padding:80rpx;
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
</style>
