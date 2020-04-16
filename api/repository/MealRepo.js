require("Database")

class MealRepo {

    constructor() {
        this.db = new Database();
    }

    getMeals(){
        this.db.query("SELECT meal.id, meal.name, meal.startTime, meal.endTime, meal.price, meal.image," +
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
                await this.db.close();
                return rows;
            })
    }

}