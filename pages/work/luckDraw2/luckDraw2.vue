<template>
	<view class="content" style="height:100%;">
		<!-- 背景图片 -->
		<image src="/static/img/luck/6764fbf06a78763f6b2162e6d4bd731c.png" mode="" class="bg-set"></image>
		<!-- 左上更多图标 -->
<!-- 		<view class="gz">
			<image src="/static/img/luck/gz.c859c3e0.png" mode="widthFix"></image>
		</view> -->
		<!-- 右上奖品图标 -->
<!-- 		<view class="jp">
			<image src="/static/img/luck/jp.f4cc450a.png" mode="widthFix"></image>
		</view> -->
		<!-- 顶部文字 -->
<!-- 		<view class="active_test">
			幸运用户专享活动
		</view> -->
		<!-- 红包领奖进度条 -->
		<view class="list">
			<!-- 外部进度条 -->
			<view class="botline"> 
				<!-- 内部进度条 -->
				<view class="">
					<view class="topline" :style="{width:width + '%'}"></view>
				</view>
				
				
				<!-- 有奖励红包列表 -->
				<view class="luckRed" v-for="(item,index) in luckRedList" :key="index" 
				:style="{left:item.position + '%', transform: 'translate(-' + item.position + '%, -60%)'}" 
				v-if="isShowLuckRed">
					<view class="progress_award" v-if="item.type == 0" 
					:class="[item.isOpen ? 'luckRedReceive' : '']"
					@tap="LuckRedCase(item)">
						<image src="/static/img/luck/2baa8604a9b148c7451de22336a6557e.png" mode="widthFix"></image>
					</view>
					<view class="progress_award" v-if="item.type == 1" 
					:class="[item.isOpen ? 'luckRedReceive' : '']"
					@tap="LuckRedCase(item)">
						<image src="/static/img/luck/6b409b67de90070099dfbf74556f12bc.png" mode="widthFix"></image>
					</view>
					<view class="luckRedTest" v-if="item.type == 1">
						<text>{{item.randomMax}}元</text>
						<text class="arrow"></text>
					</view>
				</view>
				
				<!-- 没有奖励红包列表 -->
				<view class="luckRed" style="left: 90%"  v-if="!isShowLuckRed"
				:style="{transform: 'translateY(-60%)'}">
					<view class="progress_award">
						<image src="/static/img/luck/6b409b67de90070099dfbf74556f12bc.png" mode="widthFix"></image>
					</view>
					<view class="luckRedTest">
						<text>敬请期待</text>
						<text class="arrow"></text>
					</view>
				</view>
				
			</view>
			
		</view>
		
		<!-- 历史记录 -->
		<button class="record" @tap="toLuckDrawDetails" hover-class="gold_btn" style="padding: 0;">历史记录</button>
		
		<!-- 转盘 -->
		<view class="luckdraw_box">
			<view class="rotate" :class="{
				'open_rotate1' : rotateId == 1, 
				'open_rotate2' : rotateId == 2,
				'open_rotate3' : rotateId == 3,
				'open_rotate4' : rotateId == 4,
				'open_rotate5' : rotateId == 5,
				'open_rotate6' : rotateId == 6,
				
			}" style="animation-fill-mode: forwards;">
				<image src="/static/img/luck/58ea510e1129b8b4287e32e2f3b064ed.png" mode="widthFix"></image>
				<view class="" v-if="LuckyList.length > 1">
					<view class="award award_1">
						<text>{{LuckyList[0].title}}</text>
						<view class="award_img">
							<image :src="LuckyList[0].imgUrl" mode=""></image>
						</view>
					</view>
					
					<view class="award award_2">
						<text>{{LuckyList[1].title}}</text>
						<view class="award_img">
							<image :src="LuckyList[1].imgUrl" mode=""></image>
						</view>
					</view>
					
					<view class="award award_3">
						<text>{{LuckyList[2].title}}</text>
						<view class="award_img">
							<image :src="LuckyList[2].imgUrl" mode=""></image>
						</view>
					</view>
					
					<view class="award award_4">
						<text>{{LuckyList[3].title}}</text>
						<view class="award_img">
							<image :src="LuckyList[3].imgUrl" mode=""></image>
						</view>
					</view>
					
					<view class="award award_5">
						<text>{{LuckyList[4].title}}</text>
						<view class="award_img">
							<image :src="LuckyList[4].imgUrl" mode=""></image>
						</view>
					</view>
					
					<view class="award award_6">
						<text>{{LuckyList[5].title}}</text>
						<view class="award_img">
							<image :src="LuckyList[5].imgUrl" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="luck_draw">
				<image src="/static/img/luck/lamp1.40547699.png" mode="widthFix" v-show="effect"></image>
				<image src="/static/img/luck/lamp2.062c14d4.png" mode="widthFix" v-show="!effect"></image>
			</view>
			<button class="pointer" @tap="openLucky" hover-class="pointer_hover" style="background-color:transparent;">
				<!-- <image src="/static/img/luck/ef5b234566bdb5d9f3d261c814fe44b0.png" mode=""></image> -->
			</button>
			<!-- 红包领取提示对话框 -->
			   <min-modal ref="modal">
			     <view>
					 <view class="">红包金额: {{checkLuckRedMoney}}</view>
			       <view>你已进行转盘抽奖{{luckNum}}次</view>
			       <view>领取红包需要抽奖{{checkLuckRedNum}}次</view>
			     </view>
			   </min-modal>
		</view>
		
		<!-- 遮罩层 -->
		<view class="shadow" v-show="shadow">
			<view class="main">
				<image src="/static/img/luck/rewardBag.png" mode="widthFix"></image>
				<view class="award_box">
					<text>{{getAwardTitle}}</text>
					<view class="getaward_img">
						<image :src="getAwardImg" mode=""></image>
					</view>
				</view>
				
				<button class="reward_btn" @click.stop="closeShadow" hover-class="rewardBtn_hover" style="background-color:transparent;">
					<!-- <image src="/static/img/luck/reward.png" mode=""></image> -->
				</button>
			</view>
		</view>
		
		<!-- 领取转盘红包遮罩层 -->
		<view class="shadow" v-show="luckRedShadow">
			<view class="main">
				<image src="/static/img/luck/luckRed.png" mode="widthFix"></image>
				<view class="luckRedAward">
					<text>{{luckRedMoney}}元</text>
				</view>
				
				<button class="reward_btn luckRed_btn" @click.stop="closeLuckRed" hover-class="rewardBtn_hover" style="background-color:transparent;">
					<!-- <image src="/static/img/luck/reward.png" mode=""></image> -->
				</button>
			</view>
		</view>
	</view>
