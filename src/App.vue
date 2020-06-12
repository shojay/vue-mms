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
</style>
