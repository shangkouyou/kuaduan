/* eslint-disable */
import {
  Modal ,
  message,
  Tooltip,
  Popconfirm,
  Pagination,
  BackTop,
  Statistic,
  Popover,
} from 'ant-design-vue'
import Vue from 'vue'
Vue.use(Modal)
Vue.use(Tooltip)
Vue.use(Popconfirm)
Vue.use(Pagination)
Vue.use(BackTop)
Vue.use(Statistic)
Vue.use(Popover)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$warning = Modal.warning
Vue.prototype.$error = Modal.error
