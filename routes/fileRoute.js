const router = require("express").Router();
const { getFilesByKey } = require("../controllers/fileController");


router.route("/:key").get(getFilesByKey);

module.exports = router;