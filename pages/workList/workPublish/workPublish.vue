<template>
	<view class="container2">
		<view class="" v-show="powerType == 1">
			<form @submit="formSubmit" @reset="formReset">
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务会员类型</view>
						<view class="uni-list-cell-db" style="margin-left:20rpx;" v-if="levelType.length > 0">
							<picker @change="levelPickerChange" :value="levelTypeIndex" :range="levelType" range-key="val" name="level">
								<view class="uni-input">{{levelType[levelTypeIndex].val}}</view>
							</picker>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务分类</view>
						<view class="uni-list-cell-db" style="margin-left:20rpx;">
							<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
								<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}</view>
							</picker>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务类型</view>
						<view class="uni-list-cell-db" style="margin-left:20rpx;" v-if="arrayType.length > 0">
							<picker @change="typePickerChange" :value="arrayTypeIndex" :range="arrayType" range-key="val" name="type">
								<view class="uni-input">{{arrayType[arrayTypeIndex].val}}</view>
							</picker>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务标题</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="title" placeholder="请输入任务标题" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务说明</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="explain" placeholder="请输入任务说明" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary" style="visibility: hidden;">*</text>任务图片</view>
						<tui-upload :serverUrl="serverUrl" @complete="imgResult" @remove="remove" 
						:limit="1" style="margin-left:20rpx;"></tui-upload>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary" style="visibility: hidden;">*</text>宣传文本</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="taskTxt" placeholder="请输入宣传文本" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary" style="visibility: hidden;">*</text>宣传图片</view>
						<tui-upload :serverUrl="serverUrl" @complete="taskImgResult" @remove="taskImgRemove"
						:limit="1" style="margin-left:20rpx;"></tui-upload>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary" style="visibility: hidden;">*</text>打开链接</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="taskUrl" placeholder="请输入打开链接" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary" style="visibility: hidden;">*</text>打开app</view>
						<view class="uni-list-cell-db" style="margin-left:20rpx;">
							<picker @change="appPickerChange" :value="arrayAppIndex" :range="arrayApp" range-key="name" name="taskApp">
								<view class="uni-input">{{arrayApp[arrayAppIndex].name}}</view>
							</picker>
						</view>
					</view>
				</tui-list-cell>
			<!-- 	<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">任务规则</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="rule" placeholder="请输入任务规则" maxlength="50" type="text" />
					</view>
				</tui-list-cell> -->
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>奖励类型</view>
						<view class="uni-list-cell-db" style="margin-left:20rpx;">
							<picker @change="awardPickerChange" :value="arrayAwardIndex" :range="arrayAward" range-key="award" name="awardType">
								<view class="uni-input">{{arrayAward[arrayAwardIndex].award}}</view>
							</picker>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务奖励</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="award" placeholder="请输入任务奖励" 
						maxlength="50" type="number" @input="inputAward" v-model="award" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务数量</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="sum" placeholder="请输入任务数量" 
						maxlength="50" type="number" @input="inputSum" v-model="sum"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary" style="visibility: hidden;">*</text>标记</view>
						<view class="uni-list-cell-db" style="margin-left:20rpx;">
							<picker @change="tipPickerChange" :value="arrayTipIndex" :range="arrayTip" range-key="tip" name="tip">
								<view class="uni-input">{{arrayTip[arrayTipIndex].tip}}</view>
							</picker>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务刷新周期</view>
						<view class="uni-list-cell-db" style="margin-left:20rpx;">
							<picker @change="cyclePickerChange" :value="arrayCycleIndex" :range="arrayCycle" range-key="time" name="cycle">
								<view class="uni-input">{{arrayCycle[arrayCycleIndex].time}}</view>
							</picker>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>发布开始时间</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="begTime" 
						placeholder="请输入发布开始时间" maxlength="50" type="text" @tap="show(2, 1)" v-model="begTime" disabled="true"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>发布结束时间</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="endTime" 
						placeholder="请输入发布结束时间" maxlength="50" type="text" @tap="show(2,2)" v-model="endTime" disabled="true"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务限时</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="doneLong"
						placeholder="请输入任务限时时间" maxlength="50" type="text" @tap="show(1,3)" v-model="doneLongTime" disabled="true"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>审核时长</view>
						<view class="uni-list-cell-db" style="margin-left:20rpx;">
							<input placeholder-class="tui-phcolor" class="tui-input" name="auditLong"
							placeholder="请输入任务限时时间" maxlength="50" type="text" @tap="show(1,4)" v-model="auditLongTime" disabled="true"/>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务是否需要凭证</view>
						<radio-group class="radio-group" name="isDoneProve">
							<label class="tui-radio">
								<radio value="1" color="#5677fc" />是
							</label>
							<label class="tui-radio">
								<radio value="0" color="#5677fc" />否
							</label>
						</radio-group>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务是否需要截图</view>
						<radio-group class="radio-group" name="isDoneImg">
							<label class="tui-radio">
								<radio value="1" color="#5677fc" />是
							</label>
							<label class="tui-radio">
								<radio value="0" color="#5677fc" />否
							</label>
						</radio-group>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务状态</view>
						<view class="uni-list-cell-db" style="margin-left:20rpx;">
							<picker @change="statePickerChange" :value="arrayStateIndex" :range="arrayState" range-key="state" name="state">
								<view class="uni-input">{{arrayState[arrayStateIndex].state}}</view>
							</picker>
						</view>
					</view>
				</tui-list-cell>
