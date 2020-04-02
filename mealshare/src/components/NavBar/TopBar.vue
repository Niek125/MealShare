<template>
     <v-toolbar flat color="#74D277">
            <v-row align="center" justify="center">
                <v-toolbar-title  class="white--text">{{pageTitle}}</v-toolbar-title>
            </v-row>
        </v-toolbar>

</template>

<script>
export default {
    name:"TopBar",
    props:{
        pageTitle: String,
    }
}
</script>