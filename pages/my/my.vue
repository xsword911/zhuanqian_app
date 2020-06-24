<template>
	<view class="container">
		<!-- 我的信息 -->
		<view class="my_info">
			<view class="info_left">
				<view class="my_headImg">
					<image src="/static/img/headImg.jpg" mode="widthFix"></image>
				</view>
				<view class="my_name">
					<text class="name">{{userName}}</text>
					<view class="yqm">
						邀请码：<text>{{yqm}}</text>
					</view>
				</view>
			</view>
			
			<view class="info_right">
				<button type="default" class="invite_btn">去邀请好友</button>
			</view>
			
			<view class="gold_coin">
				<view class="coin">
					<text>今日金币</text>
					<text class="coin_num">{{todayCoin}}</text>
				</view>
				
				<view class="coin">
					<text>当前金币</text>
					<text class="coin_num">{{currentCoin}}</text>
				</view>
				
				<view class="exchange">
					<button type="default" class="exchange_btn" @tap="show8">兑换现金</button>
				</view>
			</view>
		</view>
		
		<!-- 现金收益 -->
		<view class="content profit">
			<view class="profit_box">
				<text>现金收益</text>
				<view class="profit_info">
					<view>￥<text class="profit_num">{{profit}}</text></view>
					<view class="detailed" @tap="toDetailed">明细</view>
				</view>
			</view>
			
			<view class="extract_money">
				<button type="default" class="extract_btn" @tap="toExtractMoney">提现</button>
			</view>
		</view>
		
		<!-- 功能栏 -->
		<view class="content func">
			<view class="setting" @tap="toSetting">
				<view class="func_left">
					<view class="func_img">
						<image src="/static/img/share.png" mode="widthFix"></image>
					</view>
					<text class="func_test">设置</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="30"></tui-icon>
				</view>
			</view>
			
			<view class="share">
				<view class="func_left">
					<view class="func_img">
						<image src="/static/img/setting.png" mode="widthFix"></image>
					</view>
					<text class="func_test">分享给好友</text>
				</view>
				
				<view class="func_right">
					<tui-icon name="arrowright" :size="30"></tui-icon>
				</view>
			</view>
		</view>
		
		<!-- 金币换现金弹窗 -->		
		<tui-modal :show="modal8" @cancel="hide8" :custom="true">
			<view class="tui-modal-custom" style="position:relative;">
				<view class="close" @tap="hide8"><tui-icon name="shut" :size="16"></tui-icon></view>
				<view class="info">
					<view class="info_test">
						<view class="">
							我的金币
						</view>
						<view class="num ">
							3728
						</view>
						<view class="num tips">
							10000金币=1元
						</view>
					</view>
					
					<view class="info_test">
						<view class="">
							可兑换现金
						</view>
						<view class="num ">
							￥0.37
						</view>
					</view>
				</view>
				
				<view class="">
					<button type="default" class="exChange">立即兑换</button>
				</view>
				
				<view class="exchange_tips">
					金币只能兑换10000的倍数
				</view>
			</view>
		</tui-modal>
		
		<!-- 退出/登录按钮 -->
		<view class="btn">
			<button type="default" class="exit_btn" v-show="isLogin">退出登录</button>
			<button type="default" class="login_btn" v-show="!isLogin">前往登录</button>
		</view>
	</view>
</template>

<script>
// import icon from "@/components/tui-icon/tui-icon.vue";
import tuiModal from "@/components/tui-modal/tui-modal.vue";
export default{
	comments:{
		// icon
		tuiModal
	},
	data() {
		return {
			userName: '游客14314',  //用户昵称
			yqm: 45453453,  //邀请码
			todayCoin: 40,   //今日金币
			currentCoin: 2323,  //当前金币
			profit: 3.21  ,//现金收益
			modal8: false,  //控制金币换现金弹窗显示
			isLogin: true,  //是否已登录
		}
	},
	methods:{
		//跳转到设置页
		toSetting(){
			uni.navigateTo({
				url: '/pages/my/setting/setting'
			})
		},
		//跳转到现金收益明细页
		toDetailed(){
			uni.navigateTo({
				url: '/pages/my/detailed/detailed'
			})			
		},
		//跳转到提现页
		toExtractMoney(){
			uni.switchTab({
			    url: '/pages/extractMoney/extractMoney'
			});
		},
		hide8() {
			this.modal8 = false;
		},
		show8() {
			this.modal8 = true;
		},
	}
}
</script>