</template>

<script>
// import config from "@/static/config/config.js";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import audio from "@/common/audio.js";
import util from "@/common/util.js";
import str from "@/common/str.js";
import minModal from '@/components/min-modal/min-modal'
export default {
	components: {
	  minModal
	},
	data() {
		return {
			userEn: [], //我的信息
			width: 0, 		//进度条长度
			effect: true,   //转盘外部动画控制
			shadow: false,  //转盘抽奖遮罩层
			luckRedShadow: false,  //转盘红包遮罩层
			animation: {
				openRotate1: false,  //转盘动画1
				openRotate2: false,  //转盘动画2
				openRotate3: false,  //转盘动画3
				openRotate4: false,  //转盘动画4
				openRotate5: false,  //转盘动画5
				openRotate6: false,  //转盘动画6
			},
			awardEnable: true, //抽奖按钮是否可按
			rotateId: null, //旋转id,抽到的奖品id
			uid: "",  //uid
			shadow: false,  //遮罩层控制
			LuckyList: [],  //转盘信息列表
			getAwardImg: '',  //获得奖品的图片
			getAwardTitle: '',  //获得奖品的标题
			
			luckUrl: '', //领奖后跳转Url
			
			luckSetting: '',  //抽奖配置
			luckRed: "",  //红包数据(红包列表，领取记录，转盘次数)
			luckRedList: "",  //红包列表			
			isShowLuckRed: false,  //是否显示幸运红包
			luckNum: null, //用户转盘次数
			luckRedMoney: null,  //转盘红包金额
			checkLuckRedNum: null,  //选中红包需要的领取次数
			checkLuckRedMoney: null,  //选中红包金额
		}
	},
	onShow() {
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();
		this.getLucky();  //获取转盘信息
		this.rotateId = 0;
		this.getLuckUrl();  //获取领奖后跳转Url
		this.getLuckSetting();  //获取抽奖配置
		this.getLuckRedProgress();  //获取红包进度
	},
	onLoad() {
		this.openEffectAnimation();  //打开转盘外部动画
		//setInterval(this.effectAnimation, 1000);//开始转盘2张转动动画
		//setTimeout(this.openUrl, 10000);//10秒自动跳转到外部网页
	},
	onBackPress(e) {  
	// 这里可以自定义返回逻辑，比如下面跳转其他页面
		
		//this.openLucky();
		// return true 表示禁止默认返回
		//return true
	}, 
	methods: {
		//判断红包领取情况
		LuckRedCase(luckRed){
			if(luckRed.isOpen) this.luckRedReceive(luckRed);  //领取转盘红包奖励
			else this.showLuckRedModal(luckRed);  //提示红包不可领取对话框
		},
		//提示红包不可领取对话框
		showLuckRedModal(luckRed){
			console.log(luckRed);
			//获取红包领取需要次数
			this.checkLuckRedNum = luckRed.num;
			//获取红包金额
			if(luckRed.type == 1) this.checkLuckRedMoney = luckRed.randomMin + '元';
			else this.checkLuckRedMoney = '随机红包';
			let title = "";
			//设置提示标题
			if(luckRed.num <= this.luckNum) title = '已领取';
			else title = '转盘次数不足';
			
			this.$refs.modal.handleShow({
			  title: title,
			  showCancel: false,
			  // 有content选项时solt插槽将失效
			})
		},
		//领取转盘红包奖励
		luckRedReceive(luckRed){
			// console.log(luckRed);
			api.luckRedReceive({uid: this.uid, redId: luckRed.id}, (res)=>{
				let code = api.getCode(res);
				let data = api.getData(res);
				if(code == 0) {
					this.luckRedMoney = data.award;  //设置遮罩层显示金额
					this.luckRedShadow = true;  //打开红包遮罩层
					this.getLuckRedProgress();  //重新获取红包进度
				}
				else{					
					let msg = api.getMsg(res);
					uni.showModal({
						content: msg,
						showCancel: false,
					});
				}
			});
		},
		//关闭转盘红包遮罩层
		closeLuckRed(){
			this.luckRedShadow = false;
		},
		//获取红包进度
		getLuckRedProgress(){
			api.getLuckRedProgress({uid: this.uid}, (res)=>{
				let data = api.getData(res);
				// console.log(data);
				//判断是否有转盘红包数据
				if(!util.isEmpty(data.luckRed.data)) this.isShowLuckRed = true;
				else {
					this.isShowLuckRed = false;  //不显示红包列表
					this.width = 0;   //转盘次数进度条清零
					return;
				};
				this.luckRedList = data.luckRed.data;  //获取红包列表
				if(!util.isEmpty(data.luckRedNum))
					this.luckNum = data.luckRedNum.num;  //获取用户转盘次数
				this.setLuckRedSite();  //计算红包和进度条位置
			});
		},
		//计算红包、进度条位置、是否开启动画
		setLuckRedSite(){
			let lastIndex = this.luckRedList.length -1;  //最后一个红包下标
			let redMax = this.luckRedList[lastIndex].num; //红包最大次数
			this.luckRedList.forEach((item, index) =>{
					item.isOpen = false;  //设置是否开启动画默认值
					let pst = item.num / redMax;
					item.position = parseInt(pst*100);  //设定红包在进度条中的位置
			});
			this.width = parseInt((this.luckNum / redMax)*100);  //计算进度条位置
			this.width = Math.min(this.width, 100);  //防止进度条超过100%
			this.getLuckRedDetails();  //查询红包是否已领取
		},
		//查询红包是否已领取
		getLuckRedDetails(){
			api.getLuckyRedDetails({uid: this.uid}, (res)=>{
				let myRedList = api.getData(res).data;  //我的已领取记录
				this.luckRedList.forEach((red) =>{	
					let isHasRed = false;  //红包未领取
					myRedList.forEach((myRed) =>{
						if(myRed.redId === red.id) {
							isHasRed = true;  //红包已领取
						}
					});
					//如果红包没有领取并且需要次数已达成
					if((!isHasRed) && (red.num <= this.luckNum)) red.isOpen = true;
				});
			});
		},
		//获取抽奖配置
		getLuckSetting(){
			api.getConfig({key: "luck_open_type|luck_open_sum"}, (res)=>{
				let data = api.getData(res).data;
				let luckTypeSetting = "";
				let luckSumSetting = "";
				data.forEach((item) =>{
					if(item.key == "luck_open_sum") luckSumSetting = item.value;
					if(item.key == "luck_open_type"){
						switch (item.value){
							case "0":
								luckTypeSetting = "金币"
								break;
							case "1":
								luckTypeSetting = "现金"
								break;
							default:
								break;
						}
					}
				});			
				this.luckSetting = luckSumSetting + luckTypeSetting;
			});
		},
		//获取领奖后跳转Url
		getLuckUrl(){
			api.getConfig({key: 'luckUrl'}, (res)=>{
				let data = api.getData(res).data[0];
				this.luckUrl = data.value;
			});
		},
		//获取转盘信息
		getLucky(){
			api.getOpenLucky({}, (res)=>{
				let code = api.getCode(res);
				if(code != 0){
					let msg = api.getMsg(res);
					uni.showModal({
						content: msg,
						showCancel: false,
						success(res) {
							if(res.confirm){
								uni.navigateBack({
									delta: 1
								});
							}
						}
					});
				}else{
					let data = api.getData(res).data;
					this.LuckyList = data;
				}
			});
		},
		// 遮罩层控制
		closeShadow(){
			audio.playAudio();
			this.shadow =  false;  //关闭遮罩层
			this.getLuckRedProgress();  //重新获取红包信息
			//跳转地址包含http就跳转
			if(str.contains(this.luckUrl, "http")) util.openUrl(this.luckUrl);  //领取奖励后打开外部页面
		},
		//打开转盘外部动画
		openEffectAnimation(){
			setInterval(this.effectAnimation, 1000);
		},
		//转盘外部动画
		effectAnimation(){
			this.effect  = this.effect ? false : true;
		},
		//开启抽奖
		openLucky(){
			//抽奖按钮不可按
			if(!this.awardEnable) return;
			audio.playAudio();
			this.getOpenLucky();
		},
		//请求抽奖数据
		getOpenLucky(){
			let _this = this;
			uni.showModal({
				title: "幸运抽奖",
				content: "确定消耗" + _this.luckSetting + "进行一次抽奖？",
				success(res) {
					if(res.confirm){
						_this.rotateId = 0;
						api.openLucky({uid: _this.uid}, (res)=>{
							let code = api.getCode(res);
							let data = api.getData(res);
							if(code == 0) {
								_this.awardEnable = false;  //抽奖按钮不可按
								let data = api.getData(res);
								console.log(data);
								_this.rotateId = data.order;    //得到抽中奖品的id
								_this.getAwardTitle = data.title;  //获得抽中奖品的标题
								_this.LuckyList.forEach((item, index) =>{
									if(item.order == _this.rotateId) _this.getAwardImg = item.imgUrl; //获得抽中奖品的图片
								});
								setTimeout(()=> { _this.showAward(); }, 3500);
							}else{
								let msg = api.getMsg(res);
								uni.showModal({
									content: msg,
									showCancel: false,
								});
							}
						});
					}
				}
			});
		},
		//显示奖品
		showAward(){
			this.awardEnable = true;  //可继续抽奖
			let _this = this;
			//this.rotateId = 0;  //关闭旋转动画
			//提示奖品
			this.shadow = true;
		},
		//关闭遮罩层
		close(){
			this.shadow = false;
		},
		//跳转到查看抽奖历史记录界面
		toLuckDrawDetails(){
			if(!this.awardEnable) return;  //抽奖状态时不可跳转
			uni.navigateTo({
				url: '/pages/work/luckDraw2/LuckDrawDetails/LuckDrawDetails'
			})
		},
	}
}
</script>

