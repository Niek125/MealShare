<template>
    <v-app>
        <div id="install-banner" v-if="deferredPrompt">
            <button @onClick="promptInstall">Add to home screen</button>
        </div>
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
    import {mapActions} from "vuex";
    import firebase from 'firebase/app'
    import 'firebase/app'
    import 'firebase/messaging'
    import {BeforeInstallPromptEvent} from "vue-pwa-install";

    export default {
        name: 'App',
        components: {BottomNav},
        data() {
            return {
                fcmToken: "",
                deferredPrompt: BeforeInstallPromptEvent | null,
            }
        },
        watch: {
            '$route'(to) {
                document.title = to.meta.title || 'Meal Share'
            }
        },
        methods: {
            ...mapActions("meals", ["load",]),
            promptInstall() {
                // Show the prompt:
                this.deferredPrompt.prompt();

                // Wait for the user to respond to the prompt:
                this.deferredPrompt.userChoice.then(choiceResult => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("User accepted the install prompt");
                    } else {
                        console.log("User dismissed the install prompt");
                    }

                    this.deferredPrompt = null;
                });
            }
        },
        mounted() {
            const config = {
                apiKey: "AIzaSyCo9CXdEempU-8PyFgHchqmOMUI2VtQ5P0",
                authDomain: "mealshare-10334.firebaseapp.com",
                databaseURL: "https://mealshare-10334.firebaseio.com",
                projectId: "mealshare-10334",
                storageBucket: "mealshare-10334.appspot.com",
                messagingSenderId: "885866196348",
                appId: "1:885866196348:web:411148118976315119c8f9",
                measurementId: "G-7FDT9XK7MY"
            };
            firebase.initializeApp(config)

            const messaging = firebase.messaging()

            messaging.usePublicVapidKey("BKhRIndDyLMhs0R6sRE4o3ufTDGGSJi6j0wQCfT93a2k5v9wRoPRuUti4Drqn0v02xTGweKKn5qR0igOhKhCpig")

            messaging.requestPermission().then(() => {
                console.log('Notification permission granted.');

                // Get Token
                messaging.getToken().then((token) => {
                    console.log(token)
                    this.fcmToken = token;
                })
            }).catch((err) => {
                console.log('Unable to get permission to notify.', err);
            });
        },
        created() {
            this.load();
        }
    };
</script>
