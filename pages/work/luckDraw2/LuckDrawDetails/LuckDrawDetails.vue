<template>
	<view class="page">
		<!-- 筛选时间 -->
		<view class="search_column">
			<view class="" style="display:flex; align-items:center;">
				<input type="text" value="" v-model="begTime" :disabled="true" @tap="openDrawer" placeholder="开始时间" />
				<text>至</text>
				<input type="text" value="" v-model="endTime" :disabled="true" @tap="openDrawer" placeholder="结束时间" />
			</view>
			<view class="sea_btn">
				<button type="default" @tap="getTaskDetails" hover-class="btn_hover" style="padding: 0;">查询</button>
			</view>
		</view>
		<!-- 金币收入明细 -->
		<view class="gold_info">
			<view class="income" v-for="(item,index) in incomeList" :key='index' v-show="showIncome" @tap="open(item.id)">
				<view class="incomeTime">
					<text class="info_from">{{item.title}}</text>
					<text class="info_time">{{item.finishTime}}</text>
				</view>

				<view class="incomeNum">
					<text class="num">{{item.award}}</text>
					<view class="open">
						<tui-icon name="arrowdown" :size="20" v-show="!item.openTag"></tui-icon>
						<tui-icon name="arrowup" :size="20" v-show="item.openTag"></tui-icon>
					</view>
				</view>

				<view class="open_box" v-show="item.id == openId">
					<view class="">
						订单号：<text class="income_data">{{item.sn}}</text>
					</view>
					<view class="">
						状态：<text class="income_data" v-if="item.state == 1">已兑奖</text>
							  <text class="income_data" v-if="item.state == 2">为兑奖</text>
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
				<view class="search_btn">
					<button type="default" @tap="closeDrawer" hover-class="btn_hover">确定</button>
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
		components: {
			tuiDatetime,
			tuiDrawer,
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				loadding: false, //加载数据提示
				pullUpOn: true, //上拉加载数据
				rightDrawer: false, //抽屉开关

				userEn: [], //我的信息
				showIncome: true, // 收入明细列表是否显示
				incomeList: [], //提现明细列表
				openTag: false, //展开图表控制
				// openBox: false,  //控制内容盒子是否打开
				openId: null, //展开内容盒子的id
				page: 1, //查询页数


				begTime: "", //开始时间
				endTime: "", //结束时间
				type: 0,
				startYear: 1980,
				endYear: 2030,
				cancelColor: "#888",
				color: "#5677fc",
				setDateTime: "",
				num: null, //区分开始时间和结束时间的标识
				uid: "", //uid
			};
		},
		onShow() {
			this.uid = storage.getUid();  //获取uid
			this.userEn = storage.getMyInfo(); //获取我的信息		
			this.getTaskDetails(); //获取金币收入明细表		
		},
		methods: {
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
			show(num) {
				this.cancelColor = "#888";
				this.color = "#5677fc";
				this.setDateTime = "";
				this.startYear = 1980;
				this.endYear = 2030;
				this.type = 2;
				switch (num) {
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
				switch (this.num) {
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
			isShowIncome() {
				if (util.isEmpty(this.incomeList)) this.showIncome = false;
				else this.showIncome = true;
			},
			//获取金币收入明细表
			getTaskDetails() {
				this.page = 1;
				let data = { 
					uid: this.uid,
					page: this.page,
					count: 10
				};
				if (!util.isEmpty(this.begTime)) {
					let time = this.begTime + " 00:00:00";
					data.begFinishTime = time
				};
				if (!util.isEmpty(this.endTime)) {
					let time = this.endTime + " 23:59:59";
					data.endFinishTime = time;
				};
				api.getLuckyDetails(data, (res) => {
					let data = api.getData(res).data;
					if (util.isEmpty(data)) this.showIncome = false;
					//this.isShowIncome();  //控制金币收入明细表显示
					else {
						data.forEach((item) => {
							data.openTag = false;
						});
						this.incomeList = data;
						this.showIncome = true;
					}
				});
			},
			//展开活动内容
			open(id) {
				if (this.openId == id) {
					this.openId = -1;
				} else
					this.openId = id;

				this.incomeList.forEach((item) => {
					if (item.id == this.openId) {
						item.openTag = true;
					} else {
						item.openTag = false;
					}
				});
			},
		},
		//上拉获取更多金币收益明细数据
		onReachBottom() {
			this.page = this.page + 1;
			api.getLuckyDetails({
				uid: this.uid,
				page: this.page,
				count: 10
			}, (res) => {
				let data = api.getData(res).data;
				if (util.isEmpty(data)) {
					this.loadding = false;
					this.pullUpOn = false;
				} else {
					data.forEach((item) => {
						this.loadding = false;
						this.incomeList.push(item);
					});
				}
			});
		},
	};
</script>

<style>
	page {
		height: 100%;
	}

	.page {
		height: 100%;
	}

	.income {
		padding: 20rpx 40rpx;
		box-sizing: border-box;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		border-bottom: 1px solid #eee;
	}

	.lack_box {
		width: 100%;
		height: 700rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.lack_test {
		font-size: 16px;
		margin-top: 20rpx;
		display: inline-block;
	}

	.coin_query {
		margin-top: 40rpx;
		background-color: #fcd030;
		font-size: 16px;
		border-radius: 40rpx;
		width: 400rpx;
	}

	.coin_query::after {
		border: none;
	}

	.gold_info {}

	.incomeTime {
		display: flex;
		flex-direction: column;
	}

	.info_from {
		margin-bottom: 10rpx;
		font-size: 14px;
	}

	.info_time {
		font-size: 12px;
		color: #959FA6;
	}

	.incomeNum {
		display: flex;
		align-items: center;
	}

	.gold_img {
		width: 60rpx;
		height: 60rpx;
	}

	.num {
		margin-right: 20rpx;
		font-size: 16px;
	}

	.open {
		margin-left: 10rpx;
	}

	.open_box {
		margin-top: 20rpx;
		width: 100%;
	}

	.income_data {
		color: #959FA6;
	}

	.open_box>view {
		margin-top: 10rpx;
	}

	.search_column {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
		font-size: 16px;
		padding: 0 40rpx 10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #808080;
	}

	.search_column input {
		text-align: center;
	}

	.sea_btn {}

	.sea_btn button {
		font-size: 14px;
		background-color: #FCD030;
		color: #fff;
		width: 120rpx;
	}

	.d-container {
		padding: 80rpx;
		font-size: 15px;
	}

	.search_time {
		margin-top: 40rpx;
	}

	.search_test {
		margin-bottom: 20rpx;
	}

	.d-container input {
		border-bottom: 1px solid #808080;
		color: #808080;
	}

	.search_btn {
		margin-top: 100rpx;
	}

	.search_btn button {
		font-size: 14px;
		background-color: #FCD030;
		color: #fff;
		border-radius: 40rpx;
		padding: 0 !important;
	}
</style>