<style>
	page{
		width:100%;
		height:100%;
	}
	.content {
		width:100%;
		height:100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top:44px;
		box-sizing:border-box;
		position:relative;
	}
	.bg-set, .shadow{
	    position: fixed;
	    width: 100%;
	    height: 100vh;
	    top: 0;
	    left: 0;
	    z-index: -1;
	}
	.main{
		width:86%;
		height:900rpx;
		position:absolute;
		left:50%;
		transform: translateX(-50%);
		top:20vh;
	}
/* 	.gz, .jp{
		width:90rpx;
		height:90rpx;
		position: absolute;
	}
	.gz{
		left: 10rpx;
		top: 10rpx;
	}
	.jp{
		right: 10rpx;
		top: 10rpx;
	} */
	.active_test{
		color:#ffdf81;
		position:absolute;
		top:9vh;
		font-size:17px;
	}
	.list{
		position:absolute;
		top:16vh;
		z-index:5;
	}
	.botline{
		position:relative;
		width:600rpx;
		height:20rpx;
		border-radius:10rpx;
		border:1px solid #fff3dd;
		background-color:rgba(255, 217, 147 ,.6);
		margin:0;
		padding:0;
	}
	.topline{
		height:20rpx;
		background-color:#91dc0d;
		border-radius:10rpx;
	}
	.luckRed{
		position: absolute;
		display:flex;
		flex-direction:column;
		justify-content:center;
		align-items:center;
	}
	.progress_award{
		width:70rpx;
		height:80rpx;
		transform-origin:center;/*定义bai动画的旋转中心点*/
	}

	.award_test{
		width:158rpx;
		height:40rpx;
		position:absolute;
		right: -30rpx;
		top:60rpx;
	}
	.award_test>text{
		width:0rpx;
		height:0rpx;
		border-top:10rpx solid transparent;
		border-bottom:10rpx solid #ff4007;
		border-right:10rpx solid transparent;
		border-left:10rpx solid transparent;
		display:inline-block;
		position:absolute;
		left:45%;
		top:-16rpx;
	}
	.luckdraw_box{
		width:750rpx;
		height:750rpx;
		position:absolute;
		top:25vh;
		/* transform:rotate(-300deg); */
	}
	.rotate{
		width:750rpx;
		height:750rpx;
		position:absolute;
		top:0;
		left:0;
		transform-origin:center;/*定义bai动画的旋转中心点*/
		z-index: 3;
	}
	.position1{
		transform:rotate(0deg);
	}
	.position2{
		transform:rotate(60deg);
	}
	.position3{
		transform:rotate(120deg);
	}
	.position4{
		transform:rotate(180deg);
	}
	.position5{
		transform:rotate(240deg);
	}
	.position6{
		transform:rotate(300deg);
	}
	
	.luckRedReceive{
		animation:luckRedReceive1 2s ease;
		animation-iteration-count: infinite;
	}
	@keyframes luckRedReceive1 {
		0%{transform:rotate(10deg);}
		8%{transform:rotate(-10deg);}
		16%{transform:rotate(10deg);}
		24%{transform:rotate(-10deg);}
		32%{transform:rotate(0deg);}
		100%{transform:rotate(0deg);}
	}
	
	.open_rotate1{
		animation:rotate1 3s ease 1;
		animation-fill-mode: forwards;
		/* animation-iteration-count: 1; */
	}
	.open_rotate2{
		animation:rotate2 3s ease 1;
		animation-fill-mode: forwards;
	}
	.open_rotate3{
		animation:rotate3 3s ease 1;
		animation-fill-mode: forwards;
	}
	.open_rotate4{
		animation:rotate4 3s ease 1;
		animation-fill-mode: forwards;
	}
	.open_rotate5{
		animation:rotate5 3s ease 1;
		animation-fill-mode: forwards;
	}
	.open_rotate6{
		animation:rotate6 3s ease 1;
		animation-fill-mode: forwards;
	}
	@keyframes rotate1 {
		0%{transform:rotate(0deg);}
		/* 75%{transform:rotate(1440deg);} */
		100%{transform:rotate(1800deg);}
	}
	@keyframes rotate2 {
		0%{transform:rotate(0deg);}
		/* 75%{transform:rotate(1440deg);} */
		100%{transform:rotate(1860deg);}
	}
	@keyframes rotate3 {
		0%{transform:rotate(0deg);}
		/* 75%{transform:rotate(1440deg);} */
		100%{transform:rotate(1920deg);}
	}
	@keyframes rotate4 {
		0%{transform:rotate(0deg);}
		/* 75%{transform:rotate(1440deg);} */
		100%{transform:rotate(1980deg);}
	}
	@keyframes rotate5 {
		0%{transform:rotate(0deg);}
		/* 75%{transform:rotate(1440deg);} */
		100%{transform:rotate(2040deg);}
	}
	@keyframes rotate6 {
		0%{transform:rotate(0deg);}
		/* 75%{transform:rotate(1440deg);} */
		100%{transform:rotate(2100deg);}
	}
	.luck_draw{
		width:740rpx;
		height:700rpx;
		position:absolute;
		transform: translateY(0);
		z-index:4;
	}
	.pointer{
		width:280rpx;
		height:290rpx;
		position:absolute;
		top:50%;
		left:50%;
		z-index: 10;
		transform: translate(-50%, -50%);
		/* animation: spin 1s infinite; */
		transform-origin: 0 0;
		background-image: url(/static/img/luck/ef5b234566bdb5d9f3d261c814fe44b0.png);
		background-size: 100%;
	}
	.pointer_hover{
		transform:scale(0.9) translate(-50%, -50%);
	}
	@keyframes spin {	  
	  0%   {
	  	transform:scale(1.2) translate(-50%, -50%);
	  }
	  25%   {
	  	transform:scale(1) translate(-50%, -50%);
	  }
	  50%   {
	  	transform:scale(1.2) translate(-50%, -50%);
	  }
	  75%   {
		transform:scale(1) translate(-50%, -50%);
	  }
	  100%   {
		transform:scale(1.2) translate(-50%, -50%);
	  }
	}
	.award{
		text-align:center;
		color:#ff9e23;
		font-size:14px;
		position:absolute;
		width:200rpx;
		height:170rpx;
	}
	.award_img{
		margin:auto;
		width:120rpx;
		height:120rpx;
	}
	.award_1{
		top:10%;
		left:37%;
	}
	.award_6{
		top:25%;
		left:61%;
		transform:rotate(60deg);
	}
	.award_5{
		top:53%;
		left:61%;
		transform:rotate(120deg);
	}
	.award_4{
		top:67%;
		left:37%;
		transform:rotate(180deg);
	}
	.award_3{
		top:52%;
		left:12%;
		transform:rotate(240deg);
	}
	.award_2{
		top:24%;
		left:13%;
		transform:rotate(300deg);
	}
	
	
	/* 遮罩层 */
	.shadow{
		z-index:999;
		background-color:rgba(50, 37, 15, .7);
	}
	.card{
		width:86%;
		height:400rpx;
		position:absolute;
		left:50%;
	}
	.card_header{
		width:668rpx;
		top:620rpx;
		transform: translate(-50%, -50%);
		z-index:10;
	}
	.card_content1{
		width:630rpx;
		top:900rpx;
		transform: translate(-50%, -50%);
	}
	.active1_img{
		position:absolute;
		width:700rpx;
		height:320rpx;
		top:50%;
		left:50%;
		background-image: url(/static/app/active.jpg);
		transform: translate(-50%, -50%);
		border-radius:10rpx;
		background-size:100% 100%;
	}
	.active1_img>image{
		width:100%;
		height:auto;
	}
	.active1_btn{
		width:300rpx;
		height:140rpx;
		position:absolute;
		left:50%;
		transform: translate(-50%, -40%);
	}
	.reward_btn{
		width:300rpx;
		height:300rpx;
		position:absolute;
		top:60%;
		left:50%;
		transform: translateX(-50%);
		z-index: 10;
		background-image: url(/static/img/luck/reward.png);
		background-size: 100%;
		transform-origin: 0 50%;
	}
	.luckRed_btn{
		top:52%;
	}
	.rewardBtn_hover{
		transform:scale(0.9) translate(-50%, 0);
	}
	.close{
		width:80rpx;
		height:80rpx;
		position:absolute;
		top:300rpx;
		left:80%;
		transform: translateX(-50%);
	}
	.award_box{
		position:absolute;
		top:180rpx;
		left:50%;
		transform: translateX(-50%);
		text-align:center;
		color:#FF0000;
	}
	.luckRedAward{
		position:absolute;
		top:36%;
		left:50%;
		transform: translateX(-50%);
		text-align:center;
		color:#FFE4BF;
		font-size:36px;
		font-weight:bold;
	}
	.getaward_img{
		width:220rpx;
		height:220rpx;
		margin-top:20rpx;
	}
	.record{
		position:absolute;
		right: 0;
		top:26%;
		background-color: #F8F8F8;
		width:180rpx;
		height:70rpx;
		text-align:center;
		font-size:15px;
		line-height:70rpx;
		color:#FBB742;
		border-radius:40rpx 0 0 40rpx;
		z-index: 99;
	}
	.gold_btn{
		opacity:0.8;
	}
	
	
	.luckRedTest{
		position: absolute; 
		top:42px;
		font-size:12px;
		padding:5rpx 10rpx;
		box-sizing:border-box;
		background-color:#fe2d2b;
		color:#fef1c4;
		border:1px solid #fef1c4;
		border-radius:10rpx;
		display:flex;
		justify-content:center;
		align-items:center;
		white-space:nowrap;
	}
	.arrow{
		display:inline-block;
		width: 0;
		height: 0;
		border-top: 5px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 5px solid #fe2d2b;
		border-left: 5px solid transparent;
		position:absolute;
		top:-10px;
	}
</style>
