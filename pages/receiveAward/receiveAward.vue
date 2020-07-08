<template>
	<view class="">
		<view class="main">
			<view class="receive_title">
				<image src="/static/img/receive_award.png" mode="widthFix"></image>
			</view>
			
			<view>
				<!-- 插入模式 -->
				<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" 
				@change="change" @monthSwitch="monthSwitch" />
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
					selected: []
				}
			}
		},
		onReady() {
			// TODO 模拟请求异步同步数据
			setTimeout(() => {
				this.info.date = getDate(new Date(), -30).fullDate;  		//获取30天前的日期 2020-06-08
				this.info.startDate = getDate(new Date(), -60).fullDate;  	//获取60天前的日期 2020-05-09
				this.info.endDate = getDate(new Date(), 30).fullDate;  		//获取30天后的日期 2020-08-07
				this.info.selected = [{
						date: getDate(new Date(), -7).fullDate,
						info: '￥100'
					},
					{
						date: getDate(new Date(), -2).fullDate,
						info: '签到',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: getDate(new Date(), -1).fullDate,
						info: '100金币'
					}
				]
			}, 2000);
		},
		onShow() {
			this.getMonthSignDetails();  //获取月签到详情
		},
		methods: {
			//获取月签到详情
			getMonthSignDetails(){
				let data = {
					account: storage.getMyInfo().account,
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
						console.log(data);
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
		width:40%;
		height:100rpx;
		margin:0 auto;
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
