<template>
    <div>
        <HeadTop/>
        <FoodPie></FoodPie>
    </div>
</template>

<script>
    import HeadTop from '../../components/HeadTop'
    import FoodPie from '../../components/Charts/foodPie'
    export default {
        name: "food",
        components: {
            HeadTop,
            FoodPie
        }
    }
</script>

<style scoped>

</style>
