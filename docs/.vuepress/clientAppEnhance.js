import { defineClientAppEnhance } from '@vuepress/client'
import ScTfEchart from '../../src/components/ScTfEchart.vue'
import '../../src/styles/index.css'

export default defineClientAppEnhance(({
  app
}) => {
  app.component(ScTfEchart.name, ScTfEchart)
})
