<template>
  <div class="sc-tf-echart"></div>
</template>

<script>
import _ from 'lodash'
import * as echarts from 'echarts'
import { addResizeListener, removeResizeListener } from '../utils/resize-event'

// 轮训间隔时间
// const INTERVAL = 5000

export default {
  name: 'ScTfEchart',

  props: {
    // echarts配置项
    option: {
      type: Object,
      required: true
    },
    // 主题
    theme: [String, Object],
    // 初始化时的附加参数
    opts: Object,
    // 请求地址，用于获取更新图表
    // url: String,
    // 请求参数
    // params: {
    //   type: Object,
    //   default () {
    //     return {
    //       method: 'get',
    //       params: null
    //     }
    //   }
    // },
    // 静态数据，作为表格数据获取的另一种途径
    data: Array,
    // 是否自适应
    autoResize: {
      type: Boolean,
      default: true
    },
    // 是否自动轮训更新数据
    // autoUpdate: {
    //   type: Boolean,
    //   default: true
    // },
    // 是否清空图表
    isClear: {
      type: Boolean,
      default: true
    },
    // 轮训间隔时间
    // intervalTime: {
    //   type: Number,
    //   default: INTERVAL
    // },
    // 用于处理非标准格式的请求返回数据
    formatData: Function
  },

  data () {
    return {
      staticData: this.data,
      echartOption: _.cloneDeep(this.option), // 因为option时引用类型数据，不同图表可能使用同一个option
      chartSize: 0
    }
  },

  /**
   * @name 项圣
   * @Date 2021-07-08 16:02:22
   * @introduction mounted生命钩子
   * @description 初始化图表
   * @param 无参数
   * @return 无返回类型
   * @exception [违例类型] [违例类型说明]
   */
  mounted() {
    // 初始化图表
    this.init()

    // 如果有静态数据，则先使用数据填充图表
    if (this.staticData && this.staticData.length > 0) this.setData()

    // 通过请求，获取数据
    // if (this.url) {
    //   this.updateData()
    // }
  },

  /**
   * @name 项圣
   * @Date 2021-07-08 16:07:00
   * @introduction beforeDestroy生命钩子
   * @description 组件销毁时销毁事件及元素
   * @param 无参数
   * @return 无返回类型
   * @exception [违例类型] [违例类型说明]
   */
  beforeDestroy() {
    this.destroy()
  },

  methods: {
    /**
     * @name 项圣
     * @Date 2021-07-08 16:29:55
     * @introduction 获取容器大小
     * @description 以容器高宽相乘，如果为0说明有一边为0
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    getChartSize() {
      const { clientWidth, clientHeight } = this.$el
      const size = clientWidth * clientHeight
      this.chartSize = size
      return size
    },

    /**
     * @name 项圣
     * @Date 2021-07-08 16:11:29
     * @introduction 初始化echart图表
     * @description 初始化echart图表
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    init () {
      // 如果已初始化图表，则不需要重复初始化
      if (this.chart) return false

      // 获取容器大小
      this.getChartSize()

      // 初始化图表
      this.chart = echarts.init(this.$el, this.theme, this.opts)

      // 如果有传入的数据，则设置数据
      if (this.staticData && this.staticData.length > 0) this.setData()
      this.chart.setOption(this.echartOption || {})

      // 如果设置了自动自适应，则绑定resize事件
      if (this.autoResize) this.bindResize()

      // 初始化定时器
      this.interval = null

      // 暴露echart实例
      this.$emit('getInstance', this.chart)
    },

    /**
     * @name 项圣
     * @Date 2021-07-08 17:30:36
     * @introduction 销毁图表实例
     * @description 销毁图表实例
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    destroy() {
      // 销毁之前绑定的resize监听
      if (this.autoResize && this.$el) removeResizeListener(this.$el, this.resizeHandler)
      // 清除所有定时器
      // this.closeAutoUpdate()
      // 销毁实例
      this.chart.dispose()
      this.chart = null
    },

    /**
     * @name 项圣
     * @Date 2021-07-08 16:35:26
     * @introduction 绑定resize事件
     * @description 绑定resize事件
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    bindResize() {
      // 创建防抖方法
      this.resizeHandler = _.debounce(() => {
        if (this.chartSize === 0) {
          // 当echartDom的大小从0变为有值时需要重新初始化图表
          this.chart.setOption({}, this.isClear)
          this.chart.resize()
          this.chart.setOption(this.options || {}, this.isClear)
        } else {
          this.chart.resize()
        }
        this.chartSize = this.getChartSize()
      }, 400, { leading: true })

      // 绑定事件
      addResizeListener(this.$el, this.resizeHandler)
    },

    /**
     * @name 项圣
     * @Date 2021-07-09 08:58:28
     * @introduction 设置图表数据
     * @description 设置图表数据
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    setData(data = this.staticData, newOption = this.echartOption) {
      // 如果传入了数据格式化方法，则用该方法处理数据，否则用统一方法处理数据
      if (this.formatData) {
        this.formatData(data, this.chart)
        return true
      }
      // 通用数据处理方法
      const option = {
        ...newOption,
        dataset: this.dataToDataset(data)
      }
      this.echartOption = { ..._.cloneDeep(option) }
    },

    /**
     * @name 项圣
     * @Date 2021-07-09 09:06:13
     * @introduction 数据统一处理方法
     * @description 将包含name、value、group属性的对象数组转换成图表用的dataset格式
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    dataToDataset(data = []) {
      if (data && (!Array.isArray(data) || Array.isArray(data[0]))) {
        return { dimensions: this.echartOption.dimensions, source: data }
      }
      if (!data || data.length === 0) return { dimensions: this.echartOption.dimensions, source: [] }

      const source = []
      // 获取所有group
      const groups = _.uniq(_.map(data, 'group'))
      const isSingleGroup = groups.length === 1 && groups[0] === undefined
      const dimensions = isSingleGroup ? ['name', 'undefined'] : ['name', ...groups]
      const namedArray = data.map(item => ({ ...item, name: `${item.name}%name%` }))
      // 以name分组数据
      const formatData = _.groupBy(namedArray, 'name')
      // 循环数据，封装格式
      _.each(formatData, (obj, key) => {
        const srouceField = obj.map(field => {
          if (!field) return {}
          // eslint-disable-next-line
          const { name, value, group, ...other } = field
          return { [group]: value, ...other }
        })
        source.push({
          name: key.replace('%name%', ''),
          ...Object.assign(...srouceField)
        })
      })

      return { dimensions, source }
    }
  },

  watch: {
    /**
     * @name 项圣
     * @Date 2021-07-09 11:10:18
     * @introduction 监听器-监听传入的数据变化，重新设置option
     * @description 监听传入的数据变化，重新设置option
     * @param {any} newValue 变化后的数据
     * @param {any} oldValue 变化前的数据
     * @return 无返回类型
     * @exception [违例类型] [违例类型说明]
     */
    data(newdata) {
      this.staticData = [...newdata]
      this.setData(newdata)
    },

    /**
     * @name 项圣
     * @Date 2021-07-09 11:20:41
     * @introduction 监听器-监听图表option变化
     * @description 监听图表option变化，并赋值给echartOption，
     * @param {any} newValue 变化后的数据
     * @param {any} oldValue 变化前的数据
     * @return 无返回类型
     * @exception [违例类型] [违例类型说明]
     */
    option: {
      handler (newOption) {
        this.setData(this.staticData, newOption)
      },
      deep: true
    },

    /**
     * @name 项圣
     * @Date 2021-07-09 11:20:41
     * @introduction 监听器-监听图表最终option变化，重新设置图表option
     * @description 详细描述
     * @param {any} newValue 变化后的数据
     * @param {any} oldValue 变化前的数据
     * @return 无返回类型
     * @exception [违例类型] [违例类型说明]
     */
    echartOption: {
      handler(newOption) {
        if (!this.chart) return false
        if (this.isClear) this.chart.clear()
        this.chart.setOption(newOption, this.isClear)
        this.chart.hideLoading()
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.sc-tf-echart {
    width: 100%;
    height: 100%;
}
</style>