<!-- 				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary">*</text>任务分类</view>
						<view class="uni-list-cell-db" style="margin-left:20rpx;">
							<picker @change="sortPickerChange" :value="arraySortIndex" :range="arraySort" range-key="sort" name="sort">
								<view class="uni-input">{{arraySort[arraySortIndex].sort}}</view>
							</picker>
						</view>
					</view>
				</tui-list-cell> -->
			
				<tui-list-cell :hover="false" >
					<view class="tui-line-cell">
						<view class="tui-title"><text class="necessary" style="visibility: hidden;">*</text>备注</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="desc" placeholder="" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
						
				<view class="tui-btn-box btn_style">
					<button class="tui-button-primary tui-button-gray" hover-class="tui-button-hover" formType="submit" type="default">发布任务</button>
					<button class="tui-button-primary tui-button-gray" hover-class="tui-button-gray_hover" formType="reset">重置</button>
				</view>
			</form>
		</view>
		
		<view class="data_lack" v-show="powerType == 2">
			<view class="lack_box">
				<tui-icon name="nodata" :size="120"></tui-icon>
				<text class="lack_test">您还没有发布的权限</text>
				<view class="lack_test">
					最低需要升级到<text style="color:#dc3b40;">{{powerName}}</text>才能发布任务
				</view>
				<view class="btn_style">
					<button type="default" class="coin_query" hover-class="btn_hover" @tap="toVip">去升级</button>
				</view>
			</view>
		</view>
		
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
			levelType: [],   //会员类型列表
			levelTypeIndex: 0,
			
			arrayType: [],   //任务类型列表
			arrayTypeIndex: 0,
			
			arrayAward: [{"award": "金币", "key": 0}, {"award": "现金", "key": 1}],   //任务奖励类型列表
			arrayAwardIndex: 0,
			
			arrayTip: [{"tip": "NEW", "key": 0}, {"tip": "HOT", "key": 1}],   //任务标记列表
			arrayTipIndex: 0,
			
			arrayState: [{"state": "关闭", "key": 0}, {"state": "开启", "key": 1}],   //任务状态列表
			arrayStateIndex: 0,
			
			// arraySort: [{"sort": "热门活动", "key": 0}, {"sort": "限时推荐", "key": 1}],   //任务分类列表
			// arraySortIndex: 0,
			
			arrayCycle: [{"time": "每人只能完成一次", "key": 0},{"time": "每人每天只能完成一次", "key": 1}],   //任务刷新周期列表列表
			arrayCycleIndex: 0,
			
			arrayApp: [{"name": "不打开任何app", "key": 0}, {"name": "微信", "key": 1}, {"name": "抖音", "key": 2}, {"name": "快手", "key": 3}],   //app列表
			arrayAppIndex: 0,
			
			begTime: "",	//任务开始时间
			endTime: "",	//任务结束时间
			doneLongTime: "",   //任务限时时间
			auditLongTime: "",  //任务审核时间
			doneLongSecond: null,   //任务限时时间转换秒
			auditLongSecond: null,  //任务审核时间转换秒
			
			award: null, //任务奖励
			sum: null, //任务数量
			
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
			powerType: 0, //是否有发布任务的权限 0正在查询权限 1有权限 2没权限
			powerName: "",
			levelList: [],  //会员表信息
			
			imageData: "",   	 //上传图片地址
			taskimageData: "",   //上传宣传图片地址
			serverUrl: "",  //上传地址
			
			multiArray: [
				[],
				[]
			],  //任务分类联级选择器
			multiIndex: [0, 0],  //任务分类联级选择器下标
			
			
			arrClassifyName: [],  //分类名称
			taskTree: [],  //任务大类和子类列表
			classifyId: null,  //选中的子类id
		} 
	},
	onShow(res) {
		this.getTaskType();  //获取任务类型列表
		this.getLevelType();  //获取会员类型列表
		this.uid = storage.getUid();  //获取uid
		this.getLevelList();  //获取会员表信息
		this.serverUrl = api.getFileUrl();  //获取上传图片地址
		this.getTaskTree();  //获取任务大类和子类列表
	},
	methods: {
		//任务奖励输入框
		inputAward(val){
			//禁止输入开头数为0
			let str = '' + this.award;
			if(str.substr(0, 1) == "0"){
				str = str.slice(1);
				this.award = str;
			}
		},
		//任务数量输入框
		inputSum(val){
			//禁止输入小数
			let str = '' + this.sum;
			if (str.indexOf('.') !== -1) {
				let arr = str.split('');
			    arr.splice(arr.length - 1);
				let str2 = arr.join('');
				this.sum = +str2;
			}
			//禁止输入开头数为0
			if(str.substr(0, 1) == "0"){
				str = str.slice(1);
				this.sum = str;
			}
		},
		//获取任务大类和子类列表
		getTaskTree(){
			api.getTaskTree({}, (res)=>{
				let data = api.getData(res);
				this.taskTree = data;  //保存任务大类和子类列表
				this.multiArray[0] = [];
				this.multiArray[1] = [];	
				let arrBigClassifyName = [];
				data.forEach((item, index) =>{
					//获取状态为开启的大类和子类列表
					if(item.big.state == 1){
						this.multiArray[0].push(item.big.name);  //获取大类名称
						let arrClassifyName = [];  //子类名称数组
						for(let i = 0; i < item.list.length; ++i){
							arrClassifyName.push(item.list[i].name);  //获取每个子类名称
						}
						arrBigClassifyName.push(arrClassifyName);
					}
				});
				this.arrClassifyName = arrBigClassifyName;  //保存所有子类名称数组
				this.multiArray[1] = this.arrClassifyName[0]; //设置显示默认子类名称
				this.getClassifyId(); //获取默认选中的子类id
			});
		},
		//任务分类联级选择器操作
		bindMultiPickerColumnChange: function(e) {
			// console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value);
			this.multiIndex[e.detail.column] = e.detail.value;
			switch (e.detail.column) {
				case 0: //拖动第1列
					switch (this.multiIndex[0]) {
						case 0:
							this.multiArray[1] = this.arrClassifyName[0];
							break
						case 1:
							this.multiArray[1] = this.arrClassifyName[1];
							break
					}
					// console.log(this.multiIndex);
					this.multiIndex.splice(2, 1);
					break;
				case 1: //拖动第2列
					// console.log(this.multiIndex);
					this.multiIndex.splice(2, 1);
					break;
			}
			//this.multiIndex == [0, 0] 第一列下标 + 第二列下标
			this.getClassifyId(this.multiIndex);
			this.$forceUpdate();
		},
		
		//获取选中分类id
		getClassifyId(arr = [0, 0, 0]){
			let arrSel = this.taskTree[arr[0]];
			arrSel.list.forEach((item, index) =>{
				if(index == arr[1]) this.classifyId = item.classifyId;
			});
			// console.log(this.classifyId);
		},
		
		//添加宣传图片
		taskImgResult: function(e) {			
			//上传状态：1-上传成功 2-上传中 3-上传失败
			if(e.status == 1) 
				this.taskimageData = e.imgArr[0];  //上传成功状态获取图片路径
			else 
				this.taskimageData = "";  //上传失败、上传中状态清空图片路径
		},
		//移除宣传图片
		taskImgRemove: function(e) {
			// let index = e.index
			this.taskimageData = "";
		},
		
		//添加图片
		imgResult: function(e) {
			//上传状态：1-上传成功 2-上传中 3-上传失败
			if(e.status == 1) 
				this.imageData = e.imgArr[0];  //上传成功状态获取图片路径
			else 
				this.imageData = "";  //上传失败、上传中状态清空图片路径
		},
		//移除图片
		remove: function(e) {
			this.imageData = "";
			// let index = e.index
		},
		//跳转到VIP升级界面
		toVip(){
			uni.navigateTo({
				url: "/pages/vip/vip"
			});
		},
		//获取会员表信息
		getLevelList(){
			this.levelList = storage.getLevelList();  //获取会员列表
			let myLevel = storage.getMyInfo().level;  //获取当前用户会员等级
			let powerLevel = null;
			//查询最低能发布任务的会员等级
			for(let i = 0; i < this.levelList.length; ++i){
				let item = this.levelList[i];
				if(item.publishTaskSum > 0){
					powerLevel = item.level;  //获取最低能发布任务的等级
					this.powerName = item.levelName;  //获取最低能发布任务的等级名称
					break;
				}
			}
			if(myLevel < powerLevel) this.powerType = 2;
			else this.powerType = 1;
		},
		//选择打开app类型
		appPickerChange(e){
			this.arrayAppIndex = e.detail.value;
		},
		//选择会员类型
		levelPickerChange(e){
			this.levelTypeIndex = e.detail.value;
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
		tipPickerChange(e){
			this.arrayTipIndex = e.detail.value;
		},
		//选择任务状态
		statePickerChange(e){
			this.arrayStateIndex = e.detail.value;
		},
		// //选择任务分类类型
		// sortPickerChange(e){
		// 	this.arraySortIndex = e.detail.value;
		// },
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
		//获取会员类型列表
		getLevelType(){
			api.getLevelDesc({}, (res)=>{
				this.levelType = [];
				let data = api.getData(res);
				data.forEach((item, index) =>{
					if(item.state == 1) this.levelType.push(item);	//获取状态为开启的每个任务等级信息
				});
				storage.setLevelDescList(this.levelType);
			});
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
				rule: ["required", "minLength:2", "maxLength:8"], //可使用区间，此处主要测试功能
				msg: ["请输入任务标题", "任务标题必须2个或以上字符", "任务标题不能超过8个字符"]
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
				rule: ["required", "isAmount"],
				msg: ["请输入任务奖励", "任务奖励必须为金额，保留2位小数"]
			}, {
				name: "sum",
				rule: ["required", "isNum"],
				msg: ["请输入任务数量", "任务数量必须为数字"]
			}, {
				name: "begTime",
				rule: ["required"],
				msg: ["请输入发布开始时间"]
			}, {
				name: "endTime",
				rule: ["required"],
				msg: ["请输入发布结束时间"]
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
				msg: ["请输入审核时长时间"]
			}];
			//进行表单检查
			let formData = e.detail.value;
			let checkRes = form.validation(formData, rules);
			//通过表单验证
			if (!checkRes) {
				let data = e.detail.value;
				//将数据转化为对应格式
				data.uid = this.uid;
				data.doneLong = this.doneLongSecond;
				data.auditLong = this.auditLongSecond;
				data.classify = this.classifyId;
				data.award = parseFloat(data.award);
				data.sum = parseInt(data.sum);
				data.isDoneProve = parseInt(data.isDoneProve);
				data.isDoneImg = parseInt(data.isDoneImg);
				data.taskApp = parseInt(data.taskApp);
				data.imgUrl = "";
				data.taskImg = "";
				if(!util.isEmpty(this.imageData) && this.imageData != undefined) data.imgUrl = this.imageData;   //任务图片
				if(!util.isEmpty(this.taskimageData) && this.taskimageData != undefined) data.taskImg = this.taskimageData;   //宣传图片
				api.addTask(data, (res)=>{
					let code = api.getCode(res);
					if(code == 0){
						uni.showModal({
							title: "成功",
							content: "发布成功",
							showCancel: false
						});
					}else{
						let msg = api.getMsg(res);
						uni.showModal({
							title: "失败",
							content: msg,
							showCancel: false
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
		width:30%;
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
	.coin_query{
		margin-top:40rpx;
		font-size:16px;
		border-radius:40rpx;
		width:400rpx;
	}
	.coin_query::after{
		border:none;
	}
	
	.necessary{
		color:#D91D37;
		font-weight:bold;
	}
</style>

