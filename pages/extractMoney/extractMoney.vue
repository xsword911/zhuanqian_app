<template>
	<view class="content">
		<view class="info_bar">
			<view class="test">可提现金额</view>
			<view class="sum">￥{{sumMoney}}</view>
		</view>
		
		<view class="info_bar">
			<view class="test">到账账号</view>
			<view class="sum">
				<view class="user_img">
					 <image :src="userEn.headUrl == '' ? '/static/img/headImg.jpg' : userEn.headUrl" mode="widthFix"></image>
				</view>
				<view class="info">
					<view class="bank_code">
						<text class="hide_code">····    ····    ····</text>
						<text>{{userBankCode}}</text>
					</view>
					<text class="tips_test">{{userBankName}}</text>
				</view>
			</view>
		</view>
		
		<view class="info_bar" style="border: none;">提现金额</view>
		<view class="option">
			<view class="option_box" v-for="(item,index) in optionSumMoney" :key='index' @tap="option(index)" 
			:class="index == selectSumIndex ? 'select' : '' ">{{item}}元</view>
		</view>
		
		<view class="confirm_btn">
			<button type="default" @tap="confirm">确认提现</button>
		</view>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import util from "@/common/util.js";
import api from "@/api/api.js";
import utilCore from "@/api/utilCore.js";
export default{
	data() {
		return {
			userEn: [],  //我的信息
			userBankEn: [],  //我的绑定银行卡信息
			sumMoney: null,   //可提现金额
			userName: null,  //账号用户名
			userImg: null,  //账号头像
			optionSumMoney: [10, 30, 50, 100, 200, 300],  //可选的提现金额值
			selectSumMoney: null  ,//选中的提现金额值
			selectSumIndex: null  ,//选中的提现金额值索引
			userBankName: null,  //绑定银行卡名称
			userBankCode: null, //绑定银行卡号
		}
	},
	onLoad() {
		this.userEn = storage.getMyInfo();  //获取我的信息
	},
	onShow(){
		this.userEn = storage.getMyInfo();  //获取我的信息
		this.getMyInfo();  //刷新我的信息
		this.getMyBankInfo();  //获取我的绑定银行卡信息
	},
	methods:{
		//刷新我的信息
		getMyInfo(){
			api.getUserByAccount({account: this.userEn.account}, (res)=>{
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
				account: this.userEn.account,
				page: 1,
				count:5,
			}
			api.getUserBank(postData, (res)=>{
				let data = api.getData(res).data;
				if(!util.isEmpty(data)) {
					this.userBankEn = data[0];
					this.userBankName = data[0].bank;
					this.userBankCode = data[0].bankCode.substring(data[0].bankCode.length - 4);  //银行卡号截取最后四位数;
					storage.setMyBankInfo(data[0]);
				}else{
					uni.switchTab({
						url: '/pages/my/my'
					});
					uni.navigateTo({
						url: '/pages/my/setting/setting'
					});
					uni.navigateTo({
						url: '/pages/my/setting/bank/bank'
					})
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
			            if(_this.selectSumMoney == undefined){
							uni.showToast({
								title: "请选择提现金额",
								image: "/static/img/fail-circle.png",
								duration: 2000
							})
						}else{
							if(parseInt(_this.sumMoney) < _this.selectSumMoney){
								uni.showToast({
									title: "可提现金额不足",
									image: "/static/img/fail-circle.png",
									duration: 2000
								})
								return;
							};
							_this.submitExtractMoney();
						}
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		},
		//提交提现申请
		submitExtractMoney(){
			api.addMoneyDraw({
				account: this.userEn.account, 
				money: this.selectSumMoney
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
						content: "提现申请申请提交" + msg,
						showCancel: false
					});
				}
			});
		},
		//选择提现金额值 
		option(index){
			//设置选中效果
			for(let i = 0; i <= this.optionSumMoney.length-1; ++i){
				if(i == index) this.selectSumIndex = index;
			}
			this.selectSumMoney = this.optionSumMoney[index];  //获取选中的提现金额值
		},
	}
}
</script>

<style>
	.content{
		padding:0 20rpx;
		box-sizing:border-box;
	}
	image{
		width:100%;
		height:100%;
	}
	.info_bar{
		width:100%;
		padding:40rpx 0;
		box-sizing:border-box;
		font-size:14px;
		border-bottom:1px solid #eee;
		display:flex;
	}
	.test{
		width:30%;
	}
	.sum{
		width:70%;
		display:flex;
		align-items:center;
	}
	.user_img{
		width:80rpx;
		height:80rpx;
		border-radius:50%;
		overflow:hidden;
	}
	.info{
		display:flex;
		flex-direction:column;
		margin-left:20rpx;
	}
	.tips_test{
		margin-top:10rpx;
		font-size:12px;
		color:#8d989f;
	}
	.option{
		display:flex;
		justify-content:space-between;
		flex-wrap: wrap;
		width:100%;
	}
	.option_box{
		border:1px solid #000;
		border-radius:10rpx;
		width:28%;
		height:140rpx;
		text-align:center;
		line-height:140rpx;
		margin-bottom:40rpx;
	}
	.select{
		background:#fcd030;
		border:1px solid #fcd030;
	}
	.confirm_btn{
		margin-top:100rpx;
	}
	.confirm_btn>button{
		background-color:#fcd030;
		border-radius:40rpx;
		font-size:14px;
	}
	.confirm_btn>button::after{
		border:none;
	}
	.bank_code{
		display:flex;
		align-items:center;
	}
	.hide_code{
		font-size:20px;
		font-weight:bold;
		margin-right:20rpx;
	}
</style>
