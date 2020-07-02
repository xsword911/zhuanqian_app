<template>
	<view class="">
		<view class="head_box">
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
				
				<view class="" @tap="show8(-1)">
					<button type="default" class="extract_btn">兑换现金 <tui-icon name="arrowright" :size="15" class="tag"></tui-icon></button>
				</view>
				
			</view>
			
			<!-- 签到信息 -->
			<view class="signIn_box">
				<view class="signIn_img">
					<image src="/static/img/hongbao.png" mode="widthFix"></image>
				</view>
				
				<view class="signIn_test">
					<view class="">
						已连续签到<text class="tips_text">{{sign}}</text>天
					</view>
					
					<view class="continued_sign">
						再签到<text class="tips_text">{{continuedSign}}</text>天可获得<text class="tips_text">{{nextReward}}</text>元现金红包
					</view>
				</view>
				
				<view class="countDown_box">
					16:22
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
				
				<view class="receive">领取</view>
			</view>
		</view>
		
		<view class="content main">
			<!-- 热门活动 -->
			<view class="hot_activity">
				<view class="activity_bar">热门活动</view>
				
				<view class="activity_column" v-for="(item, index) in hotActivity" :key="index">
					<view class="activity_left">
						<view class="activity_img">
							<image :src="item.imgUrl == ' '? '/static/img/work_img.png' : item.imgUrl" mode="widthFix"></image>
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
					
					<view class="activity_right" @tap="show8(item.type, item.rule, item.title)">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>+{{item.award}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 限时推荐-->
			<view class="hot_activity">
				<view class="activity_bar">限时推荐</view>
				
				<view class="activity_column"  v-for="(item, index) in recommend" :key="index">
					<view class="activity_left">
						<view class="activity_img">
							<image :src="item.imgUrl == ' '? '/static/img/work_img1.png' : item.imgUrl" mode="widthFix"></image>
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
					
					<view class="activity_right" @tap="show8(item.type, item.rule, item.title)">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
								<text>+{{item.award}}</text>
						</view>
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
							<button type="default">复制内容并跳转</button>
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
							<button type="default">复制内容并跳转</button>
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
							<button type="default">复制内容并跳转</button>
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
									10000金币=1元
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
							金币只能兑换10000的倍数
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
export default{
	comments:{
		tuiModal
	},
	filters:{
		//金币转换现金计算
		cashExchange(val){
			if(val < 10000) return 0;
			else{
				let num = val/10000;
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
			sign: 3,   //连续签到天数
			continuedSign: 4,  //距离领取下一次奖励所需要的天数
			nextReward: 5,  //下一次奖励的金额
			hotActivity: [],  //热门活动列表
			recommend: [],  //限时推荐列表
			modal8: false,  //控制金币换现金弹窗显示
			text: null, //弹窗的文字内容
			type: 0, //弹窗类型
			title: '', //弹窗标题
		}
	},
	onShow(){
		this.userEn = storage.getMyInfo();  //获取我的信息
		this.myCoin = this.userEn.gold;
		this.getTaskList();  //获取任务列表
		this.myCoin = storage.getMyInfo().gold;
		this.getGoldAdd();
	},
	methods:{
		//复制内容并跳转到微信
		toWx(){
			let test = '';
			test = this.text;
			if(this.type == 0) test = '我的邀请码是' + this.userEn.code + "下载链接是" + this.text;
			uni.setClipboardData({
				data: test,
				success() {
					if (plus.os.name == "iOS") {  
					    plus.runtime.openURL("weixin://")  
					} else if (plus.os.name == "andriod") {  
					    var Intent = plus.android.importClass("android.content.Intent");  
					    var ComponentName = plus.android.importClass('android.content.ComponentName')  
					    var intent = new Intent();  
					    intent.setComponent(new ComponentName("com.tencent.mm", "com.tencent.mm.ui.LauncherUI"));  
					    //intent.putExtra("LauncherUI.From.Scaner.Shortcut", true);  
					    intent.setFlags(335544320);  
					    intent.setAction("android.intent.action.VIEW");  
					    var main = plus.android.runtimeMainActivity();  
					    main.startActivity(intent);  
					}  
				}
			});
		},
		//获取今日金币
		getGoldAdd(){
			api.getStatisticsToday({account: this.userEn.account}, (res) =>{
				let data = api.getData(res);
				if(util.isEmpty(data)) return;
				else this.todayCoin = data.goldAdd;
			});
		},
		//获取任务列表
		getTaskList(){
			api.getTask({
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
			this.modal8 = false;
		},
		//打开弹窗
		show8(type, text, title) {
			if(type == 4) return;
			this.modal8 = true;
			this.type = type;
			this.text = text;
			this.title = title;
		},
	}
}
</script>

<style>
	.head_box{
		background-color:#fcd030;/* FFCA00 */
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
	.extract_btn{
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
		width:120rpx;
		height:120rpx;
		border-radius:50%;
		background-color:#FFCA00;
		position: absolute;
		right:20rpx;
		color:#FF1409;
		text-align:center;
		line-height:120rpx;
		font-size:15px;
		font-weight:bolder;
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
		border-top:1px solid #f5f5f5;
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
		padding:10rpx;
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
		text-align:center;
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
</style>
