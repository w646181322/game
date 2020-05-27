<template>
  <div class="exactLocalContainer">
      <div class="search">
            <input type="text" class="text" placeholder="输入学校、商务楼、地址" ref="search" >
            <input type="button" class="submit" value="提交" @click='search()'>
      </div>
      <div class="searchList" v-if="searchFlag">
            <ul>
                <li v-for="item in searchList" :key="item.name" @click="getGeohash(item.geohash,item)">
                    <span class="sign ellipsis">{{item.name}}</span>
                    <span class="exact ellipsis">{{item.address}}</span>
                </li>
            </ul>
      </div>
      <div class="searchHostory" v-if="hostoryFlag">
            <span>搜索历史</span>
            <ul class="hostoryList">
                <li></li>
            </ul>
            <div v-show="clearFlag" @click="clear">清空所有</div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
          city_id: null,
          clearFlag: false,
          searchFlag: false,
          hostoryFlag: true,
          searchList: []
      }
  },
  methods:{
      clear(){

      },
      search(){
          let val = this.$refs.search.value
          if(val == ''){
              this.searchFlag = false
              this.hostoryFlag = true
          }
        //   console.log(val)
        this.$http.get('https://elm.cangdu.org/v1/pois?city_id='+this.city_id+'&keyword='+val+'&type=search').then(res => {
            this.searchList = res.data
            if(this.searchList.length != 0){
                this.searchFlag = true
                this.hostoryFlag = false
            }
        })
      },
      getGeohash(geohash,item){
          this.$store.commit('getSearchHostory',[geohash,item])
          this.$router.push({ name: 'index', query:{geohash:geohash}})
      }
  },
  created(){
      this.city_id = this.$route.params.id
      console.log(this.city_id)
  }
}
</script>

<style lang='scss' scoped>
  .exactLocalContainer{
      margin-top: 10px;
      .search{
          border-top: 2px solid #ddd;
          border-bottom: 2px solid #ddd;
          background-color: #fff;
          padding: 10px 15px;
          .text{
              width: 100%;
              height: 30px;
              font-size: 16px;
              text-indent: 10px;
          }
          .submit{
              margin-top: 10px;
              width: 100%;
              height: 35px;
              border-radius: 5px;
              background-color: #3190e8;
              text-align: center;
              color: #fff;
          }
      }
      .searchHostory{
          z-index: 1;
          span{
              margin-left: 10px;
              font-size: 14px;
              width: 100%;
          }
          .hostoryList{
              list-style: none;
          }
          .hostoryList li{
              margin: 0;
              width: 100%;

          }
      }

      .searchList{
          background-color: #fff;
          ul{
              list-style: none;
              width: 100%;
          }
          li{
              box-sizing: border-box;
              height: 75px;
              padding: 10px;
              border-bottom: 1px solid #ddd;
              .sign{
                  display: block;
                  text-indent: 10px;
                  font-size: 18px;
              }
              .exact{
                  display: block;
                  text-indent: 10px;
                  font-size: 14px;
                  color: #999999;
                  margin-top: 10px;
              }
              .ellipsis{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
              }
          }
      }
  }
</style>