<template>
	<view class="page">
		<!-- 筛选 -->
		<view class="search_column" style="display:flex; align-items:center; justify-content: space-between;">
			<view class="search_test">用户名</view>
			<view class="search_ipt">
				<input type="text" value="" v-model="userName"/>
			</view>
			<view class="sea_btn btn_style">
				<button type="default" @tap="getUserByClick" hover-class="btn_hover" style="padding: 0;">查询</button>
			</view>
		</view>
		
		<view class="lay_table">
			<view class="lay_table_title">
				<view class="" style="width:30%;">用户</view>
				<view class="" style="width:20%;">余额</view>
				<view class="" style="width:20%;">直属</view>
				<view class="" style="width:30%;">登录时间</view>
				<!-- <view class="" style="width:20%;">状态</view> -->
			</view>
			
			<view class="lay_table_data lay_data" v-for="(item,index) in userTableEn" :key="index" @tap="actionsheet(item)">
				<view :class="{'lay_upper': item.subSum > 0}" style="width:30%;"><text selectable="true">{{item.uid}}</text></view>
				<view class="style_money" style="width:20%;">{{item.money}}</view>
				<view class="style_money" style="width:20%;">{{item.subSum}}</view>
				<view class="" style="width:30%;">{{item.loginTime}}</view>
<!-- 				<view class="" style="width:20%;">
					<text v-if="item.state == 0" class="style_state0">正常</text>
					<text v-if="item.state != 0" class="style_state1">异常</text>
				</view> -->
			</view>
		</view>
		
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
		
		<tui-actionsheet :show="showActionSheet" :tips="tips" :item-list="itemList" :mask-closable="maskClosable" :color="color"
		 :size="size" :is-cancel="isCancel" @click="itemClick" @cancel="closeActionSheet"></tui-actionsheet>
	</view>
</template>

