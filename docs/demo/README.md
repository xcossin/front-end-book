# 文档编辑模板

::: demo
```vue
<template>
    <button class="animated shake infinite" @click="onClick">Click me!</button>
</template>

<script>
export default {
    methods: {
        onClick: () => { window.alert(1) },
    },
}
</script>

<style>
button {
    color: blue;
}
</style>
```
:::


<!-- ## 常见正则 -->
:::demo
```vue
<template>
  <div class="demo-echart-block" >
  <div>23</div>
    
  </div>
</template>
```
:::

```js
文档结构
├─ docs
│  ├─ .vuepress
│  │  └─ config // 文件夹
│  │  └─ public // 静态资源
│  │  └─ config.js // 配置文件
│  └─ README.md //  文档的入口页面
├─ .gitignore
└─ package.json
```

:::demo 
使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

:::