<template>
    <div class="snacks-container">
        <div class="pic">
            <img src="../../static/snacksShop.jpg" style="width:100%;heigth:auto" alt="">
        </div>
        <div class="choose">
            <div class="snacksShop">
                <input type="text" class="search" @keyup=sreach ref="search" placeholder="搜索你想要的物品">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-for="(val,key) in snacksList" :key="key">
                        <span class="text">{{key}}</span>
                        <span class="text value">￥{{val[0]}}</span>
                        <span class="text store">库存：{{val[1]}}</span>
                        <div class="mui-numbox right" data-numbox-step='1' data-numbox-min='0' :data-numbox-max='val[1]'>
                            <button class="mui-btn mui-numbox-btn-minus" type="button" @click="decrease(key)">-</button>
                            <input class="mui-numbox-input" type="number" />
                            <button class="mui-btn mui-numbox-btn-plus" type="button" @click="add(key)">+</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        let joy = this.$store.state
        console.log(joy)
        return {
            allList: joy.SnacksStore,
            snacksList: {}
        }
    },
    methods:{
        getSnacksLIst(){
            this.snacksList = this.allList
            console.log(this.snacksList)
        },
        sreach(){
            this.snacksList = {}
            console.log(1)
            var text = this.$refs.search.value
            console.log(text)
            for(key in this.allList){
                if(key.indexOf(text) != -1){
                    this.snacksList[key] = this.allList[key]
                }
            }
            console.log(this.snacksList)
        },
        add(key){
            this.$store.commit('add',key)
        },
        decrease(key){
            this.$store.commit('decrease',key)
        }
    },
    mounted(){
        this.getSnacksLIst()
    }
}
</script>

<style lang="scss" scoped>
    .snacks-container{
        .snacksShop{
            .text{
                line-height: 40px;
            }
            .value{
                margin-left: 5px;
                font-size: 16px;
            }
            .store{
                 margin-left: 5px;
                font-size: 14px;
            }
        }
        .right{
            float: right;
        }
    }
</style>
