const mongoose = require('mongoose');

const partSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Part name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Part price is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Part stock is required'],
        validate: {
            validator: function(value) {
                return value >= this.min && value <= this.max;
            },
            message: 'Stock must be between min and max values'
        }
    },

    min: {
        type: Number,
        required: [true, 'Part min is required'],
        validate: {
            validator: function(value) {
                return value < this.max;
            },
            message: 'Min should be less than max'
        }
    },
    max: {
        type: Number,
        required: [true, 'Part max is required'],
        validate: {
            validator: function(value) {
                return value > this.min;
            },
            message: 'Max should be greater than min'
        }
    },
    type: {
        type: String,
        enum: ['InHouse', 'Outsourced'],
        required: [true, 'Part type is required'],
    },
    machineId: {
        type: String,
        required: function() {
            return this.type === 'InHouse';
        },
        validate: {
            validator: function(value) {
                if (this.type === 'InHouse' && !value) {
                    return false;
                }

                return true;
            },
            message: 'InHouse parts must have a machine ID'
        }
    },
    companyName: {
        type: String,
        required: function() {
            return this.type === 'Outsourced';
        },
        validate: {
            validator: function(value) {
                if (this.type === 'Outsourced' && !value) {
                    return false;
                }

                return true;
            },
            message: 'Outsourced parts must have a company name'
        }
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Part', partSchema);