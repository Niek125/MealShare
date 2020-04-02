<template>
    <v-bottom-navigation :value="activeBtn" color="green">
        <NavButton v-for="(data, index) in tabs" :name="data.name" :icon="data.icon" :key="'tab:' + index"
                   v-on:click.native="redirect(data.pathName, index)"></NavButton>
    </v-bottom-navigation>
</template>

<script>
    import NavButton from "@/components/NavBar/NavButton";

    export default {
        name: "BottomNav",
        components: {NavButton},
        methods: {
            redirect: function (path) {
                if (this.$route.name == path) {
                    return;
                }
                this.$router.push(path);
            }
        },
        data() {
            return {
                activeBtn: this.$route.path.slice(1),
                tabs: [
                    {
                        name: "Meals",
                        icon: "mdi-food",
                        pathName: "Meals",
                    },
                    {
                        name: "Map",
                        icon: "mdi-map-legend",
                        pathName: "Map",
                    },
                    {
                        name: "Form",
                        icon: "mdi-post",
                        pathName: "Form",
                    }
                ],
            }
        },
    }
</script>

<style scoped>

</style>