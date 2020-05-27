<template>
    <div class="personContainer">
        <div class="personInfo">
            <div class="image"><span class="glyphicon glyphicon-user"></span></div>
            <div class="login">
                <h4>登录/注册</h4>
                <span class="bind glyphicon glyphicon-phone">暂无绑定手机号</span>
            </div>
            <div class="arrow">
                <span class="right glyphicon glyphicon-chevron-right"></span>
            </div>
            
        </div>

        <div class="personGoods">
            <div class="money" @click="goTo('moneyInfo')">
                <span><b>{{money}}</b>元</span>
                <span>我的余额</span>
            </div>
            <div class="Coupon" @click="goTo('coupon')">
                <span><b>{{coupon}}</b>个</span>
                <span>我的优惠</span>
            </div>
            <div class="integral" @click="goTo('integralInfo')">
                <span><b>{{integral}}</b>分</span>
                <span>我的积分</span>
            </div>
        </div>

        <div class="personProfit">
            <ul>
                <li>
                    <a @click="goTo('order')">
                        <span class="glyphicon glyphicon-list-alt"></span>我的订单<span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </li>
                <li>
                    <a @click="goTo('integralShop')">
                        <span class="glyphicon glyphicon-bookmark"></span>积分商城<span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </li>
                <li>
                    <a @click="goTo('vip')">
                        <span class="glyphicon glyphicon-king"></span>饿了么会员卡<span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="customerService">
            <ul>
                <li>
                    <a @click="goTo('service')">
                        <span></span>服务中心<span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </li>
                <li>
                    <a @click="goTo('download')">
                        <span></span>下载饿了么APP<span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            money: 0.00,
            coupon: 0,
            integral: 0
        }
    },
    methods:{
        goTo(key){
            console.log(key)
            this.$router.push({name: key})
        }
    }
}
</script>

<style lang='scss' scoped>
    .personContainer{
        .personInfo{
            height: 80px;
            width: 100%;
            padding: 5px 10px;
            background-color: #3190e8;
            display: flex;
            .image{
                flex: 2;
                margin-right: 10px;
                font-size: 50px;
                height: 60px;
                width: 60px;
                text-align: center;
                border: 1px solid #ddd;
                border-radius: 50%;
                background-color: #fff;
                overflow: hidden;
                span{
                    color: #ccc;
                    top: 6px;
                }
            }
            .login{
                flex: 7;
                font-size: 16px;
                width: 60%;
                color: #fff;
                .bind{
                    font-size: 14px;
                }
            }
            .arrow{
                flex: 1;
                text-align: center;
                color: #fff;
                font-size: 14px;
                width: 10px;
                span{
                    top: 25px;
                }
            }
        }
        
        .personGoods{
            background-color: #fff;
            display: flex;
            .money{
                flex: 1;
                text-align: center;
                padding: 10px;
                span{
                    display: block;
                }
                b{
                    font-size: 28px;
                    font-weight: 700;
                    color: #ff9900;
                }
            }
            .Coupon{
                flex: 1;
                text-align: center;
                padding: 10px;
                span{
                    display: block;
                }
                border-right: 1px solid #f1f1f1;
                border-left: 1px solid #f1f1f1;
                b{
                    font-size: 28px;
                    font-weight: 700;
                    color: #ff5f3e;
                }
            }
            .integral{
                flex: 1;
                text-align: center;
                padding: 10px;
                span{
                    display: block;
                }
                b{
                    font-size: 28px;
                    font-weight: 700;
                    color:#6ac20b;
                }
            }
        }

        .personProfit{
            background-color: #fff;
            margin-top: 10px;
            ul{
                list-style: none;
                li{
                    // height: 40px;
                    width: 100%;
                    text-indent: 10px;
                    a{
                        text-decoration: none;
                        font-size: 16px;
                        color: black;
                        line-height: 40px;
                    }
                    span:nth-of-type(1){
                        margin-right: 5px;
                    }
                    span:nth-of-type(2){
                        float: right;
                        margin-right: 10px;
                        line-height: 40px;
                        color: #bbb;
                    }
                }
                li:nth-of-type(2){
                    border-top: 1px solid #f1f1f1;
                    border-bottom: 1px solid #f1f1f1;
                }
            }
        }

        .customerService{
            background-color: #fff;
            margin-top: 10px;
            ul{
                list-style: none;
                li{
                    height: 40px;
                    width: 100%;
                    text-indent: 10px;
                    overflow: hidden;
                    clear: both;
                    a{
                        text-decoration: none;
                        font-size: 16px;
                        color: black;
                        line-height: 40px;
                    }
                    span:nth-of-type(1){
                        margin-right: 5px;
                    }
                    span:nth-of-type(2){
                        float: right;
                        margin-right: 10px;
                        line-height: 40px;
                        color: #bbb;
                    }
                }
                li:nth-of-type(2){
                    border-top: 1px solid #f1f1f1;
                    border-bottom: 1px solid #f1f1f1;
                }
            }
        }
    }
</style>
