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
        <v-sheet tile>
            <v-sheet class="transparent" height="calc(100vh - 112px)">
                <v-row class="ma-0" justify="center">
                    <v-col cols="10" class="pa-0">
                        <v-card class="mt-4">
                            <v-img src="https://picsum.photos/510/300?random">
                                <v-sheet id="mealImgGrad" class="fill-height transparent">
                                    <v-row align="space-between" class="ma-0 fill-height">
                                        <v-col cols="12" class="pa-0">
                                            <v-row class="ma-0">
                                                <v-card-title class="white--text pt-3 pb-1">Meatballs
                                                </v-card-title>
                                                <v-spacer></v-spacer>
                                                <v-card color="#74D277" tile id="shaved-edge">
                                                    <v-card-title class="white--text pt-3 pb-1">€3,50</v-card-title>
                                                </v-card>
                                            </v-row>
                                        </v-col>
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
                            <v-rating v-model="rating" color="#74D277" size="32" half-increments readonly
                                      dense></v-rating>
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
                                {{mealLocation}}
                            </v-card-title>
                        </v-row>
                        <v-row class="ma-0">
                            <v-card-title class="pl-0">
                                <v-icon color="#74D277" class="mr-4">mdi-alarm</v-icon>
                                {{timeSpan}}
                            </v-card-title>
                        </v-row>
                        <v-row class="ma-0">
                            <v-card class="mt-4">
                                <v-img src="">
                                    <v-container class="fill-height ma-0" fluid>
                                        <v-card-title>
                                            <v-icon class=" mr-4">mdi-google-maps</v-icon>
                                            Routebeschrijving
                                        </v-card-title>
                                    </v-container>
                                </v-img>
                            </v-card>
                        </v-row>
                    </v-col>
                </v-row>
            </v-sheet>
            <v-toolbar bottom color="#74D277">
                <v-row class="ma-0" justify="center">
                    <v-toolbar-title class="white--text">
                        <v-icon color="white">mdi-cart</v-icon>
                        Buy
                    </v-toolbar-title>
                </v-row>
            </v-toolbar>
        </v-sheet>
    </v-dialog>
</template>

<script>
    export default {
        name: "MealOverview",
        data() {
            return {
                rating: 4.3,
                dialog: false,
                tags: ["spicy", "gluten", "meat", "fish", "fruit",],
                userName: "Piet Klaasen",
                mealLocation: "Eindhoven, Rachelsmolen",
                timeSpan: "16:00 - 18:00",
            }
        }
    }
</script>

<style scoped>
    #mealImgGrad {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 10%, rgba(0, 0, 0, 0.35) 30%, transparent 40%);
    }

    #shaved-edge {
        border-bottom-left-radius: 9px;
    }
</style>