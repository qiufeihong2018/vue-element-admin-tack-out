<template>
    <div class="echarts">
        <div ref="echarts" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        mounted() {
            this.myChart = echarts.init(this.$refs.echarts);
            this.initData();
        },
        props: ['sevenDate', 'sevenDay'],
        methods: {
            initData() {
                const colors = ['#ff0000', '#00ff00', '#0000ff'];
                const option = {
                    color: colors,
                    title: {
                        text: '一周走势图',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['新注册买家', '新增订单', '新增管理员']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.sevenDay
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '买家',
                            min: 0,
                            max: 10,
                            position: 'left',
                            axisLine: {
                                lineStyle: {
                                    color: '#999'
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            name: '订单',
                            min: 0,
                            max: 10,
                            position: 'right',
                            axisLine: {
                                lineStyle: {
                                    color: '#999'
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                    ],
                    series: [
                        {
                            name: '新注册买家',
                            type: 'line',
                            data: this.sevenDate[0],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name: '新增订单',
                            type: 'line',
                            data: this.sevenDate[1],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name: '新增管理员',
                            type: 'line',
                            data: this.sevenDate[2],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        }
                    ]
                };
                this.myChart.setOption(option);
            }
        },
        watch: {
            sevenDate: function () {
                this.initData()
            },
            sevenDay: function () {
                this.initData()
            }
        }
    }
</script>

<style lang="stylus">
    .echarts
        display flex
        justify-content center
</style>
