import { defineClientAppEnhance } from '@vuepress/client'
import ScTfEchart from '../../src/components/ScTfEchart.vue'
import hljs from 'highlight.js'
//样式文件,这里我选的是sublime样式，文件里面还有其他样式可供选择
import 'highlight.js/styles/color-brewer.css' 
import '../../src/styles/index.css'
export default defineClientAppEnhance(({
  app
}) => {
  app.component(ScTfEchart.name, ScTfEchart)
  // app.directive('highlight',function (el) {
  //   let blocks = el.querySelectorAll('pre code');
  //       blocks.forEach((block)=>{
  //       hljs.highlightBlock(block)
  //   })
  // })
})
