<template>
    <div class='container' v-if='needNavi'>
        <div class="left-arrow" @click='onLeft'>
            <img v-show='!latest' class='icon' src="./images/triangle@left.png" alt="">
            <img v-show='latest' class='icon' src="./images/triangle.dis@left.png" alt="">
        </div>
        <div class="title">
            <span>{{ title }}</span>
        </div>
        <div class="right-arrow" @click='onRight'>
            <img v-show='!first' class='icon' src="./images/triangle@right.png" alt="">
            <img v-show='first' class='icon' src="./images/triangle.dis@right.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'navi',
        props: {
            title: String,
            first: {
                type: Boolean,
                default: false
            },
            latest: {
                type: Boolean,
                default: false
            },
            needNavi: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            onLeft() {
                if (!this.latest) {
                    this.$emit('left')
                }
            },
            onRight() {
                if (!this.first) {
                    this.$emit('right')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@mixin iconWh($w,$h){
    width: $w;
    height: $h;
}
.container{
    width: 300px;
    height: 40px;
    background: #f7f7f7;
    border-radius: 2px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 85px;
    left: 50%;
    margin-left: -150px;
    .left-arrow{
        .icon{
            @include iconWh(40px, 40px)
        }
    }
    .title{
        font-size: 14px;
    }
    .right-arrow{
        .icon{
            @include iconWh(40px, 40px)
        }
    }
}
</style>