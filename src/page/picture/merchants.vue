<template>
    <div>
        <HeadTop/>
        <MerchantsPie></MerchantsPie>
    </div>
</template>

<script>
    import HeadTop from '../../components/HeadTop'
    import MerchantsPie from '../../components/Charts/merchantsPie'
    export default {
        name: "merchants",
        components: {
            HeadTop,
            MerchantsPie
        }
    }
</script>

