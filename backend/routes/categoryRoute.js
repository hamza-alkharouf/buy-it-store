const express = require("express");
const {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
  getCategoryDetails
} = require("../controllers/categoryController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router
.route("/admin/categories")
.get(getAllCategory);

router.route("/admin/category/new")
.post(isAuthenticatedUser, authorizeRoles("admin"), createCategory)

router
  .route("/category/:id")
  .get(getCategoryDetails)

  router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory)

module.exports = router;