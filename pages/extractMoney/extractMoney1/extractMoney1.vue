<template>
	<view class="container" style="padding:0; height:100vh; background-color: #fff;">
		<view class="" v-if="isShowBank == 1" style="background-color: #fbf9fe;height:100vh;">
			<view class="lay_head">
				<view class="lay_money background_style">
					<view class="lay_test">
						余额
					</view>
					<view class="lay_money_num">
						￥<text>{{sumMoney}}</text>
					</view>
					<view class="">
						手续费：<text>0.00</text>
					</view>
				</view>
			</view>
			
			<view class="lay_group">
				<view class="lay_row">
					<view class="lay_row_test">银行名称</view>
					<view class="lay_row_info lay_bank">{{userBankName}}</view>
				</view>
				<view class="lay_row">
					<view class="lay_row_test">银行卡号</view>
					<view class="lay_row_info lay_bank">····    ····    ····    {{userBankCode}}</view>
				</view>
				
				<view class="lay_row">
					<view class="lay_row_test">提款金额</view>
					<view class="lay_row_input">
						<input type="number" value="" placeholder="请输入提款金额" v-model="money" />
					</view>
				</view>
				
				<view class="lay_row">
					<view class="lay_row_test">提现密码</view>
					<view class="lay_pwd">
						<view class="lay_row_input">
							<input type="text" value="" placeholder="请输入提现密码" v-model="pwdCash" :password="isPwd"/>
						</view>
						<view class="open_pwd" @tap="isPassWord">
							<tui-icon name="eye" :size="30"></tui-icon>
						</view>
					</view>
				</view>
				
				<view class="lay_row">
					出款上限：<text>{{moneyMax}}</text>；出款下限：<text>{{moneyMin}}</text>
				</view>
			</view>
			
			<view class="draw_time" v-if="!isDrawTime">
				每日提现时间为{{drawBegTime.value}}至{{drawEndTime.value}}
			</view>
			
			<view class="lay_btn btn_style" :class="{'missTime': !isDrawTime}">
				<button type="default" @tap="confirm" hover-class="btn_hover">提交</button>
			</view>
		</view>
		
		<view class="data_lack" v-if="isShowBank == 2" style="width:100%; height:100vh; background-color: #fff;">
			<view class="lack_box btn_style">
				<tui-icon name="nodata" :size="120"></tui-icon>
				<text class="lack_test">您还没有绑定银行卡</text>
				<button type="default" class="coin_query" hover-class="btn_hover" @tap="toAddBank">去绑定</button>
			</view>
		</view>
		
		<view class="data_lack" v-if="isShowBank == 3" style="width:100%; height:100vh; background-color: #fff;">
			<view class="lack_box btn_style">
				<tui-icon name="nodata" :size="120"></tui-icon>
				<text class="lack_test">您还没有登录账号</text>
				<button type="default" class="coin_query" hover-class="btn_hover" @tap="toLogin">去登录</button>
			</view>
		</view>
		
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import util from "@/common/util.js";
import api from "@/api/api.js";
import md5 from "@/common/md5.js";
import time from "@/common/time.js";
export default{
	data() {
		return {
			userEn: [],  //我的信息
			userBankEn: [],  //我的绑定银行卡信息
			sumMoney: null,   //可提现金额
			userBankCode: null, //绑定银行卡号
			userBankName: "",   //绑定银行卡名称
			uid: "",  //uid			
			money: null,  //提现金额
			pwdCash: null,  //提现密码
			isShowBank: 0,  //是否显示银行卡信息 0正在查询 1显示 2不显示 3未登录
			
			moneyMin: null,  //出款下限
			moneyMax: null,  //出款上限限
			
			isDrawTime: true,  //是否在提现时间内
			drawBegTime: "",  //提现开始时间
			drawEndTime: "",  //提现结束时间
			
			isPwd: true,  //是否是密码框
		}
	},
	onLoad(res) {
		//游客登录
		if(res.loginType){
			this.isShowBank = 3;
			return;
		}else {
			this.uid = storage.getUid();  //获取uid
			this.getMyInfo();  //刷新我的信息
			// this.getMyBankInfo();//查询用户绑定银行卡信息
			this.getDrawTime();  //获取提现限制时间
		}
	},
	methods:{
		//查看密码
		isPassWord(){
			this.isPwd = this.isPwd ? false : true;
		},
		//获取提现限制时间
		getDrawTime(){
			let postData = {
				page: 1,
				count: 5,
				key: "draw_time_max|draw_time_min"
			};
			api.getConfig(postData, (res)=>{
				let data = api.getData(res).data;
				data.forEach((item, index) =>{
					if(item.key == 'draw_time_max') this.drawEndTime = item;
					if(item.key == 'draw_time_min') this.drawBegTime = item;
				});
				//获取当前时间系统时间
				api.getSystemTimeNow({}, (res)=>{
					let time = api.getData(res);
					time = time.substring(11)  //获取当前系统时间 HH-mm-ss
					if(time > this.drawEndTime.value || time < this.drawBegTime.value) this.isDrawTime = false;  //当前时间不在提现时间内
					else this.isDrawTime = true;   //当前时间在提现时间内
				});
			});
		},
		//跳转到登录界面
		toLogin(){
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},
		//跳转到添加银行卡页
		toAddBank(){
			uni.navigateTo({
				url: '/pages/my/setting/bank/updBank/updBank?type=1&account=' + this.userEn.account
			})
		},
		//刷新我的信息
		getMyInfo(){
			api.getUserByUid({uid: this.uid}, (res)=>{
				storage.setMyInfo(api.getData(res));
				this.userEn = api.getData(res);
				this.sumMoney = this.userEn.money;
				this.getMyBankInfo();  //获取我的绑定银行卡信息
			});
		},
		//获取用户绑定银行卡信息
		getMyBankInfo(){
			let postData = {
				uid: this.uid,
				page: 1,
				count:5,
			}
			api.getUserBank(postData, (res)=>{
				let data = api.getData(res).data;
				if(!util.isEmpty(data)) {
					this.userBankEn = data[0];
					this.userBankName = data[0].bank;
					this.userBankCode = data[0].bankCode.substring(data[0].bankCode.length - 4);  //银行卡号截取最后四位数;
					// storage.setMyBankInfo(data[0]);
					this.isShowBank = 1;  //显示银行卡信息
					this.getDrawLimit();  //用户查询取现限制
				}else{
					this.isShowBank = 2;  //不显示银行卡信息
				}
			});
		},
		//用户查询取现限制
		getDrawLimit(){
			api.getDrawLimit({uid: this.uid, level: this.userEn.level}, (res)=>{
				let data = api.getData(res);
				this.moneyMin = data.min;   //获取提现出款下限
				this.moneyMax = data.max;   //获取提现出款上限
			});
		},
		//确认提现
		confirm(){
			if(!this.isDrawTime) return;  //不在提现时间内
			let _this = this;
			uni.showModal({
			    title: '提示',
			    content: '您确定提现？',
			    success: function (res) {
			        if (res.confirm) {
			            if(util.isEmpty(_this.money) || util.isEmpty(_this.pwdCash)){
							uni.showToast({
								title: "请输入完整信息",
								image: "/static/img/fail-circle.png",
								duration: 2000
							});
							return;
						}else if(parseInt(_this.sumMoney) < parseInt(_this.money)){
							uni.showToast({
								title: "可提现金额不足",
								image: "/static/img/fail-circle.png",
								duration: 2000
							});
							return;
						}else if(parseInt(_this.money) < _this.moneyMin){
							uni.showToast({
								title: "出款下限最低为" + _this.moneyMin,
								image: "/static/img/fail-circle.png",
								duration: 2000
							});
							return;
						}else if(parseInt(_this.money) > _this.moneyMax){
							uni.showToast({
								title: "出款上限最高为" + _this.moneyMax,
								image: "/static/img/fail-circle.png",
								duration: 2000
							});
							return;
						}else if(!_this.isNum(parseFloat(_this.money))){
							uni.showToast({
								title: "提现金额只能是整数",
								image: "/static/img/fail-circle.png",
								duration: 2000
							});
							return;
						}
						_this.submitExtractMoney();
			        }else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		},
		//判断是否是纯数字
		isNum(value){
			const reg = /^[0-9]*$/;
			return reg.test(value);
		},
		//提交提现申请
		submitExtractMoney(){
			api.addMoneyDraw({
				uid: this.uid, 
				money: this.money,
				pwdCash: md5(this.pwdCash)
			}, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				if(code == 0){
					uni.showModal({
						content: "提现申请提交" + msg,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/my/detailed/detailed?type=1"
								})
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
	}
}
</script>

<style>
	.lay_head{
		padding:20rpx;
		box-sizing:border-box;
	}
	.lay_money{
		width:100%;
		height:200rpx;
		border-radius:10px;
		color: #fff;
		padding-left:40rpx;
		box-sizing:border-box;
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		font-size:14px;
		/* position:relative; */
	}
	.lay_test{
/* 		position:absolute;
		top:40rpx; */
	}
	.lay_money_num{
		font-size:24px;
		font-weight:bold;
/* 		position:absolute;
		bottom:40rpx; */
	}
	.lay_group{
		margin-top:20rpx;
		border-top:1px solid #f9f7fa;
		border-bottom:1px solid #f9f7fa;
		padding-left:30rpx;
		box-sizing:border-box;
		background-color:#fff;
	}
	.lay_row{
		padding:20rpx 0 20rpx 0;
		box-sizing:border-box;
		width:100%;
		display:flex;
		align-items: center;
		font-size:15px;
		border-bottom:1px solid #f9f9f9;
	}
	.lay_row_test{
		width:24%;
		text-align:right;
	}
	.lay_row>text{
		color:#dc3b40;
	}
	.lay_row_info{
		padding-right:40rpx;
		box-sizing:border-box;
		flex: 1;
		text-align: right;
	}
	.lay_btn>button{
		font-size:14px;
		width:80%;
		margin-top:40rpx;
	}
	.lay_bank{
		color:#999999;
	}
	.lay_row_test{
		width:20%;
		text-align:right;
	}
	.lay_row_input{
		padding:0 40rpx;
		box-sizing:border-box;
		flex: 1;
		display:flex;
	}
	.lay_row_input>input{
		font-size:15px;
		flex: 1;
	}
	
	
	.lack_box{
		width:100%;
		height:700rpx;
		display:flex;
		justify-content:center;
		align-items:center;
		flex-direction:column;
	}
	.lack_test{
		font-size:16px;
		margin-top:20rpx;
		display:inline-block;
	}
	.coin_query{
		margin-top:40rpx;
		font-size:16px;
		border-radius:40rpx;
		width:400rpx;
	}
	.coin_query::after{
		border:none;
	}
	
	.draw_time{
		color:#DC3B40;
		text-align:center;
		font-size:14px;
		margin-top:40rpx;
	}
	.missTime>button{
		background-color:#E3E3E3;
	}
	
	.lay_pwd{
		display:flex;
		align-items:center;
	}
</style>
