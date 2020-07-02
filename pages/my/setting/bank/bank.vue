<template>
	<view class="content">
		<view class="bank" v-show="bankName != null">
			<view class="bank_info">
				<view class="bank_test">
					<view class="bank_name">
						<text>{{bankName}}</text>
					</view>
					<view class="bank_type">{{bankBranch}}</view>
				</view>
				
				<view class="bank_code">
					<text style="font-weight:bolder;margin-right:20rpx;">····    ····    ····</text>{{bankCode}}
				</view>
			</view>
			
			<view class="bank_add">
				<tui-icon name="tool" :size="20" color="black"></tui-icon>
				<text class="add_test">若要修改银行卡信息请联系客服</text>
			</view>
		</view>
		
		<view class="data_lack" v-show="bankName == null">
			<view class="lack_box">
				<tui-icon name="nodata" :size="120"></tui-icon>
				<text class="lack_test">您还未绑定银行卡</text>
				<button type="default" class="coin_query" @tap="toAddBank">去绑定银行卡</button>
			</view>
		</view>
	</view>
</template>

<script>
import storage from '@/api/storage.js';
import api from "@/api/api.js";
import util from "@/common/util.js";
export default{
	data() {
		return {
			userEn: [],  //我的信息
			userBankEn: [],  //用户银行卡信息
			bankName: null, //银行名称
			bankBranch: null,  //开户支行名称
			bankCode: null,  //银行卡号（只显示最后四位数）
		}
	},
	onShow() {
		this.userEn = storage.getMyInfo();
		this.getUserBank();
	},
	methods:{
		//跳转到添加银行卡页
		toAddBank(){
			uni.navigateTo({
				url: '/pages/my/setting/bank/updBank/updBank?type=1&account=' + this.userEn.account
			})
		},
		//查询用户绑定银行卡
		getUserBank(){
			api.getUserBank({account: this.userEn.account}, (res) => {
				let data = api.getData(res).data;
				data.forEach((item, index) => {
					this.userBankEn = item;
					this.bankName = item.bank;
					this.bankBranch = item.bankBranch;
					this.bankCode = item.bankCode.substring(item.bankCode.length - 4);  //银行卡号截取最后四位数
					storage.setMyBankInfo(item);  //将银行卡信息保存到storage
				});	
			});
		},
	}
}
</script>

<style>
	.content{
		padding-top:40rpx;
	}
	.bank_info{
		margin:20rpx auto 0 auto;
		width:90%;
		height:200rpx;
		background:#FFCA00;
		/* background-image:linear-gradient(to right, rgb(255, 71, 31) , rgb(255, 120, 3)); */
		border-radius:20rpx;
		padding:20rpx;
		box-sizing:border-box;
		color:#fff;
	}
	.bank_test{
		font-size:15px;
	}
	.bank_name{
		font-weight:bold;
		margin-bottom:6rpx;
		display:flex;
		justify-content: space-between;
	}
	.bank_type{
		font-size:13px;
		opacity:0.8;
	}
	.bank_code{
		text-align:center;
		margin:30rpx auto 0;
	}
	.bank_add{
		margin:20rpx auto 0 auto;
		width:90%;
		height:100rpx;
		background:#e3e3e3;
		border-radius:20rpx;
		padding:20rpx 40rpx;
		box-sizing:border-box;
		color:#000;
		font-size:14px;
		display:flex;
		align-items:center;
	}
	.add_test{
		margin-left:20rpx;
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
		margin-top:80rpx;
		background-color:#fcd030;
		font-size:16px;
		border-radius:40rpx;
		width:400rpx;
	}
	.coin_query::after{
		border:none;
	}
</style>
