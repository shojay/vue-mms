<template>
  <div v-show="hidden" class="classic-container">
    <img class="classic-img" :src="img" alt="" />
    <img class="tag" src="./images/movie@tag.png" alt="" />
    <span class="content">{{ content }}</span>
  </div>
</template>

<script>
import { classicMixin } from "../../../config/mixin";
export default {
  name: "movie",
  mixins: [classicMixin]
};
</script>

<style lang="scss" scoped>
@import url("../../../assets/css/common.scss");
@media (device-height:568px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone5 */
    .content{
        top: 300px;
    }
}
</style>
