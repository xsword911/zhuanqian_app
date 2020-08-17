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
							发布者：<text>{{workInfo.uid}}</text>
						</view>
						<view class="lay_time" v-if="taskType == 1">
							开始时间：<text>{{workInfo.begTime}}</text>
						</view>
						<view class="lay_time" v-if="taskType == 2">
							接受时间：<text>{{workInfo.receiveTime}}</text>
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
			
			<view class="" v-if="taskType == 1">
				任务完成剩余量：<text class="style_info">{{workInfo.sum}}</text>
			</view>
			
			<view class="">
				结束时间：<text class="style_info">{{workInfo.endTime}}</text>
			</view>
			
			<view class="">
				限时审核：<text class="style_info">{{auditLong}}</text>
			</view>
		</view>
		
		<view class="lay_line"></view>
		
		<view class="lay_operation">
			<view class="lay_title">
				<view class="">任务说明</view>
				<view class="lay_explain"><text>{{workInfo.explain}}</text></view>
			</view>
			
			<view class="lay_title" v-if="workInfo.isDoneProve == 0 || workInfo.isDoneImg == 1">
				<view class="">任务规则</view>
				<view class="lay_explain">
					<view class="" v-if="workInfo.isDoneProve == 0" style="margin-bottom:10rpx;">
						<text class="lay_head_right">*</text><text>任务不需要凭证</text>
					</view>
					<view class="" v-if="workInfo.isDoneImg == 0">
						<text class="lay_head_right">*</text><text>任务不需要截图</text>
					</view>
				</view>
			</view>
			
			<view class="lay_title lay_userName" v-if="workInfo.isDoneProve == 1">
				<view class="">个人账户：</view>
				<input type="text" value="12" v-model="userName"/>
			</view>
			
			<view class="lay_title" v-if="workInfo.isDoneImg == 1">
				<view class="">截图凭证：</view>
				<view class="tui-box-upload">
					<tui-upload :serverUrl="serverUrl" @complete="result" @remove="remove"></tui-upload>
				</view>
			</view>
			
			<view class="lay_title">
				倒计时：<text class="lay_head_right">{{counDown}}</text>
			</view>
			
			<view class="lay_button btn_style">
				<button type="default" hover-class="btn_hover" v-if="taskType == 1" @tap="acceptTask">接受任务</button>
				<button type="default" hover-class="btn_hover" v-if="taskType == 2" @tap="giveUpTask">放弃任务</button>
				<button type="default" hover-class="btn_hover" v-if="taskType == 2" @tap="submitTask">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
import tran from "@/common/tran.js";
import tuiUpload from "@/components/tui-upload/tui-upload.vue";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
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
			taskType: null, 
			counDown: "",  //倒计时
			auditLong: null,  //限时审核时间
			
			imageData: [],
			//上传地址
			serverUrl: ""
		}
	},
	onLoad(res) {
		this.uid = storage.getUid();  //获取uid
		this.id = parseInt(res.id);
		// res.type  1:查看任务列表 2:查看我接受的任务
		this.taskType = parseInt(res.type);
		if(this.taskType == 1) this.getTask(); 	// 查询任务
		if(this.taskType == 2) this.getTaskDetails(); 	// 查询任务完成情况
		this.serverUrl = api.getFileUrl();
	},
	methods:{
		//查询任务
		getTask(){
			api.getTaskInfo({page: 1, count: 5, id: this.id}, (res)=>{
				let data = api.getData(res).data[0];
				this.workInfo = data;
				this.getWorkInfo();  //处理任务数据
			});
		},
		// 查询任务完成情况
		getTaskDetails(){
			api.getTaskDetails({page: 1, count: 5, id: this.id}, (res)=>{
				let data = api.getData(res).data[0];
				this.workInfo = data;
				this.getWorkInfo();  //处理任务数据
			});
		},
		//处理任务数据
		getWorkInfo(){
			//获取倒计时
			let doneLongSecond = this.workInfo.doneLong;
			let hour = parseInt(doneLongSecond / 3600);
			let min = parseInt([doneLongSecond - (hour * 3600)] / 60);
			let second = parseInt(doneLongSecond - [(hour * 3600) + (min * 60)]);
			this.counDown = `${hour}小时${min}分${second}秒`;
			
			//获取限时审核时间
			let auditLongSecond = this.workInfo.auditLong;
			let auditLongHour = parseInt(auditLongSecond / 3600);
			
			let auditLongMin = parseInt([auditLongSecond - (auditLongHour * 3600)] / 60);
			
			let auditLongSe = parseInt(auditLongSecond - [(auditLongHour * 3600) + (auditLongMin * 60)]);
			
			this.auditLong = `${auditLongHour}小时${auditLongMin}分${auditLongSe}秒`;
		},
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
			let _this = this;
			uni.showModal({
				content: "确定接受该任务?",
				success(res) {
					if(res.confirm){
						api.receiveTask({taskId: _this.workInfo.id, doneUid: _this.uid}, (res)=>{
							let code = api.getCode(res);
							if(code == 0){
								uni.showToast({
									title: "接受任务成功",
									icon: "none"
								});
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
		//放弃任务
		giveUpTask(){
			let _this = this;
			uni.showModal({
				content: "确定放弃该任务?",
				success(res) {
					if(res.confirm){
						api.cancelTask({id: _this.workInfo.id, doneUid: _this.uid}, (res)=>{
							let code = api.getCode(res);
							if(code == 0){
								uni.showToast({
									title: "放弃任务成功",
									icon: "none"
								});
								setTimeout(function(){
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
		//提交任务
		submitTask(){
			let _this = this;
			uni.showModal({
				content: "确定提交该任务?",
				success(res) {
					if(res.confirm){
						let data = {
							id: _this.id,
							doneUid: _this.uid
						};
						if(!util.isEmpty(_this.userName)) data.doneProv = _this.userName;
						api.submitTask(data, (res)=>{
							let code = api.getCode(res);
							if(code == 0){
								uni.showToast({
									title: "提交任务成功",
									icon: "none"
								});
								setTimeout(function(){
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
</style>
