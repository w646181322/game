<template>
    <div class="headerContainer">
        <span @click=back class="mui-icon mui-icon-arrowleft arrow" v-show=flag></span>
        <span class="title">{{title}}</span>
        <span class="right index" @click="goIndex" v-show="shouye" >首页</span>
    </div>
</template>

<script>
export default {
    data(){
        return {
            title:"street",
            flag: false,
            path : null,
            shouye: false
        }
    },
    methods:{
        back(){
            this.$router.push(this.path)
        },
        goIndex(){
            this.$router.push({name: 'index'})
        }
    },
    watch:{
        '$route' (to, from){
            console.log(to.name)
            if(to.name == '' || to.name == 'index'){
                this.shouye = false
                this.flag = false
                this.title = 'street'
            }else if(to.name == 'joyShop'){
                this.shouye = true
                this.flag = true
                this.path = from.name
                this.title = 'joyShop'
            }else if(to.name == 'snacksShop'){
                this.shouye = true
                this.flag = true
                this.path = from.name
                this.title = 'snacksShop'
            }else if(to.name == 'shopcar'){
                this.shouye = true
                this.flag = true
                this.path = from.name
                this.title = 'shopcar'
            }else if(to.name == 'backpackerThings'){
                this.shouye = true
                this.flag = true
                this.path = from.name
                this.title = 'backpackerThings'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .headerContainer{
        text-align: center;
        height: 44px;
        .arrow{
            float: left;
            line-height: 44px;
        }
        .title{
            line-height: 44px;
            text-align: center;
            font-size: 18px;
        }
        .index{
            line-height: 44px;
            font-size: 14px;
            margin-right: 10px;
        }
        .right{
        float: right;
        }
    }
</style>
