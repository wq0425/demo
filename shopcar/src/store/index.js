import Vue from "vue";
import Vuex from "vuex";
import logger from "vuex/dist/logger";

import mode from "./modules/index";


Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        index: mode
    },
    plugins: [logger()]
})