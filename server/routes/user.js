const router = require("express").Router()


const userController = require("../controllers/userController");

router.get("/", userController.getUserDetails);
router.delete("/", userController.deleteUser);
router.post("/addIdToDatabase/:id", userController.addIdToDatabase);
router.post("/removeIdFromDatabase/:id", userController.removeIdFromDatabase);
router.get("/selectedIds", userController.getSelectedIds);

   
module.exports = router