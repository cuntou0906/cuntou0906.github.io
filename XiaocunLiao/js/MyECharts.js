// 论文统计
function Set_PaperNum_echarts() {
    var PaperNumContainer = document.getElementById('PaperNumContainer');
    var myChart_PaperNumContainer = echarts.init(PaperNumContainer, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};

    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        title:{
            text: 'Paper Statistics',
            left: 'center',
            top: '90%',
            textStyle:{   
                color:'#333',
                fontSize: 16 ,
                }
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: true },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            },
            top:'88%',
            right:'0%',
        },
        legend: {
            data: ['Journal', 'Conference', 'Total in this Year', 'Total'],
            textStyle: { // 图例的文本样式
                // color: '#333', // 字体颜色
                fontSize: 16 // 字体大小，单位是像素（px）
            }
        },
        xAxis: [
            {
                type: 'category',
                data: ['2021', '2022', '2023', '2024', '2025'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    fontSize: 14 // 设置字体大小为14
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                min: 0,
                max: 10,
                interval: 2,
                axisLabel: {
                    formatter: '{value}',
                    fontSize: 14 // 设置字体大小为14
                },
                splitLine: {
                    show: false
                }
            },
            {
                type: 'value',
                name: '',
                min: 0,
                max: 15,
                interval: 2,
                axisLabel: {
                    formatter: '{value}',
                    fontSize: 14 // 设置字体大小为14
                },
                splitLine: {
                    show: true
                }
            }
        ],
        series: [
            {
                name: 'Journal',     //期刊数量
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                data: [
                    0, 2, 3, 2, 2,
                ]
            },
            {
                name: 'Conference',     //会议数量
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                data: [
                    4, 0, 1, 0, 0,
                ]
            },
            {
                name: 'Total in this Year',       //当年总数量
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                data: [
                    4, 2, 4, 2, 2,
                ]
            },
            {
                name: 'Total',       //总数
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                data: [
                    4, 6, 10, 12, 14,
                ]
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart_PaperNumContainer.setOption(option);
    }

    window.addEventListener('resize', myChart_PaperNumContainer.resize);
}

// 专利统计
function Set_PatentsNum_echarts() {
    var PatentsNumContainer = document.getElementById('PatentsNumContainer');
    var myChart_PatentsNumContainer = echarts.init(PatentsNumContainer, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};

    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: true },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            },
            top:'88%',
            right:'0%',
        },
        title:{
            text: 'Patents Statistics',
            left: 'center',
            top: '90%',
            textStyle:{   
                color:'#333',
                fontSize: 16 ,
                }
        },
        legend: {
            data: ['Patents', 'Total'],
            textStyle: { // 图例的文本样式
                // color: '#333', // 字体颜色
                fontSize: 16, // 字体大小，单位是像素（px）
            }
        },
        xAxis: [
            {
                type: 'category',
                data: ['2021', '2022', '2023', '2024', '2025'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    fontSize: 14 // 设置字体大小为14
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                min: 0,
                max: 10,
                interval: 2,
                axisLabel: {
                    formatter: '{value}',
                    fontSize: 14 // 设置字体大小为14
                },
                splitLine: {
                    show: false
                }
            },
            {
                type: 'value',
                name: '',
                min: 0,
                max: 15,
                interval: 2,
                axisLabel: {
                    formatter: '{value}',
                    fontSize: 14 // 设置字体大小为14
                },
                splitLine: {
                    show: true
                }
            }
        ],
        series: [
            {
                name: 'Patents',     //专利
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                data: [
                    2, 4, 4, 0, 1,
                ],
                itemStyle: {
                    color: '#00cc33'
                }
            },
            {
                name: 'Total',       //总数
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                data: [
                    2, 6, 10, 10, 11,
                ],
                itemStyle: {
                    color: '#ffcc33'
                }
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart_PatentsNumContainer.setOption(option);
    }

    window.addEventListener('resize', myChart_PatentsNumContainer.resize);
}


// 学者统计

function SetPineScholarList(){
    var ScholarListContainer_dom = document.getElementById('ScholarListContainer');
    var myChart_ScholarListContainer = echarts.init(ScholarListContainer_dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    
    var option;

    option = {
  title: {
    text: 'Scholar Statistics',
    left: 'center',
    top: '5%',
    textStyle:{   
        color:'#333',
        fontSize: 16 ,
        }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: [
      'rose1',
      'rose2',
      'rose3',
    ],
    textStyle: { // 图例的文本样式
        // color: '#333', // 字体颜色
        fontSize: 16, // 字体大小，单位是像素（px）
    }
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: true },
      restore: { show: true },
      saveAsImage: { show: true }
    },
    top:'90%',
    left:'10%',
  },
  series: [
    {
      name: 'Scholar',
      type: 'pie',
      radius: [20, 80],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5
      },
      data: [
        { value: 3, name: 'Senior Researcher' },
        { value: 7, name: 'Associate Researcher' },
        { value: 4, name: 'Assistant Researcher' },
      ],
      label:{
          normal:{
              show: true,
              textStyle:{
                  fontSize: 16
              }
          }
      }
    }
  ]
};

    if (option && typeof option === 'object') {
        myChart_ScholarListContainer.setOption(option);
    }

    window.addEventListener('resize', myChart_ScholarListContainer.resize);
}


// 研究兴趣

function SetResearchInterestsList(){
    var dom = document.getElementById('ResearchInterestScontainer_ID');
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    var option;

    myChart.showLoading();
$.getJSON('./json/ResearchInterests.json', function (graph) {
  myChart.hideLoading();
  graph.nodes.forEach(function (node) {
    node.label = {
      show: node.symbolSize > 10
    };
  });
  option = {
    title: {
      text: '',
      subtext: '',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: '',
        type: 'graph',
        legendHoverLink: false,
        layout: 'none',
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}',
          fontSize: 12,
          fontFamily: 'Arial, sans-serif', // 设置字体

        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 6
          }
        }
      }
    ]
  };
  myChart.setOption(option);
  myChart.setOption({
    // width: '100%',  // 可以使用百分比或具体像素值
    height: '100%', // 同上
    // 其他配置项...
});
});

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);


}

