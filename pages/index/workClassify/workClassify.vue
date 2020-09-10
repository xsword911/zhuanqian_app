<template>
	<view class="">
		<!-- 任务大厅 -->
			<view class="lay_work">
				<!-- <view class="work_title">任务大厅</view> -->
				<view class="work_list">
					<view class="work" @tap="toWork(item.level)"  v-for="(item,index) in levelList" :key="index">
						<view class="work_num">{{item.levelName}}</view>
						<!-- <view class="work_text" v-if="item.publishTaskSum > 0">可发布任务{{item.publishTaskSum}}单/天</view> -->
						<view class="work_text" v-if="item.receiveTaskSum > 0">可接受任务{{item.receiveTaskSum}}单/天</view>
						<view class="lay_sort" :class="'background_sort'+ item.id ">
							<view class="">
								<view class="">
									悬赏
								</view>
								<view class="sort_img">
									<image :src="'/static/img/member' + item.id + '.png'" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import api from "@/api/api.js";
import util from "@/common/util.js";
import tran from "@/common/tran.js";
export default{
	data() {
		return {
			levelList: [],  //会员等级信息
			classifyData: '',
		}
	},
	onLoad(res) {
		this.classifyData = tran.url2Obj(res.title);
		util.setBarTitle(this.classifyData.name + '任务');
		this.getUserLevel();  //获取会员等级信息
	},
	methods:{
		//跳转到任务界面
		toWork(level){
			let data = {
				bigClassifyId: this.classifyData.bigClassifyId,  //大类id
				classifyId: this.classifyData.classifyId,		//子类id
				level: level	//会员等级
			};
			uni.reLaunch({
				url: '/pages/work/work1/work1?data=' + tran.obj2Url(data)
			})
		},
		//获取会员等级信息
		getUserLevel(){
			api.getLevelAll((res)=>{
				this.levelList = [];
				let data = api.getData(res).data;
				data.forEach((item, index) =>{
					if(item.state == 1) this.levelList.push(item);  //获取状态为开启的会员等级信息
				});
				storage.setLevelList(this.levelList);  //保存会员列表
			});
		},
	}
}
</script>

<style>
	.lay_work{
		padding:25rpx 20rpx 0;
		box-sizing:border-box;
		font-size:16px;
	}
	.work_list{
		width:100%;
		display:flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top:6rpx;
	}
	.work{
		width:48%;
		height:260rpx;
		/* background-color: #F1F2F2; */
		background-color: rgb(245,245,245);
		border-radius:20rpx;
		padding-top:20rpx;
		box-sizing:border-box;
		display:flex;
		flex-direction: column;
		margin-bottom:20rpx;
	}
	.work_num{
		font-size:14px;
		font-weight:bold;
		margin-bottom:10rpx;
		padding-left:20rpx;
		box-sizing:border-box;
	}
	.work_text{
		font-size:13px;
		color: #808080;
		margin-bottom:10rpx;
		padding-left:20rpx;
		box-sizing:border-box;
	}
	.work_img{
		flex: 1;
	}
	.work_title{
		font-weight:bold;
	}
	
	
	.lay_sort{
		flex: 1;
		border-radius:10rpx;
		color:#fff;
		font-size:14px;
		font-weight:bold;
		display:flex;
		align-items:center;
		padding-left:30rpx;
		box-sizing:border-box;
		position:relative;
		overflow: hidden;
	}
	.sort_img{
		width:80rpx;
		height:100rpx;
		position:absolute;
		right:30rpx;
		bottom: 10rpx;
	}
	.background_sort1{
		background-image:linear-gradient(to right, rgb(242,113,22) , rgb(202,69,64));
	}
	.background_sort2{
		background-image:linear-gradient(to right, rgb(51,47,160) , rgb(151,11,60));
	}
	.background_sort3{
		background-image:linear-gradient(to right, rgb(34,162,101) , rgb(162,193,55));
	}
	.background_sort4{
		background-image:linear-gradient(to right, rgb(238,43,41) , rgb(181,37,124));
	}
	.background_sort5{
		background-image:linear-gradient(to right, rgb(116,16,192) , rgb(181,36,139));
	}
	.background_sort6{
		background-image:linear-gradient(to right, rgb(255,142,48) , rgb(210,59,102));
	}
</style>
