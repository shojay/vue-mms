<template>
  <div class="preview-container" @click="onPreview">
    <div class="preview-head">
      <div class="preview-tag">
        <tag :favor-type="favor.type"></tag>
      </div>
      <div class="preview-like">
        <like :like="true" :count="favor.fav_nums" :readOnly="true"></like>
      </div>
    </div>
    <div class="preview-img">
      <img :src="favor.image" alt="" />
    </div>
    <div class="preview-text">
      <span>{{ favor.content }}</span>
    </div>
  </div>
</template>

<script>
import Tag from "../../components/tag/tag";
import Like from "../../components/like/like";
export default {
  name: "preview",
  components: {
    Tag,
    Like,
  },
  props: {
    favor: {
      type: Object | Array,
      default() {
        return {};
      },
    },
  },
  created() {},
  methods: {
    onPreview() {
      this.$emit("preview", this.favor);
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  margin-bottom: 10px;
  width: 165px;
  .preview-head {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    .preview-tag {
      margin-left: 10px;
    }
  }
  .preview-img {
    width: 100%;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .preview-text {
    margin: 15px;
    font-size: 13px;
    height: 65px;
    color: #666;
  }
}
@media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  /* 兼容iphone5 */
  .preview-container {
    width: 140px;
    .preview-text {
      font-size: 11px;
    }
  }
}
@media (device-height: 640px) and (-webkit-min-device-pixel-ratio: 2) {
  .preview-container {
    width: 160px;
    .preview-text {
      font-size: 12px;
    }
  }
}
@media (device-height: 731px) and (-webkit-min-device-pixel-ratio: 2) {
  .preview-container {
    width: 185px;
    .preview-text {
      font-size: 14px;
    }
  }
}
@media (device-height: 736px) and (-webkit-min-device-pixel-ratio: 2) {
  .preview-container {
    width: 185px;
    .preview-text {
      font-size: 14px;
    }
  }
}
@media (device-height: 823px) and (-webkit-min-device-pixel-ratio: 2) {
  .preview-container {
    width: 185px;
    .preview-text {
      font-size: 14px;
    }
  }
}
</style>
