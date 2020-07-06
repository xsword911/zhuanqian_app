<template>
    <view class="tabs">
<!--        <scroll-view id="tab-bar" class="scroll-h" :scroll-x="false" :show-scrollbar="false" :scroll-into-view="scrollInto" style="display: flex; justify-content: space-between;">
            <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
                <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
            </view>
        </scroll-view>
        <view class="line-h"></view> -->
		<tabControl :current="current" :values="items" bgc="#fff" :fixed="true"
		:scrollFlag='true' :isEqually='true' @clickItem="onClickItem"></tabControl>
		
		
        <swiper :current="current" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
			
           <!-- <swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1"> -->
				<!-- #ifdef APP-NVUE -->
<!-- 				<list class="scroll-v list" enableBackToTop="true" scroll-y loadmoreoffset="15" @loadmore="loadMore(index1)">
					<refresh class="refresh" @refresh="onrefresh(index1)" @pullingdown="onpullingdown" :display="tab.refreshing ? 'show' : 'hide'">
						<div class="refresh-view">
							<image class="refresh-icon" :src="refreshIcon" :style="{width: (tab.refreshing || pulling) ? 0: '30px'}" :class="{'refresh-icon-active': tab.refreshFlag}"></image>
							<loading-indicator class="loading-icon" animating="true" v-if="tab.refreshing"></loading-indicator>
							<text class="loading-text">{{tab.refreshText}}</text>
						</div>
					</refresh>
					<cell v-for="(newsitem,index2) in tab.data" :key="newsitem.id">
						<media-item :options="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-item>
					</cell>
					<cell class="loading-more" v-if="tab.isLoading || tab.data.length > 4">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</cell>
				</list> -->
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
<!-- 				<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y @scrolltolower="loadMore(index1)">
					<view v-for="(newsitem,index2) in tab.data" :key="newsitem.id">
						<media-item :options="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-item>
					</view>
					<view class="loading-more" v-if="tab.isLoading || tab.data.length > 4">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</view>
				</scroll-view> -->
				<!-- #endif -->
