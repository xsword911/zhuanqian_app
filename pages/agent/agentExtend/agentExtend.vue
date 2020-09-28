<template>
	<view class="content2">
		<view class="" v-if="isShowQrcode == 1">
			<view class="canvas">
				<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
				<view class="">
					<view class="lay_test">下载链接</view>
					<text selectable="true">{{registerUrl}}</text>
					
					<view class="lay_test">我的邀请码：<text style="font-weight:bold;" selectable="true">{{code}}</text></view>
				</view>
			</view>
<!-- 			<view class="lay_tips">
				通过二维码、注册链接、邀请码注册的用户将自动成为您的下级用户。
			</view> -->
			<view class="lay_tips">
				注册时填入您邀请码的用户，将自动成为您的下级用户。
			</view>
<!-- 			<view class="image">
				<image :src="qrcodeSrc" />
				<text>image</text>
			</view> -->
		</view>
		
		
		<view class="data_lack" v-if="isShowQrcode == 0">
			<view class="lack_box">
				<tui-icon name="nodata" :size="120"></tui-icon>
				<text class="lack_test">您还没有邀请下级的权限</text>
				<view class="lack_test">
					联系客服获取您的专属邀请码
				</view>
				<view class="btn_style">
					<button type="default" class="coin_query" hover-class="btn_hover" @tap="toService">联系客服</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import uQRCode from '@/common/uqrcode.js';
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import util from "@/common/util.js";
export default{
	data() {
		return {
			uid: "",  //uid
			userEn: [],  //我的信息
			qrcodeText: '',
			qrcodeSize: uni.upx2px(590),
			registerUrl: '', //注册推广url
			code: null,  //我的邀请码
			// qrcodeSrc: ''
			isShowQrcode: 2,  //是否显示邀请码 0关闭 1显示 2请求中
		}
	},
	onShow() {
		this.uid = storage.getUid();  //获取uid
		this.code = storage.getMyInfo().code;
		if(util.isEmpty(this.code)) this.isShowQrcode = 0;
		else {
			this.isShowQrcode = 1;
			this.getRegUrl();	   //获取推广注册url
		}
	},
	methods: {
		//获取推广注册url
		getRegUrl(){
			api.getConfig({key: "registerUrl", page: 1, count: 1}, (res)=>{
				let data = api.getData(res).data[0];
				this.registerUrl = data.value + "?code=" + this.code;
				this.make();  //生成注册推广二维码
			});
		},
		//生成注册推广二维码
		make() {
			uni.showLoading({
				title: '二维码生成中',
				mask: true
			});
			uQRCode.make({
				canvasId: 'qrcode',
				text: this.registerUrl,
				size: this.qrcodeSize,
				margin: 50,
				success: res => {
					// this.qrcodeSrc = res
				},
				complete: () => {
					uni.hideLoading()
				}
			})
		},
		//跳转到联系客服
		toService(){
			uni.reLaunch({
				url: "/pages/service/service"
			});
		},
	}
}
</script>

<style>
	.content2{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: var(--status-bar-height);
	}
	.canvas {
		text-align: left;
		font-size:16px;
	}
	
	.canvas canvas {
		margin: 0 auto;
	}
	.canvas>view{
		padding:0 60rpx;
		box-sizing:border-box;
	}
	.image {
		width: 354rpx;
		margin-top: 50rpx;
		text-align: center;
	}
	.image image {
		display: block;
		width: 354rpx;
		height: 354rpx;
	}
	.lay_test{
		margin:60rpx 0 10rpx;
		font-size:14px;
	}
	.lay_tips{
		margin-top:60rpx;
		font-size:14px;
		padding:0 60rpx;
		box-sizing:border-box;
		color: #dc3b40;
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
	
	.necessary{
		color:#D91D37;
		font-weight:bold;
	}
</style>
