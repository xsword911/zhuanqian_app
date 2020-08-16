<template>
	<view class="container2">
		<form @submit="formSubmit" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务类型</view>
					<view class="uni-list-cell-db" style="margin-left:20rpx;" v-if="arrayType.length > 0">
						<picker @change="typePickerChange" :value="arrayTypeIndex" :range="arrayType" range-key="val" name="type">
							<view class="uni-input">{{arrayType[arrayTypeIndex].val}}</view>
						</picker>
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务标题</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="title" placeholder="请输入任务标题" 
					maxlength="50" type="text" v-model="title" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务说明</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="explain" placeholder="请输入任务说明" 
					maxlength="50" type="text" v-model="explain"/>
				</view>
			</tui-list-cell>
<!-- 			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务规则</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="rule" placeholder="请输入任务规则" maxlength="50" type="text" />
				</view>
			</tui-list-cell> -->
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">奖励类型</view>
					<view class="uni-list-cell-db" style="margin-left:20rpx;">
						<picker @change="awardPickerChange" :value="arrayAwardIndex" :range="arrayAward" range-key="award" name="awardType">
							<view class="uni-input">{{arrayAward[arrayAwardIndex].award}}</view>
						</picker>
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务奖励</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="award" placeholder="请输入任务奖励" 
					maxlength="50" type="number" v-model="award" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务数量</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="sum" placeholder="请输入任务数量" 
					maxlength="50" type="number" v-model="sum" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title">任务刷新周期</view>
					<view class="uni-list-cell-db" style="margin-left:20rpx;">
						<picker @change="cyclePickerChange" :value="arrayCycleIndex" :range="arrayCycle" range-key="time" name="cycle">
							<view class="uni-input">{{arrayCycle[arrayCycleIndex].time}}</view>
						</picker>
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title">任务发布时间</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="begTime" 
					placeholder="请输入任务开始时间" maxlength="50" type="text" @tap="show(2, 1)" v-model="begTime" disabled="true"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title">任务结束时间</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="endTime" 
					placeholder="请输入任务结束时间" maxlength="50" type="text" @tap="show(2,2)" v-model="endTime" disabled="true"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title">任务限时</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="doneLong"
					placeholder="请输入任务限时时间" maxlength="50" type="text" @tap="show(1,3)" v-model="doneLongTime" disabled="true"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title">审核时长</view>
					<view class="uni-list-cell-db" style="margin-left:20rpx;">
						<input placeholder-class="tui-phcolor" class="tui-input" name="auditLong"
						placeholder="请输入任务限时时间" maxlength="50" type="text" @tap="show(1,4)" v-model="auditLongTime" disabled="true"/>
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title">任务是否需要凭证</view>
					<radio-group class="radio-group" name="isDoneProve">
						<label class="tui-radio">
							<radio value="1" color="#5677fc" :checked="isDoneProve == 1"/>是
						</label>
						<label class="tui-radio">
							<radio value="0" color="#5677fc" :checked="isDoneProve == 0"/>否
						</label>
					</radio-group>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title">任务是否需要截图</view>
					<radio-group class="radio-group" name="isDoneImg">
						<label class="tui-radio">
							<radio value="1" color="#5677fc" :checked="isDoneImg == 1"/>是
						</label>
						<label class="tui-radio">
							<radio value="0" color="#5677fc" :checked="isDoneImg == 0"/>否
						</label>
					</radio-group>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title">任务状态</view>
					<view class="uni-list-cell-db" style="margin-left:20rpx;">
						<picker @change="statePickerChange" :value="arrayStateIndex" :range="arrayState" range-key="state" name="state">
							<view class="uni-input">{{arrayState[arrayStateIndex].state}}</view>
						</picker>
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title">任务分类</view>
					<view class="uni-list-cell-db" style="margin-left:20rpx;">
						<picker @change="sortPickerChange" :value="arraySortIndex" :range="arraySort" range-key="sort" name="sort">
							<view class="uni-input">{{arraySort[arraySortIndex].sort}}</view>
						</picker>
					</view>
				</view>
			</tui-list-cell>

			<tui-list-cell :hover="false" >
				<view class="tui-line-cell">
					<view class="tui-title">备注</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="desc" placeholder="" 
					maxlength="50" type="text" v-model="desc"/>
				</view>
			</tui-list-cell>
					
			<view class="tui-btn-box btn_style">
				<button class="tui-button-primary tui-button-gray" hover-class="tui-button-hover" formType="submit" type="default">修改任务</button>
			</view>
		</form>
		
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="change"></tui-datetime>
	</view>
