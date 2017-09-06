// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store';
Vue.prototype.$http = axios.create({
    baseURL: '/api/',
    timeout: 5000,
    responseType: 'json',
    headers:{
        'X-Requested-With': 'XMLHttpRequest'
    }
});
Vue.prototype.$http.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.code === 'ECONNABORTED'){
        Vue.prototype.$message({
            showClose: true,
            message: "请求超时",
            type: 'error'
        })
    }else if(error.response.status !== 422){
        Vue.prototype.$message({
            showClose: true,
            message: error.response.data.message,
            type: 'error'
        })
        if(error.response.status === 401){
            router.push({name: 'login'});
        }
    }else{
        let errorsTemp = error.response.data.errors;
        for(let index in errorsTemp){
            errorsTemp[index] = errorsTemp[index].join(',')
        }
    }
    return Promise.reject(error);
});

// Vue.filter('dateFilter', (val) => {
//     var tempStr = new Array()
//     tempStr = (val || '').split(' ')
//     return tempStr[0]
// })

function getMenu(next) {
    store.state.menus = null
    if(store.state.menus === null) {
        Vue.prototype.$http.get('menus').then(res => {
            store.commit('UPDATE_MENUS', res.data);
            if (next) {
                next({name: store.state.menus[0].child[0].url});
            }
        });
    }
}
router.beforeEach((to, from, next) => {
    if (to.name === 'home') {
        getMenu(next);
    } else {
        getMenu();
        next();
    }
})
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$diff = require('./utils/diff');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
