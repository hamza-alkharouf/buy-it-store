const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true,"Please Enter Product Category"],
    validate: {
        validator: function(v) {
          return /^([a-zA-Z]{2,})/.test(v);
        },
        message: props => `${props.value} is not a valid Category!`
    },
    trim: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);
