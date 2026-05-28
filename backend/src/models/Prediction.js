const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true

    },

    study_hours: {

        type: Number,

        required: true

    },

    attendance: {

        type: Number,

        required: true

    },

    assignment_score: {

        type: Number,

        required: true

    },

    internal_marks: {

        type: Number,

        required: true

    },

    prediction: {

        type: String,

        required: true

    },

    recommendation: {

        type: String,

        required: true

    }

}, {

    timestamps: true

});


module.exports = mongoose.model(
    'Prediction',
    predictionSchema
);