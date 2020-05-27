<template>
    <div class="searchContainer">
        <form class="form-inline">
            <input type="text" class="text form-control" placeholder="请输入商家或美食名称">
            <button type="submit" class="button btn btn-default">提交</button>
        </form>
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang='scss' scoped>
    .searchContainer{
        background-color: #fff;
        height: 65px;
        width: 100%;
        padding: 10px 10px;
        .form-inline{
            .text{
                width: 80%;
                display: inline;
                background-color: #f2f2f2;
            }
            .button{
                width: 18%;
                background-color: #3190e8;
                color: #fff;
            }
        }
        
    }
</style>
