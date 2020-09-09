<template>
	<view class="content">
		<view class="lay_title">
			{{noticeEn.title}}
		</view>
		<view class="lay_content">
			{{noticeEn.content}}
		</view>
		<view class="lay_time">
			{{noticeEn.updTime}}
		</view>
		
		<view class="btn btn_style" v-show="noticeEn.toUrl != ''">
			<button type="default" hover-class="btn_hover" @tap="toNoticeUrl">打开链接</button>
		</view>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
import str from "@/common/str.js";
export default{
	data() {
		return {
			noticeEn: [],    //公告列表
			title: "",  //公告标题
		}
	},
	onLoad(res) {
		this.title = res.title;
		this.getNoticeList();  //获取公告列表
	},
	methods:{
		//公告外部链接跳转
		toNoticeUrl(){
			//跳转地址包含http就跳转
			if(str.contains(this.noticeEn.toUrl, "http")) util.openUrl(this.noticeEn.toUrl);
		},
		//获取公告列表
		getNoticeList(){
			let data = {
				type: 2, 
				state: 1,
				page: 1,
				count: 10,
				title: this.title
			};
			api.getNotice(data, (res)=>{
				let data = api.getData(res).data;
				this.noticeEn = data[0];
				console.log(this.noticeEn);
			});
		},
	}
}
</script>

<style>
	.lay_title{
		padding-top:40rpx;
		box-sizing:border-box;
		text-align:center;
		font-size:18px;
	}
	.lay_time{
		padding-top:20rpx;
		text-align:right;
		font-size:14px;
		color:#808080;
	}
	.lay_content{
		margin-top:60rpx;
		padding:0 20rpx;
		box-sizing:border-box;
	}
	.btn{
		margin-top:40rpx;
	}
	.btn>button{
		width:40%;
		font-size:14px;
		padding:0;
	}
</style>
