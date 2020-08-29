<template>
	<view class="container" style="background-color: #fff;font-size:14px;">
		<view class="" v-for="(item,index) in guideList" :key="index">
			<view class="question">{{item.title}}</view>
			<view class="answer">
				<p style="white-space: pre-wrap;" v-html="item.content"></p>
			</view>
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
			api.getInformation({type: 4, page: 1, count: 99}, (res)=>{
				let data = api.getData(res).data;
				this.guideList = data;
			});
		},
	}
	
}
</script>

<style>
	.question{
		color: #9b59b6;
	}
	.container{
		margin-top:60rpx;
	}
	.container>view{
		margin-bottom:40rpx;
	}
</style>
