<template>
	<view class="">
		<!-- 功能栏 -->
		<view class=" func" v-show="isShow == 1">			
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
		
		<view class="data_lack" v-show="isShow == 2">
			<view class="lack_box btn_style">
				<tui-icon name="nodata" :size="120"></tui-icon>
				<text class="lack_test">暂无数据</text>
			</view>
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
			isShow: 0,  //是否显示列表  0正在请求 1显示 2不显示
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
				if(util.isEmpty(data)) this.isShow = 2;
				else{
					this.noticeList = data;
					this.isShow = 1;
				}
				
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
</style>

