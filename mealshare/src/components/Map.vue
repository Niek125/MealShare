<template>
    <div>
        <TopBar page-title="Find a meal"></TopBar>
        <v-sheet height="calc(100vh - 112px)" tile>
            <MglMap :accessToken="accessToken" :mapStyle="mapStyle" @load="onMapLoaded">
                <MglMarker :coordinates="meal.coordinates" color="#74D277" v-for="(meal, index) in meals" :key="'marker' + index">
                    <MglPopup :closeButton="false" :offset="{
                'top': [0, 0],
                 'top-left': [0,0],
                  'top-right': [0,0],
                   'bottom': [0, -markerHeight],
                    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                     'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                      'left': [markerRadius, (markerHeight - markerRadius) * -1],
                       'right': [-markerRadius, (markerHeight - markerRadius) * -1]
            }">
                        <v-card color="#74D277" flat>
                            <v-row class="ma-0" justify="center" align="center">
                                <v-col cols="10" class="pa-0">
                                    <v-row class="ma-0">
                                        <v-card-text class="pa-2 pb-0">{{meal.name}}</v-card-text>
                                        <v-row class="ma-0 px-2 pb-1">
                                            <v-icon small>mdi-alarm</v-icon>
                                            {{meal.startTime}} - {{meal.endTime}}
                                            <v-spacer></v-spacer>
                                            <v-icon small>mdi-currency-eur</v-icon>
                                            {{meal.price}}
                                        </v-row>
                                    </v-row>
                                </v-col>
                                <v-col cols="2" class="pa-0">
                                    <MealOverview :meal-name="meal.name" :price="meal.price" :rating="meal.rating"
                                                  :user-name="meal.userName" :start-time="meal.startTime" :end-time="meal.endTime"
                                                  :address="meal.address" :tags="meal.tags">
                                        <template v-slot:activator="{on}">
                                            <v-btn icon v-on="on">
                                                <v-icon>mdi-chevron-right</v-icon>
                                            </v-btn>
                                        </template>
                                    </MealOverview>
                                </v-col>
                            </v-row>
                        </v-card>
                    </MglPopup>
                </MglMarker>
            </MglMap>
        </v-sheet>
    </div>

</template>

<script>
    import Mapbox from "mapbox-gl";
    import {MglMap, MglMarker, MglPopup} from "vue-mapbox";
    import MealOverview from "@/components/MealOverview";
    import TopBar from "./NavBar/TopBar";

    export default {
        name: "Map",
        data() {
            return {
                accessToken: "pk.eyJ1IjoibGV2aTEyNSIsImEiOiJjazhpajRoeTQwMmh1M2RvNHZpeGhueTl5In0.oxKsWN02FgviTbK3eT2WRg",
                mapStyle: "mapbox://styles/mapbox/streets-v11",
                markerHeight: 23,
                markerRadius: 10,
                linearOffset: 0,
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
                        coordinates: [5.0, 52.0]
                    }
                ],
            }
        },
        methods: {
            onMapLoaded(event) {
                this.map = event.map;
            }
        },
        created() {
            this.mapbox = Mapbox;
        },
        components: {
            TopBar,
            MealOverview,
            MglMap,
            MglMarker,
            MglPopup,
        },
    }
</script>

<style>
    .mapboxgl-popup-content {
        padding: 0px !important;
    }

    .mapboxgl-popup-tip {
        display: none;
    }
</style>

<style scoped>

</style>