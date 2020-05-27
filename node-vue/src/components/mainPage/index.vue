<template>
    <div class="indexContainer">
        <div class="shopCategory">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in shopCategory" :key="item.id" @click="goToShopCategory(item.id,item.title)">
                        <img :src="'https://fuss10.elemecdn.com' + item.image_url" :alt="item.title">
                        <span>{{item.title}}</span>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </div>

        <div class="shopList">
            <div class="listTitle">
                <span class=""></span>
                <span class="listInfo">附近商家</span>
            </div>
            <ul>
                <li class="clear list" v-for="item in shopList" :key="item.id" @click="goToShopInfo(item.id)">
                    <div class="img">
                        <img :src="'//elm.cangdu.org/img/'+item.image_path" alt="">
                    </div>
                    <div class="describe">
                        <div class="shopDesHead">
                            <h4 class="shopTitle ellipsis">{{item.name}}</h4>
                            <ul class="shopSupports">
                                <li v-for="data in item.supports" :key="data.id">{{data.icon_name}}</li>                      
                            </ul>
                        </div>
                        <div class="shopDesCent">
                            <div class="left">
                                <span class="star">★</span>
                                <span class="rate">{{item.rating}}</span>
                                <span>月售{{item.recent_order_num}}单</span>
                            </div>
                            <div class="right">
                                <span class="fenniao">{{item.delivery_mode.text}}</span>
                                <span class="zhunshi" style="color:#57A9FF">准时达</span>
                            </div>
                        </div>
                        <div class="shopDesFeet">
                            <div class="left">
                                <p>￥{{item.float_minimum_order_amount}}起送 / 配送费约{{item.float_delivery_fee}}</p>
                            </div>
                            <div class="right">
                                <p>{{item.distance}} / {{item.order_lead_time}}</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
    data(){
        return {
            shopCategory: [],
            shopCategoryLen: null,
            shopList: []
        }
    },
    // components:{
    //     foot
    // },
    methods:{
        getShopCategory(){
            this.$http.get('https://elm.cangdu.org/v2/index_entry').then(res => {
                this.shopCategory = res.data
                this.shopCategoryLen = res.data.length
            })
        },
        lunbo(){
            let len = this.shopCategoryLen
                var swiper = new Swiper('.swiper-container', {
                    slidesPerView: 4,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                    observer: true,
                    observeParents: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
            });
        },
        getShopList(){
            let geohash = this.$route.query.geohash.split(',')
            console.log(geohash)
            this.$http.get('https://elm.cangdu.org/shopping/restaurants?latitude='+geohash[0]+'&longitude='+geohash[1]).then(res => {
                this.shopList = res.data
            })
        },
        goToShopCategory(id,title){
            this.$router.push({name: 'shopCategory', query:{id:id,title:title}})
        },
        goToShopInfo(id){
            this.$router.push({name: 'shopInfo', query:{id:id}})
        }
    },
    mounted(){
        this.lunbo()
        this.getShopCategory()
        this.getShopList()
    }
}
</script>

<style lang='scss' scoped>
    .indexContainer{
        .shopCategory{
            background-color: #fff;
            border-bottom: 1px solid #ddd;
            .swiper-container{
                width: 100%;
                height: auto;
                padding: 5px;
                .swiper-slide{
                    height: 80px;
                    text-align: center;
                    img{
                        display: block;
                        width: 80%;
                        height: 65%;
                    }
                    span{
                        font-size: 14px;
                    }
                }
            }
        }
        
        .shopList{
            border-top: 1px solid #ddd;
            background-color: #fff;
            margin-top: 5px;
            .listTitle{
                height: 20px;
                width: 100%;
                text-indent: 10px;
                .listInfo{
                    color: #999;
                    line-height: 20px;
                    font-size: 14px;
                }
            }
            ul{
                list-style: none;
                width: 100%;
                .list{
                    height: 105px;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                    .img{
                        float: left;
                        top: 10px;
                        left: 5px;
                        width: 20%;
                        height: auto;
                        margin-right: 10px;
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                    .describe{
                        .shopDesHead{
                             display: flex;
                            .shopTitle{
                                font-size: 14px;
                                flex: 7;
                            }
                            .shopTitle:before{
                                content: "\54C1\724C";
                                font-size: 12px;
                                background-color: #ffd930;
                                color: #333;
                                margin-right: 2px;
                                padding: 0 2px;
                                border-radius: 2px;
                            }
                            .shopSupports{
                                flex: 3;
                                list-style: none;
                                margin-right: 10px;
                                li{
                                    // display: inline;
                                    float: right;
                                    font-size: 12px;
                                    color: #999;
                                    margin: 0 1px;
                                }
                            }
                        }
                        .shopDesCent{
                            margin-top: 5px;
                            display: flex;
                            .left{
                                flex: 5;
                                .star{
                                    color: #ff9a0d;
                                    font-size: 16px;
                                    margin: 0;
                                }
                                .rate{
                                    color:#ff9a0d;
                                    font-size: 12px
                                }
                                span{
                                    font-size: 10px;
                                    margin: 0 2px;
                                    color: #999;
                                } 
                            }
                            .right{
                                margin-right: 10px;
                                // flex: 5;
                                .fenniao{
                                    font-size: 12px;
                                    background-color: #57A9FF;
                                    color: #fff;
                                    padding: 0 1px;
                                    border-radius: 2px;
                                }
                                .zhunshi{
                                    font-size: 12px;
                                    background-color: #fff;
                                    color: #57A9FF;
                                    border-radius: 2px;
                                    padding: 0 1px;
                                    border: 1px solid #57A9FF;
                                }
                            }
                        }
                        .shopDesFeet{
                            display: flex;
                            margin-top: 5px;
                            .left{
                                flex: 7;
                                p{
                                    transform: scale(.9);
                                    font-size: .5rem;
                                    color: #666;
                                }
                            }
                            .right{
                                flex: 8;
                                p{
                                    float: right;
                                    transform: scale(.8);
                                    font-size: .5rem;
                                    color: #666;
                                }
                            }
                        }
                        .ellipsis{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
                .clear{
                    clear: both;
                }
            }
        }
    }
</style>