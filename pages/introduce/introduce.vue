<template>
	<view class="container" style="background-color: #fff;font-size:16px;">
		<view class=""  v-for="(item,index) in guideList" :key="index">
			{{item.title}}
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
			api.getInformation({type: 5, page: 1, count: 99}, (res)=>{
				let data = api.getData(res).data;
				this.guideList = data;
			});
		},
	}
	
}
</script>

<style>
	.container{
		margin-top:0rpx;
		color: #2980B9;
		font-weight:bold;
		padding:40rpx;
		box-sizing:border-box;
	}
	.container>view{
		margin-bottom:40rpx;
	}
</style>
