<template>
  <tab-bar>
    <tabbar-item path="/classic">
      <template v-slot:img>
        <img src="../../assets/images/tab/classic.png" alt="" />
      </template>
      <template v-slot:activeImg>
        <img src="../../assets/images/tab/classic@highlight.png" alt="" />
      </template>
      <template v-slot:text>
        <span>流行</span>
      </template>
    </tabbar-item>
    <tabbar-item path="/book">
      <template v-slot:img>
        <img src="../../assets/images/tab/book.png" alt="" />
      </template>
      <template v-slot:activeImg>
        <img src="../../assets/images/tab/book@highlight.png" alt="" />
      </template>
      <template v-slot:text>
        <span>书籍</span>
      </template>
    </tabbar-item>
    <tabbar-item path="/my">
      <template v-slot:img>
        <img src="../../assets/images/tab/my.png" alt="" />
      </template>
      <template v-slot:activeImg>
        <img src="../../assets/images/tab/my@highlight.png" alt="" />
      </template>
      <template v-slot:text>
        <span>我的</span>
      </template>
    </tabbar-item>
  </tab-bar>
</template>

<script>
import TabBar from "./tabbar";
import TabbarItem from "./tarbar-item";
export default {
  name: "main-tabbar",
  components: {
    TabBar,
    TabbarItem,
  },
};
</script>

<style lang="scss" scoped></style>
