let echartsDatas = eval('(' + $('#echartsDatas').text() + ')');

setInterval(function() {
    $('#echartsDatas').click();
}, 2000);

/*
// prettier-ignore
const femaleData = [[]]
// prettier-ignore
const maleDeta = [[]]

function calculateSum(data, dim) {
  return data.length;
}

const scatterOption = (option = {
  legend: {},
  xAxis: {
    scale: true
  },
  yAxis: {
    scale: true
  },
  series: [
    {
      type: 'scatter',
      id: 'female',
      name: 'female',
      dataGroupId: 'female',
      universalTransition: {
        enabled: true,
        delay: function (idx, count) {
          return Math.random() * 400;
        }
      },
      data: femaleData
    },
    {
      type: 'scatter',
      id: 'male',
      name: 'male',
      dataGroupId: 'male',
      universalTransition: {
        enabled: true,
        delay: function (idx, count) {
          return Math.random() * 400;
        }
      },
      data: maleDeta
    }
  ]
});
const barOption = {
  grid: {},
  dataset: {
    source: [
      ['', 'male', 'female'],
      ['male', 124, 0],
      ['female', 0, 132]
    ]
  },
  xAxis: {
    type: 'category',
    data: ['male', 'female']
  },
  yAxis: {type: 'value'},
  legend: {},
  series: [
    {
      id: 'male',
      type: 'bar',
      stack: 'total',
      universalTransition: {
        enabled: true,
        delay: function (idx, count) {
          return Math.random() * 400;
        }
      },
    },
    {
      id: 'female',
      type: 'bar',
      stack: 'total',
      universalTransition: {
        enabled: true,
        delay: function (idx, count) {
          return Math.random() * 400;
        }
      },
    }
  ]
};
let currentOption = scatterOption;
setInterval(function () {
  currentOption = currentOption === scatterOption ? barOption : scatterOption;
  myChart.setOption(currentOption, true);
}, 2000);
 */

