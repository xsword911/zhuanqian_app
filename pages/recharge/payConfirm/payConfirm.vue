<template>
	<view class="container" style="padding:20rpx 0; height:100vh;">
		<view class="lay_group">
			<view class="lay_row">
				<view class="lay_row_test">收款平台</view>
				<text class="lay_row_info" selectable="true">{{recharge.platform}}</text>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">收款金额</view>
				<text class="lay_row_info" selectable="true">{{recharge.money}}</text>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">订单号</view>
				<text class="lay_row_info" selectable="true">{{recharge.sn}}</text>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">收款人</view>
				<text class="lay_row_info" selectable="true">{{recharge.owner}}</text>
			</view>
			
			<view class="lay_row">
				<view class="lay_row_test">收款账号</view>
				<text class="lay_row_info" selectable="true">{{recharge.account}}</text>
			</view>
			<view class="lay_row" v-if="recharge.bankBranch != ''">
				<view class="lay_row_test">开户支行</view>
				<text class="lay_row_info" selectable="true">{{recharge.bankBranch}}</text>
			</view>
		</view>
		
		<view class="lay_test" style="color: #dc3b40;">
			请备份订单号，填入进您的汇款备注栏。长按可复制信息
		</view>
		
		<view class="lay_test" style="color: #dc3b40;">
			上传付款成功截图可以减少您的到账时间
		</view>
		
		<view class="lay_oper">
			<view class="lay_title">
				<view class="oper_test">付款成功截图：</view>
				<view class="tui-box-upload">
					<tui-upload :serverUrl="serverUrl" @complete="result" @remove="remove" :limit="1"></tui-upload>
				</view>
			</view>
				
			
			<view class="lay_btn btn_style">
				<!-- <button type="default" @tap="payConfirm" hover-class="btn_hover">上传截图</button> -->
				<button type="default" @tap="pay" hover-class="btn_hover">确认支付</button>
			</view>
		</view>
		
		
		<view class="lay_qrCode" v-if="recharge.imgUrl">
			<image :src="recharge.imgUrl" mode="" @tap="checkImg"></image>
		</view>
	</view>
</template>

<script>
import tran from "@/common/tran.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
import storage from "@/api/storage.js";
import tuiUpload from "@/components/tui-upload/tui-upload.vue";
export default{
	components:{
		tuiUpload
	},
	data() {
		return {
			recharge: "", //申请充值返回信息
			wayId: null,  //渠道id
			uid: "",  //用户id
			desc: "",  //备注
			serverUrl: "",   //上传地址
			imageData: "",   //上传图片地址
		}
	},
	onLoad(res) {
		this.desc = res.desc;
		this.recharge = tran.url2Obj(res.rechargeAccountEn);  //获取充值信息
		this.wayId = parseInt(res.wayId);  //获取渠道id
		this.uid = storage.getUid();  //获取uid
		this.serverUrl = api.getFileUrl();	//获取上传图片地址
	},
	methods:{
		result: function(e) {
			console.log(e);
			//上传状态：1-上传成功 2-上传中 3-上传失败
			if(e.status == 1) 
				this.imageData = e.imgArr[0];  //上传成功状态获取图片路径
			else 
				this.imageData = "";  //上传失败、上传中状态清空图片路径
			console.log(this.imageData);
		},
		remove: function(e) {
			//移除图片
			this.imageData = "";	//清理数据
			console.log(this.imageData);
		},
		
		//查看图片
		checkImg(){
			uni.previewImage({
				urls: [this.recharge.imgUrl]
			});
		},
		//提交充值审核
		pay(){
			//付款成功截图为空
			if(this.imageData == undefined || util.isEmpty(this.imageData)){
				uni.showModal({
					content: "请上传付款成功截图",
					showCancel: false
				});
				return;
			}
			this.payConfirm();  //提交充值信息
		},
		//提交
		payConfirm(){
			console.log(this.imageData);
			let _this = this;
			uni.showModal({
				content: "确认支付",
				success: function (res) {
				    if (res.confirm) {
				        api.rechargePut({
							id: _this.recharge.id,
							uid: _this.uid,
							desc: _this.desc,
							finishUrl: _this.imageData
						}, (res)=>{
							let code = api.getCode(res);
							if(code == 0){
								uni.showModal({
									content: "您的充值申请已提交！将尽快为您确认到账",
									showCancel: false,
									success(res) {
										if(res.confirm){
											// uni.reLaunch({
											//     url: '/pages/my/my'
											// });
											uni.navigateTo({
												url: "/pages/my/detailed/detailed?type=recharge"
											})
										}
									}
								});
							}else {
								let msg = api.getMsg(res);
								uni.showModal({
									content: msg,
									showCancel: false
								});
							}
						});
				    } else if (res.cancel) {
				        console.log('用户点击取消');
				    }
				}
			})
		},
	}
}
</script>

<style>
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
	.lay_row_info{
		display:inline-block;
		padding-right:40rpx;
		box-sizing:border-box;
		flex: 1;
		text-align: right;
		color:#1d93d8;
		text-decoration:underline;
	}
	.lay_test{
		width:100%;
		text-align:center;
		font-size:14px;
	}
	.lay_test>text{
		color:#dc3b40;
	}
	
	
	
	.lay_oper{
		width:100%;
		display:flex;
		justify-content:space-between;
		padding:0 80rpx;
		box-sizing:border-box;
		margin-top:20rpx;
		align-items:center;
	}
	.lay_btn{
		display:flex;
		flex: 1;
		align-items:center;
	}
	.lay_btn>button{
		font-size:14px;
		width:70%;
	}
	.lay_title{
		display:flex;
		flex-direction: column;
		justify-content:center;
		align-items:center;
	}	
	.tui-box-upload {
		margin-top:20rpx;
	}
	.oper_test{
		font-size:14px;
	}
	
	.lay_qrCode{
		width:200rpx;
		height:200rpx;
		margin:100rpx auto 0;
	}
</style>
