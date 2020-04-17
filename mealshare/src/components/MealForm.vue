<template>
  <div>
    <TopBar pageTitle="Post a meal"></TopBar>
    <v-row class="ma-0" align="center" justify="center">
      <v-sheet tile class="overflow-y-auto pa-4 my-2 transparent" height="calc(100vh - 112px)">
        <!-- Camera Function  -->

        <div class="wrapper rounded" @click="TakePhoto">
          <video class="video" :class="activeDevice === 0 ? 'front' : ''" ref="video" />
          <canvas style="display:none" ref="canva" />
        </div>

        <!-- Switch Button -->
        <!-- v-if="videoDevices.length > 1" -->
        <v-row class="mt-4">
          <v-col cols="2">
            <v-btn
              height="60"
              text
              class="btn swap-btn rounded"
              color="white"
              @click="TakePhoto"
            >
              <b-icon pack="fas" icon="sync-alt" />
              <v-icon>mdi-camera</v-icon>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2">
            <v-btn
              height="60"
              text
              class="btn swap-btn rounded"
              color="white"
              @click="switchCamera"
            >
              <b-icon pack="fas" icon="sync-alt" />
              <v-icon>mdi-autorenew</v-icon>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <!-- Gallery -->
          <v-col cols="7" class="">
            <photos-gallery class="gallery rounded" :photos="photos" />
          </v-col>
        </v-row>

        <!-- Add a name -->
        <v-row class="ma-0 mt-4">
          <v-text-field
            class="rounded"
            v-model="mealName"
            label="Name"
            placeholder="Spaghetti Bolognese"
            color="#74D277"
            outlined
          ></v-text-field>
        </v-row>

        <!-- Add a timespan -->
        <v-row class="ma-0">
          <!-- Pop up dialog for startTime -->
          <v-col cols="4" class="pa-0">
            <v-dialog max-width="308px" v-model="startDialog">
              <template v-slot:activator="{ on }">
                <div v-on="on">
                  <v-text-field
                    class="rounded"
                    label="Pick up from"
                    :placeholder="startTime"
                    height="56px"
                    color="grey"
                    outlined
                    x-large
                    v-on="on"
                  >{{startTime}}</v-text-field>
                </div>
              </template>

              <v-card class="rounded">
                <v-card-actions class="d-flex flex-column">
                  <v-time-picker
                    flat
                    class="rounded"
                    color="#74D277"
                    format="24hr"
                    :allowed-minutes="(m) => m % 15 == 0"
                    v-model="startTime"
                  ></v-time-picker>

                  <!-- Close the pop up dialog btn -->
                  <v-btn
                    width="100%"
                    class="mt-3 rounded"
                    color="#74D277"
                    dark
                    depressed
                    x-large
                    @click="startDialog = false"
                  >Apply</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-spacer></v-spacer>
          <!-- Pop up dialog for endTime -->
          <v-col cols="4" class="pa-0">
            <v-dialog max-width="308px" v-model="endDialog">
              <template v-slot:activator="{ on }">
                <div v-on="on">
                  <v-text-field
                    class="rounded"
                    label="Untill"
                    :placeholder="endTime"
                    height="56px"
                    color="grey"
                    outlined
                    x-large
                    v-on="on"
                  >{{endTime}}</v-text-field>
                </div>
              </template>

              <v-card class="rounded">
                <v-card-actions class="d-flex flex-column rounded">
                  <v-time-picker
                    class="rounded"
                    color="#74D277"
                    format="24hr"
                    :allowed-minutes="(m) => m % 15 == 0"
                    v-model="endTime"
                  ></v-time-picker>

                  <!-- Close the pop up dialog btn -->
                  <v-btn
                    width="100%"
                    class="mt-3 rounded"
                    color="#74D277"
                    depressed
                    dark
                    x-large
                    @click="endDialog = false"
                  >Apply</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-spacer></v-spacer>

          <!-- Add a price -->
          <v-col cols="3" class="pa-0">
            <v-text-field
              class="rounded"
              v-model="price"
              label="Price"
              prefix="€"
              placeholder="4,50"
              color="#74D277"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Add multiple tags -->
        <v-row class="ma-0">
          <v-chip
            v-for="(tag, index) in tags"
            :key="'tag'+ index"
            class="mr-2 mb-2"
            v-on:click="tag.active = !tag.active"
            color="#74D277"
            :outlined="!tag.active"
            :text-color="tag.active ? 'white' : '#74D277'"
          >{{tag.tag}}</v-chip>
        </v-row>

        <!-- Post button -->
        <v-row class="ma-0 my-6" justify="center">
          <v-btn
            height="60"
            text
            block
            depressed
            dark
            class="btn rounded"
            color="white"
            v-on:click="postMeal"
          >Post</v-btn>
        </v-row>
      </v-sheet>
    </v-row>
  </div>
