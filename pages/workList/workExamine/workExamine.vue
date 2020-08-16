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
							接受者：<text>{{workInfo.doneUid}}</text>
						</view>
						<view class="lay_time">
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
			
			<view class="">
				任务状态：
				<text v-if="workInfo.state == 0">进行中</text>
				<text v-if="workInfo.state == 1">未审核</text>
				<text v-if="workInfo.state == 2">已完成</text>
				<text v-if="workInfo.state == 3">任务失败</text>
				<text v-if="workInfo.state == 10">任务取消</text>
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
				<button type="default" hover-class="btn_hover" @tap="taskExamine(2)">任务成功</button>
				<button type="default" hover-class="btn_hover" @tap="taskExamine(3)">任务失败</button>
			</view>
		</view>
	</view>
</template>

<script>
import tran from "@/common/tran.js";
import tuiUpload from "@/components/tui-upload/tui-upload.vue";
import api from "@/api/api.js";
import storage from "@/api/storage.js";
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
			counDown: "",  //倒计时
			auditLong: null,  //限时审核时间
			
			imageData: [],
			//上传地址
			serverUrl: ""
		}
	},
	onLoad(res) {
		this.uid = storage.getUid();  //获取uid
		this.id = parseInt(res.id);  //获取任务id
		this.getTaskDetails(); 	// 查询任务完成情况
		this.serverUrl = api.getFileUrl();
	},
	methods:{
		// 查询任务完成情况
		getTaskDetails(){
			api.getTaskDetails({page: 1, count: 5, id: this.id}, (res)=>{
				let data = api.getData(res).data[0];
				this.workInfo = data;
				this.getWorkInfo();  //处理任务数据
				console.log(this.workInfo);
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

