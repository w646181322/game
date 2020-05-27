// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import Vuex from 'vuex'
Vue.use(Vuex)

import 'swiper/dist/css/swiper.min.css'

import 'bootstrap/dist/css/bootstrap.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    localCity: null,
    searchHostory: [],
    exactAddress: null,
    currentAddress: null,
    shopCar: [],  // 数据结构 [ {shopId, foodList[ {foodId,price,num} ] } ]
    shopCarChanged: 0
  },
  mutations:{
    getCity(state,data){
      state.localCity = data
      console.log(state.localCity)
    },
    getSearchHostory(state,data){
      state.currentAddress = data[1].name
      state.exactAddress = data[0]
      if(state.searchHostory.length == 0){
        state.searchHostory.push(data[1])
      }else{
        let hostory = new Map()
        state.searchHostory.forEach(item => {
          hostory.set(item,true)
        })
        if(!hostory.has(data[1])){ // 如果不存在相同的搜索历史地址，则添加进state.searchHostory
          state.searchHostory.push(data[1])
        }
      }
      
      
    },
    addShopCar(state,data){
      // data 数据 [商店id,食物id,食物名称,价格,规格名]
      let haveShop = false
      let haveFood = false
      if(state.shopCar.length == 0){
        state.shopCar[0] = {
          shopId: data[0],
          foodList: [
            {
              foodId: data[1],
              name: data[2],
              price: data[3],
              subName: data[4],
              num: 1
            }
          ]
        }
        state.shopCarChanged += 1
      }else{
        // 检查state.shopCar 中是否存在了相同的食物
        for(let value of state.shopCar){
          if(value.shopId == data[0]){
            haveShop = true
            for(let item of value.foodList){
              if(item.foodId == data[1]){
                haveFood = true
                item.num += 1
              }
            }
          }
        }
        
        if(!haveShop){ // state.shopCar 没有相同的商店
          state.shopCar[state.shopCar.length] = {
            shopId: data[0],
            foodList: [
              {
                foodId: data[1],
                name: data[2],
                price: data[3],
                subName: data[4],
                num: 1
              }
            ]
          }
        }else if(!haveFood){ // state.shopCar 中有该商店，但没有相同食物
          state.shopCar.forEach(value => {
            if(value.shopId == data[0]){
              value.foodList[value.foodList.length] = {
                foodId: data[1],
                name: data[2],
                price: data[3],
                subName: data[4],
                num: 1
              }
            }
          })
        }

        // 记录购物车里的数据发生了 变化
        state.shopCarChanged += 1
      }
      
    },
    reduceShopCar(state,data){
      // data数据结构 [商店ID,食物ID,食物名称，食物价格,(食物规格名)]
      state.shopCar.forEach((value,index,carArr) => {
        if(value.shopId == data[0]){
          value.foodList.forEach((item,i,foodArr) => {
            if(item.foodId == data[1]){
              item.num -= 1
              if(item.num == 0){
                // 该食物已经删空
                foodArr.splice(i,1)
              }
            }
          })
        }
        console.log(value.foodList.length)
        if(value.foodList.length == 0){
          // 该店铺中已没有选中食物
          carArr.splice(index,1)
        }
      })

      state.shopCarChanged -= 1
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
