---
title: echarts使用中国地图
date: 2021-03-19 14:15:59
tags: echarts
---

## 一、地图数据下载

一、高德开发平台数据

> http://datav.aliyun.com/tools/atlas/#&lat=31.780695728407512&lng=106.720060693723&zoom=4.5

二、 中国地图数据JSON API

> https://geo.datav.aliyun.com/areas_v2/bound/100000.json
> https://geo.datav.aliyun.com/areas/bound/geojson?code=100000

三、中国地图数据JSON API(包含子区域)

> https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json
> https://geo.datav.aliyun.com/areas/bound/geojson?code=100000_full
 
## 二、注册地图

注册可用的地图，必须在包括 geo 组件或者 map 图表类型的时候才能使用。
`echarts.registerMap(mapName: string, geoJson: Object, specialAreas?: Object)`

- `mapName`
  地图名称，在 geo 组件或者 map 图表类型中设置的 map 对应的就是该值。
    
- `geoJson`
  GeoJson 格式的数据，具体格式见 `https://geojson.org/`
        
- `specialAreas`
  可选。将地图中的部分区域缩放到合适的位置，可以使得整个地图的显示更加好看。
  


```javascript
import initChinaData from './china2.json';
import initChinaData2 from './china.json';

useEffect(() => {
  const myChart = echarts.init(chartsRef.current);
  const myChart2 = echarts.init(chartsRef2.current);
  
  // 注册两份可用的地图
  // 在 geo 组件或者 map 图表类型中设置的 map 对应的就是该值
  echarts.registerMap('china', initChinaData);
  echarts.registerMap('china2', initChinaData2);
}, []);

```

## 三、使用气泡图

散点（气泡）图。直角坐标系上的散点图可以用来展现数据的 x，y 之间的关系，如果数据项有多个维度，其它维度的值可以通过不同大小的 symbol 展现成气泡图，也可以用颜色来表现。这些可以配合 visualMap 组件完成。
可以应用在直角坐标系，极坐标系，地理坐标系上。

```
    {
      name: 'Scatter',
      type: 'scatter',
      coordinateSystem: 'geo',
      ...positionConfig,
      data: [],
      symbolOffset: [142, -30],
      symbolSize: [296, 60],
      symbol: `image://${lineImg}`,
      label: {
        show: true,
        formatter(params) {
          const { data: { name, count } } = params;
          // `{styleName|text content text content}` 标记样式名。
          return `{fLine| ${name}}\n{sLine|· 检测项目: ${count[0]} 个}\n{sLine|· 监测项目: ${count[1]} 个}`;
        },
        position: [48, -116],
        backgroundColor: '#002732',
        padding: [0, 0],
        borderRadius: 3,
        opacity: 1,
        rich: {
          fLine: {
            fontSize: 16,
            backgroundColor: '#002732',
            color: '#ffffff',
            width: 210,
            height: 37,
            verticalAlign: 'center',
            padding: [0, 0, 0, 34],
            borderColor: '#002732',
            borderWidth: 4
          },
          sLine: {
            fontSize: 13,
            backgroundColor: '#01807C',
            color: '#ffffff',
            width: 210,
            height: 37,
            verticalAlign: 'center',
            padding: [0, 0, 0, 34],
            borderColor: '#024E5A',
            borderWidth: 4
          }
        }
      }
    }
```

## 四、给地图添加数据
默认是 'name'，针对 GeoJSON 要素的自定义属性名称，作为主键用于关联数据点和 GeoJSON 地理要素。
可以通过`nameProperty`属性进行自定义
```
{
    nameProperty: 'NAME', // 数据点中的 name：Alabama 会关联到 GeoJSON 中 NAME 属性值为 Alabama 的地理要素{"type":"Feature","id":"01","properties":{"NAME":"Alabama"}, "geometry": { ... }}
    data:[
        {name: 'Alabama', value: 4822023},
        {name: 'Alaska', value: 731449},
    ]
}
```


## Echarts API 地址
> https://echarts.apache.org/zh/option.html#series-scatter.data.label.rich
