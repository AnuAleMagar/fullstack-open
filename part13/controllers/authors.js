
const router = require("express").Router();
const { Blog } = require("../models");
const { sequelize } = require("../util/db");
const { Op } = require("sequelize");
const errorHandler = require("../middleware/errorHandler");
router.get("/", async (req, res, next) => {
    try {
        const authors = await Blog.findAll({
            attributes: [
                "author", 
                [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
                [sequelize.fn("SUM", sequelize.col("likes")), "likes"]  
            ],
            group: ["author"],
            order: [['blogs', 'DESC']],
        });
    if (!authors) {
        throw new Error("No authors found");
        }
        res.json(authors);
    } catch (error) {
        next(error);
    }
});
module.exports = router;