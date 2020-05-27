<template>
    <div class="shopCarContainer">
        <div class="shopCar" @click="showCarList">
            <div class="carImg">
                <span class="carListNum" v-if="listNum">{{listNum}}</span>
                <span :class="{ 'el-icon-shopping-cart-2':true , 'active':turnBlue  }"></span>
            </div>
            <div class="price">
                <p>￥<span>{{allPrice}}</span></p>
                <p>配送费￥{{delivery}}</p>
            </div>
            <div class="pay">
                <span>去结算</span>
            </div>
        </div>
        <div class="carList" v-if="showList" ref="carlist">
            <div class="carTitle">
                <span>购物车</span>
                <span class="el-icon-delete-solid" @click="clear"> 清除</span>
            </div>
            <div class="list">
                <div class="foodItem" v-for="obj in list" :key="obj.foodId">
                    <div class="itemName">
                        <span>{{obj.name}}</span>
                        <span>{{obj.subName}}</span>
                    </div>
                    <span class="itemPrice">￥{{obj.price}}</span>
                    <div class="itemNum">
                        <number :foodInfo="obj"></number>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import number from '@/components/common/numberbox.vue'

export default {
    data(){
        return {
        allPrice: 0,
        delivery: null,
        list: null,
        index: null,
        showList: false,
        turnBlue: false,
        listNum: 0
        }
    },
    props:["delivery"],
    components:{
        number
    },
    methods:{
        clear(){

        },
        showCarList(){
            console.log('显示所选食品列表')
            if(!this.list){
                return false
            }else{
                this.showList = !this.showList
                // 实现商品列表的从下向上展开
                // this.$refs.carlist.style.height = 100 + shopList.length * 50 + 'px'
            }
        }
    },
    computed:{
        getList(){
            return this.$store.state.shopCarChanged
        }
    },
    watch:{
        getList(newList,oldList){
            console.log('shopCar 变化了')
            let shopId = this.$route.query.id
            this.list = null
            let shopCarList = this.$store.state.shopCar
            shopCarList.forEach((value,index) => {
                if(value.shopId == shopId){
                    this.list = value.foodList
                    this.index = index
                }
            })

            // 改变购物车的颜色
            if(this.list){
                this.turnBlue = true
                this.listNum = 0
                this.allPrice = 0
                this.list.forEach(item => {
                    this.listNum += item.num
                    this.allPrice += item.price * item.num
                })
                console.log(this.list)
            }else{
                this.listNum = 0
                this.allPrice = 0
                this.turnBlue = false
                this.showList = false
            }
        }
    },
    mounted(){
        let shopId = this.$route.query.id
        let shopCarList = this.$store.state.shopCar
        if(shopCarList){
            shopCarList.forEach((value,index) => {
                if(value.shopId == shopId){
                    this.list = value.foodList
                    this.index = index
                }
            })
        }
        
    }
}
</script>

<style lang='scss' scoped>
    .shopCarContainer{
        position: relative;
        height: 48px;
        background-color: #3d3d3f;
        .shopCar{
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 30;
            background-color: #444444;
            .carImg{
                position: absolute;
                top: 20%;
                text-align: center;
                transform: translateY(-50%);
                left: 15px;
                width: 55px;
                height: 55px;
                border-radius: 50%;
                overflow: hidden;
                background-color: #444444;
                padding: 2px;
                box-sizing: border-box;
                span{
                    font-size: 41px;
                    border-radius: 50%;
                    padding: 5px;
                    background-color: #3d3d3f;
                    color: #fff;
                }
                .active{
                    background-color: #3190e8;
                }
                .carListNum{
                    box-sizing: border-box;
                    padding: 2px 3px;
                    width: 18px;
                    height: 18px;
                    font-size: .8rem;
                    transform: scale(0.90);
                    background-color: red;
                    color: #fff;
                    border-radius: 50%;
                    position: absolute;
                    right: 2px;
                    top: 2px;
                    z-index: 31;
                }
            }
            .price{
                position: absolute;
                left: 90px;
                p{
                    padding: 0;
                    margin: 0;
                    color: #fff;
                }
            }
            .pay{
                position: absolute;
                width: 120px;
                height: 48px;
                background-color: #4cd964;
                color: #fff;
                text-align: center;
                right: 0;
                span{
                    line-height: 48px;
                }
            }
        }

        .carList{
            width: 100%;
            background-color: #fff;
            position: absolute;
            bottom: 0;
            padding-bottom: 60px; 
            z-index: 20;
            .carTitle{
                height: 40px;
                width: 100%;
                background-color: #eceff1;
                span:nth-of-type(1){
                    font-size: 16px;
                    color: #7d7d7e;
                    margin-left: 10px;
                    line-height: 40px;
                }
                span:nth-of-type(2){
                    float: right;
                    margin-right: 10px;
                    line-height: 40px;
                    font-size: 14px;
                }
            }
            .list{
                background-color: #fff;
                .foodItem{
                    width: 100%;
                    height: 50px;
                    display: flex;
                    .itemName{
                        flex: 6;
                        height: 100%;
                        span{
                            display: block;
                            font-size: 16px;
                            line-height: 20px;
                            color: #6f6f6f;
                        }
                        span:nth-of-type(2){
                            font-size: 12px;
                            color: #666666;
                        }
                    }
                    .itemPrice{
                        height: 100%;
                        flex: 2;
                        text-align: center;
                        line-height: 50px;
                    }
                    .itemNum{
                        height: 100%;
                        flex: 2;
                    }
                }
            }
        }
    }
</style>
