<template>
	<view class="">
		<!-- 我的信息 -->
		<view class="my_info background_style">
			<button class="gold_details gold_style" @tap="toGoldDetails" hover-class="gold_btn" style="padding:0 0 0 15rpx;" v-show="isOpenGold == 1">
				<view class="gole_img an">
					<image src="/static/img/gold1.png" mode="widthFix"></image>
				</view>
				<text>金币明细</text>
			</button>
			
			<button class="gold_details gold_style" @tap="toDetailed" hover-class="gold_btn" style="padding:0 0 0 15rpx;" v-show="isOpenGold != 1">
				<view class="gole_img an">
					<image src="/static/img/gold1.png" mode="widthFix"></image>
				</view>
				<text>账变明细</text>
			</button>
			
			<view class="info_left">
				<view class="my_headImg" @tap="revise">
					<image :src="userEn.headUrl == '' ? '/static/img/headImg.jpg' : userEn.headUrl" mode="widthFix"></image>
				</view>
				<view class="my_name">
					<text class="name" selectable="true">{{userName}}</text>
					<view class="level">
						{{levelName}}
					</view>
					<view class="yqm" v-if="userEn.code != ''">
						邀请码：<text selectable="true">{{userEn.code}}</text>
					</view>
				</view>
			</view>
			
			<view class="info_right">
				<button type="default" class="invite_btn" hover-class="btn_hover" @tap="toAgentExtend">邀请好友</button>
			</view>
			
			<view class="gold_coin" v-show="isOpenGold == 1">
				<view class="coin">
					<text>今日金币</text>
					<text class="coin_num">{{todayCoin}}</text>
				</view>
				
				<view class="coin">
					<text>当前金币</text>
					<text class="coin_num">{{userEn.gold}}</text>
				</view>
				
				<view class="exchange">
					<button type="default" class="exchange_btn" @tap="toMoneyChange" hover-class="btn_hover">兑换现金</button>
				</view>
			</view>
		</view>
		
		<!-- 现金收益 -->
		<view class="content profit profit_style" :class="{'closeGold': isOpenGold != 1}">
			<view class="lay_cash">
				<view class="cap_cash">现金收益</view>
				<view class="lay_cap_btn">
					<view>￥<text class="profit_num">{{userEn.money}}</text></view>
					<!-- <button class="detailed" @tap="toDetailed" hover-class="btn_hover">明细</button> -->
				</view>
			</view>
			
			<view class="lay_draw_charge btn_style">
				<button type="default" class="btn_draw" @tap="toExtractMoney" hover-class="btn_hover">提现</button>
				
				<button type="default" class="btn_recharge" @tap="toRacharge" hover-class="btn_hover">充值</button>
			</view>
		</view>
		
		<!-- 功能栏 -->
		<view style="margin-top:20rpx;">
			<block v-for="(item,index) in dataList" :key="index">
				<tui-collapse :index="index" :current="current" :disabled="item.disabled" @click="change3">
					<template v-slot:title>
						<tui-list-cell :hover="!item.disabled" 
						style="font-weight:bold; display: flex; align-items: center; padding:15rpx 20rpx; box-sizing: border-box;">
							<view class="func_img" style="margin-right:10rpx;">
								<image :src="item.imgUrl" mode="widthFix"></image>
							</view>
							<text>{{item.name}}</text>
						</tui-list-cell>
					</template>
					<template v-slot:content>
						<tui-list-cell v-for="(item1,index1) in item.arrSub" :key="index1" :arrow="true"
						style="display: flex; align-items: center; padding:25rpx 40rpx 25rpx 80rpx; box-sizing: border-box;"
						@tap="toUrl(item1.toUrl)">
							<text>{{item1.name}}</text>
						</tui-list-cell>
					</template>
				</tui-collapse>
			</block>
		</view>
		
		
		<!-- 退出/登录按钮 -->
		<view class="btn btn_style">
			<button type="default" class="login_btn" @tap="toLogin" hover-class="btn_hover">其他方式登录</button>
		</view>
	</view>
</template>

