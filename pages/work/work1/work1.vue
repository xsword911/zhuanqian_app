<template>
	<view class="">
		<view class="lay_navbar background_style" :style="{height: stateBarHeight + 'px'}">
<!-- 			<view class="uni-list-cell-db level_box" v-if="arrayLevel.length > 0">
				<picker @change="levelPickerChange" :value="arrayLevel[arrayLevelIndex].id" 
				:range="arrayLevel" range-key="levelName" name="level">
					<view class="uni-input" style="display: inline-block;">
						{{arrayLevel[arrayLevelIndex].levelName}}任务
					</view>
					<view class="icon_down" style="display: inline-block;vertical-align: sub;">
						<tui-icon name="arrowdown" :size="30" color="#FF7207"></tui-icon>
					</view>
				</picker>
			</view> -->
			<view class="uni-list-cell-db level_box" style="margin-left:20rpx;">
				<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
					<view class="uni-input" style="display: inline-block;">
						{{multiArray[0][multiIndex[0]]}}         {{multiArray[1][multiIndex[1]]}}         {{multiArray[2][multiIndex[2]]}}
					</view>
					
					<view class="icon_down drop_icon" style="display: inline-block;vertical-align: sub;">
						<tui-icon color="#fff" name="arrowdown" :size="30"></tui-icon>
					</view>
				</picker>
			</view>
		</view>
		<view class="head_box background_style">
			<!-- 金币信息 -->
			<view class="coin">
				<view class="">
					<view class="coin_num">
						￥{{myMoney}}
					</view>
					<view class="coin_test">
						现金
					</view>
				</view>
				
<!-- 				<view class="">
					<view class="coin_num">
						{{myCoin}}
					</view>
					<view class="coin_test">
						我的金币
					</view>
				</view>	 -->	
				
				<view class="" @tap="toGoldDetails" class="extract_btn text_style">
					<button type="default">收益明细 <tui-icon name="arrowright" :size="15" class="tag"></tui-icon></button>
				</view>
				
			</view>
			
			<!-- 签到信息 -->
			<view class="signIn_box">
				<view class="signIn_img">
					<image src="/static/img/hongbao.png" mode="widthFix"></image>
				</view>
				
				<view class="signIn_test">
					<view class="" v-show="timeOut">						
						<view class="continued_sign">
							<view class="" v-show="awardType == 0">
								再过<text class="tips_text">{{range}}{{unit}}</text>即可获得<text class="tips_text">{{award}}金币</text>
							</view>
							
							<view class="" v-show="awardType == 1">
								再过<text class="tips_text">{{range}}{{unit}}</text>即可获得<text class="tips_text">{{award}}现金</text>
							</view>
							
						</view>
					</view>
					
					<view class="" v-show="!timeOut">
						<view class="" v-show="awardType == 0">
							当前可领取奖励：<text class="tips_text">{{award}}金币</text>
						</view>
						
						<view class="" v-show="awardType == 1">
							当前可领取奖励：<text class="tips_text">{{award}}现金</text>
						</view>
					</view>
				</view>
				
				<view class="countDown_box" @tap="toSign">
					<view class="countDown" v-show="timeOut">
						<tui-round-progress progressColor="#FF5357" fontColor="#fff" v-if="circle > 0"
						:percentage="timeRoundProgress" :defaultShow="false" :diam="circle" :percentText="time"
						:lineWidth="5" :fontSize="16"></tui-round-progress>
					</view>
					<text v-show="!timeOut" style="font-size:16px; color: #fff;" @tap.stop="receive(-2)">领取</text>
				</view>
			</view>
			
			<!-- 幸运大抽奖 -->
			<view class="signIn_box luckDraw_box">
				<view class="signIn_img">
					<image src="/static/img/qiandao.png" mode="widthFix"></image>
				</view>
				
				<view class="signIn_test">
					<view class="">
						幸运大抽奖
					</view>
					
					<view class="continued_sign">
						赚取更多奖励  上不封顶
					</view>
				</view>
				
				<view class="receive" @tap="toLuckDraw">抽奖</view>
			</view>
		</view>
		

		
		<view class="content main">
			<!-- 活动 -->
			<view class="hot_activity">
				<view class="activity_bar">任务</view>
				
				<view class="activity_column" v-for="(item, index) in activityList" :key="index">
					<view class="activity_left">
						<view class="activity_img">
							<image :src="item.imgUrl == ''? '/static/img/style/task/new.png' : item.imgUrl" 
							mode="widthFix" v-if="item.tip == 0"></image>
							<image :src="item.imgUrl == ''? '/static/img/style/task/hot.png' : item.imgUrl" 
							mode="widthFix" v-if="item.tip == 1"></image>
						</view>
						<view class="activity_test">
							<view class="" style="display:flex;">
								<text style="color:#D91D37;" v-if="item.isReceive">【已接】</text>
								<text>{{item.title}}</text>
									<view class="activity_tag" v-if="item.tip == 0 && !item.isReceive">NEW <text></text></view>
									<view class="activity_tag" v-if="item.tip == 1 && !item.isReceive">HOT <text></text></view>
							</view>
							<view class="activity_test1">{{item.explain}}</view>
						</view>
					</view>
					
					<view class="activity_right" @tap="toChenckTask(item)">
						<button class="activity_btn" hover-class="btn_hover">
							<view class="activity_btnImg">
								<!-- <image src="/static/img/work_btn.png" mode="widthFix"></image> -->
								<image src="/static/img/style/task/money.png" mode="widthFix"></image>
							</view>
							<text>+{{item.award}}</text>
						</button>
					</view>
				</view>
			</view>
		</view>
		
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
		
		<!-- <tui-loading></tui-loading> -->
	</view>
