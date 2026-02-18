const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: null, // optional
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      default: null, // optional
    },

    sizes: {
      type: [String],
      required: true, // example: ['S', 'M', 'L']
    },

    colors: {
      type: [String],
      required: true, // example: ['Red', 'Blue']
    },

    collections: {
      type: String,
      required: true, // example: "SummerCollection"
    },

    material: {
      type: String,
      default: null, // optional
    },

    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"], // defined in table
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
          default: "",
        },
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
