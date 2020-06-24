<template>
    <view class="page">
        <tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true' @clickItem="onClickItem" ></tabControl>
        <!-- 使用 swiper 配合 滑动切换 -->
        <swiper class="swiper" @change='scollSwiper' :current='current'>
			<!-- 收入明细 -->
            <swiper-item class="swiper_item">
				<view class="income" v-for="(item,index) in incomeList" :key='index' v-show="showIncome">
					<view class="incomeTime">
						<text>{{item.time}}</text>
					</view>
					
					<view class="incomeNum">
						<text>+ {{item.num}} 元</text>
					</view>
				</view>
				
				<view class="data_lack" v-show="!showIncome">
					<view class="lack_box">
						<tui-icon name="nodata" :size="120"></tui-icon>
						<text class="lack_test">暂无数据</text>
						<button type="default" class="coin_query">去获取金币</button>
					</view>
				</view>
            </swiper-item>
			
			<!-- 提现明细 -->
            <swiper-item class="swiper_item">
				<view class="income" v-for="(item,index) in extractMoneyList" :key='index'>
					<view class="incomeTime">
						<text>{{item.time}}</text>
					</view>
					
					<view class="incomeNum">
						<text>+ {{item.num}} 元</text>
					</view>
				</view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
export default {
    components: { tabControl },
    data() {
        return {
            items: ['收入明细', '提现明细'],
            current: 0,
			showIncome: false, // 收入明细列表是否显示
			showExtractMoneyList: true, // 提现明细列表是否显示
			incomeList:[],   //收入明细列表
			
			extractMoneyList:[{
				time: "2020-06-22",
				num: 10
			},{
				time: "2020-06-22",
				num: 10
			},{
				time: "2020-06-22",
				num: 10
			},{
				time: "2020-06-22",
				num: 10
			},{
				time: "2020-06-22",
				num: 10
			}]   //提现明细列表
        };
    },
    onLoad() {},
    methods: {
        onClickItem(val) {
            this.current = val.currentIndex
        },
        scollSwiper(e){
            this.current = e.target.current
        }
    }
};
</script>

<style>
	page{
	    height: 100%;
	}
	.page{
	    height: 100%;
	}
	.swiper{
		height: 100%;
	}
	.swiper_item{
		padding-top:100rpx;		
	}
	.income{
		padding:20rpx 40rpx;
		box-sizing:border-box;
		font-size:14px;
		display:flex;
		justify-content:space-between;
		border-bottom:1px solid #eee;
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
		background-color:#fcd030;
		font-size:16px;
		border-radius:40rpx;
		width:400rpx;
	}
	.coin_query::after{
		border:none;
	}
</style>