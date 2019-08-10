<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0' :data-numbox-max='store'>
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" ref="numberbox" @change="changenum" :value="num"/>
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>    
</template>

<script>
import mui from '../lib/mui/js/mui.min.js'
export default {
    data(){
        return {
            count: this.num
        }
    },
    props:['store','num','name'],
    methods:{
        changenum(){
            this.count = parseInt(this.$refs.numberbox.value) 
            console.log(this.count)
            this.$emit('getCount',this.name,this.count)
        }
    },
    mounted(){
        mui('.mui-numbox').numbox()
    }
}
</script>

<style lang="scss" scoped>

</style>
