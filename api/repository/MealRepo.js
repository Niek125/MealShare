const Database = require("./Database")

class MealRepo {

    async getAllMeals() {
        const db = new Database();
        let data = await db.query("SELECT meal.id, meal.name, meal.startTime, meal.endTime, meal.price, meal.image," +
            " AVG(review.rating) AS rating, USER.name AS userName, USER.longitude, USER.latitude" +
            " FROM `meal` INNER JOIN `user` ON meal.makerid = USER.id LEFT JOIN `review` ON meal.id = review.mealid" +
            " GROUP BY meal.id");
        for (let row of data) {
            row.tags = await db.query("SELECT tag.name" +
                " FROM `tag` INNER JOIN `meal_tag` ON tag.id = meal_tag.tagid" +
                " WHERE meal_tag.mealid = ?", [row.id]);
        }
        await db.close();
        return data;
    }

    postMeal(meal) {
        const db = new Database();
        db.query("INSERT INTO `meal` (`id`, `name`, `startTime`, `endTime`, `price`, `image`, `buyersid`, `makerid`, `fcmtoken`)" +
            " VALUES (NULL, ?, ?, ?, ?, 'https://picsum.photos/510/300', NULL, 1, ?);",
            [meal.name, meal.startTime, meal.endTime, meal.price, meal.userId])
        db.close();
    }

    buyMeal(buyerId, mealId) {
        const db = new Database();
        db.query("UPDATE `meal` SET `buyersid`= ? WHERE meal.id = ?", [buyerId, mealId]);
        db.close();
    }

    async getFcmToken(mealId) {
        const db = new Database();
        let data = await db.query("SELECT `fcmtoken` FROM `meal` WHERE meal.id = ?", [mealId])
        await db.close();
        return data[0].fcmtoken;
    }

}

module.exports = MealRepo;