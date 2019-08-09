<template>
    <div class="joy-container">
        <div class="pic">
            <img src="../../static/joyShop.jpg" style="width:100%;heigth:auto" alt="">
        </div>
        <div class="choose">
            <div class="joyShop">
                <input type="text" class="search" @keyup=sreach ref="search" placeholder="搜索你想要的物品">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-for="(val,key) in joyList" :key="key" @click="goToInfo(key,val,'joy')">
                        <span class="text">{{key}}</span>
                        <span class="text store">库存：{{val[1]}}</span>
                        <span class="text value mui-badge mui-badge-primary">￥{{val[0]}}</span>
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
        // var mask = mui.createMask()
        // mask.show()
        return {
            allList: joy.JoyStore,
            joyList: {}
        }
    },
    components:{
        
    },
    methods:{
        getJoyLIst(){
            this.joyList = this.allList
            console.log(this.joyList)
        },
        sreach(){
            this.joyList = {}
            console.log(1)
            var text = this.$refs.search.value
            console.log(text)
            for(key in this.allList){
                if(key.indexOf(text) != -1){
                    this.joyList[key] = this.allList[key]
                }
            }
            console.log(this.joyList)
        },
        goToInfo(key,val,type){
            this.$router.push({ path: 'goodinfo', query:{ name: key,price:val[0],store:val[1],type:type}})
        }
    },
    
    mounted(){
        this.getJoyLIst()
    }
}
</script>

<style lang="scss" scoped>
    .joy-container{
        position: relative;
        .joyShop{
            .text{
                line-height: 40px;
            }
            .value{
                margin-left: 5px;
                font-size: 14px;
            }
            .store{
                 margin-left: 5px;
                font-size: 12px;
            }
        }
        .right{
            float: right;
        }
    }
</style>
