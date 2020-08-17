<template>
	<view class="content">
		<view class="lay_head">
			<view class="">
				<view class="head_title">
					总资产(元)
				</view>
				<view class="head_num">
					1.00
				</view>
			</view>
			
			<view class="">
				<view class="head_title">
					余额宝(元)
				</view>
				<view class="head_num money_num">
					1.00
				</view>
			</view>
			
			<view class="">
				<view class="head_title">
					总收益(元)
				</view>
				<view class="head_num">
					+<text>1</text>
				</view>
			</view>
			
			<view class="">
				<view class="head_title">
					昨日收益(元)
				</view>
				<view class="head_num">
					+<text>1</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.lay_head{
		width:100%;
		font-size:14px;
		text-align:center;
		display:flex;
		justify-content:space-between;
		padding:20rpx 0;
		box-sizing:border-box;
		border-bottom:1px solid #ECECEC;
	}
	.lay_head>view{
		width:23%;
	}
	.head_title{
		color:#9C9C9C;
	}
	.head_num{
		font-size:18px;
		color:#FF575C;
	}
	.money_num{
		font-size:14px;
		color:#000;
	}
</style>
