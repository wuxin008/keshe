let echartsDatas = eval('(' + $('#echartsDatas').text() + ')');

/*
// prettier-ignore
const femaleData = [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
    [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
    [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
    [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
    [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
    [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
    [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
    [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
    [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
    [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
    [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
    [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
    [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
    [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
    [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
    [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
    [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
    [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
    [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
    [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
    [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
    [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
    [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
    [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
    [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
    [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
    [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
    [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
    [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
    [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
    [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
    [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
    [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
    [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
    [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
    [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
    [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
    [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
    [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
    [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
    [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
    [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
    [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
    [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
    [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
    [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
    [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
    [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
    [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
    [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
    [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
    [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
];
// prettier-ignore
const maleDeta = [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
    [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
    [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
    [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
    [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
    [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
    [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
    [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
    [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
    [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
    [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
    [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
    [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
    [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
    [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
    [174.5, 63.9], [177.5, 72.0], [170.5, 56.8], [182.4, 74.5], [197.1, 90.9],
    [180.1, 93.0], [175.5, 80.9], [180.6, 72.7], [184.4, 68.0], [175.5, 70.9],
    [180.6, 72.5], [177.0, 72.5], [177.1, 83.4], [181.6, 75.5], [176.5, 73.0],
    [175.0, 70.2], [174.0, 73.4], [165.1, 70.5], [177.0, 68.9], [192.0, 102.3],
    [176.5, 68.4], [169.4, 65.9], [182.1, 75.7], [179.8, 84.5], [175.3, 87.7],
    [184.9, 86.4], [177.3, 73.2], [167.4, 53.9], [178.1, 72.0], [168.9, 55.5],
    [157.2, 58.4], [180.3, 83.2], [170.2, 72.7], [177.8, 64.1], [172.7, 72.3],
    [165.1, 65.0], [186.7, 86.4], [165.1, 65.0], [174.0, 88.6], [175.3, 84.1],
    [185.4, 66.8], [177.8, 75.5], [180.3, 93.2], [180.3, 82.7], [177.8, 58.0],
    [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 116.4], [163.8, 72.2],
    [188.0, 83.6], [198.1, 85.5], [175.3, 90.9], [166.4, 85.9], [190.5, 89.1],
    [166.4, 75.0], [177.8, 77.7], [179.7, 86.4], [172.7, 90.9], [190.5, 73.6],
    [185.4, 76.4], [168.9, 69.1], [167.6, 84.5], [175.3, 64.5], [170.2, 69.1],
    [190.5, 108.6], [177.8, 86.4], [190.5, 80.9], [177.8, 87.7], [184.2, 94.5],
    [176.5, 80.2], [177.8, 72.0], [180.3, 71.4], [171.4, 72.7], [172.7, 84.1],
    [172.7, 76.8], [177.8, 63.6], [177.8, 80.9], [182.9, 80.9], [170.2, 85.5],
    [167.6, 68.6], [175.3, 67.7], [165.1, 66.4], [185.4, 102.3], [181.6, 70.5],
    [172.7, 95.9], [190.5, 84.1], [179.1, 87.3], [175.3, 71.8], [170.2, 65.9],
    [193.0, 95.9], [171.4, 91.4], [177.8, 81.8], [177.8, 96.8], [167.6, 69.1],
    [167.6, 82.7], [180.3, 75.5], [182.9, 79.5], [176.5, 73.6], [186.7, 91.8],
    [188.0, 84.1], [188.0, 85.9], [177.8, 81.8], [174.0, 82.5], [177.8, 80.5],
    [171.4, 70.0], [185.4, 81.8], [185.4, 84.1], [188.0, 90.5], [188.0, 91.4],
    [182.9, 89.1], [176.5, 85.0], [175.3, 69.1], [175.3, 73.6], [188.0, 80.5],
    [188.0, 82.7], [175.3, 86.4], [170.5, 67.7], [179.1, 92.7], [177.8, 93.6],
    [175.3, 70.9], [182.9, 75.0], [170.8, 93.2], [188.0, 93.2], [180.3, 77.7],
    [177.8, 61.4], [185.4, 94.1], [168.9, 75.0], [185.4, 83.6], [180.3, 85.5],
    [174.0, 73.9], [167.6, 66.8], [182.9, 87.3], [160.0, 72.3], [180.3, 88.6],
    [167.6, 75.5], [186.7, 101.4], [175.3, 91.1], [175.3, 67.3], [175.9, 77.7],
    [175.3, 81.8], [179.1, 75.5], [181.6, 84.5], [177.8, 76.6], [182.9, 85.0],
    [177.8, 102.5], [184.2, 77.3], [179.1, 71.8], [176.5, 87.9], [188.0, 94.3],
    [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
    [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
    [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
    [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
    [180.3, 83.2], [180.3, 83.2]
];
function calculateAverage(data, dim) {
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
(function () {
    var myChart = echarts.init(document.querySelector(".mix1 .chart"));

    var option = {
        color: [
            "#2f89cf"
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '10px',
            left: '0%',
            right: '0%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ["旅游行业", "教育培训", "游戏行业", "医疗行业", "电商行业", "社交行业", "金融行业"],
                axisLabel: {
                    color: 'rgba(255, 255, 255, .6)',
                    fontSize: 12
                },
                axisLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255, .6)',
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
            }
        ],
        series: [
            {
                type: 'bar',
                barWidth: '35%',
                data: [200, 300, 300, 900, 1500, 1200, 600],
                itemStyle: {
                    barBorderRadius: 5
                },
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function(){
        myChart.resize();
    })
})();

//混合图模块2
(function() {
    var myColor = ['#1089e7', '#f57474', '#56d0e3', '#f8b448', '#8b78f6']
    var myChart = echarts.init(document.querySelector(".mix2 .chart"))

    var option = {
        grid: {
            top: '10%',
            left: '22%',
            bottom: '10%'
        },
        xAxis: {
            show: false
        },
        yAxis: [{
            type: 'category',
            data: ['HTML5', 'CSS3', 'javascript', 'VUE', 'NODE'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: ['#fff']
            },
            inverse: true
        },
            {
                type: 'category',
                data: [702, 350, 610, 793, 664],
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: ['#fff']
                },
                inverse: true
            }],
        series: [
            {
                name: '条',
                type: 'bar',
                data: [70, 34, 60, 78, 69],
                yAxisIndex: 0,
                itemStyle: {
                    barBorderRadius: 20,
                    color: function (params) {
                        return myColor[params.dataIndex];
                    }
                },
                barCategoryGap: 50,
                barWidth: 10,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: "{c}%"
                    }
                }
            },
            {
                name: '框',
                type: 'bar',
                barCategoryGap: 50,
                barWidth: 15,
                data: [100, 100, 100, 100, 100],
                yAxisIndex: 1,
                itemStyle: {
                    color: 'none',
                    borderColor: '#00c1de',
                    borderWidth: 3,
                    barBorderRadius: 15
                }
            }
        ]
    };

    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();

//混合图模块3
(function () {
    var yearData = [
        {
            year: '2020',
            data: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ]
        },
        {
            year: '2021',
            data: [
                [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
                [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
            ]
        }
    ]
    var myChart = echarts.init(document.querySelector('.mix3 .chart'));

    var option = {
        color: [
            '#00f2f1', '#ed3f35'
        ],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            textStyle: {
                color: '#4c9bfd'
            },
            right: '10%'
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true,
            borderColor: '#012f4a',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a'
                }
            }
        },
        series: [
            {
                name: '新增粉丝',
                type: 'line',
                data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                smooth: true
            },
            {
                name: '新增游客',
                type: 'line',
                data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
                smooth: true
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', function() {
        myChart.resize();
    })

    $('.line h2').on('click', 'a', function() {
        let obj = yearData[$(this).index()];
        option.series[0].data = obj.data[0];
        option.series[1].data = obj.data[1];
        myChart.setOption(option);
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
// (function() {
//     var myChart = echarts.init(document.querySelector('.bar .chart'));
//     var option = {
//         tooltip: {
//             trigger: 'axis'
//         },
//         legend: {
//             textStyle: {
//                 color: "rgba(255, 255, 255, 255, .5)",
//                 fontSize: 12
//             },
//             top: "0%"
//         },
//         grid: {
//             top: '30px',
//             left: '10px',
//             right: '10px',
//             bottom: '10px',
//             containLabel: true
//         },
//         xAxis: [
//             {
//                 type: 'category',
//                 boundaryGap: false,
//                 data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"],
//                 axisLabel: {
//                     textStyle: {
//                         color: "rgba(255, 255, 255, .6)",
//                         fontSize: 12
//                     }
//                 },
//                 axisLine: {
//                     lineStyle: {
//                         color: "rgba(255, 255, 255, .2)"
//                     }
//                 }
//             }
//         ],
//         yAxis: [
//             {
//                 type: 'value',
//                 axisTick: {
//                     show:false
//                 },
//                 axisLine: {
//                     lineStyle: {
//                         color: "rgba(255, 255, 255, .6)"
//                     }
//                 },
//                 axisLabel: {
//                     textStyle: {
//                         color: "rgba(255, 255, 255, .6)",
//                         fontSize: 12
//                     }
//                 },
//                 splitLine: {
//                     lineStyle: {
//                         color: "rgba(255, 255, 255, .1)"
//                     }
//                 }
//             }
//         ],
//         series: [
//             {
//                 name: '邮件营销',
//                 type: 'line',
//                 areaStyle: {
//                     normal: {
//                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
//                             [
//                                 {
//                                     offset: 0,
//                                     color: "rgba(1, 132, 213, 0.9)"
//                                 },
//                                 {
//                                     offset: 0.8,
//                                     color: "rgba(1, 132, 213, 0.1)"
//                                 }
//                             ],
//                             false
//                         ),
//                         shadowColor: "rgba(0, 0, 0, 0.1)"
//                     }
//                 },
//                 symbol: 'circle',
//                 symbolSize: 8,
//                 showSymbol: false,
//                 itemStyle: {
//                     color: "#0184d5",
//                     borderColor: "rgba(221, 220, 107, .1)",
//                     borderWidth: 12
//                 },
//                 smooth: true,
//                 data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40],
//                 lineStyle: {
//                     color: '#0184d5',
//                     width: 3
//                 }
//             },
//             {
//                 name: '联盟广告',
//                 type: 'line',
//                 areaStyle: {
//                     normal: {
//                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
//                             [
//                                 {
//                                     offset: 0,
//                                     color: "rgba(0, 216, 135, 0.4)"
//                                 },
//                                 {
//                                     offset: 0.8,
//                                     color: "rgba(0, 216, 135, 0.1)"
//                                 }
//                             ],
//                             false
//                         ),
//                         shadowColor: "rgba(0, 0, 0, 0.1)"
//                     }
//                 },
//                 symbol: 'circle',
//                 symbolSize: 8,
//                 showSymbol: false,
//                 itemStyle: {
//                     color: "#00d887",
//                     borderColor: "rgba(221, 220, 107, .1)",
//                     borderWidth: 12
//                 },
//                 lineStyle: {
//                     normal: {
//                         color: "#00d887",
//                         width: 2
//                     }
//                 },
//                 smooth: true,
//                 data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20]
//             }
//         ]
//     };
//
//     myChart.setOption(option);
//
//     window.addEventListener("resize", function() {
//         myChart.resize();
//     })
// })();

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
        option.series[0].data = TotalData['data'][id];
        option.series[0].name = TotalData['name'][id];
        myChart.setOption(option);
    })

    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();

// 气泡图模块
// (function() {
//     var myChart = echarts.init(document.querySelector('.pie2 .chart'));
//
//     var option = {
//         color: [
//             "#006cff",
//             "#60cda0",
//             "#ed8884",
//             "#ff9f7f",
//             "#0096ff",
//             "#9fe6b8",
//             "#32c5e9",
//             "#1d9dff"
//         ],
//         tooltip: {
//             trigger: "item",
//             formatter: "{a} <br/>{b} : {c} ({d}%)"
//         },
//         series: [
//             {
//                 name: '地区分布',
//                 type: 'pie',
//                 radius: ['10%', '70%'],
//                 center: ['50%', '50%'],
//                 roseType: 'radius',
//                 itemStyle: {
//                     borderRadius: 8
//                 },
//                 label: {
//                     fontSize: 10
//                 },
//                 labelLine: {
//                     length: 6,
//                     length2: 8
//                 },
//                 data: [
//                     { value: 20, name: "云南" },
//                     { value: 26, name: "北京" },
//                     { value: 24, name: "山东" },
//                     { value: 25, name: "河北" },
//                     { value: 20, name: "江苏" },
//                     { value: 25, name: "浙江" },
//                     { value: 30, name: "四川" },
//                     { value: 42, name: "湖北" }
//                 ]
//             }
//         ]
//     };
//
//     myChart.setOption(option);
//
//     window.addEventListener('resize', function() {
//         myChart.resize();
//     })
// })();
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
            },
            scale: true,
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
            },
            scale: true,
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

// 中心图制作
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