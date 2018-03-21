import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import acceptance from './modules/acceptance'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        acceptance
    },
    getters
})

export default store
