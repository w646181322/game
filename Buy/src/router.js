import VueRouter from 'vue-router'

import index from './component/index.vue'
import joyShop from './component/joyShop.vue'
import snacksShop from './component/snacksShop.vue'
import backpackerThings from './component/backpackerThings.vue'
import shopcar from './component/shopcar.vue'
import goodsInfo from './component/goodinfo.vue'

var router = new VueRouter({
  routes:[
    { path: '/',redirect:'/index' },
    { path: '/index', component: index, name: 'index', meta:{ title:"street"} },
    { path: '/joyShop', component: joyShop ,name: 'joyShop', meta:{ title:"jpyShop"}},
    { path: '/snacksShop', component: snacksShop, name: 'snacksShop', meta:{ title:"snacksShop"} },
    { path: '/backpackerThings', component: backpackerThings, name: 'backpackerThings', meta:{ title:"backpackerThings"}},
    { path: '/shopcar', component:shopcar, name: 'shopcar', meta:{ title:"shopcar"}},
    { path: '/goodinfo', component:goodsInfo, name: 'goodsInfo', meta:{ title:'goodsInfo'}}
  ]
})

export default router