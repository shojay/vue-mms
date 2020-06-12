import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters.js'
import mutations from './mutations.js'
import state from './state.js'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    getters,
    mutations,
    state,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})