// 混合图模块1
(function() {
    var myChart = echarts.init(document.querySelector(".mix1 .chart"));

    function calculateSum(data) {
        return data.length;
    }

    function getScatterSeries(mix1, currentCluster) {
        let scatter_series = [];
        for (let i = 0; i < mix1['n_clusters'][currentCluster]; i++) {
            scatter_series.push({
                type: 'scatter',
                id: 'cluster ' + (i + 1),
                name: 'cluster ' + (i + 1),
                dataGroupId: 'cluster ' + (i + 1),
                symbolSize: 5,
                universalTransition: {
                    enabled: true,
                    delay: function (idx, count) {
                        return Math.random() * 400;
                    }
                },
                data: mix1['data'][currentCluster][i],
            });
        }
        return scatter_series;
    }

    function getBarAxisData(mix1, currentCluster) {
        let bar_axis_data = [];
        for (let i = 0; i < mix1['n_clusters'][currentCluster]; i++) {
            bar_axis_data.push('cluster ' + (i + 1))
        }
        return bar_axis_data;
    }

    function getBarSeriesData(mix1, currentCluster) {
        let bar_series_data = [];
        for (let i = 0; i < mix1['n_clusters'][currentCluster]; i++) {
            bar_series_data.push({
                value: calculateSum(mix1['data'][currentCluster][i]),
                groupId: 'cluster ' + (i + 1)
            });
        }
        return bar_series_data;
    }

    function getBarUniversalTransitionSeriesKey(mix1, currentCluster) {
        let bar_universalTransition_seriesKey = [];
        for (let i = 0; i < mix1['n_clusters'][currentCluster]; i++) {
            bar_universalTransition_seriesKey.push('cluster ' + (i + 1))
        }
        return bar_universalTransition_seriesKey;
    }

    let currentCluster = 0;
    let mix1 = echartsDatas['mix1'];
    let scatter_series = getScatterSeries(mix1, currentCluster);
    let bar_axis_data = getBarAxisData(mix1, currentCluster);
    let bar_series_data = getBarSeriesData(mix1, currentCluster);
    let bar_universalTransition_seriesKey = getBarUniversalTransitionSeriesKey(mix1, currentCluster);

    var scatterOption = {
        color: ['#1089e7', '#f57474', '#56d0e3', '#f8b448', '#8b78f6'],
        grid: {
            top: '30px',
            left: '15px',
            right: '10px',
            bottom: '10px',
            containLabel: true
        },
        xAxis: {
            name: echartsDatas['mix1']['id'][0],
            show: true,
            nameLocation: 'center',
            nameTextStyle: {
                color: '#4c9bfd',
                fontSize: '12px',
            },
            nameGap: 20,
            scale: true,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            name: echartsDatas['mix2']['id'][1],
            show: true,
            nameLocation: 'center',
            nameTextStyle: {
                color: '#4c9bfd',
                fontSize: '12px',
            },
            nameGap: 25,
            scale: true,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        series: scatter_series
    };
    var barOption = {
        color: ['#1089e7', '#f57474', '#56d0e3', '#f8b448', '#8b78f6'],
        grid: {
            top: '30px',
            left: '15px',
            right: '10px',
            bottom: '10px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: bar_axis_data,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            name: '数量',
            show: true,
            nameTextStyle: {
                color: '#4c9bfd'
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        series: [
            {
                label: {
                    show: true
                },
                type: 'bar',
                id: 'total',
                data: bar_series_data,
                colorBy: 'data',
                universalTransition: {
                    enabled: true,
                    seriesKey: bar_universalTransition_seriesKey,
                    delay: function (idx, count) {
                        return Math.random() * 400;
                    }
                }
            }
        ]
    };

    let currentOption = scatterOption;
    document.querySelector('#echartsDatas').addEventListener('click', function() {
        currentOption = currentOption === scatterOption ? barOption : scatterOption;
        $('.mix1 a').eq(currentCluster).css('color', 'rgba(255, 255, 255, 1');
        $('.mix1 a').eq(1 - currentCluster).css('color', 'rgba(255, 255, 255, .3');
        myChart.setOption(currentOption, true);
    });

    $('.mix1 h2').on('click', 'a', function() {
        let id = $(this).index();
        currentCluster = id;

        scatter_series = getScatterSeries(mix1, currentCluster);
        bar_axis_data = getBarAxisData(mix1, currentCluster);
        bar_series_data = getBarSeriesData(mix1, currentCluster);
        bar_universalTransition_seriesKey = getBarUniversalTransitionSeriesKey(mix1, currentCluster);

        scatterOption.series = scatter_series;
        barOption.xAxis.data = bar_axis_data;
        barOption.series[0].data = bar_series_data;
        barOption.series[0].universalTransition.seriesKey = bar_universalTransition_seriesKey;
    })

    window.addEventListener('resize', function() {
        myChart.resize();
    })
})();

//混合图模块2
(function() {
    var myChart = echarts.init(document.querySelector(".mix2 .chart"));

    function calculateSum(data) {
        return data.length;
    }

    function getScatterSeries(mix2, currentCluster) {
        let scatter_series = [];
        for (let i = 0; i < mix2['n_clusters'][currentCluster]; i++) {
            scatter_series.push({
                type: 'scatter',
                id: 'cluster ' + (i + 1),
                name: 'cluster ' + (i + 1),
                dataGroupId: 'cluster ' + (i + 1),
                symbolSize: 5,
                universalTransition: {
                    enabled: true,
                    delay: function (idx, count) {
                        return Math.random() * 400;
                    }
                },
                data: mix2['data'][currentCluster][i],
            });
        }
        return scatter_series;
    }

    function getBarAxisData(mix2, currentCluster) {
        let bar_axis_data = [];
        for (let i = 0; i < mix2['n_clusters'][currentCluster]; i++) {
            bar_axis_data.push('cluster ' + (i + 1))
        }
        return bar_axis_data;
    }

    function getBarSeriesData(mix2, currentCluster) {
        let bar_series_data = [];
        for (let i = 0; i < mix2['n_clusters'][currentCluster]; i++) {
            bar_series_data.push({
                value: calculateSum(mix2['data'][currentCluster][i]),
                groupId: 'cluster ' + (i + 1)
            });
        }
        return bar_series_data;
    }

    function getBarUniversalTransitionSeriesKey(mix2, currentCluster) {
        let bar_universalTransition_seriesKey = [];
        for (let i = 0; i < mix2['n_clusters'][currentCluster]; i++) {
            bar_universalTransition_seriesKey.push('cluster ' + (i + 1))
        }
        return bar_universalTransition_seriesKey;
    }

    let currentCluster = 0;
    let mix2 = echartsDatas['mix2'];
    let scatter_series = getScatterSeries(mix2, currentCluster);
    let bar_axis_data = getBarAxisData(mix2, currentCluster);
    let bar_series_data = getBarSeriesData(mix2, currentCluster);
    let bar_universalTransition_seriesKey = getBarUniversalTransitionSeriesKey(mix2, currentCluster);

    var scatterOption = {
        color: ['#1089e7', '#f57474', '#56d0e3', '#f8b448', '#8b78f6'],
        grid: {
            top: '30px',
            left: '15px',
            right: '10px',
            bottom: '10px',
            containLabel: true
        },
        xAxis: {
            name: echartsDatas['mix2']['id'][0],
            show: true,
            nameLocation: 'center',
            nameTextStyle: {
                color: '#4c9bfd',
                fontSize: '12px',
            },
            nameGap: 20,
            scale: true,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            name: echartsDatas['mix2']['id'][1],
            show: true,
            nameLocation: 'center',
            nameTextStyle: {
                color: '#4c9bfd',
                fontSize: '12px',
            },
            nameGap: 25,
            scale: true,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        series: scatter_series
    };
    var barOption = {
        color: ['#1089e7', '#f57474', '#56d0e3', '#f8b448', '#8b78f6'],
        grid: {
            top: '30px',
            left: '15px',
            right: '10px',
            bottom: '10px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: bar_axis_data,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            name: '数量',
            show: true,
            nameTextStyle: {
                color: '#4c9bfd'
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        series: [
            {
                label: {
                    show: true
                },
                type: 'bar',
                id: 'total',
                data: bar_series_data,
                colorBy: 'data',
                universalTransition: {
                    enabled: true,
                    seriesKey: bar_universalTransition_seriesKey,
                    delay: function (idx, count) {
                        return Math.random() * 400;
                    }
                }
            }
        ]
    };

    // myChart.setOption(scatterOption);
    let currentOption = scatterOption;
    document.querySelector('#echartsDatas').addEventListener('click', function() {
        currentOption = currentOption === scatterOption ? barOption : scatterOption;
        $('.mix2 a').eq(currentCluster).css('color', 'rgba(255, 255, 255, 1');
        $('.mix2 a').eq(1 - currentCluster).css('color', 'rgba(255, 255, 255, .3');
        myChart.setOption(currentOption, true);
    });

    $('.mix2 h2').on('click', 'a', function() {
        let id = $(this).index();
        currentCluster = id;

        scatter_series = getScatterSeries(mix2, currentCluster);
        bar_axis_data = getBarAxisData(mix2, currentCluster);
        bar_series_data = getBarSeriesData(mix2, currentCluster);
        bar_universalTransition_seriesKey = getBarUniversalTransitionSeriesKey(mix2, currentCluster);

        scatterOption.series = scatter_series;
        barOption.xAxis.data = bar_axis_data;
        barOption.series[0].data = bar_series_data;
        barOption.series[0].universalTransition.seriesKey = bar_universalTransition_seriesKey;
    })

    window.addEventListener('resize', function() {
        myChart.resize();
    })
})();

//混合图模块3
(function() {
    var myChart = echarts.init(document.querySelector(".mix3 .chart"));

    function calculateSum(data) {
        return data.length;
    }

    function getScatterSeries(mix3, currentCluster) {
        let scatter_series = [];
        for (let i = 0; i < mix3['n_clusters'][currentCluster]; i++) {
            scatter_series.push({
                type: 'scatter',
                id: 'cluster ' + (i + 1),
                name: 'cluster ' + (i + 1),
                dataGroupId: 'cluster ' + (i + 1),
                symbolSize: 5,
                universalTransition: {
                    enabled: true,
                    delay: function (idx, count) {
                        return Math.random() * 400;
                    }
                },
                data: mix3['data'][currentCluster][i],
            });
        }
        return scatter_series;
    }

    function getBarAxisData(mix3, currentCluster) {
        let bar_axis_data = [];
        for (let i = 0; i < mix3['n_clusters'][currentCluster]; i++) {
            bar_axis_data.push('cluster ' + (i + 1))
        }
        return bar_axis_data;
    }

    function getBarSeriesData(mix3, currentCluster) {
        let bar_series_data = [];
        for (let i = 0; i < mix3['n_clusters'][currentCluster]; i++) {
            bar_series_data.push({
                value: calculateSum(mix3['data'][currentCluster][i]),
                groupId: 'cluster ' + (i + 1)
            });
        }
        return bar_series_data;
    }

    function getBarUniversalTransitionSeriesKey(mix3, currentCluster) {
        let bar_universalTransition_seriesKey = [];
        for (let i = 0; i < mix3['n_clusters'][currentCluster]; i++) {
            bar_universalTransition_seriesKey.push('cluster ' + (i + 1))
        }
        return bar_universalTransition_seriesKey;
    }

    let currentCluster = 0;
    let mix3 = echartsDatas['mix3'];
    let scatter_series = getScatterSeries(mix3, currentCluster);
    let bar_axis_data = getBarAxisData(mix3, currentCluster);
    let bar_series_data = getBarSeriesData(mix3, currentCluster);
    let bar_universalTransition_seriesKey = getBarUniversalTransitionSeriesKey(mix3, currentCluster);

    var scatterOption = {
        color: ['#1089e7', '#f57474', '#56d0e3', '#f8b448', '#8b78f6'],
        grid: {
            top: '30px',
            left: '15px',
            right: '10px',
            bottom: '10px',
            containLabel: true
        },
        xAxis: {
            name: echartsDatas['mix3']['id'][0],
            show: true,
            nameLocation: 'center',
            nameTextStyle: {
                color: '#4c9bfd',
                fontSize: '12px',
            },
            nameGap: 20,
            scale: true,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            name: echartsDatas['mix2']['id'][1],
            show: true,
            nameLocation: 'center',
            nameTextStyle: {
                color: '#4c9bfd',
                fontSize: '12px',
            },
            nameGap: 25,
            scale: true,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        series: scatter_series
    };
    var barOption = {
        color: ['#1089e7', '#f57474', '#56d0e3', '#f8b448', '#8b78f6'],
        grid: {
            top: '30px',
            left: '15px',
            right: '10px',
            bottom: '10px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: bar_axis_data,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            name: '数量',
            show: true,
            nameTextStyle: {
                color: '#4c9bfd'
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                show: false
            }
        },
        series: [
            {
                label: {
                    show: true
                },
                type: 'bar',
                id: 'total',
                data: bar_series_data,
                colorBy: 'data',
                universalTransition: {
                    enabled: true,
                    seriesKey: bar_universalTransition_seriesKey,
                    delay: function (idx, count) {
                        return Math.random() * 400;
                    }
                }
            }
        ]
    };

    let currentOption = scatterOption;
    document.querySelector('#echartsDatas').addEventListener('click', function() {
        currentOption = currentOption === scatterOption ? barOption : scatterOption;
        $('.mix3 a').eq(currentCluster).css('color', 'rgba(255, 255, 255, 1');
        $('.mix3 a').eq(1 - currentCluster).css('color', 'rgba(255, 255, 255, .3');
        myChart.setOption(currentOption, true);
    });

    $('.mix3 h2').on('click', 'a', function() {
        let id = $(this).index();
        currentCluster = id;

        scatter_series = getScatterSeries(mix3, currentCluster);
        bar_axis_data = getBarAxisData(mix3, currentCluster);
        bar_series_data = getBarSeriesData(mix3, currentCluster);
        bar_universalTransition_seriesKey = getBarUniversalTransitionSeriesKey(mix3, currentCluster);

        scatterOption.series = scatter_series;
        barOption.xAxis.data = bar_axis_data;
        barOption.series[0].data = bar_series_data;
        barOption.series[0].universalTransition.seriesKey = bar_universalTransition_seriesKey;
    })

    window.addEventListener('resize', function() {
        myChart.resize();
    })
})();

// 指数柱形图模块
(function() {
    var myChart = echarts.init(document.querySelector('.bar .chart'));
    var option = {
        color: ['#1089e7', '#f57474', '#56d0e3'],
        title: {
            text: echartsDatas['bar']['title'][0],
            textStyle: {
                color: '#407dee'
            }
        },
        tooltip: {},
        grid: {
            top: '30px',
            left: '15px',
            right: '10px',
            bottom: '10px',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: echartsDatas['bar']['axisName'],
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12,
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 12
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, .1)',
                    width:3
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, .1)'
                }
            }
        },
        // legend: {
        //     textStyle: {
        //         color: 'rgba(255, 255, 255, .7)',
        //     }
        // },
        series: [
            {
                name: echartsDatas['bar']['name'][0],
                data: echartsDatas['bar']['data'][0][0],
                type: 'bar'
            },
            {
                name: echartsDatas['bar']['name'][1],
                data: echartsDatas['bar']['data'][1][0],
                type: 'bar'
            },
            {
                name: echartsDatas['bar']['name'][2],
                data: echartsDatas['bar']['data'][2][0],
                type: 'bar'
            },
        ]
    };

    myChart.setOption(option);

    let currentOption = 0;

    $('.bar h2').on('click', 'a', function() {
        currentOption = currentOption === 0 ? 1 : 0;

        for (let i = 0; i < 3; ++i) {
            option.series[i].data = echartsDatas['bar']['data'][i][currentOption];
        }
        option.title.text = echartsDatas['bar']['title'][currentOption]
        myChart.setOption(option);
    })

    window.addEventListener('resize', function() {
        myChart.resize();
    })
})();

// 饼形图模块
(function(){
    var myChart = echarts.init(document.querySelector(".pie .chart"));

    var option = {
        color: ["#10687b", "#157cb1", "#368ebd", "#4fb3bd", "#94E2EEFF"],
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: '0%',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255, 255, 255, .5)",
                fontSize: 12
            }
        },
        series: [
            {
                name: echartsDatas['pie1']['name'][0],
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['60%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false
                },
                data: echartsDatas['pie1']['data'][0],
                radius: ['40%', '60%']
            }
        ]
    };

    myChart.setOption(option);

    $('.pie h2').on('click', 'a', function() {
        let TotalData = echartsDatas['pie1'];
        let id = $(this).index();
        $(this).css('color', 'rgba(255, 255, 255, 1')
        $(this).siblings('a').css('color', 'rgba(255, 255, 255, .3')
        // console.log($(this).siblings('a'))
        option.series[0].data = TotalData['data'][id];
        option.series[0].name = TotalData['name'][id];
        myChart.setOption(option);
    })

    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();

// 气泡图模块
(function() {
    var myChart = echarts.init(document.querySelector(".bubble .chart"));
    option = {
        grid: {
            top: '30px',
            left: '15px',
            right: '10px',
            bottom: '10px',
            containLabel: true,
        },
        xAxis: {
            name: 'Age',
            nameTextStyle: {
                color: '#4c9bfd',
            },
            nameLocation: 'center',
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, .1)'
                }
            }
        },
        yAxis: {
            name: 'Annual Income',
            nameTextStyle: {
                color: '#4c9bfd',
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, .1)'
                }
            }
        },
        legend: {
            textStyle: {
                color: '#4c9bfd',
            }
        },
        series: [
            {
                name: 'Spending Score',
                data: echartsDatas['bubble']['data'],
                symbolSize: function(data) {
                    return data[2] / 10;
                },
                type: 'scatter'
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', function() {
        myChart.resize();
    })
})();

