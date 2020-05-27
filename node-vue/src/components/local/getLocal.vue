<template>
  <div class="localContainer">
      <div class="cityLocal">
          <div class="checkcity">
            <span style="fontSize:14px;marginLeft:10px;color:#9f9f99;lineHeight:35px;" >当前定位城市：</span>
            <span style="fontSize:12px;color:#9f9f9f;float:right;lineHeight:35px;marginRight:10px;" >定位不准时，请在城市列表中选择</span>
        </div>
        <div class="city">
            <span style="fontSize:18px;color:#6d9eee;marginLeft:10px;lineHeight:40px;" @click="getCity(currentLocalCity,currentLocalCityId)">{{currentLocalCity}}</span>
        </div>
      </div>

      <div class="hotCity">
          <h3>热门城市</h3>
          <ul class="hotCityList clear">
              <li class="ellipsis" v-for="item in hotcitylist" :key="item.id" @click="getCity(item.name,item.id)">{{item.name}}</li>
          </ul>
      </div>

      <div class="allCity" v-for="(item,key) in allcitylist" :key="key">
          <h3>{{key}}</h3>
          <ul class="allcitylist clear">
              <li class="ellipsis" v-for="city in item" :key="city.id" @click="getCity(city.name,city.id)">{{city.name}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            currentLocalCity: null,
            currentLocalCityId: null,
            hotcitylist: [],
            allcitylist: {}
        }
    },
    methods:{
        getLocal(){
            this.$http.get('https://elm.cangdu.org/v1/cities?type=guess').then(res => {
                this.currentLocalCity = res.data.name
                this.currentLocalCityId = res.data.id
                console.log(this.currentLocalCity)
            })
            this.$http.get('https://elm.cangdu.org/v1/cities?type=hot').then(res => {
                this.hotcitylist = res.data
                // console.log(res.data)
            })
            this.$http.get('https://elm.cangdu.org/v1/cities?type=group').then(res => {
                // res.data.sort(function(a,b){
                //     return a-b
                // })
                var keys = Object.keys(res.data).sort()
                console.log(keys)
                let allcity = {}
                for(var i=0;i<keys.length;i++){
                    var index = keys[i]
                    allcity[index] = res.data[index]
                }
                this.allcitylist = allcity
                // console.log(this.allcitylist)
            })
        },
        getCity(name,id){
            this.$store.commit('getCity',name)
            this.$router.push({name:'getExact', params:{ id:id}})
        }
    },
    created(){
        this.getLocal()
    }
}
</script>

<style lang="scss" scoped>
.localContainer{
    background-color: #f5f5f5;
    .cityLocal{
        background-color: #fff;
        width: 100% ;
        .checkcity{
            border-bottom: 1px solid #ddd;
            height: 35px;
        }
        .city{
            height: 40px;
            border-bottom: 2px solid #ddd;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    
    .hotCity{
        background-color: #fff;
        border-top: 2px solid #ddd;
        margin-top: 20px;
        h3{
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
            font-size: 14px;
            color: #666666;
            border-bottom: 1px solid #ddd;
        }
        ul{
            list-style: none;
            width: 100%;
            padding: 0;
        }
        .hotCityList li{
            float: left;
            width: 25%;
            box-sizing: border-box;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color:#3190E8;
            border-right: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
        }
        .hotCityList li:nth-of-type(4n){
            border-right:none;
        }
        .ellipsis{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .allCity{
        background-color: #fff;
        margin-top: 10px;
        border-top: 2px solid #ddd;
        h3{
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
            font-size: 14px;
            color: #666666;
            border-bottom: 1px solid #ddd;
        }
        ul{
            list-style: none;
            width: 100%;
        }
        .allcitylist li{
            float: left;
            width: 25%;
            box-sizing: border-box;
            height: 40px;
            font-size: 14px;
            line-height: 40px;
            text-align: center;
            color:#666;
            border-right: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
        }
        .allcitylist li:nth-of-type(4n){
            border-right:none;
        }
        .ellipsis{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .clear:after{
        content:'';
        display: block;
        clear:both;
    }
}
    
</style>
