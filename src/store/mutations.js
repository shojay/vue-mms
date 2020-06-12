const mutations = {
    setSong(state, song) {
        state.currentSong = song
    },
    setPlaying(state, playingState) {
        state.playing = playingState
    },
    setUserInfo(state, user) {
        state.user = user
        state.isLogin = true
    }
}
export default mutations