<template>
  <div class="container">
    <topheader class="header"></topheader>
    <transition mode='out-in'>
      <router-view></router-view>
    </transition>
    <div class="tabber">
      <backpack></backpack>
    </div>
    
  </div>
</template>
  
<script>
  import index from './component/index.vue'
  import backpack from './component/backpacker.vue'
  import topheader from './component/header.vue'

  export default {
    data(){
      return {}
    },
    components:{
      backpack,
      index,
      topheader
    },
    methods:{
      
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    padding-bottom: 70px;
    .topheader{
      position: fixed;
      top: 0;
      height: 44px;
      width: 100%;
    }
    .tabber{
      position: fixed;
      bottom: 10px;
      width: 100%;
    }
  }
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
  }

  .v-enter-active,
  .v-leave-active{
    transition: all 0.5s ease;
  }
</style>