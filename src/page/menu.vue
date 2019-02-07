<template>
    <div>
        <HeadTop></HeadTop>
        <MenuPie></MenuPie>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop'
    import MenuPie from '../components/Charts/menuPie'

    export default {
        name: "menu",
        components: {
            HeadTop,
            MenuPie
        }
    }
</script>

<style scoped>

</style>