</template>
<script>
const form = require("@/common/tui-validation/tui-validation.js");
import api from "@/api/api.js";
import storage from "@/api/storage.js";
import tran from "@/common/tran.js";
import util from "@/common/util.js";
export default {
	data() {
		return {
			arrayType: [],   //任务类型列表
			arrayTypeIndex: 0,
			
			arrayAward: [{"award": "金币", "key": 0}, {"award": "现金", "key": 1}],   //任务奖励类型列表
			arrayAwardIndex: 0,
			
			arrayState: [{"state": "开启", "key": 1}, {"state": "关闭", "key": 0}],   //任务状态列表
			arrayStateIndex: 0,
			
			arraySort: [{"sort": "热门活动", "key": 0}, {"sort": "限时推荐", "key": 1}],   //任务分类列表
			arraySortIndex: 0,
			
			arrayCycle: [{"time": "只能完成一次", "key": 0},{"time": "每天只能完成一次", "key": 1}],   //任务刷新周期列表列表
			arrayCycleIndex: 0,
			
			title: "",   //任务标题
			explain: "",   //任务说明
			award: "",   //任务奖励
			sum: "",   //任务任务数量
			isDoneImg: 0,  //是否需要截图
			isDoneProve: 0,  //是否需要凭证
			desc: "",   //任务备注
			begTime: "",	//任务开始时间
			endTime: "",	//任务结束时间
			doneLongTime: "",   //任务限时时间
			auditLongTime: "",  //任务审核时间
			doneLongSecond: null,   //任务限时时间转换秒
			auditLongSecond: null,  //任务审核时间转换秒
			
			//时间选择器参数
			type: 1,
			startYear: 1980,
			endYear: 2030,
			cancelColor: '#888',
			color: '#5677fc',
			setDateTime: '',
			result: '',
			unitTop: false,
			radius: false,
			num: null,    //区分开始时间和结束时间的标识
			uid: "",  //用户id
			id: null,  //任务id
			taskInfo: "",  //任务信息
		} 
	},
	onLoad(res) {
		this.uid = storage.getUid();  //获取uid
		this.id = parseInt(res.id);
		this.getTaskType();  //获取任务类型列表
		this.getTaskInfo(); //查看任务信息
	},
	methods: {
		//查看任务信息
		getTaskInfo(){
			api.getTaskInfo({id: this.id}, (res)=>{
				let data = api.getData(res).data[0];
				this.taskInfo = data;
				this.title = this.taskInfo.title;   	//任务标题
				this.explain = this.taskInfo.explain;   //任务说明
				this.award = this.taskInfo.award;   	//任务奖励
				this.sum = this.taskInfo.sum;   		//任务数量
				this.begTime = this.taskInfo.begTime;   //任务开始时间
				this.endTime = this.taskInfo.endTime;   //任务结束时间
				this.desc = this.taskInfo.desc;
				
				this.isDoneImg = this.taskInfo.isDoneImg;  //是否需要截图
				this.isDoneProve =  this.taskInfo.isDoneProve;  //是否需要凭证
				this.arrayTypeIndex = this.taskInfo.type;
				this.arrayAwardIndex = this.taskInfo.awardType;
				this.arrayStateIndex = this.taskInfo.state;
				this.arraySortIndex = this.taskInfo.sort;
				this.arrayCycleIndex = this.taskInfo.cycle;
				
				//任务限时时间
				let doneLongSecond = this.taskInfo.doneLong;
				let doneLongHour = parseInt(doneLongSecond / 3600);
				let doneLongMin = parseInt([doneLongSecond - (doneLongHour * 3600)] / 60);
				let doneLongSe = parseInt(doneLongSecond - [(doneLongHour * 3600) + (doneLongMin * 60)]);
				let doneLongData = `${doneLongHour}小时${doneLongMin}分${doneLongSe}秒`
				this.doneLongTime = doneLongData;
				
				//任务审核时间
				let auditLongSecond = this.taskInfo.auditLong;
				let auditLongHour = parseInt(auditLongSecond / 3600);
				let auditLongMin = parseInt([auditLongSecond - (auditLongHour * 3600)] / 60);
				let auditLongSe = parseInt(auditLongSecond - [(auditLongHour * 3600) + (auditLongMin * 60)]);
				let auditLongData = `${auditLongHour}小时${auditLongMin}分${auditLongSe}秒`
				this.auditLongTime = auditLongData;
			});
		},
		//获取任务类型列表
		getTaskType(){
			api.getTaskType({}, (res)=>{
				let data = api.getData(res);
				this.arrayType = data;
			});
		},
		//选择任务类型
		typePickerChange(e){
			this.arrayTypeIndex = e.detail.value;
		},
		//选择奖励任务类型
		awardPickerChange(e){
			this.arrayAwardIndex = e.detail.value;
		},
		//选择任务状态
		statePickerChange(e){
			this.arrayStateIndex = e.detail.value;
		},
		// //选择任务限时时间
		// doneLongPickerChange(e){
		// 	this.arrayDoneLongIndex = e.detail.value;
		// },
		// //选择任务审核时间
		// auditLongPickerChange(e){
		// 	this.arrayAuditLongIndex = e.detail.value;
		// },
		//选择任务分类类型
		sortPickerChange(e){
			this.arraySortIndex = e.detail.value;
		},
		//选择任务刷新周期
		cyclePickerChange(e){
			this.arrayCycleIndex = e.detail.value;
		},
		
		//区分开始时间和结束时间  选择器类型type: 1时分秒选择 2年月日时分秒选择 
		show: function(type, sum) {
			this.cancelColor = '#888';
			this.color = '#5677fc';
			this.setDateTime = '';
			this.startYear = 1980;
			this.endYear = 2030;
			this.unitTop = false;
			this.radius = false;
			if(type == 1) this.type = 5;
			if(type == 2) this.type = 7;
			switch (sum){
				case 1:
					this.num = 1;
					break;
				case 2:
					this.num = 2;
					break;	
				case 3:
					this.num = 3;
					break;
				case 4:
					this.num = 4;
					break;	
				default:
					break;
			}
			
			this.$refs.dateTime.show();
		},
		change: function(e) {
			switch (this.num){
				case 1:
					this.begTime = e.result;
					break;
				case 2:
					this.endTime = e.result;
					break;
				case 3:
					this.doneLongTime = e.hour + "小时" + e.minute + "分钟" +e.second + "秒";
					let doneLongHour = parseInt(e.hour);		//获取小时
					let doneLongMinute = parseInt(e.minute);	//获取分钟
					let doneLongSecond = parseInt(e.second);	//获取秒
					let doneLongTime = doneLongHour*3600 + doneLongMinute*60 + doneLongSecond;  //时分秒转换秒数
					this.doneLongSecond = doneLongTime;
					break;
				case 4:
					this.auditLongTime = e.hour + "小时" + e.minute + "分钟" +e.second + "秒";
					let auditLongHour = parseInt(e.hour);    	 //获取小时
					let auditLongMinute = parseInt(e.minute);    //获取分钟
					let auditLongSecond = parseInt(e.second);    //获取秒
					let auditLongTime = auditLongHour*3600 + auditLongMinute*60 + auditLongSecond;  //时分秒转换秒数
					this.auditLongSecond = auditLongTime;
					break;
				default:
					break;
			}
		},
		//获取任务类型列表
		getTaskType(){
			api.getTaskType({}, (res)=>{
				let data = api.getData(res);
				this.arrayType = data;
			});
		},
		formSubmit: function(e) {
			//表单规则
			let rules = [{
				name: "title",
				rule: ["required", "minLength:2", "maxLength:9"], //可使用区间，此处主要测试功能
				msg: ["请输入任务标题", "任务标题必须2个或以上字符", "任务标题不能超过9个字符"]
			}, {
				name: "explain",
				rule: ["required", "minLength:2", "maxLength:30"], //可使用区间，此处主要测试功能
				msg: ["请输入任务说明", "任务说明必须2个或以上字符", "任务说明不能超过30个字符"]
			}, 
			// {
			// 	name: "rule",
			// 	rule: ["required", "minLength:2", "maxLength:30"], //可使用区间，此处主要测试功能
			// 	msg: ["请输入任务规则", "任务规则必须2个或以上字符", "任务规则不能超过30个字符"]
			// }, 
			{
				name: "award",
				rule: ["required", "isNum"],
				msg: ["请输入任务奖励", "任务奖励只能为数字"]
			}, {
				name: "sum",
				rule: ["required", "isNum"],
				msg: ["请输入任务数量", "任务数量只能为数字"]
			}, {
				name: "begTime",
				rule: ["required"],
				msg: ["请输入任务发布时间"]
			}, {
				name: "endTime",
				rule: ["required"],
				msg: ["请输入任务结束时间"]
			}, {
				name: "isDoneProve",
				rule: ["required"],
				msg: ["请选择是否需要凭证"]
			}, {
				name: "isDoneImg",
				rule: ["required"],
				msg: ["请选择是否需要截图"]
			}, {
				name: "doneLong",
				rule: ["required"],
				msg: ["请输入任务限时时间"]
			}, {
				name: "auditLong",
				rule: ["required"],
				msg: ["请输入任务审核时间"]
			}];
			//进行表单检查
			let formData = e.detail.value;
			let checkRes = form.validation(formData, rules);
			//通过表单验证
			if (!checkRes) {
				let data = e.detail.value;
				//将数据转化为对应格式
				data.id = this.id;
				data.uid = this.uid;
				data.doneLong = this.doneLongSecond;
				data.auditLong = this.auditLongSecond;
				data.award = parseInt(data.award);
				data.sum = parseInt(data.sum);
				data.isDoneProve = parseInt(data.isDoneProve);
				data.isDoneImg = parseInt(data.isDoneImg);
				data.imgUrl = "",
				api.updTask(data, (res)=>{
					let code = api.getCode(res);
					if(code == 0){
						uni.showToast({
							title: "修改任务成功",
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
			} else {
				uni.showToast({
					title: checkRes,
					icon: "none"
				});
			}
		},
		formReset: function(e) {
			console.log("清空数据")
		}
	}
}
</script>

<style>
	
	.container2 {
		padding: 20rpx 0 50rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		line-height: 32rpx;
		min-width: 120rpx;
		flex-shrink: 0;
	}
	
	.uni-list-cell-db,
	.uni-list-cell-right {
		flex: 1;
	}

	.tui-input {
		font-size: 32rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
		overflow: visible;
	}

	.radio-group {
		margin-left: auto;
		transform: scale(0.8);
		transform-origin: 100% center;
		flex-shrink: 0;
	}
	
	.tui-input {
		font-size: 28rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
		overflow: visible;
	}

	.tui-radio {
		display: inline-block;
		padding-left: 28rpx;
		font-size: 36rpx;
		vertical-align: middle;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
		overflow: visible;
	}

	.tui-btn-box {
/* 		padding: 40rpx 50rpx;
		box-sizing: border-box; */
		display:flex;
		align-items:center;
	}
	.tui-btn-box>button{
		width:50%;
		font-size:14px;
	}
	.tui-btn-box>button:nth-child(2){
		background-color: #B5B5B5;
	}

	.tui-button-gray {
		margin-top: 30rpx;
	}

	.tui-tips {
		padding: 30rpx;
		color: #999;
		font-size: 24rpx;
	}
</style>