(function() {
    var myChart = echarts.init(document.querySelector(".map .chart"));
    var geoCoordMap = {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028]
    };

    var XAData = [
        [{ name: "西安" }, { name: "拉萨", value: 100 }],
        [{ name: "西安" }, { name: "上海", value: 100 }],
        [{ name: "西安" }, { name: "广州", value: 100 }],
        [{ name: "西安" }, { name: "西宁", value: 100 }],
        [{ name: "西安" }, { name: "银川", value: 100 }]
    ];

    var XNData = [
        [{ name: "西宁" }, { name: "北京", value: 100 }],
        [{ name: "西宁" }, { name: "上海", value: 100 }],
        [{ name: "西宁" }, { name: "广州", value: 100 }],
        [{ name: "西宁" }, { name: "西安", value: 100 }],
        [{ name: "西宁" }, { name: "银川", value: 100 }]
    ];

    var YCData = [
        [{ name: "拉萨" }, { name: "潍坊", value: 100 }],
        [{ name: "拉萨" }, { name: "哈尔滨", value: 100 }],
        [{ name: "银川" }, { name: "上海", value: 100 }],
        [{ name: "银川" }, { name: "西安", value: 100 }],
        [{ name: "银川" }, { name: "西宁", value: 100 }]
    ];

    var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
    //var planePath = 'arrow';
    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];

            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value
                });
            }
        }
        return res;
    };

    var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
    var series = [];
    [
        ["西安", XAData],
        ["西宁", XNData],
        ["银川", YCData]
    ].forEach(function(item, i) {
        series.push(
            {
                name: item[0] + " Top3",
                type: "lines",
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: "red", //arrow箭头的颜色
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + " Top3",
                type: "lines",
                zlevel: 2,
                symbol: ["none", "arrow"],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + " Top3",
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    brushType: "stroke"
                },
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        formatter: "{b}"
                    }
                },
                symbolSize: function(val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    },
                    emphasis: {
                        areaColor: "#2B91B7"
                    }
                },
                data: item[1].map(function(dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            }
        );
    });
    var option = {
        tooltip: {
            trigger: "item",
            formatter: function(params, ticket, callback) {
                if (params.seriesType == "effectScatter") {
                    return "线路：" + params.data.name + "" + params.data.value[2];
                } else if (params.seriesType == "lines") {
                    return (
                        params.data.fromName +
                        ">" +
                        params.data.toName +
                        "<br />" +
                        params.data.value
                    );
                } else {
                    return params.name;
                }
            }
        },
        legend: {
            orient: "vertical",
            top: "bottom",
            left: "right",
            data: ["西安 Top3", "西宁 Top3", "银川 Top3"],
            textStyle: {
                color: "#fff"
            },
            selectedMode: "multiple"
        },
        geo: {
            map: "china",
            label: {
                emphasis: {
                    show: true,
                    color: "#fff"
                }
            },
            // 把中国地图放大了1.2倍
            zoom: 1.2,
            roam: true,
            itemStyle: {
                normal: {
                    // 地图省份的背景颜色
                    areaColor: "rgba(20, 41, 87,0.6)",
                    borderColor: "#195BB9",
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: "#2c89ac"
                }
            }
        },
        series: series
    };
    myChart.setOption(option);

    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();