import Vue from 'vue'
import App from './App.vue'
import './commons/ant-design-use';

import './assets/css/reset.css';
import './assets/less/base.less';
import './assets/font/iconfont.css';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
