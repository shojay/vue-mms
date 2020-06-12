<template>
    <div class='tabbar'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'tabBar'
    }
</script>

<style lang="scss" scoped>
.tabbar{
    display: flex;
    justify-content: space-around;
    background-color: rgb(250,250,250);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(0,0,0,.1);
    height: 49px;
}
</style>