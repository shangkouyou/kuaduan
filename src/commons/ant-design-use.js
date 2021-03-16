/* eslint-disable */
import {
  Modal ,
  Empty,
  message,
  Tooltip,
  Popconfirm,
  Pagination,
  BackTop,
  Statistic,
} from 'ant-design-vue'
import Vue from 'vue'
Vue.use(Modal)
Vue.use(Empty)
Vue.use(Tooltip)
Vue.use(Popconfirm)
Vue.use(Pagination)
Vue.use(BackTop)
Vue.use(Statistic)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$warning = Modal.warning
Vue.prototype.$error = Modal.error
