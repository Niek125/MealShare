<template>
    <div>
        <TopBar page-title="Meals"></TopBar>
        <v-list class="transparent">
            <v-list-item v-for="(meal, index) in meals" :key="'meal' + index">
                <MealOverview :meal-name="meal.name" :price="meal.price" :rating="meal.rating"
                              :user-name="meal.userName" :start-time="meal.startTime" :end-time="meal.endTime"
                              :address="meal.address" :tags="meal.tags">
                    <template v-slot:activator="{on}">
                        <v-card class="rounded" v-on="on" flat>
                            <v-img src="https://picsum.photos/510/300?random">
                                <v-sheet class="fill-height transparent mealImgGrad">
                                    <MealTitle :price="meal.price" :title="meal.name"></MealTitle>
                                </v-sheet>
                            </v-img>
                            <v-sheet color="white">
                                <v-col cols="12" class="pa-0">
                                    <v-row class="ma-0">
                                        <v-icon class="ml-4">mdi-alarm</v-icon>
                                        <v-card-title>{{meal.startTime}} - {{meal.endTime}}
                                        </v-card-title>
                                        <v-spacer></v-spacer>
                                        <v-icon>mdi-map-marker</v-icon>
                                        <v-card-title>{{meal.distance}}</v-card-title>
                                    </v-row>
                                </v-col>
                            </v-sheet>
                        </v-card>
                    </template>
                </MealOverview>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
    import TopBar from "./NavBar/TopBar";
    import MealOverview from "./MealOverview";
    import MealTitle from "./Meal/MealTitle";

    export default {
        name: "Meals",
        components: {MealTitle, MealOverview, TopBar},
        data() {
            return {
                meals: [
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
                    }
                ],
            }
        }
    }
</script>

<style scoped>

</style>