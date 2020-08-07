<template>
	<view class="">
		<!-- 我的信息 -->
		<view class="my_info background_style">
			<button class="gold_details" @tap="toGoldDetails" hover-class="gold_btn" style="padding:0 0 0 15rpx;">
				<view class="gole_img an">
					<image src="/static/img/gold1.png" mode="widthFix"></image>
				</view>
				<text>金币明细</text>
			</button>
			
			<view class="info_left">
				<view class="my_headImg" @tap="revise">
					<image :src="userEn.headUrl == '' ? '/static/img/headImg.jpg' : userEn.headUrl" mode="widthFix"></image>
				</view>
				<view class="my_name">
					<text class="name">{{userName}}</text>
					<view class="yqm">
						邀请码：<text>{{yqm}}</text>
					</view>
				</view>
			</view>
			
			<view class="info_right">
				<button type="default" class="invite_btn">邀请好友</button>
			</view>
			
			<view class="gold_coin">
				<view class="coin">
					<text>今日金币</text>
					<text class="coin_num">{{todayCoin}}</text>
				</view>
				
				<view class="coin">
					<text>当前金币</text>
					<text class="coin_num">{{currentCoin}}</text>
				</view>
				
				<view class="exchange">
					<button type="default" class="exchange_btn" @tap="toMoneyChange" hover-class="btn_hover">兑换现金</button>
				</view>
			</view>
		</view>
		
		<!-- 现金收益 -->
		<view class="content profit">
			<view class="lay_cash">
				<view class="cap_cash">现金收益</view>
				<view class="lay_cap_btn">
					<view>￥<text class="profit_num">{{profit}}</text></view>
					<button class="detailed" @tap="toDetailed" hover-class="btn_hover">明细</button>
				</view>
			</view>
			
			<view class="lay_draw_charge btn_style">
				<button type="default" class="btn_draw" @tap="toExtractMoney" hover-class="btn_hover">提现</button>
				
				<button type="default" class="btn_recharge" @tap="toRacharge" hover-class="btn_hover">充值</button>
			</view>
		</view>
		
		<!-- 功能栏 -->
		<view class="func">
			<button class="setting" @tap="toSetting" hover-class="func_hover" type="default">
				<view class="func_left">
					<view class="func_img">
						<image src="/static/img/more2.png" mode="widthFix"></image>
					</view>
					<text class="func_test">个人信息</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="30"></tui-icon>
				</view>
			</button>
			
			<button class="share" hover-class="func_hover" type="default" @tap="toNotice">
				<view class="func_left">
					<view class="func_img">
						<image src="/static/img/share2.png" mode="widthFix"></image>
					</view>
					<text class="func_test">公告</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="30"></tui-icon>
				</view>
			</button>
			
			<button class="share" hover-class="func_hover" type="default" @tap="toMessage">
				<view class="func_left">
					<view class="func_img">
						<image src="/static/img/share2.png" mode="widthFix"></image>
					</view>
					<text class="func_test">站内信</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="30"></tui-icon>
				</view>
			</button>
			
			<button class="more" @tap="toMore" hover-class="func_hover" type="default">
				<view class="func_left">
					<view class="func_img">
						<image src="/static/img/setting2.png" mode="widthFix"></image>
					</view>
					<text class="func_test">更多</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="30"></tui-icon>
				</view>
			</button>
		</view>
		
		<!-- 退出/登录按钮 -->
		<view class="btn btn_style">
			<button type="default" class="login_btn" @tap="toLogin" hover-class="btn_hover">其他方式登录</button>
		</view>
	</view>
</template>

<script>
import tuiModal from "@/components/tui-modal/tui-modal.vue";
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
import utilCore from "@/api/utilCore.js";
export default{
	comments:{
		// icon
		tuiModal
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
			userName: '',  //用户账号
			yqm: '',  //邀请码
			todayCoin: null,   //今日金币
			currentCoin: 0,  //当前金币
			profit: ''  ,//现金收益
			modal8: false,  //控制金币换现金弹窗显示
			uid: "",  //uid
			loginType: null, //登录方式
		}
	},
	onLoad() {
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();  //获取我的信息
		this.loginType = storage.getLoginType();  //获取登录方式
		this.yqm = this.userEn.code;
		this.currentCoin = this.userEn.gold;
		this.profit = this.userEn.money;
		this.getGoldAdd();  //获取今日金币
	},
	onShow(){
		this.uid = storage.getUid();  //获取uid
		this.getMyInfo();  //刷新我的信息
		this.getGoldAdd(); //获取今日金币
	},
	methods:{
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
				this.yqm = this.userEn.code;
				this.currentCoin = this.userEn.gold;
				this.profit = this.userEn.money;
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
		height:320rpx;
		padding:20rpx;
		box-sizing:border-box;
		display:flex;
		align-items:center;
		justify-content:space-between;
		position:relative;
	}
	.gold_details{
		background-color: #FEF1C1;
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
		background-color:#fcdb63;
		padding:10rpx;
		margin-top:10rpx;
	}
	.info_right>button{
		outline:none;
		background-color:#000;
		color:#fcd030;
		border-radius:30rpx;
		width:200rpx;
		font-size:13px;
	}
	.invite_btn{

	}
	.gold_coin{
		width:92%;
		height:200rpx;
		background-color:#fff;
		border-radius:10rpx;
		position:absolute;
		bottom:-140rpx;
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
		background-color:#fff8de;
		margin-top:200rpx;
		margin:200rpx auto 0;
		border-radius:10rpx;
		padding:0 40rpx;
		display:flex;
		justify-content:space-between;
	}
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
		bottom: 16rpx;
		left:0;
	}
	.cap_cash{
		position: absolute;
		top: 16rpx;
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
		width:55rpx;
		height:55rpx;
	}
	.func_left{
		font-size:14px;
		display:flex;
		align-items:center;
	}
	.func_test{
		margin-left:12rpx;
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
		margin-top:40rpx;
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
</style>
