<template>
  <div class="container">
    <div class="header" v-if="!searching">
      <div class="box" @click="searching = true">
        <img src="../assets/images/icon/search.png" alt="" />
        <span>搜索书籍</span>
      </div>
    </div>

    <scroll ref="scroll" class="sub-wrapper" :data="books" v-if="!searching">
      <div class="sub-container">
        <div class="head">
          <img
            class="head-img"
            src="../assets/images/book/quality.png"
            alt=""
          />
        </div>
        <div class="books-container">
          <div v-for="item in books" :key="item.id">
            <v-book :book="item" @detail="goToBookDetail"></v-book>
          </div>
        </div>
      </div>
    </scroll>

    <search v-if="searching" @cancel="cancelSearch"></search>
  </div>
</template>

<script>
import Scroll from "../components/scroll/scroll";
import VBook from "../components/book/book";
import Search from "../components/search/search";
import { BookModel } from "../models/book";
const bookModel = new BookModel();
export default {
  name: "book",
  components: {
    VBook,
    Scroll,
    Search,
  },
  data() {
    return {
      books: [],
      searching: false,
    };
  },
  created() {
    bookModel.getHotList().then((res) => {
      this.books = res.data;
    });
  },
  methods: {
    goToBookDetail(book) {
      this.$router.push({
        path: `/book/${book.id}`,
      });
    },
    cancelSearch() {
      this.searching = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .header {
    position: fixed;
    background-color: #ffffff;
    height: 50px;
    width: 100%;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 3px 0 #e3e3e3;
    z-index: 99;
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 25px;
      background-color: #f5f5f5;
      height: 34px;
      width: 350px;
      color: #999999;
      img {
        margin-right: 10px;
        width: 14px;
        height: 14px;
        margin-bottom: -2px;
      }
    }
  }
  .sub-wrapper {
    width: 100%;
    background-color: #f5f5f5;
    overflow: hidden;
    position: absolute;
    top: 50px;
    bottom: 49px;
    .sub-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .head {
        .head-img {
          width: 53px;
          height: 17px;
          margin-top: 20px;
        }
      }
      .books-container {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 45px;
      }
      @media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
        /* 兼容iphone5 */
        .books-container {
          padding: 0 30px;
        }
      }
    }
  }
}
</style>
