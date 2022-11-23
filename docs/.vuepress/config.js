module.exports = {
  lang: 'zh-CN',
  // 网站标题
  title: 'SmartCity Demo',
  // 网站描述
  description: 'Echart Demo 、Highcharts Demo 和 Animation Demo 集',
  // 这是部署到github相关的配置
  base: '/smartcity-demo/',
  themeConfig: {
    home: '/', // 首页
      sidebarDepth: 2, // 将同时提取markdown中h2 和 h3 标题，显示在侧边栏上，默认为1（只会显示h2标题），若 sidebar 下也配置该属性，则以 sidebar 的为准
      lastUpdated: true, // 显示在文档右下角：每个文件git最后提交的时间 （一定是要基于 git 才会生效）
      lastUpdatedText: '最后更新时间',
      contributorsText: '修改者',
      activeHeaderLinks: true, // 当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新, 默认为 true
      nextLinks: true, // 显示下一篇链接, 默认为 true
      prevLinks: true, // 显示上一篇链接, 默认为 true
      navbar:[
        { text: 'Echarts Demo', link: '/echarts/' },
        { text: 'Highcharts Demo', link: '/highcharts/' },
        { text: 'Animation Demo', link: '/animation/' },
        {
          text: '地址',
          children: [  // 使用 items 则展示为下拉列表
            { text: 'GitLab', link: 'http://172.17.1.10/ITS_WEBGL' },
            { text: 'SmartCity UI', link: 'http://172.17.1.13/smartcity-ui/#/zh-CN/component/echart' }
          ]
        }
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
        '/highcharts/': [
          {
            text: '使用指南',
            link: 'README.md'
          }
        ],
        '/animation/': [
          {
            text: '使用指南',
            link: 'README.md'
          }
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
      // theme: 'github-light',
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
