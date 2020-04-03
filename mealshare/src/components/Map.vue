<template>
  <div>
    <TopBar page-title="Find a meal"></TopBar>
    <v-sheet height="calc(100vh - 112px)" tile>
      <MglMap :accessToken="accessToken" :mapStyle="mapStyle" @load="onMapLoaded">
        <MglMarker
          :coordinates="meal.coordinates"
          color="#74D277"
          v-for="(meal, index) in meals"
          :key="'marker' + index"
        >
          <MglPopup 
            :closeButton="false"
            :offset="{
                'top': [0, 0],
                 'top-left': [0,0],
                  'top-right': [0,0],
                   'bottom': [0, -markerHeight],
                    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                     'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                      'left': [markerRadius, (markerHeight - markerRadius) * -1],
                       'right': [-markerRadius, (markerHeight - markerRadius) * -1]
            }"
          >
            <MealOverview 
              :meal-name="meal.name"
              :price="meal.price"
              :rating="meal.rating"
              :user-name="meal.userName"
              :start-time="meal.startTime"
              :end-time="meal.endTime"
              :address="meal.address"
              :tags="meal.tags"
            >
              <template v-slot:activator="{on}">
                <v-card class="rounded" flat>
                  <!-- Pop up marker card -->

                  <v-card class="rounded" v-on="on" flat>
                    <v-img src="https://picsum.photos/510/300?random">
                      <v-sheet class="fill-height transparent mealImgGrad">
                        <MealTitle :price="meal.price" :title="meal.name"></MealTitle>
                      </v-sheet>
                    </v-img>
                    <v-sheet color="white">
                      <v-col cols="12" class="pa-0">
                        <v-row class="ma-0">
                          <v-icon class="ml-3">mdi-alarm</v-icon>
                          <v-card-title class="px-1 subtitle-1 font-weight-medium">
                            {{meal.startTime}} -
                            {{meal.endTime}}
                          </v-card-title>
                          <v-icon class="ml-2">mdi-map-marker</v-icon>
                          <v-card-title class="px-1 subtitle-1 font-weight-medium">{{meal.distance}}</v-card-title>
                        </v-row>
                      </v-col>
                    </v-sheet>
                  </v-card>
                </v-card>
              </template>
            </MealOverview>
          </MglPopup>
        </MglMarker>
      </MglMap>
    </v-sheet>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import { mapGetters } from "vuex";
import MealOverview from "@/components/MealOverview";
import TopBar from "./NavBar/TopBar";
import MealTitle from "@/components/Meal/MealTitle";

export default {
  name: "Map",
  computed: {
    ...mapGetters("meals", ["meals"])
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoibGV2aTEyNSIsImEiOiJjazhpajRoeTQwMmh1M2RvNHZpeGhueTl5In0.oxKsWN02FgviTbK3eT2WRg",
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      markerHeight: 30,
      markerRadius: 10,
      linearOffset: 0
    };
  },
  methods: {
    onMapLoaded(event) {
      this.map = event.map;
      this.map.jumpTo({ center: [5, 52], zoom: 11 });
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
    MealTitle
  }
};
</script>

<style>
.mapboxgl-popup-content {
  padding: 0px !important;
  border-radius: 19px;
}

.mapboxgl-popup-tip {
  display: none;
}
</style>

<style scoped>
</style>