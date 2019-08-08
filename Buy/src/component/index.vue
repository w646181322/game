<template>
    <div class="index-container">
        <div class="pic">
            <img src="../../static/street.jpg" style="width:100%;height:auto" alt="">
        </div>
        <div class="choose">
            <div class="joyShop">
            <span class="shop" @click=goToJoy>Joy Shop</span>
            </div>
            <div class="snacksShop">
            <span class="shop" @click=goToSnacks>Snacks Shop</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        goToJoy(){
            this.$router.push({ name: 'joyShop'})
        },
        goToSnacks(){
            this.$router.push({ name: 'snacksShop'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .index-container{
        padding: 5px;
        .pic{
            width: 100%;
        }
        .choose{
            margin-top: 25px;
            width: 100%;
            display: flex;
            .joyShop{
            padding: 10px;
            flex: 5;
            text-align:center;
            font-size: 20px;
            }
            .snacksShop{
            padding: 10px;
            flex: 5;
            text-align: center;
            font-size: 20px;
            }
            .shop{
            padding: 5px;
            width: 100%;
            border-radius: 10px;
            border: 1px solid cyan;
            background-color: cyan;
            box-shadow: 0 0 5px blue;
            }
        }
    }
    
</style>
