<template>
    <div class='tabbar-item' @click='itemClick'>
        <div class='tab-img'>
            <slot v-if='!isActive' name='img'></slot>
            <slot v-else name='activeImg'></slot>
        </div>
        <div class='tab-text' :style='activeStyle'>
            <slot name='text'></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabbar-item',
        props: {
            path: {
                type: String,
                default: '/'
            },
            activeColor: {
                type: String,
                default: '#000'
            }
        },
        computed: {
            isActive() {
                return this.$route.path.includes(this.path)
            },
            activeStyle() {
                return this.isActive ? { 'color': this.activeColor} : {}
            }
        },
        methods: {
            itemClick() {
                if (this.isActive) return;
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style lang="scss" scoped>
@mixin iconImg($width, $height){
    width: $width;
    height: $height;
}
.tabbar-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tab-img{
        @include iconImg(24px, 24px);
        img{
            @include iconImg(24px, 24px);
        }
    }
    .tab-text{
        font-size: 12px;
        color: #bbb;
    }
}
</style>