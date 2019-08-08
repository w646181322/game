<template>
    <nav class="mui-bar mui-bar-tab">
        <a class="mui-tab-item mui-active" @click="goToBackpacker">
            <span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
            <span class="mui-tab-label">物品</span>
        </a>
        <a class="mui-tab-item" @click="goToShopCar">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{ ($store.state.shopcarnum==0)?'':$store.state.shopcarnum}}</span></span>
            <span class="mui-tab-label">购物车</span>
        </a>
        <a class="mui-tab-item" href="#tabbar-with-contact">
            <span class="mui-icon mui-icon-extra mui-icon-extra-gold"></span>
            <span class="mui-tab-label">1000</span>
        </a>

    </nav>
</template>

<script>
export default {
    data(){
        return {}
    },
    methods:{
        goToBackpacker(){
            this.$router.push({ name: 'backpackerThings'})
        },
        goToShopCar(){
            this.$router.push({ name: 'shopcar'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .backpacker{
        width: 100%;
        height: 100px;
        background-color: blue;
    }
</style>
