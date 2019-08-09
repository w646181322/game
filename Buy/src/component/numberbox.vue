<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0' :data-numbox-max='store'>
        <button class="mui-btn mui-numbox-btn-minus" type="button" @click="changenum">-</button>
        <input class="mui-numbox-input" type="number" :value="num"/>
        <button class="mui-btn mui-numbox-btn-plus" type="button" @click="changenum">+</button>
    </div>    
</template>

<script>
import mui from '../lib/mui/js/mui.min.js'
export default {
    data(){
        return {}
    },
    props:['store','num','name'],
    methods:{
        changenum(){
            var count = mui('.mui-numbox').numbox().getValue()
            console.log(count)
            this.$emit('getCount',this.name,count)
        }
    },
    mounted(){
        mui('.mui-numbox').numbox()
    }
}
</script>

<style lang="scss" scoped>

</style>
