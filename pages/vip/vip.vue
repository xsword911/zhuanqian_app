<template>
	<view class="">
		<view class="lay_head">
			<view class="head_info">
				<view class="head_img">
					<image src="/static/img/head.png" mode=""></image>
				</view>
				<view class="">
					会员等级：{{levelName}}
				</view>
			</view>
			
			<view class="">
				每天可接：<text>{{workNum}}</text>(任务)
			</view>
			
			<view class="">
				会员到期时间：21-08-07 17:02:38
			</view>
			
			<view class="vip" @tap="toPower">
				会员详情
			</view>
		</view>
		
		<view class="content">
			<view class="func">
				<view class="lay_func">
					<view class="func_img">
						<image src="/static/img/v1.png" mode=""></image>
					</view>
					<view class="func_test test1">
						佣金加成
					</view>
				</view>
				
				<view class="lay_func">
					<view class="func_img">
						<image src="/static/img/v2.png" mode=""></image>
					</view>
					<view class="func_test test2">
						任务增多
					</view>
				</view>
				
				<view class="lay_func">
					<view class="func_img">
						<image src="/static/img/v3.png" mode=""></image>
					</view>
					<view class="func_test test3">
						专属客服
					</view>
				</view>
			</view>
			
			<view class="lay_pay" v-show="isShowPay">
				<view class="pay_info">
					<view class="" style="display: flex; align-items: center;">
						<view class="pay_img">
							<image src="/static/img/yq.png" mode=""></image>
						</view>
						<view class="" style="font-size:12px;">
							余额支付
						</view>
					</view>
					<view class="pay_success">
						<image src="/static/img/gou.png" mode=""></image>
					</view>
				</view>
				
				<view class="pay_btn btn_style">
					<button type="default" hover-class="btn_hover" @tap="pay">立即升级需支付{{payNum}}元</button>
				</view>
			</view>
			
			<view class="lay_level">
				<view class="level_box level_test" v-for="(item,index) in userLevel" :key="index"
				@tap="openPay(item)" :class="index == clickBox ? 'click_box' : ''">
					<view class="level_type">{{item.levelName}}</view>
					<view class="level_money" v-if="item.level <= 4">{{item.money}}元</view>
					<view class="level_money" v-if="item.level > 4">开发中...</view>
					<view class="">可接任务:{{item.receiveTaskSum}}/天</view>
					<view class="">提现次数:{{item.drawSum}}/次</view>
					<view class="">-</view>
					<view class="">-</view>
					<view class="">开通会员:365天</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from "@/api/api.js";
import storage from "@/api/storage.js";
export default{
	data() {
		return {
			uid: "",  //uid
			isShowPay: false,  //是否显示支付盒子
			levelName: "",   //会员等级名称
			workNum: null,  //当前每天可接任务数
			payNum: 0,  //支付金额
			userLevel: [],  //vip列表
			clickBox: null,   //被选中的会员盒子样式
			myLevel: 0,   //我的会员等级 0新人 1白银会员 2黄金会员 3铂金会员 4钻石会员 5至尊会员
			myLevelMoney: 0,  //当前等级对应金额
			buyLevel: 0, //购买等级
		}
	},
	onShow() {
		this.init();  //初始化
		this.uid = storage.getUid();  //获取uid
		this.getUserLevel();  //获取会员等级信息		
	},
	methods:{
		//初始化
		init(){
			this.isShowPay = false;
			this.levelName = "";
			this.workNum = null;
			this.payNum = 0;
			this.clickBox = null;
			this.myLevel = 0;
			this.myLevelMoney = 0;
			this.buyLevel = 0;
		},
		//购买等级
		pay(){
			let _this = this;
			uni.showModal({
				content: "确认支付购买会员等级?",
				success(res) {
					if(res.confirm){
						api.buyLevel({uid: _this.uid, level: _this.buyLevel}, (res)=>{
							let code = api.getCode(res);
							if(code == 0){
								uni.showToast({
									title: "购买成功",
									icon: "none"
								});
								setTimeout(function(){
									_this.init();  //初始化
									_this.getMyInfo();  //刷新我的信息
								},1000)
							}else{
								let msg = api.getMsg(res);
								uni.showToast({
									title: msg,
									icon: "none"
								});
							}
						});
					}
				}
			})
		},
		//获取会员等级信息
		getUserLevel(){
			api.getLevelAll((res)=>{
				let data = api.getData(res).data;
				this.userLevel = data;
				this.getMyInfo(); //刷新我的信息			
			});
		},		
		//获取我的信息
		getMyInfo(){
			api.getUserByUid({uid: this.uid}, (res)=>{
				let data = api.getData(res);
				this.myLevel = data.level;   //获取我的会员等级
				storage.setMyInfo(data);	 //保存我的信息
				this.setUserLevel();  //设置我的等级信息
			});
		},
		//设置自己的数据
		setUserLevel(){
			this.userLevel.forEach((item, index) =>{
				let moneyNow = 0;  //当前会员等级金额
				if(item.level == this.myLevel){
					this.workNum = item.receiveTaskSum;  //获取当前会员每日可接任务数
					this.levelName = item.levelName;	//获取当前会员等级名称
					this.myLevelMoney = item.money;     //获取当前等级金额
				}
			});
		},
		//跳转到会员特权界面
		toPower(){
			uni.navigateTo({
				url: "/pages/power/power"
			})
		},
		//打开支付盒子
		openPay(data){
			//当前玩家会员等级大于点击会员盒子时return
			if(data.id <= this.myLevel) return; 
			if(data.level > 4) return;
			this.payNum = data.money - this.myLevelMoney;  //显示购买金额
			this.isShowPay = true;			//显示购买按钮
			this.clickBox = data.id - 1;   //添加选中样式
			this.buyLevel = data.level;   //设置购买等级
		}
	}
}
</script>

