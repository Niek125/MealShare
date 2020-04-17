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
        load({ commit }) {
            fetch("http://localhost:3000/meals/")
                .then(res => res.json())
                .then(json => commit("SET_MEALS", json)).catch(() => {
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
                        tags: [ {name:"spicy"}, {name:"gluten"}, {name:"meat"}, {name:"fish"}, {name:"fruit"},],
                        coordinates: [5.4697225, 51.441642],
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
                        tags: [{name:"meat"}, {name:"fish"}, {name:"fruit"},],
                        coordinates: [5.457462, 51.448103],
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
                        tags: [{name:"fruit"},],
                        coordinates: [5.4299337, 51.4548763],
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
                        tags: [{name:"meat"}],
                        coordinates: [5.4525753, 51.4745863],
                    },
                ]);
            });

        }
    },
    getters: {
        meals: state => {
            return state.meals;
        }
    }
}