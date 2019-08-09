<template>
    <div class="thingsContainer">
        <input type="text" class="search" @keyup=sreach ref="search" placeholder="搜索所拥有的物品">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="(val,key) in list" :key="key">
                    <span class="text">{{key}}</span>
                    <span class="text store">拥有数量：{{val[1]}}</span>
                    <span class="text value mui-badge mui-badge-primary">总价值:￥{{val[0]*val[1]}}</span>
                </li>
            </ul>
    </div>
</template>

<script>
export default {
    data(){
        let state = this.$store.state
        return {
            allList: state.myStore,
            list: {}
        }
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
        }
    },
    mounted(){
        this.list = this.allList
    }
}
</script>

<style lang="scss" scoped>

</style>