<!--            </swiper-item> -->
			
			<swiper-item class="swiper-item" style="flex: 1;">
				<scroll-view scroll-y="true" class="sv" :show-scrollbar="true" style="flex: 1;" v-show="moneyTranShow">
					<view class="item0" >
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
			<swiper-item class="swiper-item"  style="flex: 1;">
				<scroll-view scroll-y="true" id="swiper" :show-scrollbar="true"  style="flex: 1;" v-show="moneyDrawShow">
					<view class="item1" >
						<view class="income" v-for="(item,index) in extractMoneyList" :key='index' @tap="moneyDrawopen(item.id)">
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
			<swiper-item class="swiper-item"  style="flex: 1;">
				<scroll-view scroll-y="true" id="swiper"  :show-scrollbar="true"  style="flex: 1;" v-show="moneyShow" >
					<view class="item2" >
						<view class="income" v-for="(item,index) in moneyList" :key='index' @tap="moneyOpen(item.id)">
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
        components: {
			tabControl
        },
		onShow() {
			this.userEn = storage.getMyInfo();  //获取我的信息
			this.getMoneyTran();  //获取金额转换记录
			this.getMoneyDraw();  //获取提现记录
			this.getMoney();  //获取账变记录
		},
        data() {
            return {
				moneyTranList:[],   //金额转换列表
				moneyTranShow: false,  //金额转换列表是否显示
				moneyTranPage: 1,  //金额转换记录查询页数
				openMoneyTranTag: false,  //展开图表控制
				openMoneyTranId: null,  //展开内容盒子的id
				
				extractMoneyList:[],   //提现明细列表
				moneyDrawShow: false,  //提现明细列表是否显示
				moneyDrawPage: 1,  //提现记录查询页数
				openMoneyDrawTag: false,  //展开图表控制
				openMoneyDrawId: null,  //展开内容盒子的id
				
				moneyList:[],   //账变记录列表
				moneyShow: false,  //账变记录列表是否显示
				moneyPage: 1,  //账变记录记录查询页数
				openMoneyTag: false,  //展开图表控制
				openMoneyId: null,  //展开内容盒子的id
				
				userEn: [], //我的信息
				items: ['转换明细', '提现明细', '账变流水'],
				current: 0,
                newsList: [],
                cacheTab: [],
                tabIndex: 0,
                tabBars: [{
                    name: '关注',
                    id: 'guanzhu'
                }, {
                    name: '推荐',
                    id: 'tuijian'
                }, {
                    name: '体育',
                    id: 'tiyu',
				}],
                // scrollInto: "",
                // showTips: false,
                // navigateFlag: false,
                // pulling: false,
                // refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg=="
            }
        },
        onLoad(res) {
			if(res.type) this.current = parseInt(res.type);
            // setTimeout(()=>{
            //   this.tabBars.forEach((tabBar) => {
            //       this.newsList.push({
            //           data: [],
            //           isLoading: false,
            //           refreshText: "",
            //           loadingText: '加载更多...'
            //       });
            //   });
            //   this.getList(0);
            // },350)
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
			
			
			//获取金额转换记录
			getMoneyTran(){
				api.getMoneyTran({
					account: this.userEn.account, 
					page: this.moneyTranPage, 
					count: 14,
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
			
			
			onClickItem(val) {
			    this.current = val.currentIndex
			},
    //         getList(index) {
    //             let activeTab = this.newsList[index];
    //             let list = [];
    //             for (let i = 1; i <= 10; i++) {
    //                 let item = Object.assign({}, newsData['data' + Math.floor(Math.random() * 5)]);
    //                 item.id = this.newGuid();
    //                 list.push(item);
    //             }
    //             activeTab.data = activeTab.data.concat(list);
    //         },
    //         goDetail(e) {
    //             if (this.navigateFlag) {
    //                 return;
    //             }
    //             this.navigateFlag = true;
    //             uni.navigateTo({
    //                 url: './detail/detail?title=' + e.title
    //             });
    //             setTimeout(() => {
    //                 this.navigateFlag = false;
    //             }, 200)
    //         },
    //         close(index1, index2) {
    //             uni.showModal({
    //                 content: '是否删除本条信息？',
    //                 success: (res) => {
    //                     if (res.confirm) {
    //                         this.newsList[index1].data.splice(index2, 1);
    //                     }
    //                 }
    //             })
    //         },
    //         loadMore(e) {
    //             setTimeout(() => {
    //                 this.getList(this.tabIndex);
    //             }, 500)
    //         },
    //         ontabtap(e) {
    //             let index = e.target.dataset.current || e.currentTarget.dataset.current;
    //             this.switchTab(index);
    //         },
            ontabchange(e) {
                // let index = e.target.current || e.detail.current;
                // this.switchTab(index);
				
				    this.current = e.target.current;
            },
    //         // switchTab(index) {
            //     if (this.newsList[index].data.length === 0) {
            //         this.getList(index);
            //     }

            //     if (this.tabIndex === index) {
            //         return;
            //     }

            //     // 缓存 tabId
            //     if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
            //         let isExist = this.cacheTab.indexOf(this.tabIndex);
            //         if (isExist < 0) {
            //             this.cacheTab.push(this.tabIndex);
            //             //console.log("cache index:: " + this.tabIndex);
            //         }
            //     }

            //     this.tabIndex = index;
            //     this.scrollInto = this.tabBars[index].id;

            //     // 释放 tabId
            //     if (this.cacheTab.length > MAX_CACHE_PAGE) {
            //         let cacheIndex = this.cacheTab[0];
            //         this.clearTabData(cacheIndex);
            //         this.cacheTab.splice(0, 1);
            //         //console.log("remove cache index:: " + cacheIndex);
            //     }
            // },
     //        clearTabData(e) {
     //            this.newsList[e].data.length = 0;
     //            this.newsList[e].loadingText = "加载更多...";
     //        },
     //        refreshData() {},
     //        onrefresh(e) {
     //            var tab = this.newsList[this.tabIndex];
     //            if (!tab.refreshFlag) {
     //                return;
     //            }
     //            tab.refreshing = true;
     //            tab.refreshText = "正在刷新...";

     //            setTimeout(() => {
     //                this.refreshData();
     //                this.pulling = true;
     //                tab.refreshing = false;
					// tab.refreshFlag = false;
     //                tab.refreshText = "已刷新";
     //                setTimeout(() => { // TODO fix ios和Android 动画时间相反问题
     //                    this.pulling = false;
     //                }, 500);
     //            }, 2000);
     //        },
            // onpullingdown(e) {
            //     var tab = this.newsList[this.tabIndex];
            //     if (tab.refreshing || this.pulling) {
            //         return;
            //     }
            //     if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
            //         tab.refreshFlag = true;
            //         tab.refreshText = "释放立即刷新";
            //     } else {
            //         tab.refreshFlag = false;
            //         tab.refreshText = "下拉可以刷新";
            //     }
            // },
            // newGuid() {
            //     let s4 = function() {
            //         return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
            //     }
            //     return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
            // }
        }
    }
</script>

<style>
    /* #ifndef APP-PLUS */
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    /* #endif */

    .tabs {
        flex: 1;
		display:flex;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
        /* #ifdef MP-ALIPAY || MP-BAIDU */
        height: 100vh;
        /* #endif */
    }

    .scroll-h {
        width: 750rpx;
        height: 80rpx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
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
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
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
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }

    .swiper-box {
        flex: 1;
		margin-top:40px;
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