</template>

<script>
import TopBar from "@/components/NavBar/TopBar";
import PhotosGallery from "./PhotosGallery.vue";
import firebase from "firebase";

export default {
  name: "MealForm",
  components: {
    TopBar,
    PhotosGallery
  },
  data() {
    return {
      mealName: "",
      price: "",
      startDialog: false,
      endDialog: false,
      startTime: "18:00",
      endTime: "19:00",
      tags: [
        { tag: "meat", active: false },
        { tag: "fish", active: false },
        { tag: "vegan", active: false },
        { tag: "fruit", active: false },
        { tag: "spicy", active: false },
        { tag: "sweet", active: false },
        { tag: "gluten", active: false },
        { tag: "lactose", active: false },
        { tag: "peanuts", active: false }
      ],
      photos: [],
      mediaStream: null,
      videoDevices: [],
      activeDevice: 0,
      counter: 0
    };
  },
  methods: {
    postMeal: function() {
      window.console.log("posting");
      const messaging = firebase.messaging();
      messaging
        .requestPermission()
        .then(() => {
          console.log("Notification permission granted.");

          // Get Token
          messaging.getToken().then(token => {
            fetch("http://localhost:3000/meals/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: this.mealName,
                price: this.price,
                startTime: this.startTime,
                endTime: this.endTime,
                userId: token
              })
            });
          });
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    },
    async StartRecording(deviceIdx) {
      let video = this.$refs.video;
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: this.videoDevices[deviceIdx].deviceId } }
      });
      video.srcObject = this.mediaStream;
      video.play();
    },
    async TakePhoto() {
      let video = this.$refs.video;
      let canva = this.$refs.canva;
      let width = video.videoWidth;
      let height = video.videoHeight;
      canva.width = width;
      canva.height = height;
      let ctx = canva.getContext("2d");
      ctx.save();
      if (this.activeDevice === 0) {
        ctx.scale(-1, 1);
        ctx.drawImage(video, width * -1, 0, width, height);
      } else {
        ctx.drawImage(video, 0, 0);
      }
      ctx.restore();
      this.photos.push({
        id: this.counter++,
        src: canva.toDataURL("image/png")
      });
    },
    switchCamera() {
      const tracks = this.mediaStream.getVideoTracks();
      tracks.forEach(track => {
        track.stop();
      });
      this.StartRecording((this.activeDevice + 1) % 2);
      this.activeDevice = (this.activeDevice + 1) % 2;
    }
  },
  async mounted() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    this.videoDevices = devices.filter(d => d.kind === "videoinput");
    this.StartRecording(0);
  }
};
</script>

<style scoped>
.btn {
  background-color: #74d277;
}

.photo-btn {
  background-color: #74d277;
}

.video.front {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  width: 100%;
  padding-bottom: 278px;
  margin-left: -31px;
}

.wrapper {
  background-color: black;
  display: grid;
  width: 100%;
  height: 200px;
  grid-template-columns: [left] 90vw [bs] 5vw [es] 5vw [right];
  grid-template-rows: [top] 5vh [bs] 5vh [es] 60vh [middle] 10vh [bottom] 20vh [end];
  justify-items: center;
  overflow: hidden;
}

.video {
  height: 100%;
  grid-column: left/right;
  grid-row: top / bottom;
  user-select: none;
  max-width: 100%;
}

.switch-button {
  grid-column: bs / es;
  grid-row: bs / es;
  z-index: 5;
  border-radius: 100%;
  width: 6vh;
  height: 6vh;
  font-size: 2vh;
}

.photo-button-container {
  grid-column: left / right;
  grid-row: middle / bottom;
  z-index: 5;
  width: 100vw;
  height: 20vh;
  display: flex;
  justify-content: center;
}

.photo-button {
  width: 10vh;
  height: 10vh;
  border-radius: 100%;
}

.photo-button {
  font-size: 4vh;
  color: black;
}

.gallery {
  grid-column: left / right;
  grid-row: bottom / end;
  height: 60px;
  outline: #ababab;
  border: solid 1px rgb(146, 146, 146);
  background: #f4f4f4;
}

.swap-btn {
  padding-right: 20px;
}
</style>