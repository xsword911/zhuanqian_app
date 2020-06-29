<template>
	<view class="">
		<view class="head_box">
			<!-- 金币信息 -->
			<view class="coin">
				<view class="">
					<view class="coin_num">
						{{myCoin}}
					</view>
					<view class="coin_test">
						我的金币
					</view>
				</view>
				
				<view class="">
					<view class="coin_num">
						{{todayCoin}}
					</view>
					<view class="coin_test">
						今日金币
					</view>
				</view>		
				
				<view class="">
					<button type="default" class="extract_btn">兑换现金 <tui-icon name="arrowright" :size="15" class="tag"></tui-icon></button>
				</view>
				
			</view>
			
			<!-- 签到信息 -->
			<view class="signIn_box">
				<view class="signIn_img">
					<image src="/static/img/qiandao.png" mode="widthFix"></image>
				</view>
				
				<view class="signIn_test">
					<view class="">
						已连续签到{{sign}}天
					</view>
					
					<view class="continued_sign">
						再签到{{continuedSign}}可获得{{nextReward}}元现金红包
					</view>
				</view>
				
				<view class="countDown_box">
					16:22
				</view>
			</view>
		</view>
		
		<view class="content main">
			<!-- 热门活动 -->
			<view class="hot_activity">
				<view class="activity_bar">热门活动</view>
				
				<view class="activity_column boder_none">
					<view class="activity_left">
						<view class="activity_img">
							<image src="/static/img/work_img.png" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>答题轻松赚百元</text>
								<view class="activity_tag">NEW <text></text></view>
							</view>
							<view class="activity_test1">朋友圈爆火 56+好友在玩</view>
						</view>
					</view>
					
					<view class="activity_right">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>试玩</text>
						</view>
					</view>
				</view>
				
				<view class="activity_column">
					<view class="activity_left">
						<view class="activity_img">
							<image src="/static/img/work_img.png" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>免费小说阅读器</text>
								<view class="activity_tag activity_tag1">HOT <text></text></view>
							</view>
							<view class="activity_test1">千万小说免费读</view>
						</view>
					</view>
					
					<view class="activity_right">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>+9999</text>
						</view>
					</view>
				</view>
				
				<view class="activity_column">
					<view class="activity_left">
						<view class="activity_img">
							<image src="/static/img/work_img.png" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>猜成语赢豪礼</text>
								<view class="activity_tag">NEW <text></text></view>
							</view>
							<view class="activity_test1">疯狂猜成语好礼多多</view>
						</view>
					</view>
					
					<view class="activity_right">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>试玩</text>
						</view>
					</view>
				</view>
				
				<view class="activity_column">
					<view class="activity_left">
						<view class="activity_img">
							<image src="/static/img/work_img.png" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>邀请好友赚金币</text>
								<view class="activity_tag activity_tag1">HOT <text></text></view>
							</view>
							<view class="activity_test1">首次邀请得一万金币，上不封顶</view>
						</view>
					</view>
					
					<view class="activity_right">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>+10000</text>
						</view>
					</view>
				</view>
				
				<view class="activity_column">
					<view class="activity_left">
						<view class="activity_img">
							<image src="/static/img/work_img.png" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>疯狂消星星</text>
								<view class="activity_tag activity_tag1">HOT <text></text></view>
							</view>
							<view class="activity_test1">畅爽消除，根本停不下来</view>
						</view>
					</view>
					
					<view class="activity_right">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>试玩</text>
						</view>
					</view>
				</view>
				
				<view class="activity_column">
					<view class="activity_left">
						<view class="activity_img">
							<image src="/static/img/work_img.png" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>转盘抽豪礼</text>
								<view class="activity_tag" v-if="false">NEW <text></text></view>
							</view>
							<view class="activity_test1">幸运大抽奖，收益赚不停</view>
						</view>
					</view>
					
					<view class="activity_right">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>抽奖</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 限时推荐-->
			<view class="hot_activity">
				<view class="activity_bar">限时推荐</view>
				
				<view class="activity_column boder_none">
					<view class="activity_left">
						<view class="activity_img">
							<image src="/static/img/work_img1.png" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>红包大派送</text>
								<view class="activity_tag" v-if="false">NEW <text></text></view>
							</view>
							<view class="activity_test1">幸运大抽奖，提现秒到账</view>
						</view>
					</view>
					
					<view class="activity_right">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>领取</text>
						</view>
					</view>
				</view>
				
				<view class="activity_column">
					<view class="activity_left">
						<view class="activity_img">
							<image src="/static/img/work_img1.png" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>红包限时领</text>
								<view class="activity_tag activity_tag1" v-if="false">HOT <text></text></view>
							</view>
							<view class="activity_test1">小小红包来了可提现</view>
						</view>
					</view>
					
					<view class="activity_right">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>+1000</text>
						</view>
					</view>
				</view>
				
				<view class="activity_column">
					<view class="activity_left">
						<view class="activity_img">
							<image src="/static/img/work_img1.png" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>欢乐小农场</text>
								<view class="activity_tag" v-if="false">NEW <text></text></view>
							</view>
							<view class="activity_test1">13708人在玩，每天种菜赚金币</view>
						</view>
					</view>
					
					<view class="activity_right">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>试玩</text>
						</view>
					</view>
				</view>
				
				<view class="activity_column">
					<view class="activity_left">
						<view class="activity_img">
							<image src="/static/img/work_img1.png" mode="widthFix"></image>
						</view>
						<view class="activity_test">
							<view class="">
								<text>幸运砸金蛋</text>
								<view class="activity_tag activity_tag1" v-if="false">HOT <text></text></view>
							</view>
							<view class="activity_test1">开心砸金蛋，100%中奖</view>
						</view>
					</view>
					
					<view class="activity_right">
						<view class="activity_btn">
							<view class="activity_btnImg">
								<image src="/static/img/work_btn.png" mode="widthFix"></image>
							</view>
							<text>+1000</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
