import Vue from "vue"
import Router from "vue-router"
import Meals from "@/components/Meals";
import Map from "@/components/Map";
import MealForm from "@/components/MealForm";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "*",
            redirect: "/meals",
        },
        {
            path: "/meals",
            name: "Meals",
            component: Meals,
            meta: {
                title: "Meals",
            },
        },
        {
            path: "/map",
            name: "Map",
            component: Map,
            meta: {
                title: "Map",
            },
        },
        {
            path: "/form",
            name: "Form",
            component: MealForm,
            meta: {
                title: "Form",
            },
        },
    ]
})