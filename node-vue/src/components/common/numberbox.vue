<template>
    <div class="numberboxContainer">
        <div class="box">
            <span v-if="num" class="el-icon-remove-outline" @click="reduce()"></span><span class="num" v-if="num">{{num}}</span><span class="el-icon-circle-plus" @click="add()"></span>
        </div>
    </div>
</template>

<script>
export default {
  data() {
      return {
        num: null,
        shopId: null,
        foodId: null,
        name: null,
        price: null,
        subName: null
      };
    },
    // foodMessage 是商店食品列表中传过来的数据， foodInfo 是购物车中传过来的数据
    props:["foodMessage","foodInfo"],
    methods: {
      handleChange(value) {
        console.log(value);
      },
      reduce(){
          this.num -= 1
          this.shopId = this.$route.query.id
          // if(this.foodMessage){
          //   this.foodId = this.foodMessage.specfoods[0].food_id
          //   this.name = this.foodMessage.specfoods[0].name
          //   this.price = this.foodMessage.specfoods[0].price
          // }else{
          //   this.foodId = this.foodInfo.foodId
          //   this.name = this.foodInfo.name
          //   this.subName = this.foodInfo.subName
          //   this.price = this.foodInfo.price
          //   this.num = this.foodInfo.num
          // }

          this.$store.commit('reduceShopCar',[this.shopId,this.foodId,this.name,this.price])
      },
      add(){
          this.num += 1
          this.shopId = this.$route.query.id
          if(this.foodMessage){
            this.foodId = this.foodMessage.specfoods[0].food_id
            this.name = this.foodMessage.specfoods[0].name
            this.price = this.foodMessage.specfoods[0].price
          }else{
            this.foodId = this.foodInfo.foodId
            this.name = this.foodInfo.name
            this.subName = this.foodInfo.subName
            this.price = this.foodInfo.price
          }
          

          this.$store.commit('addShopCar',[this.shopId,this.foodId,this.name,this.price])
      }
    },
    mounted(){
        if(this.foodMessage){
            this.foodId = this.foodMessage.specfoods[0].food_id
            this.name = this.foodMessage.specfoods[0].name
            this.price = this.foodMessage.specfoods[0].price
            this.num = 0
          }else{
            this.foodId = this.foodInfo.foodId
            this.name = this.foodInfo.name
            this.subName = this.foodInfo.subName
            this.price = this.foodInfo.price
            this.num = this.foodInfo.num
          }
    }
}
</script>

<style lang='scss' scoped>
    .numberboxContainer{
        .box{
            font-size: 20px;
            color: #3190e8;
            .num{
                margin: 0 8px;
                font-size: 16px;
                color: black;
            }
        }
    }
</style>
