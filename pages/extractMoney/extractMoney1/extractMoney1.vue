<template>
	<view class="container" style="padding:0; height:100vh;">
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
					<input type="text" value="" placeholder="请输入提款金额" v-model="money" />
				</view>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">提现密码</view>
				<view class="lay_row_input">
					<input type="text" value="" placeholder="请输入提现密码" v-model="pwdCash" />
				</view>
			</view>
			
			<view class="lay_row">
				出款上限：<text>1000000.00</text>；出款下限：<text>50</text>
			</view>
		</view>
		
		<view class="lay_btn btn_style">
			<button type="default" @tap="confirm">提交</button>
		</view>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import util from "@/common/util.js";
import api from "@/api/api.js";
import md5 from "@/common/md5.js";
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
			pwdCash: "",  //提现密码
		}
	},
	onShow(){
		this.uid = storage.getUid();  //获取uid
		this.getMyInfo();
	},
	methods:{
		//刷新我的信息
		getMyInfo(){
			api.getUserByUid({uid: this.uid}, (res)=>{
				storage.setMyInfo(api.getData(res));
				this.userEn = api.getData(res);
				this.userName = this.userEn.account;
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
				}else{
					uni.showModal({
						content: "请绑定银行卡",
						showCancel: false,
						success(res) {
							if(res.confirm){
								uni.switchTab({
									url: '/pages/my/my'
								});
								uni.navigateTo({
									url: '/pages/my/setting/bank/bank'
								})
							}
						}
					});
				}
			});
		},
		//确认提现
		confirm(){
			let _this = this;
			uni.showModal({
			    title: '提示',
			    content: '您确定提现？',
			    success: function (res) {
			        if (res.confirm) {
			            if(util.isEmpty(_this.money) && util.isEmpty(_this.pwdCash)){
							uni.showToast({
								title: "请输入完整信息",
								image: "/static/img/fail-circle.png",
								duration: 2000
							})
						}else if(parseInt(_this.sumMoney) < parseInt(_this.money)){
								uni.showToast({
									title: "可提现金额不足",
									image: "/static/img/fail-circle.png",
									duration: 2000
								})
								return;
						}else{
							if(parseInt(_this.money) < 50){
								uni.showToast({
									title: "出款下限最低为50",
									image: "/static/img/fail-circle.png",
									duration: 2000
								})
								return;
							}
						}
						_this.submitExtractMoney();
			        }else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
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
		margin-bottom:30rpx;
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
</style>
