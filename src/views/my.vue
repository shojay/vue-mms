<template>
  <scroll class="my-wrapper" :data='favors'>
    <div class="my-container">
      <div class="user-container">
        <div class="bg-img"></div>
        <div class="user-info">
          <div class="user-avatar">
            <img v-if="isLogin" :src="user.avatar" alt="" />
            <img v-else src="../assets/images/my/my.png" alt="" />
          </div>
          <div class="user-name">
            <span>{{ user.nickName || "" }}</span>
          </div>
        </div>
      </div>
      <div class="my-like-container">
        <div class="like-img">
          <img src="../assets/images/my/like.png" alt="" />
        </div>
        <div class="preview">
          <div class="pd20" v-for="item in favors" :key="item.content">
            <preview :favor="item" @preview='goToDetail'></preview>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import Preview from "../components/preview/preview";
import Scroll from "../components/scroll/scroll";
import { Classic } from "../models/classic";
import { Token } from "../models/token";
import { mapMutations, mapGetters } from "vuex";
const classicModel = new Classic();
const token = new Token();
export default {
  name: "my",
  components: {
    Preview,
    Scroll,
  },
  data() {
    return {
      favors: [],
    };
  },
  computed: {
    ...mapGetters(["isLogin", "user"]),
  },
  created() {
    this.login();
    this.getMyFavor();
  },
  methods: {
    login() {
      if (this.isLogin) return;
      token.tokenLogin().then((res) => {
        this.setUserInfo(res.data);
      });
    },
    getMyFavor() {
      classicModel.getMyFavor().then((res) => {
        this.favors = res.data;
      });
    },
    goToDetail(favor) {
        this.$router.push({
            path: `/classic/${favor.id}/${favor.type}`
        })
    },
    ...mapMutations(["setUserInfo"]),
  },
};
</script>

<style lang="scss" scoped>
.my-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49px;
  overflow: hidden;
}
.my-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-container {
    width: 100%;
    position: relative;
    .bg-img {
      height: 290px;
      background: url("../assets/images/my/bg1.jpg") center center no-repeat;
    }
    .user-info {
      position: absolute;
      left: 50%;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: translate(-50%, 0);
      .user-avatar {
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user-name {
        color: #fff;
        span {
          font-size: 16px;
        }
      }
    }
  }
  .my-like-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #f5f5f5;
    .like-img {
      height: 26px;
      text-align: center;
      margin-top: 20px;
      img {
        width: 53px;
        height: 100%;
      }
    }
    .preview {
      display: flex;
      justify-content: space-between;
      width: 100%;
      flex-wrap: wrap;
      margin-top: 10px;
      .pd20 {
        padding: 0 10px;
      }
    }
  }
}
</style>