export default{
	data() {
		return {
			userEn: [],  //我的信息
			myCoin: 0,  //我的金币
			todayCoin: 0,  //今日金币
			sign: 3,   //连续签到天数
			continuedSign: 4,  //距离领取下一次奖励所需要的天数
			nextReward: 5  //下一次奖励的金额
		}
	},
	onShow(){
		this.userEn = storage.getMyInfo();  //获取我的信息
		this.myCoin = this.userEn.gold;
	},
}
</script>

<style>
	.head_box{
		background-color:#fcd030;/* FFCA00 */
		width:100%;
		height:400rpx;
		color: #fff;
		padding:40rpx 40rpx 20rpx;
		box-sizing:border-box;
		position:relative;
		border-radius:0 0 20rpx 20rpx;
	}
	.coin{
		width:100%;
		display:flex;
		justify-content:space-between;
		align-items:center;
	}
	.coin>view{
		text-align:center;
	}
	.coin_num{
		font-weight:bold;
		font-size:24px;
	}
	.coin_test{
		font-size:14px;
		margin-top:20rpx;
	}
	.extract_btn{
		font-size:14px;
		border-radius: 60rpx;
		color:#FFCA00;
		padding:0 40rpx;
		box-sizing:border-box;
	}
	.tag:before{
		color:#FFCA00;
	}
	.signIn_box{
		width:100%;
		height:140rpx;
		background-color:#fff;
		margin-top:40rpx;
		border-radius:20rpx 200rpx 200rpx 20rpx;
		padding:20rpx;
		box-sizing:border-box;
		display:flex;
		align-items:center;
		position:relative;
	}
	.signIn_img{
		width:100rpx;
		height:100rpx;
	}
	.signIn_test{
		font-size:14px;
		color:#808080;
		margin-left:20rpx;
	}
	.continued_sign{
		margin-top:10rpx;
	}
	.countDown_box{
		width:120rpx;
		height:120rpx;
		border-radius:50%;
		background-color:#FFCA00;
		position: absolute;
		right:20rpx;
		color:#FF1409;
		text-align:center;
		line-height:120rpx;
		font-size:15px;
		font-weight:bolder;
	}
	.main{
		margin-top:60rpx;
	}
	.hot_activity{
		margin-top:20rpx;
	}
	.activity_bar{
		width:100%;
		height:40rpx;
		border-left:5px solid #FF5219;
		padding-left:20rpx;
		box-sizing:border-box;
		font-size:14px;	
		line-height:40rpx;
	}
	.activity_column{
		display:flex;
		justify-content:space-between;
		align-items:center;
		padding:40rpx 10rpx;
		box-sizing:border-box;
		border-top:1px solid #f5f5f5;
	}
	.boder_none{
		border:none;
	}
	.activity_left{
		display:flex;
	}
	.activity_img{
		width:80rpx;
		height:80rpx;
	}
	.activity_test{
		display:flex;
		flex-direction: column;
		font-size:14px;
		margin-left:20rpx;
	}
	.activity_test1{
		margin-top:10rpx;
		font-size:12px;
		color:#7a7a7a;
	}
	.activity_tag{
		display:inline-block;
		padding:0 4rpx;
		box-sizing:border-box;
		background-color:#ff4007;
		font-size:12px;
		color:#fff;
		position:relative;
		left:20rpx;
	}
	.activity_tag1{
		background-color:#ff8307;
	}
	.activity_tag>text{
		width:0rpx;
		height:0rpx;
		border-top:10rpx solid transparent;
		border-right:10rpx solid #ff4007;
		border-bottom:10rpx solid transparent;
		border-left:10rpx solid transparent;
		display:inline-block;
		position:absolute;
		left:-18rpx;
		top:6rpx;
	}
	.activity_tag1>text{
		border-right:10rpx solid #ff8307;		
	}
	.activity_btn{
		width:200rpx;
		padding:10rpx;
		box-sizing:border-box;
		/* background-color:#ff471f; */
		background-image:linear-gradient(to right, rgb(255, 71, 31) , rgb(255, 120, 3));
		font-size:14px;
		color:#fff;
		display:flex;
		align-items:center;
		border-radius:60rpx;
		box-shadow: 0px 3px 0px rgb(232, 11, 12), 0px 3px 0px rgb(232, 11, 12);
	}
	.activity_btnImg{
		width:50rpx;
		height:50rpx;
		margin-right:10rpx;
	}
</style>
