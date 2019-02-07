<template>
    <div>
        <HeadTop></HeadTop>
        <AdminPie></AdminPie>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop'
    import AdminPie from '../components/Charts/adminPie'

    export default {
        name: "admin",
        components: {
            HeadTop,
            AdminPie
        }
    }
</script>

<style scoped>

</style>
