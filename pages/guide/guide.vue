<template>
	<view class="container" style="background-color: #fff;font-size:14px;">
		<view class="" v-for="(item,index) in guideList" :key="index">
			<view class="question">{{item.title}}</view>
			<view class="answer">
				<p style="white-space: pre-wrap;" v-html="item.content"></p>
			</view>
		</view>
		
<!-- 		<view class="">
			<view class="question">问：怎么计算升级分佣和任务分佣奖励？</view>
			<view class="answer">
			答：
			<text class="question">升级分佣--</text>例如你的下级A成功充值3000元升级铂金会员，
			您可获得A升级分佣10%等于300元，以此类推。A的下级（B） 
			升级会员你依然可以获得二级分佣2%，B的推的C 升级会员你还可以获得1%.
			
			<text class="question">任务分佣--</text>--例如你的下级A是铂金会员 他每天做任务可以获得175元，
			您每天可以获得任务分佣17.5元，只要下级一直做任务，你每天就可以一直获得任务分佣。
			B 级 C级以此类推。可以无限获得3级裂变收益，轻松月入过万。
			</view>
		</view> -->
		
<!-- 		<view class="">
			<view class="question">问：怎么下载APP？</view>
			<view class="answer">
			答：登入平台首页，点击APP下载根据提示操作即可。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：如何赚钱？</view>
			<view class="answer">
			答：注册会员后，根据会员等级领取相关任务，完成任务后上传凭证即可。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：做任务必须升级VIP吗？</view>
			<view class="answer">
			答：注册成功即可成为青铜会员，每日可领取三个任务，如需领取更多任务，
			可根据需求升级相应VIP等级。升级VIP只需要补差价，例如您冲了300升级白银VIP,
			还想继续升级黄金，黄金原价1000元，继续升级只需要补差价700元即可。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：任务可以累积到次日完成吗？</view>
			<view class="answer">
			答：当天任务数需当天完成，逾期视为自动放弃任务。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：领取任务需要多久完成，审核时间多少？</view>
			<view class="answer">
			答：领取的任务需当天完成，审核时间为24小时。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：邀请如何赚钱?</view>
			<view class="answer">
			答：邀请好友可获得充值升级分佣和任务分佣两种奖励，.最高为三级奖励（A：10%）（B：2%）（C：1%）
			</view>
		</view>
		
		<view class="">
			<view class="question">问：如何计算A/B/C三级分佣？</view>
			<view class="answer">
			答：直属代理用户为A层代理，A的直属代理为B层代理，B的直属代理为C层代理，您可以获得以上所有用户的升级分佣和任务分佣。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：如何提现/提现时间多久到账？</view>
			<view class="answer">
			答：登入会员区“我的.”完善个人信息后点击“提现”即可，到账时间24小时内。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：如何充值/多久到账？</view>
			<view class="answer">
			答：登入会员区“我的.”点击“充值”根据提示完成后上传凭证，点击完成支付30分钟内到账。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：充值和提现最低金额?</view>
			<view class="answer">
			答：充值和提现最低金额5元起!
			</view>
		</view>
		
		<view class="">
			<view class="question">问：余额生金是什么？</view>
			<view class="answer">
			答：余额生金是平台推出的理财产品，目前上线四款产品可以购买。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：是否有风险？收益是固定的吗？</view>
			<view class="answer">
			答：余额生金为固定收益产品，用户不承担任何风险。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：收益怎么结算？购买产品后是否可以提前取出？</view>
			<view class="answer">
			答：产品为到期时间返还本金及收益，未到期可以提前卖出，不计算期间收益并扣除1.0%手续费用。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：怎么邀请好友加入自己团队？</view>
			<view class="answer">
			答：首页点击邀请好友，分享二维码或者链接（如注册页面无显示邀请码需手动输入），注册完成即可。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：我可以通过平台发布需求吗？</view>
			<view class="answer">
			答：如需进行推广，请联系在线客服洽谈。
			</view>
		</view>
		
		<view class="">
			<view class="question">问：任务作品被作者只有作者关注的人才能评论，还需评论吗？</view>
			<view class="answer">
			答：如遇以上此类作品不需要评论，只需点赞关注，上传任务截图即可。钻石、至尊会员可以接高价评论单
			</view>
		</view> -->
		
	</view>
</template>

<script>
import api from "@/api/api.js";
export default{
	data() {
		return {
			guideList: [],  //新手指南列表
		}
	},
	onShow() {
		this.getInformation();  //获取新手指南列表
	},
	methods:{
		getInformation(){
			api.getInformation({type: 3, page: 1, count: 99}, (res)=>{
				let data = api.getData(res).data;
				this.guideList = data;
				console.log(this.guideList);
			});
		},
	}
	
}
</script>

<style>
	.question{
		color: #9b59b6;
	}
	.container{
	}
	.container>view{
		margin-bottom:50rpx;
	}
</style>

