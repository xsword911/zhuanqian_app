<template>
	<view class="">
		<view class="lay">
			<view class="logo_img">
				<image src="/static/img/logo.png" mode=""></image>
			</view>
			<view class="lay_name">{{appName}}</view>
			<view class="lay_ver">Version {{version}}</view>
		</view>
		
		<view class="lay_update">
			<view class="update_bar" @tap="checkUpdate">
				<view class="">版本更新</view>
				<tui-icon name="arrowright" :size="20"></tui-icon>
			</view>
		</view>
		
		<view class="update_btn btn_style" v-if="isUpdate">
			<button type="default" hover-class="btn_hover" @tap="toUpdate">去更新</button>
		</view>
	</view>
</template>

<script>
import api from "@/api/api.js";
import config from "@/static/app/config.js";
export default{
	data() {
		return {
			appName: '',
			version: '',  //版本号
			isUpdate: false,  //是否有最新版本
		}
	},
	onShow() {
		this.getAppConfig();  //获取app配置
		this.getVersion();  //获取当前版本号
	},
	methods:{
		//更新
		toUpdate(){
			this.isUpdate = false;
		},
		//检查更新版本号
		checkUpdate(){
			this.isUpdate = true;
		},
		//获取当前版本号
		getVersion(){
			this.version = config.version;
		},
		//获取app配置
		getAppConfig(){
			api.getConfig({key: 'app_name'}, (res)=>{
				this.appName = api.getData(res).data[0].value;
			});
		}
	}
}
</script>

<style>
	.lay{
		margin-top:200rpx;
		display:flex;
		justify-content:center;
		align-items:center;
		flex-direction: column;
	}
	.logo_img{
		width:180rpx;
		height:180rpx;
	}
	.lay_name{
		font-weight:bold;
		margin-top:40rpx;
		color:#F28776;
	}
	.lay_ver{
		margin-top:10rpx;
		font-size:16px;
	}
	.lay_update{
		margin-top:100rpx;
		padding:0 80rpx;
		box-sizing:border-box;
	}
	.update_bar{
		padding:20rpx;
		box-sizing:border-box;
		border-bottom:1px solid #e3e3e3;
		display: flex;
		justify-content: space-between;
		align-items:center;
		font-size:14px;
	}
	.update_btn{
		margin-top:100rpx;
	}
	.update_btn>button{
		font-size:14px;
		width:80%;
	}
</style>
