<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class='router-view' v-if="!$route.meta.keepAlive"></router-view>
    <main-tabbar></main-tabbar>
    <audio :src="currentSong" ref='audio'
      @canplay="onPlay"
    ></audio>
    <!-- <div class="popup-tips" v-if='!authorized'>
      <div class='tips-text'>
        <span>请您先登录</span>
      </div>
      <div class="confirm-btn" @click='authorize'>
        <span>确认</span>
      </div>
    </div>
    <div class="mask" v-if='!authorized'></div> -->
  </div>
</template>

<script>
import MainTabbar from './components/tabbar/main-tabbar'
import { Token } from './models/token'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    MainTabbar
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'playing'
    ])
  },
  created() {
    const token = new Token()
    token.verify()
  },
  data() {
    return {
    }
  },
  methods: {
    onPlay() {
      this.$refs.audio.play()
    }
  }
}
</script>

<style lang="scss">
@import url('./assets/css/base.scss');
.popup-tips{
  width: 300px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  border-radius: 10px;
  .tips-text{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f5f5f5;
  }
  .confirm-btn{
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: blue;
  }
}
.mask{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5);
}
</style>
