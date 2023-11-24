const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const { checkUser } = require("../middleware/auth.middleware");
const checkAdmin = require('../middleware/isAdmin');

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
// router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.get("/random", userController.getRandomCollaborator);
router.get("/:id", checkAdmin, userController.userInfo);
router.post("/create", checkAdmin, userController.createUser)
router.put("/:id", checkAdmin, userController.updateUser)
router.delete("/:id", checkAdmin, userController.deleteUser)


module.exports = router;