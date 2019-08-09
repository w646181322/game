import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import app from './App.vue'
import router from './router.js'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// import mui from './lib/mui/js/mui.min.js'

import shopStore from '../static/store.json'

var ss = shopStore

console.log(ss)

const store = new Vuex.Store({
  state:{
    money: 1000,
    JoyStore: ss.joy, // 对象 name: [price,store]
    SnacksStore: ss.snacks, // 对象 name: [price,store]
    myStore: {},// 对象 name: [price,num]
    shopcar: {},// 对象 name: [price,num,store,type]
    shopcarnum: 0
  },
  mutations:{
    getJoyList(state){
      return state.JoyStore
    },
    // things => name, price, num, store, type 
    // 添加物品到自己购物车
    addShopCar(state,things){
      if(state.shopcar[things[0]]){
        state.shopcar[things[0]][1] += things[2]
        if(state.shopcar[things[0]][1] > things[3]){
          state.shopcar[things[0]][1] = things[3]
        }
      }else{
        state.shopcar[things[0]] = [things[1],things[2],things[3],things[4]]
      }
      console.log(state.shopcar)
      // 更新购物车的数字图标
      state.shopcarnum = 0
      for(item in state.shopcar){
        state.shopcarnum += state.shopcar[item][1]
      }
    },
    // 添加物品到自己仓库
    addMyStore(state,things){
      if(state.myStore[things[0]]){
        state.myStore[things[0]][1] += things[2]
        state.money -= things[1]*things[2]
        console.log(state.money)
        // 对库存物品数量进行相应的改动
        if(things[4]=='joy'){
          for(item in state.JoyStore){
            // console.log(item)
            if(item == things[0]){
              state.JoyStore[item][1] -= things[2]
              console.log(state.JoyStore[item][1])
            }
          }
        }else{
          for(item in state.SnacksStore){
            if(item == things[0]){
              state.SnacksStore[item][1] -= things[2]
            }
          }
        }
      }else{
        state.myStore[things[0]] = [things[1],things[2]]
        state.money -= things[1]*things[2]
        console.log(state.money)
        console.log(things[4])
        // 对库存物品数量进行相应的改动
        if(things[4]=='joy'){
          for(item in state.JoyStore){
            if(item == things[0]){
              state.JoyStore[item][1] -= things[2]
              console.log(state.JoyStore[item][1])
            }
          }
        }else{
          for(item in state.SnacksStore){
            if(item == things[0]){
              state.SnacksStore[item][1] -= things[2]
            }
          }
        }
      }
    },
    // 购物车中物品的数量发生改变时，同时改变state里的数量
    // things => name, num
    addCarNum(state,things){
      for(item in state.shopcar){
        if(item == things[0]){
          state.shopcar[item][1] = things[1]
        }
      }
      console.log(things)
      state.shopcarnum = 0
      for(item in state.shopcar){
        state.shopcarnum += state.shopcar[item][1]
      }
    },
    //things => name: [price,num,store,type]
    clearShopCar(state){
      state.shopcarnum = 0
      state.shopcar = {}
    }
  }
})

var vm = new Vue({
  el: '#app',
  data:{},
  render: c => c(app),
  router,
  store
})