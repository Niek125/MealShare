import Vue from "vue"
import Vuex from "vuex"
import meals from "./meals";

Vue.use(Vuex);

export default new Vuex.Store(
    {
        modules: {meals,},
    })