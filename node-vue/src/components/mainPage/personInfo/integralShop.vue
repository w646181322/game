<template>
    <div class="integralShopContainer">
        <div class="box">
            <h2>请重新进入</h2>
            <p>请返回后重新进入积分商城~</p>
            <!-- <img src="//yun.duiba.com.cn/webapp/img/retrylogin.png" alt=""> -->
        </div>
    </div>
</template>

<script>
export default {
    // todo: 样式没搞定
}
</script>

<style lang='scss' scoped>
    .integralShopContainer{
        position: relative;
        width: 100%;
        height: 100%;
        .box{
            position: absolute;
            top: 50%;
            left: 50%;
            // transform: translate(-50%,-50%);
            text-align: center;
            img{
                width: 60%;
                height: auto;
            }
        }
        
    }
</style>
