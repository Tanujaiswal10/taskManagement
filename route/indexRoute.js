const express = require("express");
const router = express.Router();
const user = require("./userRoute")
const task = require("./taskRoute")

router.use("/user",user)
router.use("/task",task)

module.exports = router;
