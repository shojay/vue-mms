<template>
  <div class="container" @click="goToBookDetail">
    <div class="book-img">
      <img :src="book.image" alt="" />
    </div>
    <div class="description">
      <span class="title">{{ book.title }}</span>
      <span class="author">{{ author }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookCmp",
  props: {
    book: {
      type: Object,
    },
  },
  computed: {
    author() {
      return Array.isArray(this.book.author)
        ? this.book.author[0]
        : this.book.author
    },
  },
  methods: {
    goToBookDetail(e) {
      this.$emit("detail", this.book)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 2px 2px 3px #e3e3e3;
  width: 120px;
  height: 180px;
  .book-img {
    img {
      width: 120px;
      height: 180px;
      border-radius: 2px;
    }
  }
  .description {
    width: 120px;
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 3px 5px 4px 8px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
    .title {
      margin-top: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .author {
      font-size: 10px;
      color: #999999;
      margin-bottom: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
