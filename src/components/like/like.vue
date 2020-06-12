<template>
    <div class='container' @click='onLike'>
        <img v-if='like' src='./images/like.png' alt="">
        <img v-if='!like' src="./images/like@dis.png" alt="">
        <span>{{ count }}</span>
    </div>
</template>

<script>
    export default {
        name: 'like',
        props: {
            like: {
                type: Boolean,
                default: false
            },
            count: {
                type: Number,
                default: 0
            },
            readOnly: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            }
        },
        methods: {
            onLike() {
                if(this.readOnly) return

                let like = this.like
                let count = this.count

                count = like ? count - 1 : count + 1
                // 发射自定义事件
                this.$emit('like', {
                    likeStr: this.like ? 'cancel' : 'like',
                    count,
                    like
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.container{
    display: inline-flex;
    flex-direction: row;
    padding: 5px;
    width: 45px;
    img{
        width: 16px;
        height: 14px;
    }
    span{
        font-size: 12px;
        line-height: 12px;
        color: #bbb;
        position: relative;
        bottom: 5px;
        left: 3px;
    }
}
</style>