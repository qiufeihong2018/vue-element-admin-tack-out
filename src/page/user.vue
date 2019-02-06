<template>
    <div>
        <HeadTop></HeadTop>
        <UserPie></UserPie>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop'
    import UserPie from '../components/Charts/userPie'

    export default {
        components: {
            HeadTop,
            UserPie,
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
</style>
