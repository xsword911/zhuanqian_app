<template>
	<view class="content">
		<view class="lay_title">
			{{msgEn.title}}
		</view>
		<view class="lay_content">
			{{msgEn.content}}
		</view>
		<view class="lay_time">
			{{name}}
		</view>
		<view class="lay_time">
			{{msgEn.addTime}}
		</view>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
export default{
	data() {
		return {
			msgEn: [],    //站内信列表
			title: "",  //站内信标题
			type: "",  //站内信类型
			userUid: "",  //对方uid
			userEn: [],  //对方的信息
			name: "",  //对方的名称
		}
	},
	onLoad(res) {
		this.title = res.title;
		this.type = res.type;
		this.getMsgList();  //获取站内信列表
	},
	methods:{
		//获取站内信列表
		getMsgList(){
			let data = {
				type: this.type, 
				page: 1,
				count: 10,
				title: this.title
			};
			api.getMssage(data, (res)=>{
				let data = api.getData(res).data;
				this.msgEn = data[0];
				this.userUid = this.msgEn.to;
				this.getUser();  //获取对方信息
			});
		},
		//获取对方信息
		getUser(){
			api.getUserByUid({uid: this.userUid}, (res)=>{
				let data = api.getData(res);
				//优先显示微信id
				if(!util.isEmpty(data.wxId)) this.name = data.wxId;
				else if(!util.isEmpty(data.account)) this.name = data.account;
				else this.name = data.uid;
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
</style>