</template>

<script>
import time from "@/common/time.js";
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import tuiModal from "@/components/tui-modal/tui-modal.vue";
import util from "@/common/util.js";
import tuiRoundProgress from '@/components/tui-round-progress/tui-round-progress.vue';
import audio from "@/common/audio.js";
import tran from "@/common/tran.js";
import tuiLoadmore from "@/components/tui-loadmore/tui-loadmore.vue";
import tuiNomore from "@/components/tui-nomore/tui-nomore.vue";
// import tuiLoading from "@/components/tui-loading/tui-loading.vue";
export default{
	comments:{
		tuiModal,
		tuiRoundProgress,
		tuiLoadmore,
		tuiNomore,
		// tuiLoading
	},
	filters:{
		//金币转换现金计算
		cashExchange(val){
			if(val < 100) return 0;
			else{
				let num = val/100;
				num = num.toFixed(2);
				return num;
			}
		},
	},
	data() {
		return {
			userEn: [],  //我的信息
			myCoin: 0,  //我的金币
			myMoney: 0,  //现金
			activityList: [],  //活动列表
			id: null ,//任务id
			timeOut: true, //控制时间倒计时显示
			time: "",  //倒计时
			range: "",  //距离下次领取奖励的大概时间
			unit: '',   //距离下次领取奖励的时间单位
			award: null,  //当前奖励
			awardType: null, //奖励类型 0:金币 1:现金
			day: null,  //签到天数
			signSecond: null, //距离下次签到多少秒
			intervalID: null,  //定时器id
			timeRoundProgress: 0,//倒计时进度条
			uid: "",  //uid
			notReadMsgSum: null,  //未读消息数
			
			arrayLevel: [],   //任务等级列表
			arrayLevelIndex: 0,
			level: 1,	//选中的任务等级码
			
			arrayLevelName: [],  //任务等级名称列表
			
			loadding: false, //加载数据提示
			pullUpOn: true,  //上拉加载数据
			page: 1,  //查询页数
			
			multiArray: [
				[],
				[],
				[]
			],  //任务分类联级选择器
			multiIndex: [0, 0, 0],  //任务分类联级选择器下标
			
			
			arrClassifyName: [],  //分类名称
			taskTree: [],  //任务大类和子类列表
			classifyId: 1,  //选中的子类id
			
			resData: '',//传递过来的任务筛选信息 (大类id，子类id，会员等级)
			circle: 0,  //圆形进度条直径
			
			stateBarHeight: 0,  //状态栏高度
		}
	},
	onLoad(res) {
		if(res.data){
			this.resData = tran.url2Obj(res.data);  //获取任务筛选信息
			let arrIndex = [this.resData.bigClassifyId -1, this.resData.classifyId - 1, this.resData.level -1];  //组装筛选信息
			this.level = this.resData.level;  //设置任务等级码
			this.classifyId = this.resData.classifyId;  //设置子类id
			this.multiIndex = arrIndex;
		}
		this.circle = util.rpx2px('126rpx');
		// this.userEn = storage.getMyInfo();  //获取我的信息
		// this.myCoin = this.userEn.gold;
		// this.getGoldAdd();   //查询今日金币
		// this.getTaskList();  //获取任务列表
		//this.uid = storage.getUid();
	},
	onShow(){
		this.uid = storage.getUid();  //获取uid
		let h = util.getStateBarHeight();
		this.stateBarHeight = h + 44;
		this.userEn = storage.getMyInfo();  //获取我的信息
		this.getMyInfo();  //刷新我的信息
		this.getTaskList();  //获取任务列表
		this.getSignProgress();  //查询奖励信息
		this.timeAuto();  //开启计时器
		//this.getNotReadMsgSum(); //查询未读消息数
		this.getLevelDesc(); //获取会员等级列表
		this.getTaskTree();  //获取任务大类和子类列表
	},
	methods:{				
		//获取任务大类和子类列表
		getTaskTree(){
			let data = storage.getTaskTree();
			this.taskTree = data;  //保存任务大类和子类列表
			this.multiArray[0] = [];
			this.multiArray[1] = [];			
			data.forEach((item, index) =>{
				if(item.big.state == 1)  //任务大类状态为开启时
				{
					this.multiArray[0].push(item.big.name);  //获取大类名称
					let arrClassifyName = [];  //子类名称数组
					for(let i = 0; i < item.list.length; ++i){
						if(item.list[i].state == 1) arrClassifyName.push(item.list[i].name);  //获取状态为开启的每个子类名称
					}
					this.arrClassifyName.push(arrClassifyName);  //保存所有子类名称数组
				}
			});
			if(this.multiArray[1].length <= 0) this.multiArray[1] = this.arrClassifyName[0]; //设置显示默认子类名称
			// console.log(this.multiArray);
			// this.getClassifyId(); //获取默认选中的子类id
		},
		//任务分类+会员等级 选择器操作
		bindMultiPickerColumnChange: function(e) {
			console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value);
			this.multiIndex[e.detail.column] = e.detail.value;  //修改this.multiIndex对应下标
			switch (e.detail.column) {
				case 0: //拖动第1列(大类列)
					switch (this.multiIndex[0]) {
						case 0:
							this.multiArray[1] = this.arrClassifyName[0];
							break
						case 1:
							this.multiArray[1] = this.arrClassifyName[1];
							break
					}
					break;
				case 1: //拖动第2列(子类列)
					this.getClassifyId(this.multiIndex);	//获取选中子类id
					break;
				case 2: //拖动第3列(会员等级列)
					this.getLevelId(this.multiIndex);	//获取选中的会员等级id
					break;
			}
			this.getTaskList();  //重新获取任务列表
			this.$forceUpdate()
		},
		//获取选中子类id
		getClassifyId(arr = [0, 0, 0]){
			let arrSel = this.taskTree[arr[0]];
			arrSel.list.forEach((item, index) =>{
				if(index == arr[1]) this.classifyId = item.classifyId;
			});
			// console.log(this.classifyId);
		},
		//获取选中的会员等级id
		getLevelId(arr = [0, 0, 0]){
			this.arrayLevel.forEach((item, index) =>{
				 //获取选中的任务状态码
				if(arr[2] == index) this.level = item.id;  //重新获取选中的任务状态码
			});
		},
		
		
		
		//上拉刷新
		onPullDownRefresh: function() {
			//延时为了看效果
			setTimeout(() => {
				this.getTaskList(); //获取任务列表
				this.getMyInfo();  //刷新我的信息
				this.getSignProgress();  //查询奖励信息
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
		
		//获取会员等级列表
		getLevelDesc(){
			this.multiArray[2] = [];
			let data = storage.getLevelList();
			this.arrayLevel = data;  //保存任务等级列表
			data.forEach((item, index) =>{
				if(item.state == 1) this.multiArray[2].push(item.levelName);	//获取状态为开启的每个任务等级名称
			});
		},
		//选择任务等级
		levelPickerChange(e){
			this.arrayLevelIndex = e.detail.value;
			this.arrayLevel.forEach((item, index) =>{
				 //获取选中的任务状态码
				if(this.arrayLevelIndex == index) this.level = item.level;  //重新获取选中的任务状态码
			});
		},
		//查询未读消息数
		getNotReadMsgSum(){
			api.getNotReadMsgSum({uid: this.uid}, (res)=>{
				this.notReadMsgSum = api.getData(res);
				//有未读消息时tabbar显示红点提示
				if(this.notReadMsgSum > 0){
					uni.setTabBarBadge({
					  index: 3,
					  text: this.notReadMsgSum + ''
					})
				}else uni.hideTabBarRedDot({index:3})  //没有未读消息时tabba移除红点提示
			});
		},
		//计算圆形进度条长度
		computeLength(){
			if(this.unit == '小时') this.timeRoundProgress = parseFloat(100 - [(this.range / 24) * 100]);
			else if(this.unit == '分钟' || this.unit == '秒') this.timeRoundProgress = parseFloat(100 - [(this.range / 60) * 100]);
			else if(this.unit == '天') this.timeRoundProgress = parseFloat(100 - [(this.range / 30) * 100]);
			// console.log(this.timeRoundProgress);
		},
		//刷新我的信息
		getMyInfo(){
			api.getUserByUid({uid: this.uid}, (res)=>{
				storage.setMyInfo(api.getData(res));
				this.userEn = api.getData(res);
				this.myCoin = this.userEn.gold;
				this.myMoney =  this.userEn.money;
				//this.getGoldAdd();   //查询今日金币
			});
		},
		//开启定时器
		timeAuto(){
			clearInterval(this.intervalID);
			this.intervalID = setInterval(this.getShowTimeBySecond, 1000);
		},
		//查询奖励信息
		getSignProgress(){
			api.getSignProgress({uid: this.uid}, (res)=>{
				let data = api.getData(res);
				//sign为空时表示没有可领取的奖励
				if(util.isEmpty(data.sign)){
					this.timeOut = true;
					this.awardType = data.nextSign.awardType;
					this.award = data.nextSign.award;
					this.signSecond = data.nextSecond;
					//this.getShowTimeBySecond();

				}else{
					this.signSecond = null;
					this.timeOut = false;
					this.awardType = data.sign.awardType;
					this.award = data.sign.award;
					this.day = data.sign.day;
				}
			});
		},
		//把秒转换为对应显示格式
		getShowTimeBySecond(){		
			if(this.signSecond == null) return;
			let sp = this.signSecond;
			//大于一小时转换为最小单位 分
			if(sp > 3600){
				let hour = parseInt(sp / 3600);  //获取小时
				let min = parseInt([sp - (hour * 3600)] / 60); //获取分钟
				if(hour > 100){
					let day = parseInt(sp / 86400);  //获取天数
					this.range = day;  //显示倒计时的天数
					this.unit = "天";
					this.time = `${day}天`;
					return;
				};
				this.range = hour;  //显示倒计时的小时
				this.unit = "小时";
				this.time = `${hour}:${min}`;
			}else if(sp >= 0){
				let min = parseInt(sp / 60); //获取分钟
				let second = parseInt(sp - (min * 60)); //获取秒
				// console.log(second);
				this.range = min;  //显示倒计时的分钟
				this.unit = "分钟";
				this.time = `${min}:${second}`;
				
				if(this.range == 0){
					this.range = second;  //显示倒计时的秒
					this.unit = "秒";
					this.time = `${second}`;
				}
			}else{
				this.getSignProgress();  //再次请求数据
			}
		    this.signSecond += -1;  //每秒减一
			this.computeLength();
		},
		//领取奖励
		receive(type){
			audio.playAudio();
			api.sign({
				uid: this.uid, 
				day: this.day
			}, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				console.log(res);
				if(code == 0){
					this.getSignProgress();  //再次查询数据
					uni.showModal({
						content: "领取奖励成功",
						showCancel: false,
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/receiveAward/receiveAward"
								})
							};
						}
					});
				}else{
					uni.showToast({
						title: msg,
						image: "/static/img/fail-circle.png",
						duration: 2000
					})
				}
			});
		},
		//跳转查看签到页
		toSign(){
			audio.playAudio();
			uni.navigateTo({
				url: '/pages/receiveAward/receiveAward'
			})
		},
		//跳转到幸运转盘页
		toLuckDraw(){
			audio.playAudio();
			uni.navigateTo({
				// url: '/pages/work/luckDraw/luckDraw'
				url: '/pages/work/luckDraw2/luckDraw2'
			})
		},
		//获取今日金币
		// getGoldAdd(){
		// 	api.getStatisticsToday({uid: this.uid}, (res) =>{
		// 		let data = api.getData(res);
		// 		if(util.isEmpty(data)) return;
		// 		else this.todayCoin = data.goldAdd;
		// 	});
		// },
		//获取任务列表
		getTaskList(){
			this.page = 1;
			api.getTask1({
				uid: this.uid,
				state: 1,
				page: this.page,
				count: 8,
				level: parseInt(this.level),
				classify: this.classifyId,
				begTime: time.getNowTime(),
				endTime: time.getNowTime()
			}, (res)=> {
				let data = api.getData(res).data;
				this.activityList = data;
			});
		},
		//查看任务详情
		toChenckTask(item){
			audio.playAudio();
			uni.navigateTo({
				url: "/pages/workExplain/workExplain?id=" + item.id + "&type=1&isReceive=" + item.isReceive
			});
		},
		//做一个任务
		taskDo(){
			let _this = this;
			api.taskDo({
				uid: this.uid, 
				taskId: this.id,
			}, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				this.hide8();
				if(code == 0){
					uni.showModal({
						content: "任务" + msg,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								_this.getMyInfo();  //刷新我的信息
								_this.getGoldAdd();   //查询今日金币
							};
						}
					});
				}else{
					uni.showModal({
						content: msg,
						showCancel: false
					});
				}
			});
		},
		//跳转到任务金币明细页
		toGoldDetails(){
			audio.playAudio();
			uni.navigateTo({
				url: "/pages/workDetails/workDetails"
			})
		},
	},
	//上拉获取更多任务数据
	onReachBottom(){
		if (!this.pullUpOn) return;
		this.loadding = true;
		this.page = this.page + 1;
		
		api.getTask1({
			uid: this.uid,
			state: 1,
			page: this.page,
			count: 8,
			level: parseInt(this.level),
			classify: this.classifyId,
			begTime: time.getNowBeg(),
			endTime: time.getNowEnd()
		}, (res)=>{
			let data = api.getData(res).data;
			if(util.isEmpty(data)){
				this.loadding = false;
				this.pullUpOn = false;
			}else{
				this.loadding = false;
				data.forEach((item) =>{
					this.activityList.push(item);
				});
			}
		});
	},
}
</script>

