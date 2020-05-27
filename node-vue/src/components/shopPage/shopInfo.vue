<template>
    <div class="shopInfoContainer">
        <div class="shopInfo">
            <div class="back" :style="{backgroundImage: 'url('+'//elm.cangdu.org/img/'+ shopInfo.image_path + ')', backgroundSize:'100%',backgroundRepeat:'norepeat'}"></div>
            <div class="shopHead">
                <div class="shopImg">
                    <img :src="'//elm.cangdu.org/img/'+shopInfo.image_path" alt="">
                </div>
                <div class="shopMessage">
                    <p class="shopName">{{shopInfo.name}}</p>
                    <p>商家配送/{{shopInfo.float_minimum_order_amount}}分钟送达/配送费￥{{shopInfo.float_delivery_fee}}</p>
                    <p>公告：{{shopInfo.promotion_info}}</p>
                </div>
            </div>
            <div class="shopActive" :v-if="active">
                <p>活动</p>
            </div>
        </div>

        <div class="shopContent">
            <div class="foodCategory">
                <ul>
                    <li :class="{active: activeindex == index}" v-for="(item,index) in menu" :key="item.id" @click="test(index)"><a :href="'#shopInfo#'+item.name">{{item.name}}</a></li>
                </ul>
            </div>
            <div class="foodList">
                <div class="foodbox" :id="'shopInfo#'+foods.name" v-for="foods in menu" :key="foods.id">
                    <p class="foodTitle">{{foods.name}}<span>{{foods.description}}</span></p>
                    <div class="foodShow" v-for="food in foods.foods" :key="food.id">
                        <div class="img">
                            <img :src="'//elm.cangdu.org/img/'+food.image_path" alt="">
                        </div>
                        <div class="describe">
                            <p class="line1">{{food.name}}</p>
                            <p class="line2">{{food.description}}</p>
                            <p class="line3">月售{{food.month_sales}}份 <span>好评率{{food.satisfy_rate}}</span>%</p>
                            <div class="buyBox">
                                <div class="price">
                                    <span>￥{{food.specfoods[0].price}}</span>起
                                </div>
                                <div class="choose">
                                    <div v-if='food.specfoods.length>1?true:false'>
                                        <!-- 食物规格选择 -->
                                        <specs :guige="food" :name="food.name"></specs>
                                    </div>
                                    <div v-else>
                                        <!-- 食物数量选择 -->
                                        <number :foodMessage="food"></number>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="foot" v-if="visible">
            <shopCar :delivery="peisongfei"></shopCar>
        </div>
    </div>
</template>

<script>
import number from '@/components/common/numberbox.vue'
import specs from '@/components/common/specs.vue'
import shopCar from '@/components/common/shopCar.vue'

export default {
  data(){
    return {
        shopId: null,
        shopInfo: {},
        active: false,
        menu: [],
        activeindex: 0,
        visible: false,
        peisongfei: 0
    }
  },
  components:{
      number,
      specs,
      shopCar
  },
  methods:{
      getShopInfo(){
        //   console.log(11)
          this.$http.get('https://elm.cangdu.org/shopping/restaurant/'+this.shopId).then(res => {
              this.shopInfo = res.data
              this.peisongfei = this.shopInfo.float_delivery_fee
              if(this.shopInfo.activities.length>0){
                  this.active = true
              }
          })
      },
      getShopMenu(){
          this.$http.get('https://elm.cangdu.org/shopping/v2/menu?restaurant_id='+this.shopId).then(res => {
              this.menu = res.data
            //   console.log(this.menu)
          },rej => {
              console.log('数据获取失败')
          })
      },
      changeActive(index){
          this.activeindex = index
      },
      test(index){
          console.log(index)
          this.activeindex = index
      }
  },
  mounted(){
      this.shopId = this.$route.query.id
      console.log(this.shopId)
      this.getShopInfo()
      this.getShopMenu()

      if(this.$route.path == '/shopInfo'){
            this.visible = true
        }
  }
}
</script>

<style lang='scss' scoped>
    .shopInfoContainer{
        position: relative;
        .shopInfo{
            width: 100%;
            height: 130px;
            padding: 10px;
            position: relative;
            overflow: hidden;
            background-color: rgba(163, 163, 163, 0.6);
            .back{
                width: 100%;
                height: 300px;
                position: absolute;
                z-index: 1;
                left: 0;
                top: 0;
                opacity: 0.5;
                filter: blur(5px);
                -webkit-filter: blur(5px);
                -moz-filter: blur(5px);
                -o-filter: blur(5px);
                -ms-filter: blur(5px);
            }
            .shopHead{
                z-index: 10;
                display: flex;
                .shopImg{
                    flex: 2;
                    height: auto;
                    margin-right: 10px;
                    img{
                        width: 100%;
                        height: auto;
                        border-radius: 5px;
                    }
                }
                .shopMessage{
                    flex: 8;
                    font-size: .5rem;
                    .shopName{
                        font-size: 16px;
                        font-weight: bold;
                        color: #fff;
                    }
                }
            }
        }

        .shopContent{
            display: flex;
            overflow-x: hidden;
            overflow-y: scroll;
            background-color: #fff;
            // position: absolute;
            top: 200px;
            width: 100%;
            bottom: 20px;

            .foodCategory{
                flex: 2;
                width: 100%;
                overflow-x: hidden;
                height: 460px;
                padding-bottom: 10px;
                ul{
                    list-style: none;
                    background-color: #f5f5f5;
                    li{
                        box-sizing: border-box;
                        width: 100%;
                        height: 40px;
                        // border: 1px solid #666;
                        text-align: center;
                        line-height: 40px;

                        a{
                            text-decoration: none;
                            color: #666666;
                        }
                    }
                    .active{
                        background-color: #fff;
                        border-left: 2px solid #3190e8;
                    }
                    
                }
            }

            // 隐藏滚动条
            .foodCategory::-webkit-scrollbar {display:none}
            .foodList::-webkit-scrollbar {display:none}

            .foodList{
                width: 100%;
                flex: 7;
                overflow-x: hidden;
                height: 460px;
                padding-bottom: 10px; 
                .foodbox{
                    .foodTitle{
                        background-color: #f5f5f5;
                        height: 45px;
                        font-size: 18px;
                        font-weight: bold;
                        line-height: 45px;
                        text-indent: 10px;
                        span{
                            margin-left: 10px;
                            color: #999999;
                            font-size: 14px;
                            line-height: 45px;
                        }
                    }
                    .foodShow{
                        display: flex;
                        padding: 5px;
                        .img{
                            flex: 2;
                            margin-right: 10px;
                            img{
                                width: 100%;
                                height: auto;
                            }
                        }
                        .describe{
                            flex: 8;
                            p{
                                margin-bottom: 3px;
                                padding: 0;
                            }
                            .line1{
                                font-size: 16px;
                                font-weight: 600;
                                text-indent: 2px;
                            }
                            .line2{
                                text-indent: 2px;
                                font-size: 12px;
                                color: #999999;
                            }
                            .line3{
                                text-indent: 2px;
                                font-size: 12px;
                                color: black;
                            }
                            .buyBox{
                                display: flex;
                                height: 20px;
                                line-height: 20px;
                                .price{
                                    flex: 5;
                                    color: #666;
                                    font-size: 12px;
                                    span{
                                        color: #ff6600;
                                        font-size: 14px;
                                        margin-right: 5px;
                                    }
                                }
                                .choose{
                                    flex: 5;
                                    div{
                                        float: right;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .foot{
            position: fixed;
            bottom: 0px;
            background-color: #3d3d3f;
            width: 100%;
        }
    }
</style>
