import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import EleLowcode from '../lib/element-lowcode-v1.common'
import EleLowcode from '../packages/index'
Vue.use(ElementUI)
Vue.use(EleLowcode)
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
