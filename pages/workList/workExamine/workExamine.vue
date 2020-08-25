<template>
	<view class="content2">
		<view class="lay_info">
			<view class="lay_head">
				<view class="lay_head_left">
					<view class="lay_img">
						<image :src="workInfo.imgUrl == ' ' || workInfo.imgUrl == ''? '/static/img/work_img.png' : workInfo.imgUrl" mode=""></image>
					</view>
					<view class="" style="line-height:1.5;">
						<view class="">
							接受者：<text class="style_info">{{workInfo.doneUid}}</text>
						</view>
						<view class="" style="font-size:14px;">
							状&nbsp;&nbsp;&nbsp;&nbsp;态：
							<text  class="state_fail" v-if="workInfo.state == 0">进行中</text>
							<text  class="state_proceed" v-if="workInfo.state == 1">未审核</text>
							<text  class="state_sucess" v-if="workInfo.state == 2">已完成</text>
							<text  class="state_fail" v-if="workInfo.state == 3">任务失败</text>
							<text  class="state_fail" v-if="workInfo.state == 10">任务取消</text>
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
				<text v-if="workInfo.type == 4"  class="style_info">点赞</text>
			</view>
			
			<view class="">
				接受时间：<text class="style_info">{{workInfo.receiveTime}}</text>
			</view>
			
			<view class="">
				完成时间：<text class="style_info">{{workInfo.finishTime}}</text>
			</view>
						
			<view class="">
				审核限时：<text class="style_info">{{auditLong}}</text>
			</view>
		</view>
		
		<view class="lay_line"></view>
		
		<view class="lay_operation">
			<view class="lay_title">
				<view class="">任务说明</view>
				<view class="lay_explain"><text>{{workInfo.explain}}</text></view>
			</view>
			
			<view class="lay_title" v-if="workInfo.taskTxt != ''">
				<view class="">复制文案</view>
				<view class="lay_explain" style="display: flex; align-items: center;">
					<text>{{workInfo.taskTxt}}</text>
<!-- 					<view class="btn_style copy_btn">
						<button type="default" hover-class="btn_hover" @tap="copy">复制</button>
					</view> -->
				</view>
			</view>
			
			<view class="lay_title" v-if="workInfo.taskImg != ''">
				<view class="">下载图片</view>
				<view class="lay_explain" style="display: flex; align-items: center; text-indent: 0em;">
					<view class="" @tap="imgCheck" style="width:120rpx; height:120rpx;">
						<image :src="workInfo.taskImg" mode=""></image>
					</view>
<!-- 					<view class="btn_style copy_btn">
						<button type="default" hover-class="btn_hover" @tap="imgDownload">下载图片</button>
					</view> -->
				</view>
			</view>
			
			<view class="lay_title">
				<view class="">提交任务是否需要凭证</view>
				<view class="lay_explain">
					<view class="" v-if="workInfo.isDoneProve == 0" style="margin-bottom:10rpx;">
						<text class="lay_head_right">*</text><text>提交任务不需要凭证</text>
					</view>
					
					<view class="" v-if="workInfo.isDoneProve == 1" style="margin-bottom:10rpx;">
						<text class="lay_head_right">*</text><text>提交任务需要凭证</text>
					</view>
				</view>
			</view>
			
			<view class="lay_title">
				<view class="">提交任务是否需要截图</view>
				<view class="lay_explain">
					<view class="" v-if="workInfo.isDoneImg == 0">
						<text class="lay_head_right">*</text><text>提交任务不需要截图</text>
					</view>
					
					<view class="" v-if="workInfo.isDoneImg == 1">
						<text class="lay_head_right">*</text><text>提交任务需要截图</text>
					</view>
				</view>
			</view>
			
			<view class="lay_title lay_userName" v-if="workInfo.isDoneProve == 1">
				<view class="">完成凭证：</view>
				<text>{{workInfo.doneProve}}</text>
			</view>
			
			<view class="lay_title" v-if="workInfo.isDoneImg == 1">
				<view class="">完成截图：</view>
				<view class="lay_doneImg" @tap="revise">
					<image :src="workInfo.doneImg" mode=""></image>
				</view>
			</view>
			
			<view class="lay_title" v-if="workInfo.state == 1">
				倒计时：<text class="lay_head_right">{{counDown}}</text>
			</view>
			
			<view class="lay_button btn_style">
				<button type="default" hover-class="btn_hover" @tap="openUrl" v-if="workInfo.taskUrl != ''">打开链接</button>
				<button type="default" hover-class="btn_hover" @tap="taskExamine(2)" v-if="workInfo.state == 1">任务成功</button>
				<button type="default" hover-class="btn_hover" @tap="taskExamine(3)" v-if="workInfo.state == 1">任务失败</button>
			</view>
		</view>
	</view>