<style>
	.lay_head{
		width:100%;
		height:380rpx;
		background-image:linear-gradient(to right, rgb(42,164,249) , rgb(139,114,245));
		color:#fff;
		font-size:14px;
		padding:60rpx 40rpx;
		box-sizing:border-box;
		display:flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}
	.head_info{
		display:flex;
		align-items:center;
		font-weight:bold;
		font-size:17px;
	}
	.head_img{
		width:120rpx;
		height:120rpx;
		margin-right:20rpx;
	}
	.vip{
		width:200rpx;
		height:60rpx;
		text-align:center;
		line-height:60rpx;
		border-radius:40rpx 0 0 40rpx;
		background-color:#CFA55D;
		position:absolute;
		right:0;
		top:50%;
		transform: translateY(-50%);
	}
	.func{
		display:flex;
		justify-content:space-between;
		margin-top:60rpx;
	}
	.lay_func{
		width:30%;
		display:flex;
		flex-direction: column;
		align-items:center;
		justify-content:center;
	}
	.func_img{
		width:120rpx;
		height:120rpx;
	}
	.func_test{
		font-size:15px;
	}
	.test1{
		color:#FEBB35;
	}
	.test2{
		color:#FA3B56;
	}
	.test3{
		color:#3BD4F8;
	}
	.lay_level{
		width:100%;
		display:flex;
		flex-wrap: wrap;
		justify-content:space-between;
		margin-top:40rpx;
	}
	.level_box{
		width:26%;
		height:400rpx;
		padding:40rpx 20rpx;
		border: 1px solid #CCCCCC;
		border-radius:30rpx;
		text-align:center;
		font-size:24rpx;
		margin-top:20rpx;
	}
	.level_box>view{
		margin-top:10rpx;
	}
	.level_type{
		font-size:18px;
	}
	.level_box2{
		color:#000;
	}
	.level_money{
		color:#228AFF;
		font-weight:bold;
	}
	.level_test{
		color: #A6A6BA;
	}
	.lay_pay{
		width:60%;
		margin:40rpx auto;
	}
	.pay_info{
		display:flex;
		align-items:center;
		justify-content: space-between;
	}
	.pay_img{
		width:40rpx;
		height:40rpx;
		margin-right:40rpx;
	}
	.pay_success{
		width:32rpx;
		height:32rpx;
	}
	.pay_btn{
		margin-top:40rpx;
	}
	.pay_btn>button{
		padding:5rpx;
		border-radius:40rpx;
		box-sizing:border-box;
		font-size:14px;
		color:#fff;
	}
	.click_box{
		background-color:#0A91FB;
		color:#fff;
	}
	.click_box>view{
		color:#fff;
	}
</style>
