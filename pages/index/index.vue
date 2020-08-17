<template>
	<view class="">	
	<!-- 轮播图 -->
	<view class="uni-margin-wrap">
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" 
		:interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in run" :key="index" @tap="toUrl(item.toUrl)">
				<view class="swiper-item "><image :src="item.imgUrl" mode=""></image></view>
			</swiper-item>
		</swiper>
	</view>
	
	<!-- 菜单 -->
	<view class="lay_bar">
		<view class="menu_box menu_bottom" @tap="toMoney">
			<view class="">
				<view class="menu_img">
					<image src="/static/img/sy1.png" mode=""></image>
				</view>
				<view class="menu_test">
					余额生金
				</view>
			</view>
		</view>
		
		<view class="menu_box menu_bottom" @tap="toRacharge">
			<view class="">
				<view class="menu_img">
					<image src="/static/img/sy2.png" mode=""></image>
				</view>
				<view class="menu_test">
					马上充值
				</view>
			</view>
		</view>
		
		<view class="menu_box menu_bottom" @tap="toExtractMoney">
			<view class="">
				<view class="menu_img">
					<image src="/static/img/sy3.png" mode=""></image>
				</view>
				<view class="menu_test">
					快速提现
				</view>
			</view>
		</view>
		
		<view class="menu_box menu_bottom" @tap="toAgentExtend">
			<view class="">
				<view class="menu_img">
					<image src="/static/img/sy4.png" mode=""></image>
				</view>
				<view class="menu_test">
					邀请好友
				</view>
			</view>
		</view>
		
		<view class="menu_box" @tap="toGuide">
			<view class="">
				<view class="menu_img">
					<image src="/static/img/sy5.png" mode=""></image>
				</view>
				<view class="menu_test">
					新手指南
				</view>
			</view>
		</view>
		
		<view class="menu_box">
			<view class="">
				<view class="menu_img" @tap="toPower">
					<image src="/static/img/sy6.png" mode=""></image>
				</view>
				<view class="menu_test">
					会员特权
				</view>
			</view>
		</view>
		
		<view class="menu_box">
			<view class="">
				<view class="menu_img">
					<image src="/static/img/sy7.png" mode=""></image>
				</view>
				<view class="menu_test">
					App下载
				</view>
			</view>
		</view>
		
		<view class="menu_box" @tap="toVip">
			<view class="">
				<view class="menu_img">
					<image src="/static/img/m9.png" mode=""></image>
				</view>
				<view class="menu_test">
					升级会员
				</view>
			</view>
		</view>
	</view>
	
	<!-- 跑马灯 -->
	<view class="example-body">
		<uni-notice-bar :show-icon="true" :scrollable="true" :single="true" :text="runHorseEn.content" @tap="toUrl"/>
	</view>
	
	<!-- 任务大厅 -->
	<view class="lay_work">
		<view class="">任务大厅</view>
		<view class="work_list">
			<view class="work" @tap="toWork">
				<view class="work_num">任务数量3单/天</view>
				<view class="work_text">新人任务专属通道</view>
				<view class="work_img">
					<image src="/static/img/member1.png" mode=""></image>
				</view>
			</view>
			
			<view class="work" @tap="toWork">
				<view class="work_num">任务数量10单/天</view>
				<view class="work_text">白银会员专属通道</view>
				<view class="work_img">
					<image src="/static/img/member2.png" mode=""></image>
				</view>
			</view>
			
			
			<view class="work" @tap="toWork">
				<view class="work_num">任务数量20单/天</view>
				<view class="work_text">黄金会员专属通道</view>
				<view class="work_img">
					<image src="/static/img/member3.png" mode=""></image>
				</view>
			</view>
			
			
			<view class="work" @tap="toWork">
				<view class="work_num">任务数量35单/天</view>
				<view class="work_text">铂金会员专属通道</view>
				<view class="work_img">
					<image src="/static/img/member4.png" mode=""></image>
				</view>
			</view>
			
			<view class="work" @tap="toWork">
				<view class="work_num">任务数量50单/天</view>
				<view class="work_text">钻石会员专属通道</view>
				<view class="work_img">
					<image src="/static/img/member5.png" mode=""></image>
				</view>
			</view>
			
			<view class="work" @tap="toWork">
				<view class="work_num">任务数量70单/天</view>
				<view class="work_text">至尊会员专属通道</view>
				<view class="work_img">
					<image src="/static/img/member6.png" mode=""></image>
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
					<view class="lay_notice">
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
import tran from "@/common/tran.js";
import utilCore from "@/api/utilCore.js";
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
		this.getRun();//获取轮播图列表
		this.getRunHorse();   //获取跑马灯内容
		this.getNotice();    //获取公告
		this.noticePadding = "0";  //重置公告弹窗
		this.getNotReadMsgSum(); //查询未读消息数
	},
	methods:{
		//跳转到余额宝界面
		toMoney(){
			uni.navigateTo({
				url: "/pages/money/money"
			})
		},
		//跳转到新手指南界面
		toGuide(){
			uni.navigateTo({
				url: "/pages/guide/guide"
			})
		},
		//跳转到VIP升级界面
		toVip(){
			uni.navigateTo({
				url: "/pages/vip/vip"
			})
		},
		//跳转到会员特权界面
		toPower(){
			uni.navigateTo({
				url: "/pages/power/power"
			})
		},
		//跳转到邀请好友界面
		toAgentExtend(){
			uni.navigateTo({
				url: "/pages/agent/agentExtend/agentExtend"
			})
		},
		//跳转到提现页
		toExtractMoney(){
			if(utilCore.isLoginByDeviceId()) {
				utilCore.toLoginUiCanBack();
			}else{
				uni.navigateTo({
					// url: '/pages/extractMoney/extractMoney'
					url: "/pages/extractMoney/extractMoney1/extractMoney1"
				});
			}
		},
		//跳转到充值页
		toRacharge(){
			if(utilCore.isLoginByDeviceId()) {
				utilCore.toLoginUiCanBack();
			}else{
				uni.navigateTo({
					url: '/pages/recharge/recharge'
				});
			}
		},
		//跳转到任务界面
		toWork(){
			uni.switchTab({
				url: "/pages/work/work"
			})
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
		//关闭弹窗
		hide8() {
			this.modal8 = false;
		},
		//打开弹窗
		show8(item) {
			this.modal8 = true;
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
		flex: 1;
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
	
	
	
	.lay_bar{
		display:flex;
		flex-wrap: wrap;
		padding:20rpx 0;
		box-sizing:border-box;
	}
	.menu_box{
		width:25%;
		display:flex;
		justify-content: center;
		align-items: center;
	}
	.menu_img{
		width:80rpx;
		height:80rpx;
		margin:auto;
	}
	.menu_test{
		font-size:14px;
		margin-top:10rpx;
		color:#5E6265;
	}
	.menu_bottom{
		margin-bottom:30rpx;
	}
	
	
	.lay_work{
		padding:0 20rpx;
		box-sizing:border-box;
		font-size:16px;
	}
	.work_list{
		width:100%;
		display:flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top:20rpx;
	}
	.work{
		width:48%;
		height:300rpx;
		background-color: #F1F2F2;
		border-radius:20rpx;
		padding:20rpx 10rpx 10rpx 10rpx;
		box-sizing:border-box;
		display:flex;
		flex-direction: column;
		margin-bottom:40rpx;
	}
	.work_num{
		font-size:15px;
		font-weight:bold;
	}
	.work_text{
		font-size:13px;
		color: #9E9E9E;
		margin-bottom:6rpx;
	}
	.work_img{
		flex: 1;
	}
</style>

