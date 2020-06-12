<template>
  <transition name="slide" :appear="true">
    <div class="container" v-if="book">
      <div class="route-back" @click="routeBack">
        <span class="icon-left-arrow">
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
        <div class="head-title">
          {{ book.title }}
        </div>
      </div>
      <scroll class="bookdetail-container" :data="book" v-if="book && !loading">
        <div>
          <div class="head">
            <img :src="book.image" alt="" />
            <span class="title">{{ book.title }}</span>
            <span class="author">{{ book.author[0] }}</span>
          </div>
          <div class="sub-container">
            <span class="headline">短评</span>
            <span class="shadow" v-if="comments == false">还没有短评</span>
            <div class="comment-container">
              <div v-for="(item, index) in comments" :key="index">
                <tag
                  :text="item.content"
                  :classObj="{
                    first: index == 0,
                    second: index == 1,
                  }"
                >
                  <template v-slot:right>
                    <span class="num">{{ "+" + item.nums }}</span>
                  </template>
                </tag>
              </div>
            </div>
          </div>
          <div class="sub-container pl15">
            <span class="headline">内容简介</span>
            <div
              v-for="(item, index) in book.summary"
              :key="index"
              class="content-summary"
              ref="summary"
            >
              {{ item }}
            </div>
          </div>
          <div class="sub-container pl15">
            <span class="headline">书本信息</span>
            <div class="detail-container">
              <div class="vertical description">
                <span>出版社</span>
                <span>出版年</span>
                <span>页数</span>
                <span>定价</span>
                <span>装帧</span>
              </div>
              <div class="vertical">
                <span>{{ book.publisher }}</span>
                <span>{{ book.pubdate }}</span>
                <span>{{ book.pages }}</span>
                <span>{{ book.price }}</span>
                <span>{{ book.binding }}</span>
              </div>
            </div>
          </div>
        </div>
      </scroll>
      <div class="post-container" @click="goToComment">
        <div class="post-fake">
          <span>输入短评</span>
        </div>
      </div>
      <div class="posting-container" v-show="posting">
        <div class="post-header">
          <div class="tips" v-if="comments.length">点击标签+1</div>
          <div class="tips" v-else>暂无短评</div>
          <div class="cancel" @click="posting = false">取消</div>
        </div>
        <div class="comment-container">
          <div v-for="(item, index) in comments.slice(0, 3)" :key="index">
            <tag
              :text="item.content"
              :classObj="{
                first: index == 0,
                second: index == 1,
              }"
              @tag="addTag"
            >
              <template v-slot:right>
                <span class="num">{{ "+" + item.nums }}</span>
              </template>
            </tag>
          </div>
        </div>
        <input
          type="text"
          class="post"
          placeholder="短评最多12个字"
          v-model="tagText"
          @keyup.enter='addTag(tagText)'
        />
      </div>
      <loading v-show="loading"></loading>
      <v-mask v-show="posting"></v-mask>
    </div>
  </transition>
</template>

<script>
import Loading from "../components/loading/loading";
import Scroll from "../components/scroll/scroll";
import Tag from "../components/tag/tag";
import VMask from "../components/mask/mask";
import { BookModel } from "../models/book";
const bookModel = new BookModel();
export default {
  name: "book-detail",
  components: {
    Loading,
    Scroll,
    Tag,
    VMask,
  },
  data() {
    return {
      comments: [],
      book: null,
      likeStatus: false,
      likeCount: 0,
      loading: true,
      posting: false,
      tagText: "",
    };
  },
  created() {
    const bid = this.$route.params.id;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getDetail(bid);

    Promise.all([detail, comments, likeStatus]).then((res) => {
      console.log(res);
      this.book = res[0].data;
      this.book.summary = this.book.summary
        .replace(/\\\\n/g, "\n")
        .split(/\\n/g);
      this.comments = res[1].data.comments;
      this.likeStatus = res[2].data.likeStatus;
      this.likeCount = res[2].data.fav_nums;
      this.loading = false;
    });
  },
  computed: {},
  methods: {
    routeBack() {
      this.$router.back();
    },
    goToComment() {
      this.posting = true;
    },
    addTag(text) {
      const comment = text;

      if (!comment) return;

      if (comment.length > 12) return;

      bookModel.postComment(this.book.id, comment).then((res) => {
        console.log(res);
        this.comments.unshift({
          content: comment,
          nums: 1,
        });
        this.posting = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  z-index: 99;
  overflow: hidden;
  .route-back {
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
    .head-title {
      flex: 1;
      text-align: center;
      margin-right: 36px;
    }
  }
  .bookdetail-container {
    position: absolute;
    top: 52px;
    bottom: 50px;
    right: 0;
    left: 0;
    .head {
      background-color: #fff;
      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 100px;
        height: 150px;
        box-shadow: 2px 2px 3px #e3e3e3;
      }
      .title {
        color: #2f2f2f;
        margin-top: 10px;
        font-size: 16px;
        font-weight: 600;
      }
      .author {
        font-size: 14px;
        color: #999;
      }
    }
    .sub-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 15px;
      background-color: #fff;
      padding: 15px 0;
      &.pl15{
          padding-left: 15px;
      }
      .headline {
        font-size: 15px;
        font-weight: 600;
        color: #2f2f2f;
        margin-bottom: 10px;
      }
      .content-summary {
        margin-right: 30px;
        text-indent: 30px;
        white-space: pre-line;
      }
      .detail-container {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        font-size: 14px;
        color: #666;
        .vertical {
          display: flex;
          flex-direction: column;
        }
        .description {
          margin-right: 15px;
          color: #999;
        }
      }
      .comment-container {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding-left: 15px;
        margin-top: 15px;
      }
    }
  }
  .post-container {
    height: 50px;
    box-shadow: 1px -1px 1px #e3e3e3;
    position: fixed;
    width: 100%;
    background-color: #fff;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .post-fake {
      display: flex;
      align-items: center;
      height: 30px;
      width: 334px;
      border: 1px solid #999;
      border-radius: 15px;
      font-size: 12px;
      padding-left: 14px;
    }
  }
  .posting-container {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    z-index: 999;
    .post-header {
      width: 100%;
      height: 50px;
      box-shadow: 0 1px 1px #f5f5f5;
      border-top: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tips {
        padding-left: 10px;
        font-size: 14px;
        color: #bbb;
      }
      .cancel {
        color: #666;
        padding-right: 16px;
      }
    }
    .comment-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 10px;
      margin-top: 15px;
    }
    .post {
      width: 345px;
      margin: 15px auto;
      height: 28px;
      outline: none;
      border: none;
      background-color: #f5f5f5;
      border-radius: 15px;
      padding-left: 12px;
    }
  }
}
</style>
