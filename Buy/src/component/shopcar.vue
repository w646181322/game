<template>
    <div class="shopingContainer">
        <input type="text" class="search" @keyup=sreach ref="search" placeholder="搜索所想要买的物品">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell" v-for="(val,key) in list" :key="key">
                <span class="text">{{key}}</span>
                <span class="text store">库存：{{val[2]}}</span>
                <span class="text value mui-badge mui-badge-primary">单价:￥{{val[0]}}</span>
                <numberbox :name="key" :store="val[2]" :num="val[1]" @getCount="getSelectNum"></numberbox>
            </li>
        </ul>
        <div class="buy">
            <button type="button" class="mui-btn mui-btn-danger" @click="buyRight">立即购买</button>
            <span>总价：￥{{price}}</span>
        </div>
    </div>
</template>

<script>
import numberbox from './numberbox.vue'
export default {
    data(){
        let state = this.$store.state
        return {
            allList: state.shopcar,
            list: {},// 对象 name: [price,num,store,type]
            price: 0
        }
    },
    components:{
        numberbox
    },
    methods:{
        sreach(){
            this.list = {}
            console.log(1)
            var text = this.$refs.search.value
            console.log(text)
            for(key in this.allList){
                if(key.indexOf(text) != -1){
                    this.list[key] = this.list[key]
                }
            }
            console.log(this.list)
        },
        getSelectNum(name,count){
            console.log(name,count)
            this.$store.commit('addCarNum',[name,count])
            this.getNewPrice()
        },
        getNewPrice(){
            for(item in this.allList){
                this.price += parseFloat(this.allList[item][0]) 
            }
        },
        buyRight(){
            // [this.name,this.price,num,this.store,this.type]
            // name: [price,num,store,type]
            if(this.list){
                for(item in this.list){
                    this.$store.commit('addMyStore',[item,this.list[item][0],this.list[item][1],this.list[item][2],this.list[item][3]])
                }
                this.$store.commit('clearShopCar')
                this.$router.push({name: 'backpackerThings'})
            }
            
        }
    },
    mounted(){
        this.list = this.allList
        this.getNewPrice()
    }
}
</script>

<style lang="scss" scoped>
    .shopingContainer{
        position: relative;
        .store{
            font-size: 14px;
        }
        .buy{
            position: absolute;
            top: 500px;
            left: 120px;
            z-index: 10;
        }
    }
</style>