<style>
	.content{
		padding:0 20rpx;
		box-sizing:border-box;
	}
	image{
		width:100%;
		height:100%;
	}
	.my_info{
		width:100%;
		height:320rpx;
		background-color:#fcd030;
		padding:20rpx;
		box-sizing:border-box;
		display:flex;
		align-items:center;
		justify-content:space-between;
		position:relative;
	}
	.info_left{
		display:flex;
		align-items:center;
	}
	.my_headImg{
		width:150rpx;
		height:150rpx;
		border-radius:50%;
		overflow:hidden;
	}
	.my_name{
		margin-left:20rpx;
	}
	.name{
		color:#000;
		font-weight:bold;
	}
	.yqm{
		font-size:15px;
		background-color:#fcdb63;
		padding:10rpx;
		margin-top:10rpx;
	}
	.invite_btn{
		outline:none;
		background-color:#000;
		color:#fcd030;
		border-radius:30rpx;
		width:200rpx;
		font-size:14px;
	}
	.gold_coin{
		width:92%;
		height:200rpx;
		background-color:#fff;
		border-radius:10rpx;
		position:absolute;
		bottom:-140rpx;
		left:50%;
		transform:translateX(-50%);
		box-shadow: 5px 7px 10px rgb(247, 247, 247), -5px 7px 10px rgb(247, 247, 247);
		display:flex;
		justify-content:space-between;
		align-items:center;
		padding:0 20rpx;
		box-sizing:border-box;
	}
	.coin{
		display:flex;
		flex-direction:column;
		align-items:center;
		font-size:14px;
	}
	.coin_num{
		font-size:20px;
		margin-top:20rpx;
	}
	.exchange_btn{
		border-radius:20rpx;
		outline:none;
		background-color:#e7ecf2;
		font-size:15px;
	}
	.exchange_btn::after{
		border:none;		
	}
	.profit{
		width:96%;
		height:160rpx;
		background-color:#fff8de;
		margin-top:200rpx;
		margin:200rpx auto 0;
		border-radius:10rpx;
		padding:40rpx;
		display:flex;
		justify-content:space-between;
	}
	.detailed{
		font-size:13px;
		border:1px solid #879299;
		width:100rpx;
		text-align:center;
		border-radius:20rpx;
		margin-left:20rpx;
		padding:6rpx 0;
		box-sizing:border-box;
	}
	.profit_info{
		display:flex;
		align-items:center;
		font-size:14px;
		margin-top:10rpx;
	}
	.profit_num{
		font-size:22px;
		font-weight:bold;
	}
	.profit_box{
		font-size:14px;
	}
	.extract_btn{
		background-color:#fcd030;
		border-radius:30rpx;
		width:180rpx;
		height:60rpx;
		font-size:14px;
		line-height:60rpx;
	}
	.extract_btn::after{
		border:none;		
	}
	.func_img{
		width:55rpx;
		height:55rpx;
	}
	.func_left{
		font-size:14px;
		display:flex;
		align-items:center;
	}
	.func_test{
		margin-left:12rpx;
	}
	.setting, .share{
		display:flex;
		justify-content:space-between;
		margin-top:20rpx;
	}
	.close{
		position:absolute;
		right:0;
		top:0;
	}
	.info{
		display:flex;
		width:100%;
		font-size:12px;
	}
	.info_test{
		width:50%;
	}
	.num{
		font-size:16px;
		margin-top:20rpx;
	}
	.tips{
		font-size:12px;
		background-color:#ff6b17;
		width:auto;
		text-align:center;
		color:#fff;
	}
	.exChange{
		margin-top:30rpx;
		background-color:#d1d1d1;
		border-radius:30rpx;
		color:#fff;
		font-size:14px;
	}
	.exChange:after{
		border: none;
	}
	.exchange_tips{
		width:100%;
		margin-top:20rpx;
		font-size:12px;
		text-align:center;
	}
	.btn{
		margin-top:40rpx;
	}
	.exit_btn, .login_btn{
		width:90%;
		border-radius:60rpx;
		font-size:15px;
		background-color:#fcd030;
	}
	.exit_btn:after, .login_btn:after{
		border:none;
	}
</style>
