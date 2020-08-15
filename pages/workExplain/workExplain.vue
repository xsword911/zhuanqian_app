<template>
	<view class="content2">
		<view class="lay_info">
			<view class="lay_head">
				<view class="lay_head_left">
					<view class="lay_img">
						<image :src="workInfo.imgUrl == ''? '/static/img/work_img.png' : workInfo.imgUrl" mode=""></image>
					</view>
					<view class="" style="line-height:1.5;">
						<view class="">
							发布者：<text>{{workInfo.admin}}</text>
						</view>
						<view class="lay_time">
							开始时间：<text>{{workInfo.begTime}}</text>
						</view>
					</view>
				</view>
				<view class="lay_head_right">
					<text class="lay_award">{{workInfo.award}}</text>金币
				</view>
			</view>
			
			<view class="">
				任务标题：<text class="style_info">{{workInfo.title}}</text>
			</view>
			
			<view class="">
				任务类型：
				<text v-if="workInfo.type == 0"  class="style_info">邀请好友</text>
				<text v-if="workInfo.type == 1"  class="style_info">分享朋友圈</text>
				<text v-if="workInfo.type == 2"  class="style_info">加好友</text>
				<text v-if="workInfo.type == 3"  class="style_info">下载app</text>
				<text v-if="workInfo.type == 4"  class="style_info">签到</text>
			</view>
			
			<view class="">
				结束时间：<text class="style_info">{{workInfo.endTime}}</text>
			</view>
		</view>
		
		<view class="lay_line"></view>
		
		<view class="lay_operation">
			<view class="lay_title">
				<view class="">任务说明</view>
				<view class="lay_explain"><text>{{workInfo.explain}}</text></view>
			</view>
			
			<view class="lay_title">
				<view class="">任务规则</view>
				<view class="lay_explain"><text>{{workInfo.rule}}</text></view>
			</view>
			
			<view class="lay_title lay_userName">
				<view class="">个人账户：</view>
				<input type="text" value="12" v-model="userName"/>
			</view>
			
			<view class="lay_title">
				<view class="">截图凭证：</view>
				<view class="tui-box-upload">
					<tui-upload :serverUrl="serverUrl" @complete="result" @remove="remove"></tui-upload>
				</view>
			</view>
			
			<view class="lay_title">
				倒计时：<text class="lay_head_right">00小时07分58秒</text>
			</view>
			
			<view class="lay_button">
				<button type="default" hover-class="btn_hover" v-show="!isReceiveTask" @tap="acceptTask">接受任务</button>
				<button type="default" hover-class="btn_hover" v-show="isReceiveTask" @tap="giveUpTask">放弃任务</button>
				<button type="default" hover-class="btn_hover" v-show="isReceiveTask && !isSubmit">提交</button>
				<button type="default" hover-class="btn_hover" v-show="isReceiveTask && isSubmit">领取奖励</button>
			</view>
		</view>
	</view>
</template>

<script>
import tran from "@/common/tran.js";
import tuiUpload from "@/components/tui-upload/tui-upload.vue";
import api from "@/api/api.js";
export default{
	components:{
		tuiUpload
	},
	data() {
		return {
			workInfo: "",  //任务信息
			userName: "",  //输入的账号名
			isReceiveTask: false,  //是否已接受任务
			isSubmit: false,  //是否已提交任务
			
			imageData: [],
			//上传地址
			serverUrl: ""
		}
	},
	onLoad(res) {
		this.workInfo = tran.url2Obj(res.data);
		this.serverUrl = api.getFileUrl();
	},
	methods:{
		result: function(e) {
			console.log(e)
			this.imageData = e.imgArr;
		},
		remove: function(e) {
			//移除图片
			// let index = e.index
		},
		
		
		//接受任务
		acceptTask(){
			uni.showModal({
				content: "确定接受该任务?",
				success(res) {
					if(res.confirm) this.isReceiveTask = true;
					this.$forceUpdate()
				}
			})
		},
		//放弃任务
		giveUpTask(){
			uni.showModal({
				content: "确定放弃该任务?",
				success(res) {
					if(res.confirm) this.isReceiveTask = false;
					this.$forceUpdate()
				}
			})
		},
	}
}
</script>

<style>
	.content2{
		font-size:15px;
	}
	.lay_img{
		width:80rpx;
		height:80rpx;
		margin-right:30rpx;
	}
	.lay_info, .lay_operation{
		padding:40rpx; 
		box-sizing:border-box;
	}
	.lay_info>view{
		margin-bottom:24rpx;
	}
	.lay_head{
		display:flex;
		align-items:center;
		justify-content:space-between;
		margin-bottom:;
	}
	.lay_head_left{
		padding:;
		display:flex;
		align-items:center;
		font-size:15px;
	}
	.lay_time{
		font-size:12px;
		color:#656565;
	}
	.lay_head_right{
		color:#FF4F1A;
		font-size:13px;
	}
	.lay_award{
		font-size:20px;
		display:inline-block;
		margin-right:4rpx;
	}
	.style_info{
		color:#656565;
		font-size:14px;
	}
	.lay_line{
		width:100%;
		height:5px;
		background-color:#F2F2F2;
	}
	.lay_title{
		margin-bottom:40rpx;
	}
	.lay_explain{
		font-size:13px;
		color:#656565;
		margin-top:20rpx;
		word-wrap:break-word;
		word-break: break-all;
		text-indent: 2em;
	}
	.lay_userName{
		display:flex;
		align-items:center;
	}
	.lay_userName>input{
		border-bottom:1px solid #000;
		padding-left:10rpx;
		box-sizing:border-box;
		color:#656565;
		font-size:14px;
	}
	.lay_button{
		display:flex;
	}
	.lay_button button{
		font-size:14px;
		color:#fff;
		width:30%;
		padding:5rpx 0;
	}
	..lay_button>button:nth-child(2){
		background-color:#B5B5B5;
	}
	.lay_button>button:nth-child(1), .lay_button>button:nth-child(3), .lay_button>button:nth-child(4){
		background-color:#fcd030;
	}
	
	.tui-box-upload {
		margin-top:20rpx;
	}
</style>
