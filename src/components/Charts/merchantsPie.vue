<template>
    <div ref="id" style="width: 100%;height:450px;"/>
</template>

<script>
    import echarts from 'echarts'
    import resize from './mixins/resize'
    import * as apiEcharts from '@/api/echarts'

    export default {
        mixins: [resize],
        data() {
            return {
                chart: '',
                pieData: {
                    beijing: 5000,
                    shanghai: 4000,
                    shenzhen: 3025,
                    hangzhou: 3055,
                    qita: 4582
                },
                options: {}
            }
        },
        created() {
            this.getData()
        },
        mounted() {
            this.chart = echarts.init(this.$refs.id)
            this.initChart()
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.options = {
                    title: {
                        text: '卖家分布',
                        subtext: '',
                        x: 'center',
                        top: '20%'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '买家来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: this.pieData.beijing, name: '北京'},
                                {value: this.pieData.shanghai, name: '上海'},
                                {value: this.pieData.shenzhen, name: '深圳'},
                                {value: this.pieData.hangzhou, name: '杭州'},
                                {value: this.pieData.qita, name: '其他'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
                this.chart.setOption(this.options)
            },
            getData() {
                apiEcharts.getUserCity().then(res => {
                    this.pieData = res.data.user_city
                })
            }
        }
    }
</script>
