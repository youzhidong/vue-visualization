<template>
  <div
    class="canvas"
    ref="canvasLine"
    style="height:250px;"
  ></div>
</template>
<script>

// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
export default {
  // props: {
  //   echartsData: {
  //     // 横轴和纵轴拿到的真实数据
  //     type: Object,
  //   },
  //   isResize: {
  //     type: Boolean,
  //   },
  // },
  data(){
    return {
      echartsData : {
        text: 'cpu使用率',
        legendData: [
          {
            name: 'system',
            icon: 'roundRect',
            textStyle: {
              borderStyle: 'dashed',
            },
          },
          {
            name: 'user',
            icon: 'roundRect',
          },
        ],
        xData: [
          '00:00',
          '2:00',
          '4:00',
          '6:00',
          '8:00',
          '10:00',
          '12:00',
          '14:00',
        ],
        yName: '%',
        seriesData: [
          ['1200', '400', '1008', '1411', '1026', '288', '1300', '800', '1000'],
          ['1400', '1400', '1308', '711', '1026', '1288', '300', '800', '1100'],
        ],
        lineColor: [['#f9829f', '#7e72f2'], ['#999', '#999']],
        type: ['solid', 'solid'],
        width: [2, 2],
      }
    }
  },
  watch: {
    echartsData() {
      this.reDraw();
    }
    // isResize() {
    //   this.myChartLine.resize();
    // }
  },
  mounted() {
    // 解决预览数据不加载的 bug
    setTimeout(()=>{
      this.reDraw();
    })
  },
  methods: {
    // 数据改变重绘
    reDraw() {
      this.drawLine(this.echartsData)
    },
    // 曲线图
    drawLine(data) {
      // const that = this;
      const dom = this.$refs.canvasLine;
      this.myChartLine = echarts.init(dom);
      // let colors = ['#f99a32'];
      const arr = [];
      console.log(data)
      data.seriesData.forEach((item, index) => {
        if (!data.lineColor[index]) return false;
        const newData = {
          name: data.legendData[index].name,
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 6,
          data: item,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: data.lineColor[index][0] },
                { offset: 1, color: data.lineColor[index][1] },
              ]),
              lineStyle: {
                width: 28,
                type: data.type[index], // 'dotted'虚线 'solid'实线
              },
            },
          },
          lineStyle: {
            normal: {
              width: data.width[index],
            },
          },
        };
        arr.push(newData);
      });

      const option = {
        title: {
          text: data.text,
          left: '50%',
          top: '5%',
          textAlign: 'center',
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal',
            fontStyle: 'normal',
            color: '#333333',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd',
            },
          },
          backgroundColor: '#fff',
          padding: [5, 10],
          textStyle: {
            color: '#7588E4',
          },
          extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
        },
        legend: {
          right: 20,
          orient: 'vertical',
          itemHeight: 6,
          itemWidth: 20,
          data: data.legendData,
        },
        xAxis: {
          type: 'category',
          data: data.xData,
          boundaryGap: false,
          splitLine: {
            show: false,
            interval: 'auto',
            lineStyle: {
              color: ['#eaeaea'],
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#eaeaea',
            },
          },
          axisLabel: {
            // interval: 4000,
            margin: 10,
            textStyle: {
              fontSize: 10,
              color: '#999',
            },
          },
        },
        yAxis: {
          name: data.yName,
          type: 'value',
          // min: ymin,
          // max: yMax,
          splitLine: {
            lineStyle: {
              color: ['#eaeaea'],
              width: 2,
            },
          },
          // nameGap: 120,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#999',
              fontSize: 10,
            },
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 10,
            },
          },
        },
        series: arr,
      };
      this.myChartLine.setOption(option, true);
    },
  },
};
</script>

<style>
.canvas {
  background: #fff;
  border-radius: 15px;
  padding: 7px 5px 0 5px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
</style>