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
		<view class="menu_box menu_bottom" @tap="toInterest">
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
		
		<view class="menu_box" @tap="toPower">
			<view class="">
				<view class="menu_img">
					<image src="/static/img/sy6.png" mode=""></image>
				</view>
				<view class="menu_test">
					会员特权
				</view>
			</view>
		</view>
		
		<view class="menu_box" @tap="toDownloadApp">
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
		<uni-notice-bar :show-icon="true" :scrollable="true" :single="true" :speed="20"
		:text="runHorseEn.content" @tap="toRunHorseUrl"/>
	</view>
	
	<!-- 任务 -->
	<view class="lay_work">
		<view class="" v-for="(item,index) in workTree" :key="index">
			<view class="work_title">{{item.big.name}}</view>
			<view class="work_list">
				<view class="work" v-for="(item2,index2) in item.list" :key="index2">
					<view class="lay_sort" :class="'background_sort'+ item2.order" @tap.stop="toWorkClassify(item2)">
						<view class="">
							<view class="">
								{{item2.name}}
							</view>
							<view class="" v-if="item2.state == 1">悬赏</view>
							<view class="" v-if="item2.state == 2">开发中...</view>
							<view class="sort_img">
								<image :src="item2.imgUrl" mode=""></image>
							</view>
						</view>
					</view>
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
						<view class="lay_more">
							<text @tap="toNoticeUrl" v-show="noticeEn.toUrl != ''">打开链接</text>
							<text @tap="toMore">更多...</text>
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
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import tran from "@/common/tran.js";
import utilCore from "@/api/utilCore.js";
import str from "@/common/str.js";
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
			modal8: false,  //控制弹窗显示

			uid: "",  //uid
			runHorseEn: "", //跑马灯文字
			noticeId: 0,  //最新公告id
			isShowNotice: true,   //是否显示公告
			noticeEn: [],    //公告信息
			notReadMsgSum: null,  //未读消息数
			
			indicatorDots: true,
			autoplay: true,
			interval: 3000,
			duration: 500,
			run: [],  //轮播图列表
			downloadUrl: "",  //app下载地址
			
			workTree: [], //任务大类和子类列表
			arrSortName: ["火山小视频", "抖音", "微信", "快手", "微视", "今日头条", ]
		}
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
		this.getLevelDesc();   //获取全部会员信息
		this.getLevelList();  //获取会员信息列表
		this.getTaskTree();  //获取任务大类和子类列表
		this.getDownloadUrl();  //获取下载app地址
	},
	methods:{
		//获取下载app地址
		getDownloadUrl(){
			api.getConfig({key: 'app_download_url'}, (res)=>{
				this.downloadUrl = api.getData(res).data[0].value;
			});
		},
		//获取任务大类和子类列表
		getTaskTree(){
			api.getTaskTree({}, (res)=>{
				let data = api.getData(res);
				this.workTree = data;
				storage.setTaskTree(data);
			});
		},
		//获取会员信息列表
		getLevelList(){
			api.getUserLevel({}, (res)=>{
				let data = api.getData(res).data;
				let data2 = [];
				data.forEach((item, index) =>{
					if(item.state == 1) data2.push(item);	//获取状态为开启的每个任务等级信息
				});
				storage.setLevelList(data2);  //保存会员信息列表到本地
			});
		},
		//获取全部会员信息
		getLevelDesc(){
			api.getLevelDesc({}, (res)=>{
				let data = api.getData(res);
				storage.setLevelDescList(data);  //保存全部会员信息列表到本地
			});
		},
		//跳转到任务子类界面
		toWorkClassify(data){
			if(data.state == 2){
				uni.showModal({
					content: '正在开发中...',
					showCancel: false
				});
				return;
			}
			uni.navigateTo({
				url: '/pages/index/workClassify/workClassify?title=' + tran.obj2Url(data)
			})
		},
		//跳转到app下载界面
		toDownloadApp(){
			util.openUrl(this.downloadUrl);
		},
		//跳转到余额宝界面
		toInterest(){
			uni.navigateTo({
				url: "/pages/interest/interest"
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
				//游客登录
				uni.navigateTo({
					url: "/pages/extractMoney/extractMoney1/extractMoney1?loginType=1"
				});
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
				// utilCore.toLoginUiCanBack();
				//游客登录
				uni.navigateTo({
					url: '/pages/recharge/recharge?loginType=1'
				});
			}else{
				uni.navigateTo({
					url: '/pages/recharge/recharge'
				});
			}
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
				// console.log(this.noticeEn);
				if(this.noticeId < this.noticeEn.id){
					this.noticeId = this.noticeEn.id;
					this.show8(100);  //公告弹窗
				}
			});
		},
		//跳转到更多公告界面
		toMore(){
			//关闭弹窗
			this.hide8();
			uni.navigateTo({
				url: '/pages/notice/notice'
			});
		},
		//公告外部链接跳转
		toNoticeUrl(){
			//跳转地址包含http就跳转
			if(str.contains(this.noticeEn.toUrl, "http")) util.openUrl(this.noticeEn.toUrl);
		},
		//跑马灯点击跳转外部链接
		toRunHorseUrl(){
			//跳转地址包含http就跳转
			if(str.contains(this.runHorseEn.toUrl, "http")) util.openUrl(this.runHorseEn.toUrl);
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
			//跳转地址包含http就跳转
			if(str.contains(url, "http")) util.openUrl(url);
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
			});
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
		margin-top:6rpx;
	}
	.work{
		width:48%;
		height:160rpx;
		/* background-color: #F1F2F2; */
		border-radius:20rpx;
		display:flex;
		flex-direction: column;
		margin-bottom:20rpx;
	}
	.work_title{
		margin:30rpx 0;
		font-weight:bold;
		text-align:center;
	}
	
	
	.lay_sort{
		flex: 1;
		border-radius:10rpx;
		color:#fff;
		font-size:14px;
		font-weight:bold;
		display:flex;
		align-items:center;
		padding-left:30rpx;
		box-sizing:border-box;
		position:relative;
		overflow: hidden;
	}
	.sort_img{
		width:100rpx;
		height:100rpx;
		position:absolute;
		right:-4rpx;
		bottom: -10rpx;
		transform:rotate(-7deg);
	}
	.background_sort1{
		background-image:linear-gradient(to right, rgb(51,47,160) , rgb(151,11,60));
	}
	.background_sort2{
		background-image:linear-gradient(to right, rgb(238,43,41) , rgb(181,37,124));
	}
	.background_sort3{
		background-image:linear-gradient(to right, rgb(116,16,192) , rgb(181,36,139));
	}
	.background_sort4{
		background-image:linear-gradient(to right, rgb(242,113,22) , rgb(202,69,64));
	}
	.background_sort5{
		background-image:linear-gradient(to right, rgb(255,142,48) , rgb(210,59,102));
	}
	.background_sort6{
		background-image:linear-gradient(to right, rgb(34,162,101) , rgb(162,193,55));
	}
	
	.lay_more{
		padding:20rpx 10rpx 10rpx; 
		box-sizing:border-box; 
		/* text-decoration:underline; */
	}
	.lay_more>text{
		display:inline-block;
	}
	.lay_more>text:nth-child(1){
		float:left;
	}
	.lay_more>text:nth-child(2){
		float:right;
	}
</style>

