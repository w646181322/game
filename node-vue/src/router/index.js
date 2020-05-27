import Vue from 'vue'
import Router from 'vue-router'

import getLocal from '@/components/local/getLocal.vue'
import getExactLocal from '@/components/local/getExactLocal.vue'

import index from '@/components/mainPage/index.vue'
import search from '@/components/mainPage/search.vue'
import order from '@/components/mainPage/order.vue'
import person from '@/components/mainPage/person.vue'
import shopCategory from '@/components/mainPage/shopCategory.vue'

import moneyInfo from '@/components/mainPage/personInfo/moneyInfo.vue'
import coupon from '@/components/mainPage/personInfo/coupon.vue'
import integralInfo from '@/components/mainPage/personInfo/integralInfo.vue'
import integralShop from '@/components/mainPage/personInfo/integralShop.vue'
import vip from '@/components/mainPage/personInfo/VIPpage.vue'

import service from '@/components/mainPage/customerService/service.vue'
import download from '@/components/mainPage/customerService/download.vue'
import answer from '@/components/mainPage/customerService/answer.vue'

import shopInfo from '@/components/shopPage/shopInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/getLocal' },
    { path: '/getLocal', name: 'getLocal', component: getLocal},
    { path: '/getExact/:id',name: 'getExact',component: getExactLocal},
    { path: '/index', name:'index', component: index},
    { path: '/search', name:'search', component: search},
    { path: '/order', name:'order', component: order},
    { path: '/person', name:'person', component: person},
    { path: '/moneyInfo', name:'moneyInfo', component: moneyInfo},
    { path: '/coupon', name:'coupon', component: coupon},
    { path: '/integralInfo', name:'integralInfo', component: integralInfo},
    { path: '/integralShop', name:'integralShop', component: integralShop},
    { path: '/vip', name:'vip', component: vip},
    { path: '/service', name:'service', component: service},
    { path: '/download', name:'download', component: download},
    { path: '/answer', name:'answer', component: answer},
    { path: '/shopCategory', name:'shopCategory', component: shopCategory},
    { path: '/shopInfo', name:'shopInfo', component: shopInfo}
  ]
})
