const express = require('express');
const router = express.Router();

const MealRepo = require("../repository/MealRepo")

const FCM = require("fcm-node");

const fcm = new FCM("AAAAzkG9bXw:APA91bGGCY9P6aJcRayz3WzUTNaRu1X_-BK_iDxeoE0ByW3JrPU1OVBjKHyftCQVhVr1nH7c6MWRS0JXp2l_sTIt8u7U3Z1iaXLA42DKb16IbIkKPGevldeh86wJnTceXikemPn-LT9m");
const mealRepo = new MealRepo();


router.post("/", function (req, res, next) {
    mealRepo.postMeal(req.body);
    res.end();
})


router.get("/", async function (req, res, next) {
    res.send(await mealRepo.getAllMeals());
})

router.post("/buy", async function (req, res, next) {
    let fcmToken = mealRepo.getFcmToken(req.body.mealId);
    mealRepo.buyMeal(req.body.buyerId, req.body.mealId);

    let message = {
        to: fcmToken,

        notification: {
            title: "Meal purchase",
            body: "Your meal has been sold"
        }
    }

    fcm.send(message, function (err, response) {
        if (err) {
            console.log(err);
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    })
    res.end();
})

module.exports = router;