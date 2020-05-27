<template>
    <div class="serviceContainer">
        <div class="online">
            <div class="onlineService">
                <span class="glyphicon glyphicon-headphones"></span>
                <span>在线客服</span>
            </div>
            <div class="phoneService">
                <span class="glyphicon glyphicon-earphone"></span>
                <span>在线客服</span>
            </div>
        </div>

        <div class="Question">
            <h3>热门问题</h3>
            <ul>
                <li v-for="(key,value) in question" :key="value" @click="goToAnswer(value)">
                    <span>{{key}}</span>
                    <span class="arrow glyphicon glyphicon-menu-right"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            question:{}
        }
    },
    methods:{
        getQuestion(){
            this.$http.get('https://elm.cangdu.org/v3/profile/explain').then(res => {
                let question = {}
                for(let key in res.data){
                    // console.log(key)
                    if(key.match(/Caption$/)){
                        question[key] = res.data[key]
                    }
                }
                this.question = question
                // console.log(this.question)
            })
        },
        goToAnswer(key){
            this.$router.push({name:'answer',query:{key: key}})
        },
        test(){
            setTimeout(fucntion)
        }
    },
    mounted(){
        this.getQuestion()
    }
}
</script>

<style lang='scss' scoped>
    .serviceContainer{
        .online{
            background-color: #fff;
            display: flex;
            border-bottom: 1px solid #f2f2f2;
            span{
                display: block;
                font-size: 16px;
            }
            .glyphicon{
                margin-bottom: 5px;
                color: #ff7b52;
            }
            .onlineService{
                flex: 1;
                text-align: center;
                padding: 10px;
                border-right: 1px solid #f2f2f2;
            }
            .phoneService{
                flex: 1;
                text-align: center;
                padding: 10px;
            }
        }

        .Question{
            background-color: #fff;
            // border-top: 1px solid #f2f2f2;
            h3{
                padding: 10px;
                margin: 0;
                font-size: 18px;
                border-bottom: 1px solid #f2f2f2;
            }
            ul{
                list-style: none;
                li{
                    height: 45px;
                    border-bottom: 1px solid #f2f2f2;
                    span:nth-of-type(1){
                        // text-indent: 10px;
                        margin-left: 10px;
                        line-height: 45px;
                        color: #666666;
                    }
                    span:nth-of-type(2){
                        float: right;
                        line-height: 45px;
                        color: #666666;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>
