import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import stylus from './common/stylus/index.styl'
import 'element-ui/lib/theme-default/index.css'
import flex from 'flex.css'
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(flex)
new Vue({
	el: '#app',
	router,
	store,
    stylus,
	template: '<App/>',
	components: { App }
})
