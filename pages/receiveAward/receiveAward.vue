<template>
	<view class="">
		<view class="main">
			<view class="receive_title">
				<text>签到送现金</text>
			</view>
			
			<view>
				<!-- 插入模式 -->
				<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" 
				@change="change" @monthSwitch="monthSwitch" :start-date="'2019-01-01'"
				:end-date="'2022-01-01'" />
			</view>
		</view>
	</view>
</template>

<script>
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import util from "@/common/util.js";
	/**
	 * 获取任意时间
	 */
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date();
		};
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/');
		};
		const dd = new Date(date);

		dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

		const y = dd.getFullYear();
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,  //返回时间格式 2020-06-08
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		};
	}
	export default {
		components: {},
		data() {
			return {
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: [],
					uid: "",  //uid
				},
			}
		},
		onReady() {
			// TODO 模拟请求异步同步数据
			// setTimeout(() => {
			// 	this.info.date = getDate(new Date(), -30).fullDate;  		//获取30天前的日期 2020-06-08
			// 	this.info.startDate = getDate(new Date(), -60).fullDate;  	//获取60天前的日期 2020-05-09
			// 	this.info.endDate = getDate(new Date(), 30).fullDate;  		//获取30天后的日期 2020-08-07
			// 	this.info.selected = [{
			// 			date: getDate(new Date(), -7).fullDate,
			// 			info: '￥100'
			// 		},
			// 		{
			// 			date: getDate(new Date(), -2).fullDate,
			// 			info: '签到',
			// 			data: true
			// 		},
			// 		{
			// 			date: getDate(new Date(), 3).fullDate,
			// 			data: true
			// 		},
			// 		{
			// 			date: getDate(new Date(), -1).fullDate,
			// 			info: '100金币' 
			// 		}
			// 	]
			// 	console.log(this.info.selected);
			// }, 2000);
		},
		onShow() {
			this.uid = storage.getUid();  //获取uid
			this.getMonthSignDetails();  //获取月签到详情
		},
		methods: {
			//获取月签到详情
			getMonthSignDetails(){
				let data = {
					uid: this.uid,
					time: getDate(new Date()).fullDate
				};
				api.getMonthSignDetails(data, (res)=>{
					let code = api.getCode(res);
					if(code != 0){
						let msg = api.getMsg(res);
						uni.showModal({
							content: msg,
							showCancel: false,
							success(res) {
								if (res.confirm) {
								    uni.navigateBack({
								    	delta: 1
								    });
								}
							}
						});
					}else{
						let data = api.getData(res);
						let signList = [];  //已签到天数
						// console.log(data);
						let signDetailList = [];  //已签到天数信息列表
						let signNonelList = [];  //未签到天数信息列表
						
						let today = getDate(new Date()).fullDate;   //今天的日期
						let format = today.slice(0, 8);   //获取当前时间格式 2020-07-   y-m-
						data.forEach((item, index) =>{
							// console.log(item);
							if(!util.isEmpty(item.signDetail)){   //已签到
								let obj = {};
								signList.push(item.day - 1);
								obj.date = item.signDetail.finishTime.slice(0, 10);
								if(item.signDetail.awardType == 0)  //奖励金币
								{
									// 奖励数量超过3位数时进行文字显示处理  2000 = 2k
									if(item.signDetail.award.length >= 4){
										let k = item.signDetail.award.slice(0, 1);
										item.signDetail.award = k + 'k';
									}
									obj.info = item.signDetail.award + "金币";
								}
								else{  	//奖励现金
									obj.info = "￥" + item.signDetail.award;
								}
								signDetailList.push(obj);	
							}
							else if(util.isEmpty(item.signDetail)){  	//未签到
								let obj = {};
								//判断日期是否是个位数
								if(item.day.toString().length < 2){
									
									obj.date = format + '0' + item.day.toString();
									let getDay = today.slice(1, 2);
								}else obj.date = format + item.day;
								
								
								if(!util.isEmpty(item.sign)){    //sign不为空时
									if(item.sign.awardType == 0)  //奖励金币
									{
										// 奖励数量超过3位数时进行文字显示处理  2000 = 2k
										if(item.sign.award.length >= 4){
											let k = item.sign.award.slice(0, 1);
											item.sign.award = k + 'k';
										}
										obj.info = item.sign.award + "金币";
									}
									else{  	//奖励现金
										obj.info = "￥" + item.sign.award;
									}
									obj.data = {
										custom: '自定义信息',
										name: '自定义消息头',
									};
								}
								// console.log(obj);
								signNonelList.push(obj);	
							}
						});  //foreach循环结束;
							// console.log(signNonelList);
							for (let i = 0; i <= signList.length; ++i) {
								let index = signList[i];  //插入元素的数组下标
								signNonelList.splice(index, 0, signDetailList[i]);
							}
							signNonelList.splice(0, 1); 
							// console.log(signNonelList);
							this.info.selected = signNonelList;
					}
				});
			},
			change(e) {
				console.log('change 返回:', e);
				// 模拟动态打卡
				// if (this.info.selected.length > 5) return
				// this.info.selected.push({
				// 	date: e.fulldate,
				// 	info: '打卡'
				// })
			},
			confirm(e) {
				console.log('confirm 返回:', e);
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e);
			}
		}
	}
</script>


<style>
	.main{
		width:100%;
		height:100vh;
		padding-top:60rpx;
	}
	.receive_title{
		width: 100%;
		text-align:center;
		font-family: "Times New Roman", Times, serif;
		font-size:22px;
		margin-bottom:20rpx;
		color:#000;
	}
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}
	
	/* #endif */
	
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		/* background-color: #efeff4; */
		min-height: 100%;
		height: auto;
	}
	
	view {
		font-size: 14px;
		line-height: inherit;
	}
	
	.example {
		padding: 0 15px 15px;
	}
	
	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	
	/* #endif */
	.example {
		padding: 0 15px;
	}
	
	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}
	
	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}
	
	
	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}
	
	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}
	
	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}
	
	.word-btn--hover {
		background-color: #4ca2ff;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
	
	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}
</style>
