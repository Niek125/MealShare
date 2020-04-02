<template>
    <v-col cols="12" class="pa-0">
        <v-row class="ma-0">
            <v-card-title class="white--text pt-3 pb-1">Meatballs
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card flat color="#74D277" tile id="shaved-edge">
                <v-card-title class="white--text py-2">€3,50</v-card-title>
            </v-card>
        </v-row>
    </v-col>
</template>

<script>
    export default {
        name: "MealTitle"
    }
</script>

<style scoped>
    #shaved-edge {
        border-bottom-left-radius: 19px;
    }
</style>