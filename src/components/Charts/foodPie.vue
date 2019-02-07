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
                    jiangzhecai: 91256,
                    beijingcai: 54894,
                    minnancai: 45421,
                    sichuancai: 65515,
                    qita: 150051
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
                            text: '商品热度分布',
                            subtext: '',
                            x: 'center',
                            top:'20%'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series: [
                            {
                                name: '商品来源',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: [
                                    {value: this.pieData.jiangzhecai, name: '江浙菜'},
                                    {value: this.pieData.beijingcai, name: '北京菜'},
                                    {value: this.pieData.minnancai, name: '闽南菜'},
                                    {value: this.pieData.sichuancai, name: '四川菜'},
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
