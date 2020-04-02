<template>
    <v-btn :value="name">
        <span>{{name}}</span>
        <v-icon>{{icon}}</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "NavButton",
        props: {
            icon: String,
            name: String,
            link: String,
        },
    }
</script>

<style scoped>

</style>