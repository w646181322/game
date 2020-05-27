<template>
    <div>
        <p>{{answer}}</p>
    </div>
</template>

<script>
export default {
  data(){
      return {
          answer:null
      }
  },
  methods:{
      getAnswer(){
          let key = this.$route.query.key
          key = key.replace(/Caption/,'Content')
          console.log(key)
          this.$http.get('https://elm.cangdu.org/v3/profile/explain').then(res => {
              for(let item in res.data){
                  if(item == key){
                      this.answer = res.data[item]
                  }
              }
          })
      },
  },
  mounted(){
      this.getAnswer()
  }
}
</script>

<style lang='scss' scoped>
    
</style>
