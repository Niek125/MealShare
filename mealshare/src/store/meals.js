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
            commit("SET_MEALS", [
                {
                    name: "Spaghetti",
                    price: "€1,50",
                    startTime: "12:00",
                    endTime: "14:00",
                    distance: "2.5km",
                    rating: 3.4,
                    userName: "Marcel Veldhuizen",
                    address: "Eindhoven, Hooidonksemolen",
                    tags: ["spicy", "gluten", "meat", "fish", "fruit",],
                    coordinates: [5.0, 52.0]
                },
            ])
        }
    },
    getters: {
        meals: state => {
            return state.meals;
        }
    }
}