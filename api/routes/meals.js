const express = require('express');
const router = express.Router();

const mysql = require("mysql");
const FCM = require("fcm-node");

const fcm = new FCM("AAAAzkG9bXw:APA91bGGCY9P6aJcRayz3WzUTNaRu1X_-BK_iDxeoE0ByW3JrPU1OVBjKHyftCQVhVr1nH7c6MWRS0JXp2l_sTIt8u7U3Z1iaXLA42DKb16IbIkKPGevldeh86wJnTceXikemPn-LT9m");

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mealshare/4',
}

class Database {
    constructor() {
        this.connection = mysql.createConnection(config);
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

router.post("/", function (req, res, next) {
    console.log(req.body);
    const db = new Database();
    db.query("INSERT INTO `meal` (`id`, `name`, `startTime`, `endTime`, `price`, `image`, `buyersid`, `makerid`, `fcmtoken`)" +
        " VALUES (NULL, ?, ?, ?, ?, 'https://picsum.photos/510/300', NULL, 1, ?);",
        [req.body.name, req.body.startTime, req.body.endTime, req.body.price, req.body.userId])
    db.close();
    res.end();
})


router.get("/", function (req, res, next) {
    const db = new Database();
    db.query("SELECT meal.id, meal.name, meal.startTime, meal.endTime, meal.price, meal.image," +
        " AVG(review.rating) AS rating, USER.name AS userName, USER.longitude, USER.latitude" +
        " FROM `meal` INNER JOIN `user` ON meal.makerid = USER.id LEFT JOIN `review` ON meal.id = review.mealid" +
        " GROUP BY meal.id")
        .then(async function (rows) {
            for (let row of rows) {
                row.tags = await db.query("SELECT tag.name" +
                    " FROM `tag` INNER JOIN `meal_tag` ON tag.id = meal_tag.tagid" +
                    " WHERE meal_tag.mealid = ?", [row.id]);
            }
            await db.close();
            res.send(rows);
        })
})

router.post("/buy", async function (req, res, next) {
    const db = new Database();
    let fcmToken = await db.query("SELECT `fcmtoken` FROM `meal` WHERE meal.id = ?", [req.body.mealId]);
    fcmToken = fcmToken[0].fcmtoken;
    await db.query("UPDATE `meal` SET `buyersid`= ? WHERE meal.id = ?", [req.body.buyerId, req.body.mealId]);

    console.log(fcmToken);
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

    db.close();
    res.end();
})

module.exports = router;