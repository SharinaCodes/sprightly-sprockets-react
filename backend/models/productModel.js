const mongoose = require('mongoose');

/**
 * Associated part schema that defines the structure of associated parts in the database
 */
const associatedPartSchema = mongoose.Schema(
  {
    partId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Part',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/**
 * Product schema that defines the structure of products in the database
 */
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      validate: {
        validator: function(value) {
          return value >= this.min && value <= this.max;
        },
        message: 'Stock must be between min and max values',
      },
    },
    min: {
      type: Number,
      required: [true, 'Minimum stock is required'],
      validate: {
        validator: function(value) {
          return value < this.max;
        },
        message: 'Min should be less than Max',
      },
    },
    max: {
      type: Number,
      required: [true, 'Maximum stock is required'],
      validate: {
        validator: function(value) {
          return value > this.min;
        },
        message: 'Max should be greater than Min',
      },
    },
    associatedParts: [associatedPartSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);