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
                    coordinates: [5.0, 52.0],
                },
                {
                    name: "Meatballs",
                    price: "€4,50",
                    startTime: "18:00",
                    endTime: "19:00",
                    distance: "6.5km",
                    rating: 4.3,
                    userName: "Maikel Putman",
                    address: "Empel, Vonkenwaard",
                    tags: ["meat", "fish", "fruit",],
                    coordinates: [5.2344, 51.6900],
                },
                {
                    name: "Fish & Chips",
                    price: "€3,00",
                    startTime: "20:00",
                    endTime: "21:00",
                    distance: "2.5km",
                    rating: 3.1,
                    userName: "Jan Klaasen",
                    address: "Zuiderdorp, Niewe Gouw",
                    tags: ["fruit",],
                    coordinates: [4.97, 52.4],
                },
                {
                    name: "Sandwich",
                    price: "€1,00",
                    startTime: "12:00",
                    endTime: "14:00",
                    distance: "2.5km",
                    rating: 5,
                    userName: "Jasmine Jansen",
                    address: "Eindhoven, Rachelsmolen",
                    tags: [],
                    coordinates: [4.992, 52.78],
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