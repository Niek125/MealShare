<template>
    <div>
        <TopBar page-title="Meals"></TopBar>
        <v-list class="transparent">
            <v-list-item>
                <MealOverview>
                    <template v-slot:activator="{on}">
                        <v-card class="rounded" v-on="on" flat>
                            <v-img src="https://picsum.photos/510/300?random">
                                <v-sheet class="fill-height transparent mealImgGrad">
                                    <MealTitle></MealTitle>
                                </v-sheet>
                            </v-img>
                            <v-sheet color="white">
                                <v-col cols="12" class="pa-0">
                                    <v-row class="ma-0">
                                        <v-icon class="ml-4">mdi-alarm</v-icon>
                                        <v-card-title>16:00 - 18:00
                                        </v-card-title>
                                        <v-spacer></v-spacer>
                                        <v-icon>mdi-map-marker</v-icon>
                                        <v-card-title>0.5km</v-card-title>
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
        components: {MealTitle, MealOverview, TopBar}
    }
</script>

<style scoped>

</style>