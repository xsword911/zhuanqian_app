<template>
	<view class="content">
		<view class="info_column">
			<view class="info_title">我的金币：</view>
			<view class="info_num">{{userEn.gold}}</view>
		</view>
		
		<view class="info_column">
			<view class="info_title">我的现金：</view>
			<view class="info_num">￥{{userEn.money}}</view>
		</view>
		
        <view class="radio_box">
			<radio-group @change="radioChange" class="radio_group">
				<label class="radio"><radio value="1" :checked="radio == 1" />金币兑换现金</label>
				<label class="radio"><radio value="2" :checked="radio == 2" />现金兑换金币</label>				
			</radio-group>
        </view>
		
		<view class="goldToMoney_box" v-show="radio == 1">
			<view class="info_column" style="border: none;">
				<view class="info_title">消耗金币</view>
				<view class="info_num"><input type="number" value="" placeholder="请输入数量" @input="inputGold" v-model="gold" /></view>
			</view>
			
			<view class="info_column" style="border: none;">
				<view class="info_title">可兑换现金</view>
				<view class="info_num">￥  {{goldToMoney}}</view>
			</view>
			
			<view class="info_tips">
				<view class="num tips">100金币=1元</view>
				<view class="goldToMoeney_btn">
					<button type="default" :class="gold != '' ? 'btn_active' : '' " @tap="goldToMoeney">兑换现金</button>
				</view>
				<view class="tips_test">金币只能兑换100的倍数</view>
			</view>
		</view>
		
		<view class="goldToMoney_box" v-show="radio == 2">
			<view class="info_column" style="border: none;">
				<view class="info_title">消耗现金(元)</view>
				<view class="info_num"><input type="number" value="" placeholder="请输入数量" @input="inputMoney" v-model="money" /></view>
			</view>
			
			<view class="info_column" style="border: none;">
				<view class="info_title">可兑换金币</view>
				<view class="info_num">{{moneyToGold}}</view>
			</view>
			
			<view class="info_tips">
				<view class="num tips">1元=100金币</view>
				<view class="goldToMoeney_btn">
					<button type="default" :class="money != '' ? 'btn_active' : '' " @tap="MoeneyToGold">兑换金币</button>
				</view>
				<view class="tips_test">现金必须是整数</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
export default{
	computed:{
		goldToMoney(){
			if(this.gold < 100) return 0;
			else{
				let num = this.gold/100;
				num = num.toFixed(2);
				return num;
			}
		},
		moneyToGold(){
			return this.money*100;
		},
	},
	data() {
		return {
			userEn: [],  //我的信息
			radio: 1,  //单选框控制
			exChangeMoney: 0.00, //可兑换现金
			exChangeGold: 0, //可兑换金币
			money: "", //输入现金数
			gold: "", //输入金币数
		}
	},
	onShow() {
		this.userEn = storage.getMyInfo();
	},
	methods:{
		//radio单选框切换
		radioChange(val){
			this.radio = parseInt(val.detail.value);
		},
		//输入金币数
		inputGold(val){
			//禁止输入小数
			let str = '' + this.gold
			if (str.indexOf('.') !== -1) {
				let arr = str.split('')
			    arr.splice(arr.length - 1)
				let str2 = arr.join('')
				this.gold = +str2
			}
			//输入超过最大金币数时强制修改输入金币值
			let inputNum = parseInt(val.target.value);
			if(inputNum >= this.userEn.gold) 
			{
				this.$nextTick(function() {
					this.gold = this.userEn.gold;
				});
			}
		},
		//输入现金数
		inputMoney(val){
			//禁止输入小数
			let str = '' + this.gold
			if (str.indexOf('.') !== -1) {
				let arr = str.split('')
			    arr.splice(arr.length - 1)
				let str2 = arr.join('')
				this.gold = +str2
			}
			//输入超过最大现金数时强制修改输入现金值
			let inputNum = parseInt(val.detail.value);
			if(inputNum >= this.userEn.money){
				this.$nextTick(function() {
					this.money = parseInt(this.userEn.money);
				});
			}
		},
		//金币转换现金
		goldToMoeney(){
			if(util.isEmpty(this.gold)) return;  //判断输入是否为空
			if(parseInt(this.gold) < 100){
				uni.showToast({
					title: "输入数值不合法",
					image: "/static/img/fail-circle.png",
					duration: 2000
				})
				return;
			}
			let data = {
				account: this.userEn.account,
				gold: this.gold,
				type: 0
			};
			this.change(data);
		},	
		//现金转换金币
		MoeneyToGold(){
			if(util.isEmpty(this.money)) return;  //判断输入是否为空
			if(parseInt(this.money) <= 0){
				uni.showToast({
					title: "输入数值不合法",
					image: "/static/img/fail-circle.png",
					duration: 2000
				})
				return;
			}
			let data = {
				account: this.userEn.account,
				money: this.money,
				type: 1
			};
			this.change(data);
		},
		//收益转换提交(金币、现金) 0:金币转换现金 1:现金转换金币
		change(data){
			api.moneyTran(data, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				if(code == 0){
					uni.showToast({
						title: msg,
						image: "/static/img/check-circle.png",
						duration: 1500,
						success() {
							setTimeout(function(){ 
								uni.navigateBack({
									delta: 1
								}) 
							}, 1600);
						}
					})
				}else{
					uni.showToast({
						title: msg,
						image: "/static/img/fail-circle.png",
						duration: 2000
					})
				}
			});
		},
	}
}
</script>

<style>
	.content{
		padding-top:20rpx;
		box-sizing:border-box;
	}
	.info_column{
		display:flex;
		font-size:16px;
		margin-bottom:20rpx;
		padding:20rpx;
		box-sizing:border-box;
		border-bottom:1px solid #f9f9f9;
	}
	.info_title{
		width:32%;
	}
	.radio_box{
		margin-top:40rpx;
	}
	.radio_group{
		display:flex;
		justify-content:space-around;		
	}
	.goldToMoney_box, .MoneyTogold_box{
		margin-top:40rpx;
	}
	.info_column input{
		border-bottom:1px solid #000;
		padding-left:10rpx;
		box-sizing:border-box;
	}
	.info_tips{
		width:100%;
		font-size:15px;
	}
	.info_tips view{
		text-align:center;
	}
	.tips{
		width:35%;
		margin:0 auto;
		background-color:#FF6B17;
		color:#fff;
	}
	.goldToMoeney_btn{
		margin-top:40rpx;
	}
	.goldToMoeney_btn button{
		font-size:15px;
		border-radius:40rpx;
	}
	.btn_active{
		background-color:#FCD030;
		color:#fff;
	}
	.tips_test{
		margin-top:20rpx;
	}
</style>