</template>

<script>
import tran from "@/common/tran.js";
import tuiUpload from "@/components/tui-upload/tui-upload.vue";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import time from "@/common/time.js";
import util from "@/common/util.js";
export default{
	components:{
		tuiUpload
	},
	data() {
		return {
			workInfo: "",  //任务信息
			userName: "",  //输入的账号名
			id: null,  //任务id
			uid: "",
			
			counDown: "",  //倒计时显示
			receiveTimeStamp: null,//接受任务时间戳(倒计时用)
			doneLongTimeStamp: null,//限时时间(秒)转时间戳(倒计时用)
			setIntervalId: '',  //计时器id
			
			auditLong: null,  //限时审核时间
			
			imageData: [],
			//上传地址
			serverUrl: "",
			
			url: "",  //打开的外部链接
		}
	},
	onLoad(res) {
		this.uid = storage.getUid();  //获取uid
		this.id = parseInt(res.id);  //获取任务id
		this.getTaskDetails(); 	// 查询任务完成情况
		this.serverUrl = api.getFileUrl();
	},
	methods:{
		//打开链接
		openUrl(){
			util.openUrl(this.workInfo.taskUrl);
		},
		//查看下载图片
		imgCheck(){
			uni.previewImage({
				urls: [this.workInfo.taskImg],
			});
		},
		//查看截图凭证
		revise(){
			uni.previewImage({
				urls: [this.workInfo.doneImg],
			});
		},
		// 查询任务完成情况
		getTaskDetails(){
			api.getTaskDetails({page: 1, count: 5, id: this.id}, (res)=>{
				let data = api.getData(res).data[0];
				this.workInfo = data;
				console.log(this.workInfo);
				this.getWorkInfo();  //处理任务数据
				this.getCount();  //获取倒计时
			});
		},
		//获取倒计时
		getCount(){
			//获取倒计时
			this.receiveTimeStamp = Date.parse(new Date(this.workInfo.finishTime));  //获取接受任务时间戳
			this.doneLongTimeStamp = this.workInfo.doneLong*1000;   //限时时间(秒)转时间戳
			this.setIntervalId = setInterval(this.counDownTimeOut, 1000);  //获取计时器id
		},
		//倒计时计时器
		counDownTimeOut(){
			let counDown = this.doneLongTimeStamp - (Date.parse(new Date()) - this.receiveTimeStamp);  //获取时间差

			if(counDown < 0){
				this.counDown = '审核超时';
				clearInterval(this.setIntervalId);  //清除定时器
				return;
			}
			this.counDown = time.toHHmmss(counDown);  //时间戳转换时分秒
		},
		//处理任务数据
		getWorkInfo(){
			//获取限时审核时间
			let auditLongSecond = this.workInfo.auditLong;
			let auditLong = time.timeChange(auditLongSecond);
			this.auditLong = auditLong;
		},
		result: function(e) {
			this.imageData = e.imgArr;
		},
		remove: function(e) {
			//移除图片
			// let index = e.index
		},
		
		
		//任务审核 state 2:任务成功 3:任务失败
		taskExamine(state){
			let _this = this;
			let content = "";
			if(state == 2) content = "成功";
			if(state == 3) content = "失败";
			uni.showModal({
				content: "确定审核任务为" + content + "?",
				success(res) {
					if(res.confirm){
						api.auditTaskDetails({id: _this.id, uid: _this.uid, state: state}, (res)=>{
							let code = api.getCode(res);
							if(code == 0){
								uni.showToast({
									title: "审核成功",
									icon: "none"
								});
								setTimeout(()=>{
									uni.navigateBack({
										delta: 1
									})
								},1000)
							}else{
								let msg = api.getMsg(res);
								uni.showToast({
									title: msg,
									icon: "none"
								});
							}
						});
					}
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
	
	.tui-box-upload {
		margin-top:20rpx;
	}
	.lay_doneImg{
		width:120rpx;
		height:120rpx;
		margin-top:20rpx;
	}
	
	.copy_btn{
			margin-left:40rpx;
		}
		.copy_btn>button{
			padding:0 18rpx;
			box-sizing:border-box;
			font-size:12px;
			line-height:2.2;
			text-indent: 0em;
			color:#fff;
	/* 		background-color:transparent;
			border: 1px solid #464646; */
		}
</style>

