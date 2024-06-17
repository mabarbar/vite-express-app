const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema(
    {
        destination: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        distance: {
            type: Number,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
