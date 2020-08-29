<template>
	<view class="container" style="background-color: #fff;font-size:14px;">
		<view class="introduce" v-for="(item,index) in guideList" :key="index">
			<view class="" style="font-weight:bold;">{{item.title}}</view>
			<view class="">
				<p style="white-space: pre-wrap;" v-html="item.content"></p>
			</view>
		</view>
		
		<view class="company_img">
			<image src="/static/img/gs.png" mode=""></image>
		</view>
	</view>
</template>

<script>
import api from "@/api/api.js";
export default{
	data() {
		return {
			guideList: [],  //列表
		}
	},
	onShow() {
		this.getInformation();  //列表
	},
	methods:{
		getInformation(){
			api.getInformation({type: 7, page: 1, count: 99}, (res)=>{
				let data = api.getData(res).data;
				this.guideList = data;
			});
		},
	}
	
}
</script>

<style>
	.container{
		margin-top:20rpx;
		padding:0 40rpx;
		box-sizing:border-box;
	}
	.container>view{
		margin-bottom:40rpx;
	}
	.introduce>view{
		margin-bottom:10rpx;
	}
	.company_img{
		width:100%;
		height:800rpx;
	}
</style>
