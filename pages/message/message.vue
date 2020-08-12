<template>
	<view class="">
		<!-- 功能栏 -->
		<view class=" func">			
			<button class="setting" hover-class="setting_hover" type="default" style="line-height: 1.8;"
			v-for="(item, index) in msgList" :key="index"
			@tap="toMsgDetails(item)">
				<view class="func_left">
					<text class="func_test">{{item.title}}</text>
					<text v-if="item.type == 0" class="tips">(官方)</text>
					<view class="tui-badge-box" v-if="item.isRead == 0">
						<tui-badge :scaleRatio="1.2" type="danger" dot absolute top="50%" style="left:0; transform: translateY(-50%);"></tui-badge>
					</view>
				</view>
				
				<view class="func_right">
					<view class="">{{item.addTime}}</view>
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
			msgList: [],    //公告列表
		}
	},
	onShow() {
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();
		this.getMsgList();  //获取站内信列表
	},
	methods:{
		//获取公告列表
		getMsgList(){
			let data = {
				page: 1,
				count: 10,
				uid: this.uid
			};
			api.getMssage(data, (res)=>{
				let data = api.getData(res).data;
				this.msgList = data;
			});
		},
		toMsgDetails(item){
			//设置消息已读
			api.readMsg({uid: this.uid, id: item.id}, (res)=>{
				uni.navigateTo({
					url: "/pages/message/messageDetails/messageDetails?title=" + item.title + "&type=" + item.type
				})
			});
		},
	}
}
</script>

<style>
	.func>button{
		background-color:#fff;
		padding:0rpx 40rpx;
		box-sizing:border-box;
		border-radius:0;
	}
	.func_left{
		font-size:15px;
		display:flex;
		align-items:center;
		position:relative;
		padding-left:10rpx;
		box-sizing:border-box;
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
	.tips{
		font-size:12px;
		display:inline-block;
		margin-left:10rpx;
	}
	.tui-badge-box{
		font-size:12px;
	}
</style>


