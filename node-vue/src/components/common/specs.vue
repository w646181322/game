<template>
    <div class="specsContainer">
        <span v-if="num" class="el-icon-remove-outline"></span><span class="num" v-if="num">{{num}}</span>
        <el-button class="btn" type="text" @click="dialogVisible = true">选规格</el-button>

        <el-dialog
            :title='foodname'
            center
            :visible.sync="dialogVisible"
            width="70%"
            top="50%"
            :before-close="handleClose">
            <span class="guige">规格</span>
            <div class="choosebox">
                <span :class="{active: activeindex == index}" v-for="(item,index) in data" :key="index" @click="choose(item.specs_name,item.price,index,item.food_id)">{{item.specs_name}}</span>
            </div>
            <span class="price">￥{{price}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addFood()">加入购物车</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            num: 0,
            foodname:null,
            value: null,
            data: [],
            temp: null,
            price: null,
            dialogVisible: false,
            activeindex: 0,
            shopId: null,
            foodId: null,
            subName: null
        }
    },
    props:['guige','name'],
    methods: {
        handleClose(done) {
                done();
        },
        choose(name,price,index,foodId){
            this.activeindex = index
            this.price = price
            this.value = name
            this.foodId = foodId
        },
        addFood(){
            this.dialogVisible = false
            this.num += 1
            // 传值购物车
            this.$store.commit('addShopCar',[this.shopId,this.foodId,this.value,this.price,this.subName])
        }
    },
    mounted(){
        this.data = this.guige.specfoods
        this.price = this.data[0].price
        this.foodname = this.name
        this.value = this.data[0].name
        this.subName = this.data[0].specs_name
        this.foodId = this.data[0].food_id
        this.shopId = this.$route.query.id
    }
}
</script>

<style lang='scss' scoped>
    .specsContainer{
        .el-icon-remove-outline{
            font-size: 20px;
            color: #3190e8;
        }
        .num{
            font-size: 16px;
            color: black;
            margin: 0 8px;
        }

        .btn{
            background-color:#3190e8;
            border-radius: 2px;
            border: 1px solid #3190e8;
            color: #fff;
            padding: 2px 3px;
        }

        .guige{
            font-size: 16px;
        }
        .choosebox{
            margin-top: 10px;
            margin-bottom: 10px;
            span{
                border: 1px solid black;
                color: black;
                border-radius: 5px;
                padding: 2px 3px;
                margin-right: 10px;
            }
            .active{
                border-color: #3190e8;
                color: #3190e8;
            }
        }
        .price{
            font-size: 16px;
            color: #ff6600;
        }
    }
</style>
