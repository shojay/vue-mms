<template>
    <div class='tag-container' :class='classObj' @click='addTag'>
        <slot name='left'></slot>
        <span>{{ text || likeText }}</span>
        <slot name='right'></slot>
    </div>
</template>

<script>
    export default {
        name: 'tag',
        props: {
            text: {
                type: String
            },
            classObj: {
                type: Object,
                default() {
                    return {}
                }
            },
            favorType: {
                type: Number
            }
        },
        computed: {
            likeText() {
                return this.favorType === 100 ? '电影' : this.favorType === 200 ? '音乐' : '句子'
            }
        },
        methods: {
            addTag() {
                this.$emit('tag', this.text)
            }
        }
    }
</script>

<style lang="scss" scoped>
.tag-container{
    padding: 2px 6px;
    margin-right: 5px;
    margin-bottom: 5px;
    background-color: #f5f5f5;
    color: #666;
    border-radius: 2px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    &.first{
        background-color: #fffbdd;
    }
    &.second{
        background-color: #eefbff;
    }
}
</style>