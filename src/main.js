import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VDistpicker from 'v-distpicker'

import '@/styles/index.scss' // global css

import App from './App'
import store from '@/store/index'
import router from '@/router/index'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.component('v-distpicker', VDistpicker)
Vue.config.productionTip = false

//上传图片地址(测试服)
Vue.prototype.uploadUrl = 'https://ddxc.xyyun.co/app/wetch/wechat/upload'
// Vue.prototype.uploadUrl = 'https://ddxc.xyyunyw.com/app/wetch/wechat/upload'
//上传图片地址(正式服)
// Vue.prototype.uploadUrl = 'https://www.didaxc.cn/app/wetch/wechat/upload'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
