<template>
	<view class="page">
		<!-- 筛选 -->
		<view class="search_column" style="display:flex; align-items:center; justify-content: space-between;">
			<view class="search_test">用户名</view>
			<view class="search_ipt">
				<input type="text" value="" v-model="userName"/>
			</view>
			<view class="sea_btn btn_style">
				<button type="default" @tap="actionsheet(4)" hover-class="btn_hover" style="padding: 0;">查询</button>
			</view>
		</view>
		
		<view class="lay_table">
			<view class="lay_table_title">
				<view class="" style="width:20%;">用户名</view>
				<view class="" style="width:20%;">用户类型</view>
				<view class="" style="width:25%;">余额</view>
				<view class="" style="width:20%;">登录时间</view>
				<view class="" style="width:15%;">状态</view>
			</view>
			
			<view class="lay_table_data lay_data" v-for="(item,index) in userTableEn" :key="index" @tap="actionsheet(4)">
				<view class="" style="width:20%;">{{item.userName}}</view>
				<view class="" style="width:20%;">{{item.type}}</view>
				<view class="style_money" style="width:25%;">{{item.money}}</view>
				<view class="" style="width:20%;">{{item.loginTime}}</view>
				<view class="" style="width:15%;">
					<text v-if="item.state == 0" class="style_state0">正常</text>
					<text v-if="item.state != 0" class="style_state1">异常</text>
				</view>
			</view>
		</view>
		
		
		
		<tui-actionsheet :show="showActionSheet" :tips="tips" :item-list="itemList" :mask-closable="maskClosable" :color="color"
		 :size="size" :is-cancel="isCancel" @click="itemClick" @cancel="closeActionSheet"></tui-actionsheet>
	</view>
</template>

<script>
import tuiActionsheet from "@/components/tui-actionsheet/tui-actionsheet.vue";
export default{
	components:{
		tuiActionsheet
	},
	data() {
		return {
			userName: "",  //输入的用户名
			userTableEn: [{
				userName: "user10",
				type: "代理",
				money: "6340.000",
				loginTime: "2019/07/14",
				state: 0
			},{
				userName: "user10",
				type: "代理",
				money: "6340.000",
				loginTime: "2019/07/14",
				state: 0
			},{
				userName: "user10",
				type: "代理",
				money: "6340.000",
				loginTime: "2019/07/14",
				state: 0
			},{
				userName: "user10",
				type: "代理",
				money: "6340.000",
				loginTime: "2019/07/14",
				state: 1
			},{
				userName: "user10",
				type: "代理",
				money: "6340.000",
				loginTime: "2019/07/14",
				state: 0
			},{
				userName: "user10",
				type: "代理",
				money: "6340.000",
				loginTime: "2019/07/14",
				state: 0
			}],   //用户列表
			
			showActionSheet: false,
			maskClosable: true,
			tips: "确认清空搜索历史吗？",
			itemList: [],
			color: "#9a9a9a",
			size: 26,
			isCancel: true
		}
	},
	methods:{
		//打开操作菜单
		actionsheet: function(type) {
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
			let tips = "";
			let maskClosable = true;
			let color = "#9a9a9a";
			let size = 26;
			let isCancel = true;
			//组件中都有默认值，实际应用中不需要可不操作
			setTimeout(() => {
				this.showActionSheet = true;
				this.itemList = itemList;
				this.maskClosable = maskClosable;
				this.tips = tips;
				this.color = color;
				this.size = size;
				this.isCancel = isCancel
			}, 0)
		},
		//关闭操作菜单
		closeActionSheet: function() {
			this.showActionSheet = false
		},
	}
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
		padding:0 40rpx 10rpx;
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
</style>
