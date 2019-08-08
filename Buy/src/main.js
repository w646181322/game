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
    JoyStore: ss.joy,
    SnacksStore: ss.snacks,
    myStore: {},
    shopcar: {},
    shopcarnum: 0
  },
  mutations:{
    getJoyList(state){
      return state.JoyStore
    },
    hadbuy(state,things){
      state.myStore.push(things)
    },
    add(state,key){}
  }
})

var vm = new Vue({
  el: '#app',
  data:{},
  render: c => c(app),
  router,
  store
})