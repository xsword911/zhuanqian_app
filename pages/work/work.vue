<template>
	<view class="">
		<view class="head_box background_style">
			<!-- 金币信息 -->
			<view class="coin">
				<view class="">
					<view class="coin_num">
						{{todayCoin}}
					</view>
					<view class="coin_test">
						今日金币
					</view>
				</view>
				
				<view class="">
					<view class="coin_num">
						{{myCoin}}
					</view>
					<view class="coin_test">
						我的金币
					</view>
				</view>		
				
				<view class="" @tap="toGoldDetails" class="extract_btn">
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
						<tui-round-progress progressColor="#FF5357" fontColor="#fff"
						:percentage="timeRoundProgress" :defaultShow="false" :diam="65" :percentText="time"
						:lineWidth="5" :fontSize="16"></tui-round-progress>
					</view>
					<text v-show="!timeOut" style="font-size:16px; color: #fff;" @tap="receive(-2)">领取</text>
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
			<!-- 热门活动 -->
			<view class="hot_activity">
				<view class="activity_bar">热门活动</view>
				
				<view class="activity_column" v-for="(item, index) in hotActivity" :key="index">
					<view class="activity_left">
						<view class="activity_img">
							<image :src="item.imgUrl == ''? '/static/img/work_img.png' : item.imgUrl" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>{{item.title}}</text>
									<view class="activity_tag" v-if="item.tip == 0">NEW <text></text></view>
									<view class="activity_tag" v-if="item.tip == 1">HOT <text></text></view>
							</view>
							<view class="activity_test1">{{item.explain}}</view>
						</view>
					</view>
					
					<view class="activity_right" @tap="show8(item)">
						<button class="activity_btn" hover-class="btn_hover">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>+{{item.award}}</text>
						</button>
					</view>
				</view>
			</view>
			
			<!-- 限时推荐-->
			<view class="hot_activity">
				<view class="activity_bar">限时推荐</view>
				
				<view class="activity_column"  v-for="(item, index) in recommend" :key="index">
					<view class="activity_left">
						<view class="activity_img">
							<image :src="item.imgUrl == ''? '/static/img/work_img1.png' : item.imgUrl" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>{{item.title}}</text>
								<view class="activity_tag" v-if="item.tip == 0">NEW <text></text></view>
								<view class="activity_tag" v-if="item.tip == 1">HOT <text></text></view>
							</view>
							<view class="activity_test1">{{item.explain}}</view>
						</view>
					</view>
					
					<view class="activity_right" @tap="show8(item)">
						<button class="activity_btn" hover-class="btn_hover">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
								<text>+{{item.award}}</text>
						</button>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 任务提示弹窗 -->
		<tui-modal :show="modal8" @cancel="hide8" :custom="true" style="position:relative;">
			<view class="tui-modal-custom">
				<view class="close" @tap="hide8"><tui-icon name="shut" :size="16"></tui-icon></view>
				<view class="info">
					<view class="box" v-show="type == 0">
						<text class="mar_b info_title">{{title}}</text>
						<view class="work_test mar_b">
							<text>我的邀请码：</text>
							<text selectable="true">{{userEn.code}}</text>
						</view>
						<view class="work_test mar_b">
							<text>下载链接：</text>
							<text selectable="true">{{text}}</text>
						</view>
						
						<view class="mar_b">
							<text>复制邀请码与链接邀请好友即可获得金币!</text>
						</view>
						
						<view class="copy">
							<button type="default" @tap="toWx">复制内容并跳转</button>
						</view>
					</view>
					
					<view class="box" v-show="type == 1">
						<text class="mar_b info_title">{{title}}</text>
						<view class="work_test mar_b">
							<text>复制内容到朋友圈：</text>
							<text selectable="true">{{text}}</text>
						</view>
						
						<view class="mar_b">
							<text>发送内容到朋友圈即可获得金币!</text>
						</view>
						
						<view class="copy">
							<button type="default" @tap="toWx">复制内容并跳转</button>
						</view>
					</view>
					
					<view class="box" v-show="type == 2">
						<text class="mar_b info_title">{{title}}</text>
						<view class="work_test mar_b">
							<text>添加微信好友：</text>
							<text selectable="true">{{text}}</text>
						</view>
						
						<view class="mar_b">
							<text>添加微信好友即可获得金币!</text>
						</view>
						
						<view class="copy">
							<button type="default" @tap="toWx">复制内容并跳转</button>
						</view>
					</view>
					
					<view class="box" v-show="type == 3">
						<text class="mar_b info_title">{{title}}</text>
						<view class="work_test mar_b">
							<text>下载链接：</text>
							<text selectable="true">{{text}}</text>
						</view>
						
						<view class="mar_b">
							<text>下载APP试玩即可获得金币!</text>
						</view>
						
						<view class="copy">
							<button type="default" @tap="toWx">复制内容并跳转</button>
						</view>
					</view>
					
					<view class="box" v-show="type == -1">
						<view class="info">
							<view class="info_test">
								<view class="">
									我的金币
								</view>
								<view class="num ">
									{{myCoin}}
								</view>
								<view class="num tips">
									100金币=1元
								</view>
							</view>
							
							<view class="info_test">
								<view class="">
									可兑换现金
								</view>
								<view class="num ">
									￥{{myCoin | cashExchange}}
								</view>
							</view>
						</view>
						
						<view class="">
							<button type="default" class="exChange">立即兑换</button>
						</view>
						
						<view class="exchange_tips">
							金币只能兑换100的倍数
						</view>
					</view>
					
					<view class="box" v-show="type == -2">
						<view class="receive_btn">
							<view class="receive_title receive_btnB">领取奖励</view>
							
							<view class="receive_btnB">
								<view class="" v-show="awardType == 0">
									恭喜你获得<text class="tips_text">{{award}}金币</text>
								</view>
								
								<view class="" v-show="awardType == 1">
									恭喜你获得：<text class="tips_text">{{award}}现金</text>
								</view>
							</view>
							
							<view class="receive_Mbtn">
								<button type="default" @tap="hide8">确定</button>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</tui-modal>
		
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import tuiModal from "@/components/tui-modal/tui-modal.vue";
import util from "@/common/util.js";
import tuiRoundProgress from '@/components/tui-round-progress/tui-round-progress.vue';
import audio from "@/common/audio.js";
import tran from "@/common/tran.js";
export default{
	comments:{
		tuiModal,
		tuiRoundProgress,
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
			todayCoin: 0,  //今日金币
			hotActivity: [],  //热门活动列表
			recommend: [],  //限时推荐列表
			modal8: false,  //控制金币换现金弹窗显示
			text: null, //弹窗的文字内容
			type: 0, //弹窗类型
			title: '', //弹窗标题
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
		}
	},
	onLoad() {
		// this.userEn = storage.getMyInfo();  //获取我的信息
		// this.myCoin = this.userEn.gold;
		// this.getGoldAdd();   //查询今日金币
		// this.getTaskList();  //获取任务列表
		//this.uid = storage.getUid();
	},
	onShow(){
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();  //获取我的信息
		this.getMyInfo();  //刷新我的信息
		this.getTaskList();  //获取任务列表
		this.getSignProgress();  //查询奖励信息
		this.timeAuto();  //开启计时器
		this.getNotReadMsgSum(); //查询未读消息数
	},
	methods:{
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
		},
		//刷新我的信息
		getMyInfo(){
			api.getUserByUid({uid: this.uid}, (res)=>{
				storage.setMyInfo(api.getData(res));
				this.userEn = api.getData(res);
				this.myCoin = this.userEn.gold;
				this.getGoldAdd();   //查询今日金币
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
			// console.log(sp);
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
			this.show8(type);
			api.sign({
				uid: this.uid, 
				day: this.day
			}, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
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
		//复制内容并跳转到微信
		toWx(){
			audio.playAudio();
			let test = '';
			test = this.text;
			if(this.type == 0) test = '我的邀请码是' + this.userEn.code + "下载链接是" + this.text;
			this.taskDo();
			// ifdef H5
			return;
			// endif
			uni.setClipboardData({
				data: test,
				success() {
					// if (plus.os.name == "iOS") {  
					//     plus.runtime.openURL("weixin://")  
					// } else if (plus.os.name == "andriod") {  
					//     var Intent = plus.android.importClass("android.content.Intent");  
					//     var ComponentName = plus.android.importClass('android.content.ComponentName')  
					//     var intent = new Intent();  
					//     intent.setComponent(new ComponentName("com.tencent.mm", "com.tencent.mm.ui.LauncherUI"));  
					//     //intent.putExtra("LauncherUI.From.Scaner.Shortcut", true);  
					//     intent.setFlags(335544320);  
					//     intent.setAction("android.intent.action.VIEW");  
					//     var main = plus.android.runtimeMainActivity();  
					//     main.startActivity(intent);  
					// }  
				}
			});
		},
		//获取今日金币
		getGoldAdd(){
			api.getStatisticsToday({uid: this.uid}, (res) =>{
				let data = api.getData(res);
				if(util.isEmpty(data)) return;
				else this.todayCoin = data.goldAdd;
			});
		},
		//获取任务列表
		getTaskList(){
			api.getTask1({
				state: 1,
				page: 1,
				count: 15,
			}, (res)=> {
				let data = api.getData(res).data;
				let hotList = [];
				let recommendList = [];
				let list = []; 
				//获取任务状态为开启的全部任务列表
				data.forEach((item, index) =>{
					if(item.state == 1) list.push(item);
				});
				//分类热门活动列表和限时推荐列表
				list.forEach((item, index) =>{
					if(item.sort == 0) hotList.push(item);
					if(item.sort == 1) recommendList.push(item);
				});
				this.hotActivity = hotList;
				this.recommend = recommendList;
			});
		},
		//关闭弹窗
		hide8() {
			audio.playAudio();
			this.modal8 = false;
		},
		//打开弹窗
		show8(item) {
			uni.navigateTo({
				url: "/pages/workExplain/workExplain?id=" + item.id + "&type=1" 
			});
			return;
			audio.playAudio();
			if(item.type == 4) return;
			this.modal8 = true;
			if(item == -2){
				this.type = item;
				return;
			};
			this.type = item.type;
			this.text = item.rule;
			this.title = item.title;
			this.id = item.id;
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
	}
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
		color:#FFCA00;
		padding:0 40rpx;
		box-sizing:border-box;
	}
	.tag:before{
		color:#FFCA00;
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
		width:80rpx;
		height:80rpx;
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
		box-shadow: 0px 3px 0px rgb(232, 11, 12), 0px 3px 0px rgb(232, 11, 12);
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

</style>
