export default {
    namespaced: true,
    state: {
        meals: [],
    },
    mutations: {
        SET_MEALS(state, payload) {
            state.meals = payload;
        }
    },
    actions: {
        load({commit}) {
            fetch("http://localhost:3000/meals/")
                .then(res => res.json())
                .then(json => commit("SET_MEALS", json));

        }
    },
    getters: {
        meals: state => {
            return state.meals;
        }
    }
}