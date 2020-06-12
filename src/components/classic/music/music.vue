<template>
    <div class='container' @click='onPlay'>
        <img class='classic-img' :class='{ rotation: playing }' :src="img" alt="">
        <img v-show='playing' class='player-img' src="./images/player@pause.png" alt="">
        <img v-show='!playing' class='player-img' src="./images/player@play.png" alt="">
        <img class='tag' src="./images/music@tag.png" alt="">
        <span class='content'>{{ content }}</span>
        <!-- <audio :src="src" ref='audio'></audio> -->
    </div>
</template>

<script>
    import { classicMixin } from '../../../config/mixin'
    import { mapMutations, mapGetters, mapState } from 'vuex'
    export default {
        name: 'music',
        mixins: [classicMixin],
        props: {
            src: {
                type: String
            },
            title: {
                type: String
            }
        },
        computed: {
            ...mapGetters([
                'playing',
                'currentSong'
            ])
        },
        created() {
            this.isCurrentPlaying()
        },
        data() {
            return {
            }
        },
        methods: {
            onPlay() {
                if (!this.playing) {
                    this.setSong(this.src)
                    this.setPlaying(true)
                } else {
                    this.setPlaying(false)
                    this.setSong('')
                }
            },
            isCurrentPlaying() {
                if (this.currentSong === this.src) {
                    this.setPlaying(true)
                } else {
                    this.setPlaying(false)
                }
            },
            ...mapMutations([
                'setSong',
                'setPlaying'
            ])
        }
    }
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    .classic-img{
        width: 211px;
        height: 211px;
        margin-top: 30px;
        border-radius: 50%;
    }
    .player-img{
        width: 60px;
        height: 60px;
        position: relative;
        bottom: 135px;
    }
    .tag{
        width: 22px;
        height: 64px;
        position: relative;
        bottom: 70px;
        right: 150px;
    }
    @media (device-height:568px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone5 */
        .tag{
            right: 120px;
        }
    }
    .rotation {
        -webkit-transform: rotate(360deg);
        animation: rotation 12s linear infinite;
        -moz-animation: rotation 12s linear infinite;
        -webkit-animation: rotation 12s linear infinite;
        -o-animation: rotation 12s linear infinite;
    }
     @-webkit-keyframes rotation {
        from {
            -webkit-transform: rotate(0deg);
        }
    
        to {
            -webkit-transform: rotate(360deg);
        }
    }
}
</style>