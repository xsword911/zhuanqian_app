<template>
	<view class="tabs">	
		<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" class="tab_class"
		:scrollFlag='true' :isEqually='true' @clickItem="onClickItem"></tabControl>
		
		<swiper :current="current" class="swiper-box" style="flex: 1;" :duration="200" @change="ontabchange">
			<swiper-item class="swiper-item" style="flex: 1;">
				<view class="" style="flex: 1;">
					<view class="modify_box">
						<text>旧登录密码</text>
						<input type="text" v-model="pwdOld" :password="isOldPwd" />
						<view class="open_pwd" @tap="isOldPassWord">
							<tui-icon name="eye" :size="30"></tui-icon>
						</view>
					</view>
					
					<view class="modify_box" >
						<text>新登录密码</text>
						<input type="text" v-model="pwd" :password="isPwd" />
						<view class="open_pwd" @tap="isPassWord">
							<tui-icon name="eye" :size="30"></tui-icon>
						</view>
					</view>
					
					<view class="modify_box">
						<text>确认密码</text>
						<input type="text" v-model="pwd2" />
					</view>
					<view class="modify_test">
						请填写信息
					</view>
					
					<view class="apply_friend btn_style">
						<button type="primary" @tap="apply(0)" hover-class="btn_hover">提交</button>
					</view>
				</view>
			</swiper-item>
			
			
			
			<swiper-item class="swiper-item" style="flex: 1;">
				<view class="" style="flex: 1;" v-show="userBankShow">
					<view class="modify_box">
						<text>旧资金密码</text>
						<input type="text" v-model="pwdBankOld" :password="isOldPwdBank" />
						<view class="open_pwd" @tap="isOldPassBankWord">
							<tui-icon name="eye" :size="30"></tui-icon>
						</view>
					</view>
					
					<view class="modify_box" >
						<text>新资金密码</text>
						<input type="text" v-model="pwdBank" :password="isPwdBank" />
						<view class="open_pwd" @tap="isPassBankWord">
							<tui-icon name="eye" :size="30"></tui-icon>
						</view>
					</view>
					
					<view class="modify_box">
						<text>确认密码</text>
						<input type="text" v-model="pwdBank2" />
					</view>
					<view class="modify_test">
						请填写信息
					</view>
					
					<view class="apply_friend btn_style">
						<button type="primary" @tap="apply(1)" hover-class="btn_hover">提交</button>
					</view>
			</view>
				
			<view class="data_lack" v-show="!userBankShow" style="flex: 1;">
				<view class="lack_box">
					<tui-icon name="nodata" :size="120"></tui-icon>
					<text class="lack_test">您还没有绑定银行卡</text>
					<button type="default" class="coin_query" hover-class="btn_hover" @tap="toMoneyChange">去绑定银行卡</button>
				</view>
			</view>
			
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import storage from "@/api/storage.js";
import util from "@/common/util.js";
import api from "@/api/api.js";
import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
import md5 from "@/common/md5.js";
export default{
	components: {
		tabControl
	},
	data() {
		return {
			pwd:  null,  //新密码
			pwd2: null,  //确认密码
			pwdOld:  null, //旧密码
			isOldPwd: true,  //旧密码栏类型
			isPwd: true,  //新密码栏类型
			
			pwdBank:  null,  //新资金密码
			pwdBank2: null,  //确认资金密码
			pwdBankOld:  null, //旧资金密码
			isOldPwdBank: true,  //资金旧密码栏类型
			isPwdBank: true,  //资金新密码栏类型
			
			userEn: [],  //我的信息
			uid: "",  //uid
			items: ['修改登录密码', '修改资金密码'],
			current: 0,
			userBankShow: true,  //用户是否有绑定银行卡
			userBankEn: [],  //用户银行卡信息
		}
	},
	onShow(){
		this.uid = storage.getUid();  //获取uid
		this.userEn = storage.getMyInfo();
		this.getUserBank();  //获取用户绑定银行卡信息
	},
	onLoad(res){
		util.setBarTitle('修改密码');
	},
	methods:{
		//获取用户绑定银行卡信息
		getUserBank(){
			api.getUserBank({uid: this.uid, page: 1, count: 5}, (res)=>{
				let data = api.getData(res).data;
				//没有绑定银行卡时显示暂无信息
				if(data.length == 0){
					this.userBankShow = false;
				}else{
					this.userBankEn = data[0];  //获取用户银行卡信息
				}
			});
		},
		//顶部选项卡操作
		onClickItem(val) {
		    this.current = val.currentIndex;
		},
		ontabchange(e) {
			this.current = e.target.current;
		},
		//查看新密码
		isPassWord(){
			this.isPwd = this.isPwd ? false : true;
		},
		//查看旧密码
		isOldPassWord(){
			this.isOldPwd = this.isOldPwd ? false : true;
		},
		//查看资金新密码
		isPassBankWord(){
			this.isPwdBank = this.isPwdBank ? false : true;
		},
		//查看资金旧密码
		isOldPassBankWord(){
			this.isOldPwdBank = this.isOldPwdBank ? false : true;
		},
		
		//判断修改信息是否合法  type 0:修改账号密码 1:修改资金密码
		apply(type){
			//验证修改账号密码信息
			if(type == 0){
				if(util.isEmpty(this.pwdOld) || util.isEmpty(this.pwd)){
					uni.showModal({
						content: "修改信息不能为空",
						showCancel: false
					});
					return;
				}else if(this.pwd.length < 6){
					uni.showModal({
						content: "密码长度不能小于6位",
						showCancel: false
					});
					return;
				}else if(this.pwd.length > 12){
					uni.showModal({
						content: "密码长度不能大于12位",
						showCancel: false
					});
					return;
				}else if(this.pwd2 != this.pwd){
					uni.showModal({
						content: "二次密码输入不一致",
						showCancel: false
					});
					return;
				}
				let data = {
					pwdOld: md5(this.pwdOld),
					pwd: md5(this.pwd),
					uid: this.uid
				};
				this.submitPwd(data);	  //提交账号密码修改
			}
			//验证修改资金密码信息
			else if(type == 1){
				if(util.isEmpty(this.pwdBankOld) || util.isEmpty(this.pwdBank)){
					uni.showModal({
						content: "修改信息不能为空",
						showCancel: false
					});
					return;
				}else if(this.pwdBank.length < 6){
					uni.showModal({
						content: "密码长度不能小于6位",
						showCancel: false
					});
					return;
				}else if(this.pwdBank.length > 12){
					uni.showModal({
						content: "密码长度不能大于12位",
						showCancel: false
					});
					return;
				}else if(this.pwdBank2 != this.pwdBank){
					uni.showModal({
						content: "二次密码输入不一致",
						showCancel: false
					});
					return;
				}
				let data = {
					pwdOld: md5(this.pwdBankOld),
					pwd: md5(this.pwdBank),
					id: this.userBankEn.id
				};
				this.submitUserBankPwd(data);	  //提交资金密码修改
			}
		},
		//提交账号密码修改
		submitPwd(data){
			api.updPwd(data, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				if(code == 0){
					uni.showModal({
						content: msg,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								uni.navigateBack({
									delta: 1
								})
							};
						}
					});
				}else{
					uni.showModal({
						content: msg,
						showCancel: false
					});
				}
			});
		},
		//提交资金密码修改
		submitUserBankPwd(data){
			api.updCashPwd(data, (res)=>{
				let code = api.getCode(res);
				let msg = api.getMsg(res);
				if(code == 0){
					uni.showModal({
						content: msg,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								uni.navigateBack({
									delta: 1
								})
							};
						}
					});
				}else{
					uni.showModal({
						content: msg,
						showCancel: false
					});
				}
			});
		},
	}
}
</script>

