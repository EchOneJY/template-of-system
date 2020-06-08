import React from 'react'
import ReactEcharts from 'echarts-for-react'

const SimplePie = () => {
  const onChartReady = echart => {
    /* eslint-disable */
    console.log('echart is ready', echart)
  }
  const onChartLegendselectchanged = (param, echart) => {
    console.log(param, echart)
  }
  const onChartClick = (param, echart) => {
    console.log(param, echart)
  }
  const getOption = () => {
    const option = {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
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
    return option
  }

  return (
    <div className="examples">
      <div className="parent">
        <ReactEcharts option={getOption()} style={{ height: 300 }} />
      </div>
    </div>
  )
}

export default SimplePie
