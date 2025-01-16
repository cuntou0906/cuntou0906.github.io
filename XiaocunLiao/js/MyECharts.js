function Set_PaperNum_echarts(){
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
    toolbox: {
    feature: {
    dataView: { show: true, readOnly: false },
    magicType: { show: true, type: ['line', 'bar'] },
    restore: { show: true },
    saveAsImage: { show: true }
    }
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
    data: ['2021', '2022', '2023', '2024'],
    axisPointer: {
        type: 'shadow'
    },
    axisLabel: {
        fontSize: 14 // 设置字体大小为14
    },
    splitLine:{
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
    splitLine:{
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
    splitLine:{
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
        0, 2, 3, 2,  
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
        4, 0, 1, 0, 
    ]
    },
    {
    name: 'Total in this Year',       //会议数量
    type: 'bar',
    tooltip: {
        valueFormatter: function (value) {
        return value;
        }
    },
    data: [
        4, 2, 4, 2, 
    ]
    },
    {
    name: 'Total',       //总数
    type: 'line',
    yAxisIndex: 1,
    tooltip: {
        valueFormatter: function (value) {
        return value ;
        }
    },
    data: [
        4, 6, 10, 12, 
    ]
    }
    ]
    };

    if (option && typeof option === 'object') {
    myChart_PaperNumContainer.setOption(option);
    }

    window.addEventListener('resize', myChart_PaperNumContainer.resize);
}
Set_PaperNum_echarts();


function Set_PatentsNum_echarts(){
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
    dataView: { show: true, readOnly: false },
    magicType: { show: true, type: ['line', 'bar'] },
    restore: { show: true },
    saveAsImage: { show: true }
    }
    },
    legend: {
    data: ['Patents','Total'],
    textStyle: { // 图例的文本样式
        // color: '#333', // 字体颜色
        fontSize: 16 // 字体大小，单位是像素（px）
    }
    },
    xAxis: [
    {
    type: 'category',
    data: ['2021', '2022', '2023', '2024'],
    axisPointer: {
        type: 'shadow'
    },
    axisLabel: {
        fontSize: 14 // 设置字体大小为14
    },
    splitLine:{
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
    splitLine:{
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
    splitLine:{
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
        2, 4, 4, 0,  
    ],
    itemStyle:{
        color: '#00cc33'
    }
    },
    {
    name: 'Total',       //总数
    type: 'line',
    yAxisIndex: 1,
    tooltip: {
        valueFormatter: function (value) {
        return value ;
        }
    },
    data: [
        2, 6, 10, 10, 
    ],
    itemStyle:{
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
Set_PatentsNum_echarts();