<style>
	page {
	    width: 100%;
	    min-height: 100%;
	    display: flex;
	}
	
	.tabs {
	    width:100%;
		display:flex;
	    flex-direction: column;
	    overflow: hidden;
	    background-color: #ffffff;
	}
	/* 指定h5高度样式, app样式高度为组件内定义 */
	.tab_class{
		/* #ifdef H5 */
		margin-top:44px;  
		/* #endif */
		
		/* #ifdef APP-NVUE */
		margin-top:0px;
		/* #endif */
	}
	.swiper-item {
			display:flex;
	        flex: 1;
	        flex-direction: row;
	/* 		justify-content: center;
			align-items: center; */
	    }
	.swiper-box {
	    flex: 1;
		margin-top:30px;
	}
	.data_lack{
		flex: 1;
	}
	.lack_box{
		width:100%;
		height:700rpx;
		display:flex;
		justify-content:center;
		align-items:center;
		flex-direction:column;
	}
	.lack_box>button{
		margin-top:40rpx;
		background-color:#fcd030;
		font-size:16px;
		border-radius:40rpx;
		width:400rpx;
	}
	.lack_test{
		font-size:16px;
		margin-top:20rpx;
		display:inline-block;
	}
	
	
		
		
		
	.modify_box{
		border-bottom: 1px solid #808080;
		width:90%;
		margin:0 auto;
		padding-top:50rpx;
		padding-left:15rpx;
		box-sizing:border-box;
		position:relative;
	}
	.modify_box text{
		font-size:14px;
	}
	.modify_test{
		color:#808080;
		font-size:14px;
		padding-left:30rpx;
		box-sizing:border-box;
		margin-top:10rpx;
	}
	.apply_friend{
		margin-top:100rpx;
	}
	.apply_friend button{
		font-size:14px;
		width:60%;
		border-radius:40rpx;
	}
	.open_pwd{
		position:absolute;
		right:20rpx;
		top:70%;
		transform:translateY(-50%);
	}
</style>
