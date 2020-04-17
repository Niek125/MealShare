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
    <v-sheet  color="#F4F4F4" class="meal-wrapper">
      <v-sheet tile  class="pa-4 meal-item overflow-y-auto transparent" height="calc(100vh - 112px)">
        <v-row class="ma-0" justify="center">
          <v-card class="mt-4 rounded" flat>
            <v-img src="https://picsum.photos/510/300?random">
              <v-sheet class="fill-height transparent mealImgGrad">
                <v-row align="space-between" class="ma-0 fill-height">
                  <MealTitle :price="price" :title="mealName"></MealTitle>
                  <v-col cols="12">
                    <v-row align="end" justify="end" class="ma-0 fill-height">
                      <v-chip
                        dense
                        color="#74D277"
                        v-for="(tag, index) in tags"
                        :key="'tag'+ index"
                        class="mr-2 mb-2 white--text"
                      >{{tag.name}}</v-chip>
                    </v-row>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-img>
          </v-card>

          <v-container class="pa-0 overflow-x-auto">
            <!-- Rating -->
            <v-row class="ma-0 pt-4">
              <v-rating
                v-model="rating"
                color="#74D277"
                background-color="#74D277"
                size="32"
                readonly
                dense
              ></v-rating>
            </v-row>
            <!-- Username -->
            <v-row class="ma-0">
              <v-card-title class="pl-0">
                <v-icon color="#74D277" class="mr-4">mdi-account</v-icon>
                {{userName}}
              </v-card-title>
            </v-row>

            <!-- Location -->
            <v-row class="ma-0">
              <v-card-title class="pl-0">
                <v-icon color="#74D277" class="mr-4">mdi-map-marker</v-icon>
                {{address}}
              </v-card-title>
            </v-row>

            <!-- Pickup Timespan -->
            <v-row class="ma-0">
              <v-card-title class="pl-0">
                <v-icon color="#74D277" class="mr-4">mdi-alarm</v-icon>
                {{startTime}} - {{endTime}}
              </v-card-title>
            </v-row>

            <!-- Routebeschrijving -->
            <v-row class="ma-0 pt-4">
              <v-card class="my-0 rounded" flat>
                <v-img class="routebeschrijving" :src="`${publicPath}map.png`">
                  <v-row class="ma-0 fill-height" justify="center">
                    <v-card-title>
                      <v-icon class="mr-4">mdi-google-maps</v-icon>Routebeschrijving
                    </v-card-title>
                  </v-row>
                </v-img>
              </v-card>
            </v-row>
          </v-container>
        </v-row>
      </v-sheet>
    </v-sheet>
    <!-- Buy Button -->
    <v-toolbar class="pointer" v-on:click="dialog = false" bottom color="#74D277">
      <v-row class="ma-0" justify="center">
        <v-toolbar-title class="white--text">
          <v-icon color="white">mdi-cart</v-icon>Buy
        </v-toolbar-title>
      </v-row>
    </v-toolbar>
  </v-dialog>
</template>

<script>
import MealTitle from "./Meal/MealTitle";

export default {
  name: "MealOverview",
  components: { MealTitle },
  data() {
    return {
      dialog: false,
      publicPath: process.env.BASE_URL
    };
  },
  props: {
    mealName: String,
    price: String,
    tags: Array,
    rating: Number,
    userName: String,
    address: String,
    startTime: String,
    endTime: String
  }
};
</script>

<style scoped>
.meal-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
  height: calc(100vh-112px);
}

.meal-item {
  max-width: 100vw;
  width: 538px;
}

.routebeschrijving {
  max-width: 100%;
}

.pointer {
  cursor: pointer;
}
</style>