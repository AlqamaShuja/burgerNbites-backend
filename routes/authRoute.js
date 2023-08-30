const router = require("express").Router();
const { signupController, signinController, logoutUser } = require("../controllers/authController");
const upload = require("../utils/multer");

// http://localhost:5000/api/auth/signin
router.route("/signin").post(signinController);
// router.route("signup").post(upload.single("avatar"), signupController);
router.route("/signup").post(signupController);
router.route("/logout").get(logoutUser);


module.exports = router;