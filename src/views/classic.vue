<template>
  <div class="container" v-if="classic !== null">
    <div class="header">
      <div>
        <episode class="episode" :index="classic.index"></episode>
      </div>
      <div class="like-container">
        <like
          class="like"
          :count="likeCount"
          :like="likeStatus"
          @like="onLike"
        ></like>
      </div>
    </div>
    <div class="mms-container" :style="iphone5Style">
      <movie
        :hidden="classic.type == 100"
        :img="classic.image"
        :content="classic.content"
      ></movie>
      <music
        v-if="classic.type == 200"
        :img="classic.image"
        :content="classic.content"
        :title="classic.title"
        :src="classic.url"
      ></music>
      <essay
        :hidden="classic.type == 300"
        :img="classic.image"
        :content="classic.content"
      ></essay>
    </div>
    <navi
      :title="classic.title"
      @left="onNext"
      @right="onPrevious"
      :first="first"
      :latest="latest"
    ></navi>
  </div>
</template>

<script>
import Episode from "../components/episode/episode";
import Like from "../components/like/like";
import Movie from "../components/classic/movie/movie";
import Music from "../components/classic/music/music";
import Essay from '../components/classic/essay/essay';
import Navi from "../components/navi/navi";
import { Classic } from "../models/classic";
import { LikeModel } from '../models/like';
import { Token } from '../models/token';
import { classicMixin } from '../config/classicMixin';
const classicModel = new Classic();
const likeModel = new LikeModel();
export default {
  name: "classic",
  mixins: [classicMixin],
  components: {
    Like,
    Episode,
    Movie,
    Music,
    Essay,
    Navi,
  },
  data() {
    return {
      likeCount: 0,
      likeStatus: false,
      classic: null,
      first: false,
      latest: true,
    };
  },
  created() {
    classicModel.getLatest().then((res) => {
      this.classic = res.data;
      this.likeCount = res.data.fav_nums;
      this.likeStatus = res.data.likeStatus;
    });
  },
  computed: {
    iphone5Style() {
      return window.screen.height === 568
        ? {
            top: "54px",
          }
        : {};
    },
  },
  methods: {
    onPrevious() {
      this._updateClassic("prev");
    },
    onNext() {
      this._updateClassic("next");
    },
    _updateClassic(nextOrPrevious) {
      const index = this.classic.index;
      classicModel.getClassic(index, nextOrPrevious).then((res) => {
        this._getLikeStatus(res.id, res.type);
        this.classic = res;
        this.latest = classicModel.isLatest(res.index);
        this.first = classicModel.isFirst(res.index);
      });
    },
    _getLikeStatus(artid, category) {
      likeModel.getClassicLikeStatus(artid, category).then(res => {
        this.likeCount = res.data.fav_nums;
        this.likeStatus = res.data.likeStatus;
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    .episode {
      margin-left: 10px;
      margin-top: 2px;
    }
    .like-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-right: 15px;
    }
  }
  .mms-container {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
  }
  @media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
    /* 兼容iphone5 */
    .mms-container {
      top: 54px;
    }
  }
  @media (device-height: 667px) and (-webkit-min-device-pixel-ratio: 2) {
    /* 兼容iphone6 */
    .mms-container {
      top: 100px;
    }
  }
}
</style>
