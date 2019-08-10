<template>
    <div class="goodContainer">
        <div>
            <span>{{name}}</span>
            <span>￥{{price}}</span>
            <p>库存:{{store}}</p>
        </div>
        <div>
            购买数量:
            <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0' :data-numbox-max=store>
                <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                <input class="mui-numbox-input" ref="numberbox" type="number" />
                <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
            </div>
        </div>
        <div class="buy">
            <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" @click="buyRight">立即购买</button>
            <button type="button" class="mui-btn mui-btn-danger" @click="add">加入购物车</button>
        </div>
        

    </div>    
</template>

<script>
import mui from '../lib/mui/js/mui.min.js'

export default {
    data(){
        return {
            name: null,
            price: null,
            store: null,
            type: null
        }
    },
    methods:{
        getInfo(){
            console.log(this.$route)
            this.name = this.$route.query.name
            this.price = this.$route.query.price
            this.store = this.$route.query.store
            this.type = this.$route.query.type
        },
        buyRight(){
            var num = mui('.mui-numbox').numbox().getValue()
            this.$store.commit('addMyStore',[this.name,this.price,num,this.store,this.type])
        },
        add(){
            var num = parseInt(this.$refs.numberbox.value)
            console.log(this.$refs)
            this.$store.commit('addShopCar',[this.name,this.price,num,this.store,this.type])
        }
    },
    mounted(){
        mui('.mui-numbox').numbox()
    },
    created(){
        this.getInfo()
    }
}
</script>

<style lang="scss" scoped>
    .goodContainer{
        padding: 10px;
        .buy{
            margin: 15px;
        }
    }
</style>
