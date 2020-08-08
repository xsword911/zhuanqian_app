<template>
	<view class="">
<!-- 		<view class="head_box">
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
					<button type="default" class="">收益明细 <tui-icon name="arrowright" :size="15" class="tag"></tui-icon></button>
				</view>
				
			</view>
	</view> -->
	
	<view class="uni-margin-wrap">
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" 
		:interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in run" :key="index" @tap="toUrl(item.toUrl)">
				<view class="swiper-item "><image :src="item.imgUrl" mode=""></image></view>
			</swiper-item>
<!-- 			<swiper-item>
				<view class="swiper-item "><image src="/static/img/banner2.png" mode=""></image></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item "><image src="/static/img/banner3.png" mode=""></image></view>
			</swiper-item> -->
		</swiper>
	</view>
	
	<view class="example-body">
		<uni-notice-bar :show-icon="true" :scrollable="true" :single="true" :text="runHorseEn.content" @tap="toUrl"/>
	</view>
	
		<view class="content main">
			<!-- 热门活动 -->
			<view class="hot_activity">
				<view class="activity_bar">赚赚</view>
				
				<view class="activity_column" v-for="(item, index) in earn" :key="index">
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
		</view>
		
		<!-- 任务提示弹窗 -->
		<tui-modal :show="modal8" @cancel="hide8" :custom="true" 
		style="position:relative;" 
		:padding="noticePadding">	
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
					
					<view class="lay_notice" v-show="type == 100">
						<view class="lay_notice_title">
							{{noticeEn.title}}
						</view>
						<view class="lay_notice_time">
							{{noticeEn.updTime}}
						</view>
						<scroll-view scroll-y="true" class="lay_scroll">
							<view class="lay_main">
								<view class="lay_img">
									<image :src="noticeEn.imgUrl" mode=""></image>
								</view>
								<view class="lay_test">
									{{noticeEn.content}}
								</view>
							</view>
						</scroll-view>
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
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
export default{
	comments:{
		tuiModal,
		tuiRoundProgress,
		uniNoticeBar
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
			earn: [],  //赚赚活动列表
			noticePadding: "0",  //弹窗的padding属性
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
			runHorseEn: "", //跑马灯文字
			noticeId: 0,  //最新公告id
			isShowNotice: true,   //是否显示公告
			noticeEn: [],    //公告信息
			notReadMsgSum: null,  //未读消息数
			
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 3000,
			duration: 500,
			run: [],  //轮播图列表
		}
	},
	onLoad() {
		// this.userEn = storage.getMyInfo();  //获取我的信息
		// this.myCoin = this.userEn.gold;
		// this.getGoldAdd();   //查询今日金币
		// this.getTaskList();  //获取任务列表
	},
	onShow(){
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();  //获取我的信息
		this.getMyInfo();  //刷新我的信息
		this.getTaskList();  //获取赚赚列表
		this.getRun();//获取轮播图列表
		this.getRunHorse();   //获取跑马灯内容
		this.getNotice();    //获取公告
		this.noticePadding = "0";  //重置公告弹窗
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
		//获取公告
		getNotice(){
			api.getNotice({type: 2, state: 1}, (res)=>{
				let data = api.getData(res).data;
				this.noticeEn = data[0];
				if(this.noticeId < this.noticeEn.id){
					this.noticeId = this.noticeEn.id;
					this.show8(100);  //公告弹窗
				}
			});
		},
		//跑马灯点击跳转外部链接
		toUrl(){
			window.location.href = 'https://' + this.runHorseEn.toUrl;
		},
		//获取跑马灯文字内容
		getRunHorse(){
			api.getNotice({type: 1, state: 1}, (res)=>{
				let data = api.getData(res).data;
				this.runHorseEn = data[0];
			});
		},
		//轮播图点击跳转到外部链接
		toUrl(url){
			window.location.href = 'https://' + url;
		},
		//获取轮播图列表
		getRun(){
			api.getNotice({type: 0, state: 1}, (res)=>{
				let data = api.getData(res).data;
				data = data.slice(0, 5);
				this.run = data;
			});
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
		//跳转查看签到页
		toSign(){
			uni.navigateTo({
				url: '/pages/receiveAward/receiveAward'
			})
		},
		//跳转到幸运转盘页
		toLuckDraw(){
			uni.navigateTo({
				url: '/pages/work/luckDraw/luckDraw'
			})
		},
		//复制内容并跳转到微信
		toWx(){
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
			api.getTask2({
				state: 1,
				page: 1,
				count: 10
			}, (res)=> {
				let data = api.getData(res).data;
				this.earn = data;
			});
		},
		//关闭弹窗
		hide8() {
			this.modal8 = false;
		},
		//打开弹窗
		show8(item) {
			if(item.type == 4) return;
			this.modal8 = true;
			if(item == -2){
				this.type = item;
				return;
			}else if(item == 100){
				this.type = item;
				return;
			}
			this.noticePadding = "40rpx 64rpx";
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
			uni.navigateTo({
				url: "/pages/workDetails/workDetails"
			})
		},
	}
}
</script>

<style>
	.head_box{
		background-color:#fcd030;/* FFCA00 */
		width:100%;
		height:220rpx;
		color: #fff;
		padding:40rpx 40rpx 20rpx;
		box-sizing:border-box;
		/* border-radius:0 0 20rpx 20rpx; */
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
	.main{
		margin-top:20rpx;
	}
	.hot_activity{
		margin-top:40rpx;
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
	
	
	.uni-margin-wrap {
/* 		width:690rpx;
		margin:0 30rpx; */
		width:100%;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.uni-bg-red{
		background:#F76260; color:#FFF;
	}
	.uni-bg-green{
		background:#09BB07; color:#FFF;
	}
	.uni-bg-blue{
		background:#007AFF; color:#FFF;
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
		margin-top:10rpx;
	}
	
	
	.lay_notice{
		width:100%;
		background-image: linear-gradient(#FCD030, #fff);
		border-radius:20rpx;
		padding:60rpx 20rpx 20rpx;
		box-sizing:border-box;
	}
	.lay_notice_title{
		width:100%;
		font-size:18px;
		text-align:center;
		margin-bottom:20rpx;
	}
	.lay_notice_time{
		width:100%;
		font-size:14px;
		text-align:center;
		margin-bottom:40rpx;
	}
	.lay_scroll{
		height:200px; 
		background-color: #fff; 
		border-radius:20rpx; 
		padding:20rpx; 
		box-sizing:border-box;
	}
	.lay_img{
		width:100%;
		height:auto;
	}
</style>
