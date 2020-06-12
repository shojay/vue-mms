<template>
  <transition name="slide" :appear="true">
    <div class="classic-detail-container">
      <div class="detail-route-back">
        <span class="icon-left-arrow" @click="routeBack">
          <svg
            t="1591666041284"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2420"
            width="200"
            height="200"
          >
            <path
              d="M740.352 174.081024 683.126784 115.073024 283.648 512.002048 683.123712 908.925952 740.352 849.922048 404.48 512.002048Z"
              p-id="2421"
            ></path>
          </svg>
        </span>
      </div>
      <div class="classic-detail-head">
        <div>
          <episode class="episode" :index="classic.index"></episode>
        </div>
        <div class="detail-like-container">
          <like
            class="like"
            :count="likeCount"
            :like="likeStatus"
            @like="onLike"
          ></like>
        </div>
      </div>
      <div class="classic-detail">
        <essay
          v-if="$route.params.type == 300"
          :img="classic.image"
          :content="classic.content"
        ></essay>
        <music
          v-if="$route.params.type == 200"
          :img="classic.image"
          :content="classic.content"
          :src="classic.url"
        ></music>
        <movie
          v-if="$route.params.type == 100"
          :img="classic.image"
          :content="classic.content"
        ></movie>
      </div>
    </div>
  </transition>
</template>

<script>
import Like from "../components/like/like";
import Episode from "../components/episode/episode";
import Essay from "../components/classic/essay/essay";
import Music from "../components/classic/music/music";
import Movie from "../components/classic/movie/movie";
import { Classic } from "../models/classic";
import { classicMixin } from "../config/classicMixin";
const classicModel = new Classic();
export default {
  name: "classic-detail",
  mixins: [classicMixin],
  components: {
    Like,
    Episode,
    Essay,
    Music,
    Movie,
  },
  created() {
    this.getClassicDetail();
  },
  data() {
    return {
      classic: {},
      likeCount: 0,
      likeStatus: false,
    };
  },
  methods: {
    routeBack() {
      this.$router.back();
    },
    getClassicDetail() {
      classicModel
        .getClassicFromMy(this.$route.params.type, this.$route.params.id)
        .then((res) => {
          this.classic = res.data;
          this.likeCount = res.data.fav_nums;
          this.likeStatus = res.data.likeStatus;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.classic-detail-container {
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter-to,
  &.slide-leave {
    transform: translate3d(0, 0, 0);
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 99;
  .detail-route-back {
    width: 100%;
    height: 52px;
    position: fixed;
    overflow: hidden;
    z-index: 200;
    top: 0;
    background-color: #ffffff;
    box-shadow: 0 2px 1px rgba(240, 240, 240, 0.5);
    display: flex;
    align-items: center;
    .icon-left-arrow {
      padding: 0 0 0 10px;
      height: 40px;
      svg {
        width: 24px;
        height: 40px;
      }
    }
  }
  .classic-detail-head {
    position: relative;
    top: 52px;
    width: 100%;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    div {
      .episode {
        margin-left: 10px;
        margin-top: 2px;
      }
    }
  }
  .classic-detail {
    position: relative;
    top: 130px;
  }
}
</style>