<script>
import tuiModal from "@/components/tui-modal/tui-modal.vue";
import tuiCollapse from "@/components/tui-collapse/tui-collapse.vue";
import tuiListCell from "@/components/tui-list-cell/tui-list-cell.vue";
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
import utilCore from "@/api/utilCore.js";
export default{
	comments:{
		// icon
		tuiModal,
		tuiCollapse,
		tuiListCell
	},	
	data() {
		return {
			//手风琴效果
			current: -1,
			current2: -1,
			dataList: [{
					name: "账户管理",
					current: 0,
					disabled: false,
					imgUrl:"/static/img/style/my/m1.png",
					arrSub: [{
						name: "用户资料",
						toUrl:"/pages/my/setting/setting"
					},{
						name: "修改密码",
						// toUrl:"/pages/my/setting/updMyInfo/updMyInfo?type=pwd&title=密码"
						toUrl: "/pages/my/updPwd/updPwd"
					},{
						name: "银行卡",
						toUrl:"/pages/my/setting/bank/bank"
					}]
					//用户资料 密码修改 资金密码 银行卡
				},
				{
					name: "任务管理",
					current: -1,
					disabled: false,
					imgUrl:"/static/img/style/my/m2.png",
					arrSub: [{
						name: "我发布的任务",
						toUrl:"/pages/workList/workPublishList/workPublishList"
					},{
						name: "我审核的任务",
						toUrl:"/pages/workList/workExamineList/workExamineList"
					},{
						name: "我接受的任务",
						toUrl:"/pages/workList/workAcceptList/workAcceptList"
					}]
				},
				{
					name: "资金管理",
					current: -1,
					disabled: false,
					imgUrl:"/static/img/style/my/m3.png",
					arrSub: [{
						name: "个人总览",
						toUrl:"/pages/my/userStatisticsMonth/userStatisticsMonth"
					},{
						name: "个人报表",
						toUrl:"/pages/my/userStatisticsDay/userStatisticsDay"
					},{
						name: "账变明细",
						toUrl:"/pages/my/detailed/detailed"
					}]
					//个人总览(月报表) 个人报表(日报表) 账变明细
				},
				{
					name: "代理管理",
					current: -1,
					disabled: false,
					imgUrl:"/static/img/style/my/m4.png",
					arrSub: [{
						name: "代理说明",
						toUrl:"/pages/agent/agentExplain/agentExplain"
					},{
						name: "团队总览",
						toUrl:"/pages/agent/teamOverview/teamOverview"
					},{
						name: "团队报表",
						toUrl:"/pages/agent/teamTable/teamTable"
					},{
						name: "用户列表",
						toUrl:"/pages/agent/userTable/userTable"
					},{
						name: "注册推广",
						toUrl:"/pages/agent/agentExtend/agentExtend"
					}]
					//代理说明 团队总览 团队报表 用户列表 注册管理 注册推广
				},
				{
					name: "短信公告",
					current: -1,
					disabled: false,
					imgUrl:"/static/img/style/my/m5.png",
					arrSub: [{
						name: "站内短信",
						toUrl:"/pages/message/message"
					},{
						name: "网站公告",
						toUrl:"/pages/notice/notice"
					}]
					//站内短信 网站公告
				},
				{
					name: "关于我们",
					current: -1,
					disabled: false,
					imgUrl:"/static/img/style/my/m6.png",
					arrSub: [{
						name: "关于",
						toUrl:"/pages/version/version"
					}]
				}
			],
			userEn: [],  //我的信息
			userName: '',  //用户账号
			// yqm: '',  //邀请码
			todayCoin: null,   //今日金币
			// currentCoin: 0,  //当前金币
			// profit: ''  ,//现金收益
			uid: "",  //uid
			loginType: null, //登录方式
			notReadMsgSum: 0,  //未读消息数
			levelName: " ",  //我的会员等级名称
			levelList: [],  //会员列表
			isOpenGold: null,  //是否开启金币 0关闭 1开启
		}
	},
	onLoad() {
		//this.getDataFromLocation();  //从本地取数据
		
		this.uid = storage.getUid();  //获取uid
		this.levelList = storage.getLevelList();  //获取会员表
		this.loginType = storage.getLoginType();  //获取登录方式
		this.getGoldAdd();  //获取今日金币
		this.getMyLevelName();  //获取我的会员等级名称
		
	},
	onShow(){
		//this.getDataFromNet();  //获取网络数据到本地
		//this.getDataFromLocation();  //从本地取数据
		
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();  //获取我的信息
		this.getMyInfo();  //刷新我的信息
		this.getGoldAdd(); //获取今日金币
		this.getOpenGold();  //获取是否开启金币 0关闭 1开启
		this.getMyLevelName();  //获取我的会员等级名称
	},
	methods:{
		//获取网络数据到本地
		getDataFromNet(){
			this.uid = storage.getUid();  //获取uid
			this.getMyInfo();  //刷新我的信息
			this.getGoldAdd(); //获取今日金币
			this.getNotReadMsgSum(); //查询未读消息数
			this.getOpenGold();  //获取是否开启金币 0关闭 1开启
		},
		//从本地取数据
		getDataFromLocation(){
			this.uid = storage.getUid();  //获取uid
			this.levelList = storage.getLevelList();  //获取会员表
			this.userEn = storage.getMyInfo();  //获取我的信息
			this.loginType = storage.getLoginType();  //获取登录方式
			this.getGoldAdd();  //获取今日金币
			this.getMyLevelName();  //获取我的会员等级名称
		},
		//获取是否开启金币 0关闭 1开启
		getOpenGold(){
			api.getConfig({key: 'open_gold'}, (res)=>{
				this.isOpenGold = api.getData(res).data[0].value;
				storage.setOpenGold(this.isOpenGold);
			});
		},
		//获取我的会员等级名称
		getMyLevelName(){
			this.levelList = storage.getLevelDescList();
			this.levelList.forEach((item, index) =>{
				if(item.key == this.userEn.level) this.levelName = item.val;
			});	
		},
		//折叠面板
		change3(e) {
			//可关闭自身
			this.current = this.current == e.index ? -1 : e.index
		},
		//界面跳转
		toUrl(url){
			uni.navigateTo({
				url: url
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
		//获取用户名
		getName(){
			//游客登录
			if(this.loginType == 0) this.userName = this.uid;
			//账号密码登录or微信登录
			else{
				//优先显示微信id
				if(!util.isEmpty(this.userEn.wxId)) this.userName = this.userEn.wxId;
				else this.userName = this.userEn.account;
			}
		},
		//刷新我的信息
		getMyInfo(){
			api.getUserByUid({uid: this.uid}, (res)=>{
				storage.setMyInfo(api.getData(res));
				this.userEn = api.getData(res);
				this.getName();  //获取用户名
			});
		},
		//获取今日金币
		getGoldAdd(){
			api.getStatisticsToday({uid: this.uid}, (res) =>{
				let data = api.getData(res);
				if(util.isEmpty(data)) this.todayCoin = 0;
				else this.todayCoin = data.goldAdd;
			});
		},
		//查看头像
		revise(){
			uni.previewImage({
				urls: [this.userEn.headUrl],
			});
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
		//跳转到账变明细界面
		toDetailed(){
			uni.navigateTo({
				url: '/pages/my/detailed/detailed'
			})
		},
		//跳转到邀请好友界面
		toAgentExtend(){
			uni.navigateTo({
				url: "/pages/agent/agentExtend/agentExtend"
			})
		},
		//跳转到金币明细页
		toGoldDetails(){
			uni.navigateTo({
				url: "/pages/goldDetails/goldDetails"
			})
		},
		//跳转到设置页
		toSetting(){
			uni.navigateTo({
				url: '/pages/my/setting/setting'
			})
		},
		//跳转到更多
		toMore(){
			uni.navigateTo({
				url: '/pages/my/more/more'
			})
		},
		//跳转到现金收益明细页
		toDetailed(){
			uni.navigateTo({
				url: '/pages/my/detailed/detailed'
			})			
		},
		//跳转到公告页
		toNotice(){
			uni.navigateTo({
				url: "/pages/notice/notice"
			})
		},
		//跳转到站内信界面
		toMessage(){
			uni.navigateTo({
				url: "/pages/message/message"
			})
		},
		//跳转到提现页
		toExtractMoney(){
			if(utilCore.isLoginByDeviceId()) {
				// utilCore.toLoginUiCanBack();
				//游客登录
				uni.navigateTo({
					// url: '/pages/extractMoney/extractMoney'
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
		// //退出登录
		// exit(){
		// 	storage.outLogin();  //清空我的信息
		// 	uni.reLaunch({
		// 		url: "/pages/login/login"
		// 	})
		// },
		toLogin(){
			uni.navigateTo({
				url: "/pages/login/login"
			})
		},
	}
}
</script>

<style>
	image{
		width:100%;
		height:100%;
	}
	.my_info{
		width:100%;
		height:260rpx;
		padding:20rpx;
		box-sizing:border-box;
		display:flex;
		align-items:center;
		justify-content:space-between;
		position:relative;
	}
	.gold_details{
		width:240rpx;
		height:80rpx;
		position:absolute;
		right:0;
		top: 0;
		font-size:14px;
		border-radius:40rpx 0 0 40rpx;
		display:flex;
		align-items:center;
		padding-left:20rpx;
		box-sizing:border-box;
	}
	.gold_btn{
		opacity:0.7;
	}
	.gole_img{
		width:60rpx;
		height:60rpx;
		margin-right:20rpx;
	}
	@-webkit-keyframes rotation{
	    from {-webkit-transform: rotateY(0deg);}
	    to {-webkit-transform: rotateY(360deg);}
	}
	.an{
	    -webkit-transform: rotateY(360deg);
	    animation: rotation 5s linear infinite;
	    -moz-animation: rotation 5s linear infinite;
	    -webkit-animation: rotation 5s linear infinite;
	    -o-animation: rotation 5s linear infinite;
	}
	.info_left{
		display:flex;
		align-items:center;
	}
	.my_headImg{
		/* width:150rpx;
		height:150rpx;
		border-radius:10px;
		overflow: hidden; */
		width: 150rpx;
		height: 150rpx;
		border-radius:50%;
		overflow: hidden;
		display:flex;
		align-items:center;
		margin-right:10rpx;
	}
	.my_name{
		margin-left:20rpx;
		font-size:16px;
	}
	.name{
		color:#000;
		font-weight:bold;
	}
	.yqm{
		font-size:15px;
/* 		background-color:#fcdb63;
		padding:10rpx; */
		margin-top:10rpx;
	}
	.info_right>button{
		outline:none;
		background-color:#000;
		color:#fcd030;
		border-radius:30rpx;
		width:200rpx;
		font-size:13px;
		margin-top:40rpx;
	}
	.invite_btn{

	}
	.gold_coin{
		width:92%;
		height:200rpx;
		background-color:#fff;
		border-radius:10rpx;
		position:absolute;
		bottom:-160rpx;
		left:50%;
		transform:translateX(-50%);
		box-shadow: 5px 7px 10px rgb(247, 247, 247), -5px 7px 10px rgb(247, 247, 247);
		display:flex;
		justify-content:space-between;
		align-items:center;
		padding:0 20rpx;
		box-sizing:border-box;
	}
	.coin{
		display:flex;
		flex-direction:column;
		align-items:center;
		font-size:14px;
	}
	.coin_num{
		font-size:20px;
		margin-top:20rpx;
	}
	.exchange>button{
		border-radius:20rpx;
		outline:none;
		background-color:#e7ecf2;
		font-size:15px;
	}
	.exchange>button:after{
		border:none;
	}
	.profit{
		width:96%;
		height:160rpx;
		margin:200rpx auto 0;
		border-radius:10rpx;
		padding:0 40rpx;
		display:flex;
		justify-content:space-between;
	}
	.closeGold{
		margin-top:20rpx;
	},
	.detailed{
		font-size:24rpx;
		border:1px solid #879299;
		width:100rpx;
		text-align:center;
		border-radius:20rpx;
		margin-left:20rpx;
		padding:0;
		box-sizing:border-box;
	}
	.lay_cash{
		position: relative;
		font-size:14px;
		/* margin-top:30rpx; */
	}
	.lay_cap_btn{
		display:flex;
		align-items:center;
		font-size:14px;
		margin-top:5rpx;
		position: absolute;
		bottom: 26rpx;
		left:0;
	}
	.cap_cash{
		position: absolute;
		top: 26rpx;
		left:0;
		display: inline-block;
		width:200rpx;
	}
	.profit_num{
		font-size:20px;
		font-weight:bold;
	}
	.lay_draw_charge{
		position:relative;
	}
	.lay_draw_charge>button{
		border-radius:30rpx;
		width:180rpx;
		height:60rpx;
		font-size:14px;
		line-height:60rpx;
	}
	.btn_draw{
		/* margin-top:10rpx; */
		position: absolute;
		top: 12rpx;
		right:0;
	}
	.btn_recharge{
		/* margin-bottom:10rpx; */
		position: absolute;
		bottom: 12rpx;
		right: 0;
	}
	.func_img{
		width:70rpx;
		height:70rpx;
	}
	.func_left{
		font-size:14px;
		display:flex;
		align-items:center;
	}
	.func_test{
		margin-left:12rpx;
		font-weight:bold;
	}
	.func>button{
		padding:0 20rpx;
		box-sizing: border-box;
		border-radius:0;
		line-height:1;
		background-color: #fff;
	}
	.setting, .share, .more{
		display:flex;
		justify-content:space-between;
		margin-top:20rpx;
		align-items: center;
	}
	.btn{
		margin:40rpx 0;
	}
	.btn>button{
		width:90%;
		border-radius:60rpx;
		font-size:15px;
	}
	.btn>button:after{
		border:none;
	}
	.func_hover[type = default]{
		background-color: #EEEEEE;
	}
	.lay_badge{
		display:flex;
		align-items:center;
	}
	.level{
		font-size:14px;
	}
</style>
