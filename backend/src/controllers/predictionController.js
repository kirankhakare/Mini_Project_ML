const Prediction = require('../models/Prediction');

const {
    getPrediction
} = require('../services/mlService');


const predictStudent = async (req, res) => {

    try {

        const predictionResult =
            await getPrediction(req.body);


        const savedPrediction =
            await Prediction.create({

                userId: req.user._id,

                study_hours:
                    req.body.study_hours,

                attendance:
                    req.body.attendance,

                assignment_score:
                    req.body.assignment_score,

                internal_marks:
                    req.body.internal_marks,

                prediction:
                    predictionResult.final_prediction,

                recommendation:
                    predictionResult.recommendation

            });


        res.status(201).json({

            prediction:
                predictionResult.final_prediction,

            recommendation:
                predictionResult.recommendation,

            createdAt:
                savedPrediction.createdAt

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    predictStudent
};