<style>
	.head_box{
		width:100%;
		height:400rpx;
		color: #fff;
		padding:40rpx 40rpx 20rpx;
		box-sizing:border-box;
		position:relative;
		border-radius:0 0 20rpx 20rpx;
		/* background-color:#FEC40B; */
	}
	.coin{
		width:100%;
		display:flex;
		justify-content:space-between;
		align-items:center;
	}
	.coin>view{
		text-align:center;
	}
	.coin_num{
		font-weight:bold;
		font-size:24px;
	}
	.coin_test{
		font-size:14px;
		margin-top:20rpx;
	}
	.extract_btn>button{
		font-size:14px;
		border-radius: 60rpx;
		padding:0 40rpx;
		box-sizing:border-box;
	}
	.signIn_box{
		width:100%;
		height:140rpx;
		background-color:#fff;
		margin-top:40rpx;
		border-radius:20rpx 200rpx 200rpx 20rpx;
		padding:20rpx;
		box-sizing:border-box;
		display:flex;
		align-items:center;
		position:relative;
	}
	.luckDraw_box{
		display:flex;
		align-items:center;
		justify-content:space-between;
		font-size:14px;
		width:90%;
		border-radius:20rpx;
		position:absolute;
		bottom:-110rpx;
		box-shadow: 5px 7px 10px rgb(255,244,212), -5px 7px 10px rgb(255,244,212);
	}
	.receive{
		border-radius:40rpx;
		text-align:center;
		width:140rpx;
		height:80rpx;
		line-height:80rpx;
		background-image:linear-gradient(to right, rgb(255,139,6) , rgb(255,194,7));
	}
	.signIn_img{
		width:90rpx;
		height:90rpx;
	}
	.signIn_test{
		font-size:14px;
		color:#808080;
		margin-left:20rpx;
	}
	.continued_sign{
		margin-top:10rpx;
	}
	.countDown_box{
		width:118rpx;
		height:118rpx;
		border-radius:50%;
		background-color:#FFCA00;
		position: absolute;
		right:20rpx;
		color:#FF1409;
		text-align:center;
		line-height:120rpx;
		font-size:15px;
		font-weight:bolder;
		position:absolute;
		right: 16rpx;
	}
	.countDown{
		position:absolute;
		top:-4rpx;
		right:-6rpx;
	}
	.main{
		margin-top:160rpx;
	}
	.hot_activity{
		margin-top:20rpx;
	}
	.activity_bar{
		width:100%;
		height:40rpx;
		border-left:5px solid #FF5219;
		padding-left:20rpx;
		box-sizing:border-box;
		font-size:14px;	
		line-height:40rpx;
	}
	.activity_column{
		display:flex;
		justify-content:space-between;
		align-items:center;
		padding:40rpx 10rpx;
		box-sizing:border-box;
		border-bottom:1px solid #f5f5f5;
	}
	.boder_none{
		border:none;
	}
	.activity_left{
		display:flex;
	}
	.activity_img{
		width:90rpx;
		height:90rpx;
		border-radius:50%;
		overflow:hidden;
	}
	.activity_test{
		display:flex;
		flex-direction: column;
		font-size:14px;
		margin-left:20rpx;
		width:340rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.activity_test1{
		margin-top:10rpx;
		font-size:12px;
		color:#7a7a7a;
		width:340rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.activity_tag{
		display:inline-block;
		padding:0 4rpx;
		box-sizing:border-box;
		background-color:#ff4007;
		font-size:12px;
		color:#fff;
		position:relative;
		left:20rpx;
	}
	.activity_tag1{
		background-color:#ff8307;
	}
	.activity_tag>text{
		width:0rpx;
		height:0rpx;
		border-top:10rpx solid transparent;
		border-right:10rpx solid #ff4007;
		border-bottom:10rpx solid transparent;
		border-left:10rpx solid transparent;
		display:inline-block;
		position:absolute;
		left:-18rpx;
		top:6rpx;
	}
	.activity_tag1>text{
		border-right:10rpx solid #ff8307;		
	}
	.activity_btn{
		width:200rpx;
		padding:0 10rpx;
		box-sizing:border-box;
		/* background-color:#ff471f; */
		background-image:linear-gradient(to right, rgb(255, 71, 31) , rgb(255, 120, 3));
		font-size:14px;
		color:#fff;
		display:flex;
		align-items:center;
		border-radius:60rpx;
		/* box-shadow: 0px 3px 0px rgb(232, 11, 12), 0px 3px 0px rgb(232, 11, 12); */
	}
	.activity_btnImg{
		width:50rpx;
		height:50rpx;
		margin-right:10rpx;
	}
	.close{
		position:absolute;
		right:30rpx;
		top:10rpx;
	}
	.info{
		font-size:12px;
	}
	.mar_b{
		display:block;
		margin-bottom:20rpx;
	}
	.work_test text:nth-child(1){
		margin-right:20rpx;
	}
	.box{
		width:100%;
	}
	.info{
		display:flex;
		width:100%;
		font-size:13px;
	}
	.info_test{
		width:50%;
	}
	.num{
		font-size:12px;
		margin-top:20rpx;
	}
	.tips{
		font-size:12px;
		background-color:#ff6b17;
		width:auto;
		text-align:center;
		color:#fff;
	}
	.exChange{
		margin-top:30rpx;
		background-color:#d1d1d1;
		border-radius:30rpx;
		color:#fff;
		font-size:14px;
	}
	.exChange:after{
		border: none;
	}
	.exchange_tips{
		width:100%;
		margin-top:20rpx;
		font-size:12px;
		text-align:center;
	}
	.copy{
		width:100%;
		margin-top:40rpx;
	}
	.copy button{
		font-size:14px;
		border-radius:40rpx;
		background-color:#FCD030;
	}
	.info_title{
		color: #FF0000;
		font-size:16px;
	}
	.tips_text{
		color:#FF0000;
	}
	.receive_btn{
		text-align:center;
	}
	.receive_btnB{
		width:100%;
		margin-bottom:60rpx;
	}
	.receive_title{
		font-size:16px;
	}
	.receive_Mbtn button{
		border-radius:40rpx;
		background-color:#FCD030;
		color:#000;
		font-size:14px;
	}



	.lay_navbar{
		width:100%;
		display:flex;
		justify-content: center;
		align-items: center;
	}
	.level_box{
		/* width:70%; */
		font-size:16px;
		padding:0 20rpx;
		box-sizing:border-box;
		/* margin:auto; */
		color:#fff;
		font-weight:bold;
		display:flex;
		justify-content:center;
		align-items:center;
	}
	.icon_down{
		margin-left:10rpx;
	}
</style>

