<template>
    <div class="fillcontain">
        <HeadTop></HeadTop>
        <p class="explain_text">后台管理系统</p>
        <p class="explain_text">第一次登录的用户自动注册成为普通管理员</p>
        <p class="explain_text">普通管理员可以添加，修改信息</p>
        <p class="explain_text">超级管理员可以删除信息外卖后台系统主要管理者提供用户列表、商家列表、食品列表等。</p>
        <p class="explain_text">为管理员减少操作提供了技术支持。添加删除数据更加方便。</p>
    </div>
</template>

<script>
	import HeadTop from '../components/HeadTop'
    export default {
    	components: {
    		HeadTop,
    	},
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>
