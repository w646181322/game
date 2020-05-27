<template>
    <div class="footContainer" v-if="visible">
        <ul class="foot">
            <li class="shop active">
                <a @click="goToShop">
                    <span :class='["el-icon-eleme",current=="0" ? "active" : ""]'></span>
                    <span class="text">外卖</span>
                </a>
            </li>
            <li class="search">
                <a @click="goToSearch">
                    <span :class='["glyphicon glyphicon-zoom-in icon",current=="1" ? "active" : ""]'></span>
                    <span class="text">搜索</span>
                </a>
            </li>
            <li class="order">
                <a @click="goToOrder">
                    <span :class='["glyphicon glyphicon-list-alt icon",current=="2" ? "active" : ""]'></span>
                    <span class="text">订单</span>
                </a>
            </li>
            <li class="person">
                <a @click="goToPerson">
                    <span :class='["glyphicon glyphicon-user icon",current=="3" ? "active" : ""]'></span>
                    <span class="text">我的</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    // todo:  点击链接 图标变色
    data(){
        return {
            visible: false,
            current: 0
        }
    },
    methods:{
        goToShop(){
            let geohash = this.$store.state.exactAddress
            this.current = 0
            this.$router.push({name: 'index', query: { geohash : geohash}})
        },
        goToSearch(){
            this.current = 1
            this.$router.push({name: 'search' })
        },
        goToOrder(){
            this.current = 2
            this.$router.push({name: 'order' })
        },
        goToPerson(){
            this.current = 3
            this.$router.push({name: 'person' })
        }
    },
    watch:{
        $route(to,from){
            // console.log(to.path,from.path)
            // console.log(this.$route.path)
            if( this.$route.path == '/index' ||
                this.$route.path == '/search' || 
                this.$route.path == '/order' || 
                this.$route.path == '/person'
            ){
                this.visible = true
            }else{
                this.visible = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .footContainer{
        background-color: #fff;
        position: fixed;
        bottom: 0;
        height: 45px;
        width: 100%;
        border: 1px solid #ddd;
        .foot{
            display: flex;
            list-style: none;
            a{
                text-decoration: none;
            }
            li{
                display: block;
                padding: 5px;
                flex: 1;
                text-align: center;
            }
            span{
                display: block;
                font-size: 16px;
                color: #666;
            }
            .text{
                font-size: 14px;
            }
            .active{
                color:#119fff;
            }
        }
    }
</style>