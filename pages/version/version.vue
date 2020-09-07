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
				<view class="">版本更新（最新版本号：{{newVer}}）</view>
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
import util from "@/common/util.js";
export default{
	data() {
		return {
			appName: '',
			version: '',  //版本号
			isUpdate: false,  //是否有最新版本
			newVer: '',  //最新版本号
		}
	},
	onShow() {
		this.getAppConfig();  //获取app配置
		this.getVersion();  //获取当前版本号
		this.getNewVer();  //获取最新版本号
	},
	methods:{
		//返回当前平台版本号的key
		getVerKey(){
			switch(uni.getSystemInfoSync().platform){
			    case 'android':
			       return 'android_ver';
			       break;
			    case 'ios':
			       return 'ios_ver';
			       break;
			    default:
			       return 'android_ver';
			       break;
			}
		},
		//更新
		toUpdate(){
			//获取下载app地址
			api.getConfig({key: 'app_download_url'}, (res)=>{
				this.downloadUrl = api.getData(res).data[0].value;  //获取app更新地址
				util.openUrl(this.downloadUrl);  //跳转到app更新地址
				this.isUpdate = false;    //隐藏去更新按钮
			});
		},
		//获取最新版本号
		getNewVer(){
			let verKey = this.getVerKey();  //获取当前平台版本号的key
			api.getConfig({key: verKey}, (res)=>{
				this.newVer = api.getData(res).data[0].value;
			});
		},
		//检查更新版本号
		checkUpdate(){
			if(this.version < this.newVer){
				let _this = this;
				uni.showModal({
					content: "当前有更新版本",
					showCancel:false,
					success(res) {
						if(res.confirm) _this.isUpdate = true;
					}
				});
			}
			else {
				uni.showModal({
					content: "当前已是最新版本",
					showCancel:false
				});
			}
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
