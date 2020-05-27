<template>
    <div class="categoryContainer">
        <div class="text">
            <el-cascader v-model="categoryTitle" ref="category" :options="options1" :show-all-levels="false" @change="getCategoty()"></el-cascader>
            <el-cascader ref="orderBy" :options="options2" :show-all-levels="false" @change="getOrderBy()"></el-cascader>
            <el-cascader ref="support" :options="options3" :props="props" collapse-tags clearable @change="getSupport()"></el-cascader>
        </div>
        <div class="shopList">
            <ul>
                <li class="clear list" v-for="item in shopList" :key="item.id" @click="goToShopInfo()">
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
                                <span class="fenniao" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
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
export default {
    data(){
        let state = this.$store.state
        return {
            props: { multiple: true },
            shopList: [],
            local: state.exactAddress,
            categoryId: null,
            categoryTitle: null,
            activeIndex: '1',
            allCategory: [],
            options1: [],
            options2: [
                {value: '1', label: '起送价'},
                {value: '2', label: '配送速度'},
                {value: '3', label: '评分'},
                {value: '4', label: '智能排序'},
                {value: '5', label: '距离最近'},
                {valeu: '6', label: '销量最高'}
            ],
            options3: [
                {value: '1', label: '蜂鸟专送'}
            ]
        }
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        },
        getAllCategory(){
            this.$http.get('https://elm.cangdu.org/shopping/v2/restaurant/category').then(res => {
                this.allCategory = res.data
                console.log(res.data)

                for(let item of res.data){
                    let obj = {}
                    // console.log(item)
                    obj['value'] = item.id
                    obj['label'] = item.name
                    if(item.sub_categories){
                        obj['children'] = []
                        for(let i of item.sub_categories){
                            // console.log(i)
                            let object = {}
                            object['value'] = i.id
                            object['label'] = i.name
                            obj['children'].push(object)
                        }
                    }
                    this.options1.push(obj)
                }
            })

            // 筛选配送方式
            this.$http.get('https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes').then(res => {
                for(let item of res.data){
                    let obj = {}
                    obj['value'] = item.id
                    obj['label'] = item.name
                    this.options3.push(obj)
                }
            })

            // 获取商铺列表
            let a = this.local.split(',')
            this.$http.get('https://elm.cangdu.org/shopping/restaurants',{
                params: {
                    latitude: a[0],
                    longitude: a[1],
                    restaurant_category_id: this.categoryId
                }
            }).then(res => {
                this.shopList = res.data
                console.log(this.shopList)
            })
        },
        // 根据类别获取商铺列表
        getCategoty(){
            this.shopList = []
            let local = this.$store.state.exactAddress.split(',')
            // console.log(this.$refs.category)
            let restaurant_category_id = this.categoryId || this.$refs.category.checkedValue[1]
            this.$http.get('https://elm.cangdu.org/shopping/restaurants',{
                params:{
                    latitude: local[0],
                    longitude: local[1],
                    restaurant_category_id: restaurant_category_id
                }
            }).then(res => {
                this.shopList = res.data
                console.log(this.shopList)
            })
        },
        // 根据配送方式获取商铺列表
        // item.delivery_mode.text  蜂鸟专送 属性配置报警告
        getOrderBy(){
            this.shopList = []
            let local = this.$store.state.exactAddress.split(',')
            console.log(local)
            let restaurant_category_id = this.categoryId || this.$refs.category.checkedValue[1]
            let order_by = this.$refs.orderBy.checkedValue
            console.log(order_by)
            this.$http.get('https://elm.cangdu.org/shopping/restaurants',{
                params:{
                    latitude: local[0],
                    longitude: local[1],
                    restaurant_category_id: restaurant_category_id,
                    order_by: order_by
                }
            }).then(res => {
                this.shopList = res.data
                console.log(11)
                console.log(this.shopList)
                for(let item of this.shopList){
                    console.log(item.delivery_mode.text)
                }
            })
        },
        // 根据商家的属性获取商铺列表
        getSupport(){
            this.shopList = []
            let local = this.$store.state.exactAddress.split(',')
            console.log(this.$refs.orderBy)
            let restaurant_category_id = this.categoryId || this.$refs.category.checkedValue[1]
            let order_by = this.$refs.orderBy.checkedValue
            let support = this.$refs.support.checkedValue
            console.log(support)
            this.$http.get('https://elm.cangdu.org/shopping/restaurants',{
                params:{
                    latitude: local[0],
                    longitude: local[1],
                    restaurant_category_id: restaurant_category_id,
                    order_by: order_by+support,
                    support_ids: support
                }
            }).then(res => {
                this.shopList = res.data
                console.log(this.shopList)
            })
        }
    },
    mounted(){
        this.categoryId = this.$route.query.id
        this.categoryTitle = this.$route.query.title
        this.getAllCategory()
    }
}
</script>

<style lang='scss' scoped>
    .categoryContainer{
        .text{
            display: flex;
            el-cascader{
                flex: 1;
            }
        }

        .shopList{
            border-top: 1px solid #ddd;
            background-color: #fff;
            margin-top: 5px;
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
