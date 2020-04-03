<template>
    <v-dialog v-model="dialog" fullscreen>
        <template v-slot:activator="{on}">
            <slot name="activator" v-bind:on="on"></slot>
        </template>
        <v-toolbar color="#74D277" flat>
            <v-col class="pa-0" cols="1">
                <v-row class="ma-0" justify="center" align="center">
                    <v-btn icon v-on:click="dialog = false" class="white--text">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-row>
            </v-col>
            <v-col cols="10" class="pa-0">
                <v-row justify="center" class="ma-0">
                    <v-toolbar-title class="white--text">View a meal</v-toolbar-title>
                </v-row>
            </v-col>
        </v-toolbar>
        <v-sheet tile color="#F4F4F4" class="pt-2">
            <v-sheet tile class="overflow-y-auto pa-4 transparent" height="calc(100vh - 120px)">
                <v-row class="ma-0" justify="center">
                    <v-card class="mt-4 rounded" flat>
                        <v-img src="https://picsum.photos/510/300?random">
                            <v-sheet class="fill-height transparent mealImgGrad">
                                <v-row align="space-between" class="ma-0 fill-height">
                                    <MealTitle :price="price" :title="mealName"></MealTitle>
                                    <v-col cols="12">
                                        <v-row align="end" justify="end" class="ma-0 fill-height">
                                            <v-chip dense color="#74D277" v-for="(tag, index) in tags"
                                                    :key="'tag'+ index"
                                                    class="mr-2 mb-2 white--text">{{tag}}
                                            </v-chip>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-img>
                    </v-card>
                    <v-row class="ma-0 mt-2">
                        <v-rating v-model="rating" color="#74D277" background-color="#74D277" size="32"
                                  half-increments readonly dense></v-rating>
                    </v-row>
                    <v-row class="ma-0">
                        <v-card-title class="pl-0">
                            <v-icon color="#74D277" class="mr-4">mdi-account</v-icon>
                            {{userName}}
                        </v-card-title>
                    </v-row>
                    <v-row class="ma-0">
                        <v-card-title class="pl-0">
                            <v-icon color="#74D277" class="mr-4">mdi-map-marker</v-icon>
                            {{address}}
                        </v-card-title>
                    </v-row>
                    <v-row class="ma-0">
                        <v-card-title class="pl-0">
                            <v-icon color="#74D277" class="mr-4">mdi-alarm</v-icon>
                            {{startTime}} - {{endTime}}
                        </v-card-title>
                    </v-row>
                    <v-row class="ma-0">
                        <v-card class="my-4 rounded" flat>
                            <v-img :src="`${publicPath}map.png`">
                                <v-row class="ma-0 fill-height" justify="center" align="center">
                                    <v-card-title>
                                        <v-icon class=" mr-4">mdi-google-maps</v-icon>
                                        Routebeschrijving
                                    </v-card-title>
                                </v-row>
                            </v-img>
                        </v-card>
                    </v-row>
                </v-row>
            </v-sheet>
        </v-sheet>
        <v-toolbar bottom color="#74D277">
            <v-row class="ma-0" justify="center">
                <v-toolbar-title class="white--text">
                    <v-icon color="white">mdi-cart</v-icon>
                    Buy
                </v-toolbar-title>
            </v-row>
        </v-toolbar>
    </v-dialog>
</template>

<script>
    import MealTitle from "./Meal/MealTitle";

    export default {
        name: "MealOverview",
        components: {MealTitle},
        data() {
            return {
                dialog: false,
                publicPath: process.env.BASE_URL
            }
        },
        props: {
            mealName: String,
            price: String,
            tags: Array,
            rating: Number,
            userName: String,
            address: String,
            startTime: String,
            endTime: String,
        }
    }
</script>