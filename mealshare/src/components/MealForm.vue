<template>
    <v-row class="ma-0" align="center" justify="center">
        <v-col cols="10">
            <v-row class="ma-0">
                <v-card>
                    <v-img src="https://picsum.photos/510/300?random">
                        <v-row justify="center" align="center" class="fill-height">
                            <v-icon color="white" size="50">mdi-camera-iris</v-icon>
                        </v-row>
                    </v-img>
                </v-card>
            </v-row>
            <v-row class="ma-0 mt-4">
                <v-text-field v-model="mealName" label="Name" color="white" outlined></v-text-field>
            </v-row>
            <v-row class="ma-0">
                <v-col cols="8" class="pa-0">
                    <v-text-field v-model="timeSpan" type="time" label="TimeSpan" color="white" outlined></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="3" class="pa-0">
                    <v-text-field v-model="price" label="Price" color="white" outlined></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-chip v-for="(tag, index) in tags" :key="'tag'+ index" class="mr-2 mb-2"
                        v-on:click="tag.active = !tag.active" :color="tag.active ? 'green' : 'white'">{{tag.tag}}
                </v-chip>
            </v-row>
            <v-row justify="center">
                <v-btn v-on:click="post">Post</v-btn>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "MealForm",
        data() {
            return {
                mealName: "",
                timeSpan: "",
                price: "",
                tags: [{tag: "spicy", active: false}, {tag: "gluten", active: false},
                    {tag: "peanuts", active: false}, {tag: "meat", active: false}, {tag: "fish", active: false},
                    {tag: "fruit", active: false},],
            }
        },
        methods: {
            post: function () {
                window.console.log({
                    name: this.mealName,
                    price: this.price,
                    timeSpan: this.timeSpan,
                    tags: this.tags.filter(x => x.active).map(x => x.tag),
                })
            },
        }
    }
</script>

<style scoped>

</style>