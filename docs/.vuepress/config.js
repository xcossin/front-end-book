module.exports = {
  lang: 'zh-CN',
  // 网站标题
  title: 'Book Demo',
  // 网站描述
  description: 'Echart Demo 、Highcharts Demo 集',
  head: [
    // // 增加一个自定义的 favicon(网页标签的图标)
    ['link', { rel: 'icon', href: '/book-demo/logo-flower-dark.png' }], 
  ],
  // 这是部署到github相关的配置
  base: '/book-demo/',
  themeConfig: {
    home: '/', // 首页
    logo: '/logo.png', 
    sidebarDepth: 2, // 将同时提取markdown中h2 和 h3 标题，显示在侧边栏上，默认为1（只会显示h2标题），若 sidebar 下也配置该属性，则以 sidebar 的为准
    lastUpdated: true, // 显示在文档右下角：每个文件git最后提交的时间 （一定是要基于 git 才会生效）
    lastUpdatedText: '最后更新时间',
    contributorsText: '修改者',
    activeHeaderLinks: true, // 当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新, 默认为 true
    nextLinks: true, // 显示下一篇链接, 默认为 true
    prevLinks: true, // 显示上一篇链接, 默认为 true
    repo: 'https://github.com/xcossin/digital-garden',
    // 版本仓库地址，就是大家经常在开源软件介绍站点看见的那个Github按钮，如果你设置的是类似“extrame/baijiafan”这种/风格的两段字符串，会被默认按github渲染
    navbar:[
      { text: 'Echarts Demo', link: '/echarts/' },
      { text: 'JavaScript', link: '/JavaScript/' },
      { text: 'regex', link: '/regex/' },
      { text: '模板', link: '/demo/' },
      // {
      //   text: '地址',
      //   children: [  // 使用 items 则展示为下拉列表
      //     { text: 'GitLab', link: 'http://172.17.1.10/ITS_WEBGL' }
      //   ]
      // }
    ],
    sidebar: {
      '/echarts/': [
        {
          text: '使用指南',
          collapsible: false, // 是否侧边菜单折叠，默认值是 true
          children: [
            'README.md'
          ]
        },
        {
          text: '折线图',
          collapsible: false, // 是否侧边菜单折叠，默认值是 true
          children: [
              'line.md'
          ]
        },
        {
          text: '柱状图',
          link: 'bar.md'
        },
        {
          text: '饼图',
          link: 'pie.md'
        }
      ],
      '/JavaScript/': [
        {
          text: '使用指南',
          link: 'README.md'
        }
      ],
      '/regex/': [
        {
          text: '使用指南',
          link: 'README.md'
        },
        {
          text: '常见正则表达式',
          collapsible: false, // 是否侧边菜单折叠，默认值是 true
          children: [
            'generalRegex.md'
          ]
        },
      ]
    }
  },
  markdown: {
    anchor: { permalink: false, level: [3] },
    toc: { level: [3] }
  },
  plugins: [
    ['@vuepress/plugin-search', { searchMaxSuggestions: 5 }],
    ['vuepress-plugin-demoblock-plus', {
      customClass: 'demoblock-custom',
      theme: 'github-light',
      cssPreprocessor: 'less',
      scriptReplaces: [
        { 
          searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g,
          replaceValue: 'const { defineComponent: _defineComponent } = Vue'
        }
      ]
    }]
  ]
}
