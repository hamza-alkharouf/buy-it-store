const Category = require("../models/categoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

// Create Category -- Admin
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "Categories",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
  
    const category = await Category.create(req.body);
  
    res.status(201).json({
      success: true,
      category,
    });
  });
  
  // Get all Category(admin)
exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
    const categories = await Category.find();
  
    res.status(200).json({
      success: true,
      categories,
    });
});

// Update Category -- Admin
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorHander("Category not found", 404));
    }
  
    // Images Start Here
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    console.log(req.body.name)
    if (images !== undefined ) {
      console.log(req.body.name)

      // Deleting Images From Cloudinary
      for (let i = 0; i < category.images.length; i++) {
        await cloudinary.v2.uploader.destroy(category.images[i].public_id);
      }
      console.log('-----------2')

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "Categories",
        });
        console.log('-----------3')

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      console.log('-----------4')

      req.body.images = imagesLinks;
    }
    console.log('-----------5')

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      category,
    });
});

  




// Delete category admin
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {

    const category = await Category.findById(req.params.id);
  
    if (!category) {
      return next(new ErrorHander("category not found", 404));
    }
  
    // Deleting Images From Cloudinary
    for (let i = 0; i < category.images.length; i++) {
      await cloudinary.v2.uploader.destroy(category.images[i].public_id);
    }
  
    await category.remove();
  
    res.status(404).json({
      success: false,
      message: "You Can't delete any Category",
    });
  });

  // Get product Details 
exports.getCategoryDetails = catchAsyncErrors(async(req, res, next)=>{
  console.log(req.params.id)

  const category = await Category.findById(req.params.id)
  console.log(category)

  if(!category){
      return next(new ErrorHander("Category not found",404))
  }
  res.status(200).json({
      success:true,
      category
  })
})