<template>
    <div class="header">
        <div class="left">
            <span v-if="back" class="el-icon-arrow-left" @click="goBack"></span>
        <span v-else>ele.me</span>
        </div>
        <span>{{title}}</span>
        <div class="right">
            <span class="right">登录</span>
            <span class="right">|</span>
            <span class="right">注册</span>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            back: false,
            from: null,
            title: null
        }
    },
    methods:{
        goBack(){
            console.log(this.from)
            if(this.from == 'index'){
                let geohash = this.$store.state.exactAddress
                this.$router.push({name: this.from, query: { geohash : geohash}})
            }else{
                this.$router.push({ name: this.from })
            }
            
        }
    },
    watch:{
        $route(to,from){
            this.from = from.name
            console.log('to',to.path)
            console.log('from',from)
            if( this.$route.path == '/shopInfo' || this.$route.path == '/shopCategory' || this.$route.path == '/integralShop' || this.$route.path == '/moneyInfo' || this.$route.path == '/coupon' || this.$route.path == '/integralInfo' || this.$route.path == '/service' || this.$route.path == '/answer' || this.$route.path == '/download' ){
                this.back = true
            }else{
                this.back = false
            }

            if(this.$route.path == '/index'){
                this.title = this.$store.state.currentAddress
            }else if(this.$route.path == '/search'){
                this.title = '搜索'
            }else if(this.$route.path == '/person'){
                this.title = '我的'
            }else if(this.$route.path == '/order'){
                this.title = '我的订单'
            }else if(this.$route.path == '/service'){
                this.title = '服务中心'
            }else if(this.$route.path == '/download'){
                this.title = '下载APP'
            }else if(this.$route.paht == '/vip'){
                this.title = 'vip'
            }else if(this.$route.path == '/integralShop'){
                this.title = '积分商城'
            }
        }
    }
  
}
</script>

<style lang='scss' scoped>
    .header{
        width: 100%;
        height: 45px;
        background-color: #3190e8;
        color: white;
        text-align: center;
        span{
            line-height:45px;
            margin: 0 10px;
        }
        span:nth-of-type(2){
            margin: 0;
        }
        .right{
            float: right;
        }
        .left{
            float: left;
        }
    }
    .right{
        float: right;
    }
    .left{
        float: left;
    }
</style>
