const express = require('express');
const router = express.Router();

const mysql = require("mysql");
const webpush = require("web-push");

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mealshare/2',
}

const publicVapidKey = "BDWVUjfrWijjfeZDQ2Q7si1_-I_yUGM2Co8BA-vcK3DWt_4sXo4P3US80X7UviHwDbuKoRQyX1zYWlSwn6EO7SY";
const privateVapidKey = "FmbR7jsn5mVKhs12gSuvhMO-WcGx8Q1-k0hPXHbm6MU";

webpush.setVapidDetails('mailto:localhost:8080', publicVapidKey, privateVapidKey);

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

// async function addTags(err, rows) {
//     for (const x of rows) {
//         let tags = await connection.query("SELECT tag.name FROM `tag` INNER JOIN `meal_tag` ON tag.id = meal_tag.tagid WHERE meal_tag.mealid = " + x.id);
//         console.log(tags);
//     }
// }


router.get("/", function (req, res, next) {
    // res.send([
    //     {
    //         name: "Spaghetti",
    //         price: "€1,50",
    //         startTime: "12:00",
    //         endTime: "14:00",
    //         distance: "2.5km",
    //         rating: 3.4,
    //         userName: "Marcel Veldhuizen",
    //         address: "Eindhoven, Hooidonksemolen",
    //         tags: ["spicy", "gluten", "meat", "fish", "fruit",],
    //         coordinates: [5.0, 52.0],
    //     },
    //     {
    //         name: "Meatballs",
    //         price: "€4,50",
    //         startTime: "18:00",
    //         endTime: "19:00",
    //         distance: "6.5km",
    //         rating: 4.3,
    //         userName: "Maikel Putman",
    //         address: "Empel, Vonkenwaard",
    //         tags: ["meat", "fish", "fruit",],
    //         coordinates: [5.2344, 51.6900],
    //     },
    //     {
    //         name: "Fish & Chips",
    //         price: "€3,00",
    //         startTime: "20:00",
    //         endTime: "21:00",
    //         distance: "2.5km",
    //         rating: 3.1,
    //         userName: "Jan Klaasen",
    //         address: "Zuiderdorp, Niewe Gouw",
    //         tags: ["fruit",],
    //         coordinates: [4.97, 52.4],
    //     },
    //     {
    //         name: "Sandwich",
    //         price: "€1,00",
    //         startTime: "12:00",
    //         endTime: "14:00",
    //         distance: "2.5km",
    //         rating: 5,
    //         userName: "Jasmine Jansen",
    //         address: "Eindhoven, Rachelsmolen",
    //         tags: [],
    //         coordinates: [4.992, 52.78],
    //     },
    // ]);
    // name: "Spaghetti",
    //         id name startTime endTime price image rating userName longtitude lattitude tags
    //     connection.connect();
    // connection.query("SELECT\n" +
    //     "    meal.id,\n" +
    //     "    meal.name,\n" +
    //     "    meal.startTime,\n" +
    //     "    meal.endTime,\n" +
    //     "    meal.price,\n" +
    //     "    meal.image,\n" +
    //     "    AVG(review.rating) AS rating,\n" +
    //     "    USER.name,\n" +
    //     "    USER.longitude,\n" +
    //     "    USER.latitude\n" +
    //     "FROM\n" +
    //     "    `meal`\n" +
    //     "INNER JOIN `user` ON meal.makerid = USER.id\n" +
    //     "LEFT JOIN `review` ON meal.id = review.mealid\n" +
    //     "GROUP BY\n" +
    //     "    meal.id",
    //     async function (err, rows, fields) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         await addTags(err, rows);
    //         console.log("closing connection")
    //         connection.end();
    //         res.send(rows);
    //     })
    const db = new Database();
    db.query("SELECT meal.id, meal.name, meal.startTime, meal.endTime, meal.price, meal.image," +
        " AVG(review.rating) AS rating, USER.name, USER.longitude, USER.latitude" +
        " FROM `meal` INNER JOIN `user` ON meal.makerid = USER.id LEFT JOIN `review` ON meal.id = review.mealid" +
        " GROUP BY meal.id")
        .then(async function(rows) {
            for (let row of rows){
                console.log(row.id);
                row.tags = await db.query("SELECT tag.name" +
                    " FROM `tag` INNER JOIN `meal_tag` ON tag.id = meal_tag.tagid" +
                    " WHERE meal_tag.mealid = " + row.id)
            }
            await db.close();
            res.send(rows);
        })
})

router.post("/", function (req, res) {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'test' });

    console.log(subscription);

    webpush.sendNotification(subscription, payload).catch(error => {
        console.error(error.stack);
    });
})

module.exports = router;