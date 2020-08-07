<template>
	<view class="">
		<!-- 功能栏 -->
		<view class=" func">			
			<button class="setting" hover-class="setting_hover" type="default" style="line-height: 1.8;"
			v-for="(item, index) in noticeList" :key="index"
			@tap="toNoticeDetails(item.title)">
				<view class="func_left">
					<text class="func_test">{{item.title}}</text>
				</view>
				
				<view class="func_right">
					<view class="">{{item.updTime}}</view>
					<tui-icon name="arrowright" :size="26"></tui-icon>
				</view>
			</button>
			
			
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
			userEn: [],  //我的信息
			uid: "",  //uid
			noticeList: [],    //公告列表
		}
	},
	onShow() {
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();
		this.getNoticeList();  //获取公告列表
	},
	methods:{
		//获取公告列表
		getNoticeList(){
			let data = {
				type: 2, 
				state: 1,
				page: 1,
				count: 10
			};
			api.getNotice(data, (res)=>{
				let data = api.getData(res).data;
				this.noticeList = data;
			});
		},
		//跳转到公告详情页
		toNoticeDetails(title){
			uni.navigateTo({
				url: "/pages/notice/noticeDetails/noticeDetails?title=" + title
			})
		},
	}
}
</script>

<style>
	.func>button{
		background-color:#fff;
		padding:20rpx 40rpx;
		box-sizing:border-box;
		border-radius:0;
	}
	.func_left{
		font-size:15px;
		display:flex;
		align-items:center;
	}
	.func_right{
		display:flex;
		align-items:center;
		color:#999999;
		font-size:12px;
	}
	.func_test{
		margin-left:12rpx;
	}
	.setting{
		display:flex;
		justify-content:space-between;
		/* margin-top:20rpx; */
		border-bottom:1px solid #f9f9f9;
		padding:10rpx 0;
		box-sizing:border-box;
	}
	.setting_hover[type = default]{
		background-color:#EEEEEE;
	}
</style>

