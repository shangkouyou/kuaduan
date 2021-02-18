/* eslint-disable */
import {
  Modal ,
  Empty,
  message,
  Tooltip,
  Popconfirm,
  Pagination
} from 'ant-design-vue'
import Vue from 'vue'
Vue.use(Modal)
Vue.use(Empty)
Vue.use(Tooltip)
Vue.use(Popconfirm)
Vue.use(Pagination)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$warning = Modal.warning
Vue.prototype.$error = Modal.error
