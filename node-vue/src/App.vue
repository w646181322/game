<template>
  <div id="app">
    <headerTop></headerTop>
    <router-view></router-view>
    <foot></foot>
  </div>
</template>

<script>
import header from '@/components/common/header.vue'
import foot from '@/components/common/foot.vue'


export default {
  data(){
    return {}
  },
  components:{
    headerTop:header,
    foot:foot
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  #app{
    background-color: #f5f5f5;
    position: relative;
    height: 100%;
  }
  .tishixiaoxi{
      width: 200px;
      height: auto;
  }
  .el-dialog--center .el-dialog__body{
    padding: 10px;
  }
</style>
