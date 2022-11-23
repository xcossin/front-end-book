# 折线图

### 案例1

:::demo
```vue
<template>
  <div class="demo-echart-block">
    <sc-tf-echart :data="data" :option="option"></sc-tf-echart>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        option: {
          xAxis: {
            type: 'category'
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            // data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }]
        },
        data: [
          { name: 'Mon', value: 260 },
          { name: 'Tue', value: 150 },
          { name: 'Wed', value: 218 },
          { name: 'Thu', value: 224 },
          { name: 'Fri', value: 230 },
          { name: 'Sat', value: 147 },
          { name: 'Sun', value: 135 }
        ]
      }
    }
  }
</script>
<style>
.demo-echart-block {
    width: 400px;
    height: 400px;
}
</style>
```
:::

### 案例2

:::demo
```vue
<template>
  <div class="demo-echart-block">
    <sc-tf-echart :data="data" :option="option"></sc-tf-echart>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        option: {
          xAxis: {
            type: 'category'
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            type: 'line'
          }, {
            type: 'line'
          }]
        },
        data: [
          { name: 'Mon', value: 260, group: 'one' },
          { name: 'Tue', value: 150, group: 'one' },
          { name: 'Wed', value: 218, group: 'one' },
          { name: 'Thu', value: 224, group: 'one' },
          { name: 'Fri', value: 230, group: 'one' },
          { name: 'Sat', value: 147, group: 'one' },
          { name: 'Sun', value: 135, group: 'one' },
          { name: 'Mon', value: 360, group: 'two' },
          { name: 'Tue', value: 250, group: 'two' },
          { name: 'Wed', value: 318, group: 'two' },
          { name: 'Thu', value: 324, group: 'two' },
          { name: 'Fri', value: 330, group: 'two' },
          { name: 'Sat', value: 247, group: 'two' },
          { name: 'Sun', value: 235, group: 'two' }
        ]
      }
    }
  }
</script>
<style>
.demo-echart-block {
    width: 400px;
    height: 400px;
}
</style>
```
:::