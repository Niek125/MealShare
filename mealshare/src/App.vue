<template>
    <v-app>
        <v-sheet tile width="100vw" height="100vh">
            <v-sheet tile height="calc(100vh - 56px)" color="#F4F4F4">
                <router-view></router-view>
            </v-sheet>
            <BottomNav></BottomNav>
        </v-sheet>
    </v-app>
</template>

<script>
    import BottomNav from "./components/NavBar/BottomNav";

    export default {
        name: 'App',
        components: {BottomNav},
        watch: {
            '$route'(to) {
                document.title = to.meta.title || 'Meal Share'
            }
        },
    };
</script>