<script>
import tuiActionsheet from "@/components/tui-actionsheet/tui-actionsheet.vue";
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
import tran from "@/common/tran.js";
export default{
	components:{
		tuiActionsheet
	},
	data() {
		return {
			uid: '',  //当前进行查询的用户id
			userName: "",  //输入的用户名
			userTableEn: [],   //用户列表
			page: 1,
			userSelect: "",   //选中行的用户信息
			UpperList: [],//上级列表
			
			loadding: false, //加载数据提示
			pullUpOn: true,  //上拉加载数据
			
			showActionSheet: false,  //操作菜单是否显示
			maskClosable: true,
			tips: "确认清空搜索历史吗？",
			itemList: [],   //操作菜单列表
			color: "#9a9a9a",
			size: 26,
			isCancel: true
		}
	},
	onShow() {
		this.uid = storage.getUid();  //获取uid
		this.getUserTable(this.uid);  //获取用户列表
		this.UpperList = [];  //清空上级列表
	},
	methods:{
		//点击查询按钮
		getUserByClick(){
			this.UpperList = [];
			if(util.isEmpty(this.userName)){
				this.uid = storage.getUid();				 
			} 
			else{
				this.uid = this.userName;				
			}
			this.getUserTable(this.uid);  //获取用户列表
		},
		//获取用户列表 type:0 普通查询 1:查询指定用户
		getUserTable(upper){
			this.page = 1;
			let data = {
				upper: upper, 
				type: 0, 
				page: this.page, 
				count: 10,
			};
			api.getUser(data, (res)=>{
				let data = api.getData(res).data;
				data.forEach((item) =>{
					if(!util.isEmpty(item.loginTime))  item.loginTime = item.loginTime.slice(0, 10);  //登录时间筛选
				});
				this.userTableEn = data;
			});
		},
		//上拉刷新
		onPullDownRefresh: function() {
			//延时为了看效果
			setTimeout(() => {
				this.getUserTable(0);
				this.pullUpOn = true;
				this.loadding = false;
				uni.stopPullDownRefresh();
				uni.showToast({
					title: '刷新成功',
					icon: "none",
					duration: 1000
				});
			}, 200)
		},
		//生成操作菜单列表
		getActionsheetList(subSum){
			let itemList = [{
				text: "个人总览",
				color: "#2B2B2B"
			}, {
				text: "个人报表",
				color: "#2B2B2B"
			}, {
				text: "团队总览",
				color: "#2B2B2B"
			}, {
				text: "团队报表",
				color: "#2B2B2B"
			}];
			//有下级用户时操作菜单添加查看下一级功能
			if(subSum > 0){
				let obj = {
				text: "查看下一级",
				color: "#dc3b40"
				};
				itemList.unshift(obj);
			}
			//上级列表不为空时操作菜单添加查看上一级功能
			if(!util.isEmpty(this.UpperList)){
				let obj = {
				text: "查看上一级",
				color: "#dc3b40"
				};
				itemList.unshift(obj);
			}
			return itemList;
		},
		//打开操作菜单
		actionsheet: function(item) {
			this.userSelect = item;
			let itemList = this.getActionsheetList(item.subSum);
			let tips = "";
			let maskClosable = true;
			let color = "#9a9a9a";
			let size = 26;
			let isCancel = true;
			//组件中都有默认值，实际应用中不需要可不操作
			//setTimeout(() => {
				this.showActionSheet = true;
				this.itemList = itemList;
				this.maskClosable = maskClosable;
				this.tips = tips;
				this.color = color;
				this.size = size;
				this.isCancel = isCancel;
				
			//}, 0)
		},
		//点击操作菜单
		itemClick: function(e) {
			let index = e.index;  //获取被点击菜单的id
			this.closeActionSheet();  //关闭操作菜单
			let clickMenu = this.itemList[index];
			switch (clickMenu.text){
				case "查看下一级":
					console.log("查看下一级");
					this.UpperList.unshift(this.uid);  //记录上级用户id
					this.uid = this.userSelect.uid;   //获取新的用户id
					this.getUserTable(this.uid);  //获取下级用户列表
					break;
				case "查看上一级":
					console.log("查看上一级");
					this.uid = this.UpperList[0];  //获取上级用户id
					this.UpperList.splice(0, 1);   	//删除上级用户id
					this.getUserTable(this.uid);  //获取下级用户列表
					break;
				case "个人总览":
					console.log("个人总览");
					uni.navigateTo({
						url: "/pages/my/userStatisticsMonth/userStatisticsMonth?userName=" + this.userSelect.uid
					});
					break;
				case "个人报表":
					console.log("个人报表");
					uni.navigateTo({
						url: "/pages/my/userStatisticsDay/userStatisticsDay?userName=" + this.userSelect.uid
					})
					break;
				case "团队总览":
					console.log("团队总览");
					uni.navigateTo({
						url: "/pages/agent/teamOverview/teamOverview?userName=" + this.userSelect.uid
					})
					break;
				case "团队报表":
					console.log("团队报表");
					uni.navigateTo({
						url: "/pages/agent/teamTable/teamTable?userName=" + this.userSelect.uid
					})
					break;
				default:
					break;
			}
		},
		//关闭操作菜单
		closeActionSheet: function() {
			this.showActionSheet = false
		},
	},
	//上拉获取更多金币收益明细数据
	onReachBottom(){
		if (!this.pullUpOn) return;
		this.loadding = true;
		this.page = this.page + 1;
		
		api.getUser({
			uid: this.uid,
			type: 0,
			page: this.page,
			count: 10
		}, (res)=>{
			let data = api.getData(res).data;
			if(util.isEmpty(data)){
				this.loadding = false;
				this.pullUpOn = false;
			}else{
				this.loadding = false;
				data.forEach((item) =>{
					if(!util.isEmpty(item.loginTime))  item.loginTime = item.loginTime.slice(0, 10);  //登录时间筛选
					this.userTableEn.push(item);
				});
			}
		});
	},
}
</script>

<style>
	page{
	    height: 100%;
	}
	.page{
	    height: 100%;
	}
	.search_column{
		display:flex;
		align-items: center;
		justify-content:center;
		margin-top:20rpx;
		font-size:16px;
		padding:0 40rpx 20rpx;
		box-sizing:border-box;
		border-bottom:1px solid #808080;
	}
	.sea_btn button{
		font-size:12px;
		color:#fff;
		width:120rpx;
	}
	.search_test{
		font-size:14px;
	}
	.search_ipt{
		flex: 1;
	}
	.search_ipt>input{
		padding:0 20rpx;
		box-sizing:border-box;
		width: 100%;
		font-size:14px;
	}
	.lay_table{
		width:100%;
	}
	.lay_table_title, .lay_table_data{
		background-color:#efeff4;
		padding:20rpx;
		box-sizing:border-box;
		font-size:14px;
		text-align:center;
		display:flex;
		/* justify-content: space-between; */
		align-items: center;
	}
	.lay_data{
		background-color: #fff;
		border-bottom:1px solid #f7f7f7;
	}
	.style_money{
		color: #dc3b40;
	}
	.style_state0{
		color:#09BB07;
	}
	.style_state1{
		color:#dc3b40;
	}
	.lay_upper{
		text-decoration:underline;
	}
</style>
