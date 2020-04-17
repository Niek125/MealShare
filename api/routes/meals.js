const express = require('express');
const router = express.Router();

const mysql = require("mysql");

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mealshare/2',
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
    const db = new Database();
    db.query("INSERT INTO `meal` (`id`, `name`, `startTime`, `endTime`, `price`, `image`, `buyersid`, `makerid`)" +
        " VALUES (NULL, '?', '?', '?', '?', 'https://picsum.photos/510/300?random', NULL, '?')",
        [req.body.name, req.body.startTime, req.body.endTime, req.body.price, req.body.userId])
    db.close();
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

router.post("/buy", function (req, res, next) {
    const db = new Database();
    let fcmToken = db.query("SELECT `makerid` FROM `meal` WHERE meal.id = ?", [req.body.mealId]);
    db.query("UPDATE `meal` SET `buyersid`= ? WHERE meal.id = ?", [req.body.buyerid, req.body.mealid])
    db.close();
})

module.exports = router;